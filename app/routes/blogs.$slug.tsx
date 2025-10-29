// app/routes/blogs.$slug.tsx
// FULL, SINGLE FILE – server-only Sanity clients created INSIDE loader/action/meta.
// Drop-in replacement for your old file.

import * as React from "react";
import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  Link,
  useFetcher,
  useRevalidator,
} from "@remix-run/react";
import groq from "groq";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { nanoid } from "nanoid";
import { getSession, commitSession } from "~/sessions";
import CommentForm from "~/components/CommentForm";
import CommentThread from "~/components/CommentThread";

// -----------------------------------------------------------------------------
// Cookie helper – read commenter cookie
// -----------------------------------------------------------------------------
function getCommenterCookie(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const match = cookieHeader?.match(/commenter=([^;]+)/);
  if (!match) return { name: "", email: "", website: "" };
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return { name: "", email: "", website: "" };
  }
}

// -----------------------------------------------------------------------------
// UTC date helper (safe for client)
// -----------------------------------------------------------------------------
const formatDate = (d: string) => {
  const date = new Date(d);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// -----------------------------------------------------------------------------
// Loader – server-only Sanity client
// -----------------------------------------------------------------------------
export async function loader({ params, request }: LoaderFunctionArgs) {
  const sanity = createClient({
    projectId: "pzhistba",
    dataset: "production",
    apiVersion: "2023-12-01",
    useCdn: false,
  });
  const builder = imageUrlBuilder(sanity);

  const { slug } = params;
  if (!slug) throw new Response("Missing slug", { status: 404 });

  const post = await sanity.fetch(
    groq`*[_type == "blogDetail" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      publishDate,
      "author": author->name,
      "category": category->title,
      "categorySlug": category->slug.current,
      "tags": tags[]->{title, "slug": slug.current},
      coverImage,
      heroBackgroundImage,
      ogImage,
      quoteText,
      sections,
      excerpt,
      metaTitle,
      metaDescription
    }`,
    { slug }
  );
  if (!post) throw new Response("Post not found", { status: 404 });

  const [latestPosts, categories, tags, comments] = await Promise.all([
    sanity.fetch(
      groq`*[_type == "blogDetail"] | order(publishDate desc)[0...3]{ title, "slug": slug.current, publishDate }`
    ),
    sanity.fetch(groq`*[_type == "category"] | order(_createdAt asc)[0...3]{ title, "slug": slug.current }`),
    sanity.fetch(groq`*[_type == "tag"] | order(_createdAt asc)[0...5]{ title, "slug": slug.current }`),
    sanity.fetch(
      groq`*[_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt asc){
        _id,
        name,
        email,
        website,
        message,
        "likes": count(likedBy),  
       "likedBy": likedBy[]._ref,
        _createdAt,
        parent->{_id}
      }`,
      { postId: post._id }
    ),
  ]);

  // Session for likes
  const session = await getSession(request.headers.get("Cookie"));
  let sessionId = session.get("sid");
  if (!sessionId) {
    sessionId = nanoid(32);
    session.set("sid", sessionId);
  }

  const likedSet = new Set<string>();

  // ────── DEBUG LOADER LIKES ──────
  console.log("=== LOADER DEBUG ===");
  console.log("sessionId:", sessionId);
  console.log("Total comments:", comments.length);

  comments.forEach((c: any) => {
    console.log(`Comment ${c._id}:`);
    console.log("  - likedBy array:", c.likedBy);
    console.log("  - looking for session:", `session-${sessionId}`);
    
  const isLiked = Array.isArray(c.likedBy) && 
  c.likedBy.some((ref: string) => ref === `session-${sessionId}`);
    
    console.log("  - isLiked:", isLiked);
    
    if (isLiked) {
      likedSet.add(c._id);
      console.log("  - ✅ ADDED TO LIKED SET");
    }
  });

  console.log("Final likedIds:", Array.from(likedSet));
  console.log("=== END LOADER DEBUG ===");

  // Read commenter cookie
  const commenter = getCommenterCookie(request);
  console.log("LOADER: Raw cookie header:", request.headers.get("Cookie"));
  console.log("LOADER: Parsed commenter:", commenter);

  return json(
    {
      post,
      latestPosts,
      categories,
      tags,
      comments,
      likedIds: Array.from(likedSet),
      userName: commenter.name || "",
      userEmail: commenter.email || "",
    },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

// -----------------------------------------------------------------------------
// Meta – server-only Sanity client
// -----------------------------------------------------------------------------
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Blog" }];
  const post = data.post;
  const sanity = createClient({
    projectId: "pzhistba",
    dataset: "production",
    apiVersion: "2023-12-01",
    useCdn: false,
  });
  const builder = imageUrlBuilder(sanity);
  const ogImage = post.ogImage ? builder.image(post.ogImage).width(1200).height(630).url() : null;

  return [
    { title: post.metaTitle || post.title || "Blog" },
    { name: "description", content: post.metaDescription || post.excerpt || "" },
    ...(ogImage
      ? [
          { property: "og:image", content: ogImage },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: ogImage },
        ]
      : []),
  ];
};

// -----------------------------------------------------------------------------
// Rate-limit helpers (in-memory, server-only)
// -----------------------------------------------------------------------------
type RateEntry = { likes: number; comments: number; resetAt: number };
const rateMap = new Map<string, RateEntry>();
const RATE_WINDOW = 60_000;
const RATE_LIMIT = { likes: 5, comments: 3 };

function checkLimit(key: string, type: "likes" | "comments"): boolean {
  const now = Date.now();
  let entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    entry = { likes: 0, comments: 0, resetAt: now + RATE_WINDOW };
    rateMap.set(key, entry);
  }
  if (entry[type] >= RATE_LIMIT[type]) return false;
  entry[type]++;
  return true;
}

// -----------------------------------------------------------------------------
// Action – server-only Sanity client
// -----------------------------------------------------------------------------
export async function action({ request, params }: ActionFunctionArgs) {
  const { slug } = params;
  if (!slug) return json({ error: "Missing slug" }, { status: 400 });

  const form = await request.formData();
  const actionType = form.get("_action");

  const session = await getSession(request.headers.get("Cookie"));
  let sessionId = session.get("sid");
  if (!sessionId) {
    sessionId = nanoid(32);
    session.set("sid", sessionId);
  }

  if (!checkLimit(sessionId, actionType === "likeComment" ? "likes" : "comments")) {
    return json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const readClient = createClient({
    projectId: "pzhistba",
    dataset: "production",
    apiVersion: "2023-12-01",
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN!,  // ADD TOKEN FOR CONSISTENT READS
  });
  const post = await readClient.fetch(
    groq`*[_type == "blogDetail" && slug.current == $slug][0]{ _id }`,
    { slug }
  );
  if (!post) return json({ error: "Post not found" }, { status: 404 });

  const writeClient = createClient({
    projectId: "pzhistba",
    dataset: "production",
    apiVersion: "2023-12-01",
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN!,
  });

  if (actionType === "createComment") {
    const name = (form.get("name") as string)?.trim();
    const email = (form.get("email") as string)?.trim();
    const message = (form.get("message") as string)?.trim();
    const parentId = (form.get("parentId") as string) || null;

    if (!name || !email || !message)
      return json({ error: "Name, email and message required" }, { status: 400 });

    const newDoc = await writeClient.create({
      _type: "comment",
      post: { _type: "reference", _ref: post._id },
      parent: parentId ? { _type: "reference", _ref: parentId } : undefined,
      name,
      email,
      message,
      likedBy: [], // ← likes field removed
      approved: true,
    });

    return json(
      {
        success: true,
        newComment: {
          _id: newDoc._id,
          name,
          email,
          message,
          likes: 0,
          likedBy: [],
          _createdAt: newDoc._createdAt,
          parent: parentId ? { _id: parentId } : null,
        },
      },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  }

if (actionType === "likeComment") {
  const commentId = form.get("commentId") as string;
  if (!commentId) return json({ error: "Missing commentId" }, { status: 400 });

  // Ensure session document exists FIRST
  const sessionDocId = `session-${sessionId}`;
  await writeClient.createIfNotExists({
    _id: sessionDocId,
    _type: "session",
    sessionId,
  });

  // USE SAME QUERY AS LOADER - fetch with expanded references
// USE SAME QUERY AS LOADER - fetch with expanded references
  const comment = await readClient.fetch(
    
    groq`*[_type == "comment" && _id == $commentId][0]{
      _id,
     "likedBy": likedBy[]->_ref 
    }`,
    { commentId }
  );
  if (!comment) return json({ error: "Comment not found" }, { status: 404 });
  // ────── FIX: Normalize likedBy safely ──────
if (!Array.isArray(comment.likedBy)) {
  comment.likedBy = [];
} else {
  comment.likedBy = comment.likedBy.filter((id: string) => typeof id === "string" && id);
}

console.log("Normalized likedBy:", comment.likedBy);

  // ────── DEBUG LOGS ──────
  console.log("=== ACTION LIKE DEBUG ===");
  console.log("sessionId:", sessionId);
  console.log("sessionDocId:", sessionDocId);
  console.log("commentId:", commentId);
  console.log("comment.likedBy:", comment.likedBy); // ← FIXED: Use comment, not freshComment
  console.log("comment.likedBy type:", typeof comment.likedBy?.[0]);

  // NOW CHECK USING EXPANDED REFERENCES (strings instead of objects)
  const alreadyLiked = Array.isArray(comment.likedBy) && 
    comment.likedBy.some((ref: string) => ref === sessionDocId); // ← FIXED: Use comment, not freshComment

  console.log("alreadyLiked:", alreadyLiked);

  if (alreadyLiked) {
    // UNLIKE - remove session reference
     console.log("🧹 Unliking comment...");
   // Remove ALL references that match this sessionDocId
  await writeClient
    .patch(commentId)
    .unset([`likedBy[@._ref == "${sessionDocId}"]`])
    .commit({ autoGenerateArrayKeys: true });
    
     // Re-fetch fresh copy to confirm it was removed
  const updated = await readClient.fetch(
    groq`*[_type == "comment" && _id == $commentId][0]{ "likedBy": likedBy[]->_ref }`,
    { commentId }
  );

     const newLikes = Array.isArray(updated.likedBy) ? updated.likedBy.length : 0;
     console.log("🧹 After unlike, likedBy:", updated.likedBy);

    return json(
    { success: true, likes: newLikes, liked: false },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
} else {
  // LIKE - add session reference, but check for duplicates first
  const commentWithDupCheck = await readClient.fetch(
    groq`*[_type == "comment" && _id == $commentId][0]{
      _id,
      "likedBy": likedBy[]->_ref
    }`,
    { commentId }
  );

  // Check if already exists (prevent duplicates)
  const alreadyExists = Array.isArray(commentWithDupCheck.likedBy) && 
    commentWithDupCheck.likedBy.includes(sessionDocId);

  if (!alreadyExists) {
    await writeClient
      .patch(commentId)
      .setIfMissing({ likedBy: [] })
      .unset([`likedBy[_ref == "${sessionDocId}"]`])
      .append("likedBy", [{ 
        _ref: sessionDocId,
        _key: `${sessionDocId}-${Date.now()}`
      }])
      .commit();
  }

  // Get updated comment
  const updated = await readClient.fetch(
    groq`*[_type == "comment" && _id == $commentId][0]{
      "likedBy": likedBy[]->_ref
    }`,
    { commentId }
  );
  const newLikes = Array.isArray(updated.likedBy) ? updated.likedBy.length : 0;

  return json(
    { success: true, likes: newLikes, liked: true },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}
}

  return json({ error: "Unknown action" }, { status: 400 });
}

// -----------------------------------------------------------------------------
// Section renderer
// -----------------------------------------------------------------------------
function Section({ block }: { block: any }) {
  const sanity = createClient({
    projectId: "pzhistba",
    dataset: "production",
    apiVersion: "2023-12-01",
    useCdn: true,
  });
  const builder = imageUrlBuilder(sanity);

  switch (block._type) {
    case "heading":
      return block.style === "h2" ? (
        <h2 className="text-2xl font-semibold mt-8 mb-4">{block.text}</h2>
      ) : (
        <h3 className="text-xl font-semibold mt-6 mb-3">{block.text}</h3>
      );
    case "paragraph":
      return <p className="mb-4">{block.text}</p>;
    case "customImage":
      return (
        <img
          src={builder.image(block.asset).width(800).url()}
          alt={block.alt || ""}
          className="w-full rounded-xl shadow-lg my-6"
        />
      );
    case "button":
      return (
        <a
          href={block.url}
          className="inline-block px-5 py-2 bg-black text-white rounded hover:bg-gray-800 my-6"
        >
          {block.label}
        </a>
      );
    default:
      return null;
  }
}

// -----------------------------------------------------------------------------
// Page component
// -----------------------------------------------------------------------------
export default function BlogDetail() {
  const {
    post,
    latestPosts,
    categories,
    tags,
    comments,
    likedIds,
    userName,
    userEmail,
  } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

    // ────── DEBUG CLIENT LIKES ──────
  React.useEffect(() => {
    console.log("=== CLIENT DEBUG ===");
    console.log("likedIds from loader:", likedIds);
    console.log("comments count:", comments.length);
    comments.forEach((c: any) => {
      console.log(`Comment ${c._id}: likes=${c.likes}, likedBy=`, c.likedBy);
    });
    console.log("=== END CLIENT DEBUG ===");
  }, [comments, likedIds]);
  
  const revalidator = useRevalidator();
  const likeFetcher = useFetcher();
  const commentFetcher = useFetcher();
  
  const [optimisticComments, setOptimisticComments] = React.useState(comments);

  React.useEffect(() => {
    setOptimisticComments(comments);
  }, [comments]);

  const handleOptimisticAdd = (fakeComment: any, parentId?: string) => {
    setOptimisticComments((prev: any[]) => {
      const newComment = {
        ...fakeComment,
        replies: [],
        parent: parentId ? { _id: parentId } : null,
      };
      if (!parentId) return [...prev, newComment];
      return prev.map((c: any) =>
        c._id === parentId
          ? { ...c, replies: [...(c.replies || []), newComment] }
          : c
      );
    });
  };

  React.useEffect(() => {
    if (likeFetcher.state === "idle" && likeFetcher.data?.success && revalidator.state === "idle") {
      revalidator.revalidate();
    }
  }, [likeFetcher.state, likeFetcher.data, revalidator]);

  React.useEffect(() => {
    if (
      commentFetcher.state === "idle" &&
      commentFetcher.data?.success &&
      commentFetcher.data.newComment
    ) {
      const real = commentFetcher.data.newComment;

      setOptimisticComments((prev) =>
        prev.map((c) => {
          const isTemp = c._id.startsWith("temp-");
          const matchMessage = c.message === real.message;
          const matchName = c.name === real.name;
          const matchTime = Math.abs(new Date(c._createdAt).getTime() - new Date(real._createdAt).getTime()) < 5000;
          const matchParent = (c.parent?._id || null) === (real.parent?._id || null);

          if (isTemp && matchMessage && matchName && matchTime && matchParent) {
            return real;
          }
          return c;
        })
      );

      if (revalidator.state === "idle") revalidator.revalidate();
    }
  }, [commentFetcher.state, commentFetcher.data, revalidator]);

  const map = new Map<string, typeof optimisticComments>();
  optimisticComments.forEach((c: any) => map.set(c._id, []));
  const roots: typeof optimisticComments = [];
  optimisticComments.forEach((c: any) => {
    const parentId = c.parent?._id;
    if (parentId && map.has(parentId)) map.get(parentId)!.push(c);
    else roots.push(c);
  });

  const renderTree = (nodes: typeof optimisticComments, depth = 0) =>
    nodes.map((node: any) => (
      <CommentThread
        key={node._id}
        comment={node}
        depth={depth}
        liked={likedIds.includes(node._id)}
        likes={node.likes}
        likeFetcher={likeFetcher}
        commentFetcher={commentFetcher}
        postId={post._id}
        slug={post.slug}
        userName={userName}
        userEmail={userEmail}
        allComments={optimisticComments}
        onOptimisticAdd={handleOptimisticAdd}
      >
        {map.has(node._id) && renderTree(map.get(node._id)!, depth + 1)}
      </CommentThread>
    ));

  const sanity = createClient({
    projectId: "pzhistba",
    dataset: "production",
    apiVersion: "2023-12-01",
    useCdn: true,
  });
  const builder = imageUrlBuilder(sanity);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero banner */}
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${builder.image(post.heroBackgroundImage).width(1600).url()})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative text-4xl md:text-5xl font-bold">{post.title}</h1>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        <article className="md:col-span-2 space-y-6">
          <img
            src={builder.image(post.coverImage).width(800).url()}
            alt={post.title}
            className="w-full rounded-2xl shadow-lg"
          />

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>{formatDate(post.publishDate)}</span>
            <span>•</span>
            <span>{post.author}</span>
            <span>•</span>
            <Link to={`/category/${post.categorySlug}`} className="hover:underline">
              {post.category}
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((t: any) => (
              <Link
                key={t.slug}
                to={`/tag/${t.slug}`}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:underline"
              >
                {t.title}
              </Link>
            ))}
          </div>

          {post.quoteText && (
            <blockquote className="border-l-4 border-black pl-4 italic my-6 text-lg">
              {post.quoteText}
            </blockquote>
          )}

          <div className="prose prose-lg max-w-none">
            {post.sections.map((block: any) => (
              <Section key={block._key} block={block} />
            ))}
          </div>

          <section id="comments" className="pt-12">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {actionData?.error && <p className="text-red-600 mb-4">{actionData.error}</p>}
            
            <CommentForm
              fetcher={commentFetcher}
              postId={post._id}
              slug={post.slug}
              userName={userName}
              userEmail={userEmail}
              onOptimisticAdd={handleOptimisticAdd}
            />
            
            <div className="mt-6 space-y-4">{renderTree(roots)}</div>
          </section>
        </article>

        <aside className="space-y-10">
          <div>
            <h3 className="font-semibold mb-3">Latest Posts</h3>
            <ul className="space-y-2 text-sm">
              {latestPosts.map((p: any) => (
                <li key={p.slug}>
                  <Link to={`/blogs/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                  <div className="text-gray-500">{formatDate(p.publishDate)}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-1 text-sm">
              {categories.map((c: any) => (
                <li key={c.slug}>
                  <Link to={`/category/${c.slug}`} className="hover:underline">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((t: any) => (
                <Link
                  key={t.slug}
                  to={`/tag/${t.slug}`}
                  className="px-2 py-1 bg-gray-100 rounded text-xs hover:underline"
                >
                  {t.title}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}