// app/routes/blogs.$slug.tsx
// FULL, SINGLE FILE – server-only Sanity clients created INSIDE loader/action/meta.
// Drop-in replacement for your old file.
import * as React from "react";
import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  Link,
  Form,
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
    useCdn: true,
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
        likes,
        likedBy,
        _createdAt,
        parent->{_id}
      }`,
      { postId: post._id }
    ),
  ]);

  // Build visitor-specific like-state via session
  const session = await getSession(request.headers.get("Cookie"));
  const sessionId = session.get("sid");
  const likedSet = new Set<string>();
  if (sessionId) {
    comments.forEach((c: any) => {
      if (c.likedBy?.some((x: any) => x.sessionId === sessionId)) likedSet.add(c._id);
    });
  }

  return json(
    { post, latestPosts, categories, tags, comments, likedSet },
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
    useCdn: true,
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
const RATE_WINDOW = 60_000; // 1 min
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

  // Session
  const session = await getSession(request.headers.get("Cookie"));
  let sessionId = session.get("sid");
  if (!sessionId) {
    sessionId = nanoid(32);
    session.set("sid", sessionId);
  }

  // Rate limit
  if (!checkLimit(sessionId, actionType === "likeComment" ? "likes" : "comments")) {
    return json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // Post must exist
  const readClient = createClient({
    projectId: "pzhistba",
    dataset: "production",
    apiVersion: "2023-12-01",
    useCdn: true,
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

  // --------- CREATE COMMENT ---------
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
      likes: 0,
      likedBy: [],
      approved: true,
    });

    return json(
      { success: true, comment: { _id: newDoc._id, _createdAt: newDoc._createdAt } },
      { headers: { "Set-Cookie": await commitSession(session) } }
    );
  }

  // --------- LIKE / UNLIKE ---------
  if (actionType === "likeComment") {
    const commentId = form.get("commentId") as string;
    if (!commentId) return json({ error: "Missing commentId" }, { status: 400 });

    const comment = await readClient.getDocument(commentId);
    if (!comment) return json({ error: "Comment not found" }, { status: 404 });

    const alreadyLiked = comment.likedBy?.some((x: any) => x.sessionId === sessionId);

    if (alreadyLiked) {
      await writeClient
        .patch(commentId)
        .unset([`likedBy[sessionId=="${sessionId}"]`])
        .dec({ likes: 1 })
        .commit();
      return json(
        { success: true, likes: comment.likes - 1, liked: false },
        { headers: { "Set-Cookie": await commitSession(session) } }
      );
    } else {
      await writeClient
        .patch(commentId)
        .setIfMissing({ likedBy: [] })
        .append("likedBy", [{ sessionId }])
        .inc({ likes: 1 })
        .commit();
      return json(
        { success: true, likes: (comment.likes || 0) + 1, liked: true },
        { headers: { "Set-Cookie": await commitSession(session) } }
      );
    }
  }

  return json({ error: "Unknown action" }, { status: 400 });
}

// -----------------------------------------------------------------------------
// Section renderer (safe for client)
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
  const { post, latestPosts, categories, tags, comments, likedSet } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  // Revalidate after mutations
  const revalidator = useRevalidator();
  const likeFetcher = useFetcher();
  const commentFetcher = useFetcher();

  React.useEffect(() => {
    if (likeFetcher.state === "idle" && likeFetcher.data?.success && revalidator.state === "idle")
      revalidator.revalidate();
  }, [likeFetcher.state, likeFetcher.data, revalidator]);

  React.useEffect(() => {
    if (commentFetcher.state === "idle" && commentFetcher.data?.success && revalidator.state === "idle")
      revalidator.revalidate();
  }, [commentFetcher.state, commentFetcher.data, revalidator]);

  // Build tree from flat comments
  const map = new Map<string, typeof comments>();
  comments.forEach((c: any) => map.set(c._id, []));
  const roots: typeof comments = [];
  comments.forEach((c: any) => {
    const parentId = c.parent?._id;
    if (parentId && map.has(parentId)) map.get(parentId)!.push(c);
    else roots.push(c);
  });

  const renderTree = (nodes: typeof comments, depth = 0) =>
    nodes.map((node: any) => (
      <CommentThread
        key={node._id}
        comment={node}
        depth={depth}
        liked={likedSet.has(node._id)}
        likes={node.likes}
        likeFetcher={likeFetcher}
        commentFetcher={commentFetcher}
        postId={post._id}
        slug={post.slug} 
        userName="" 
        userEmail=""
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
        {/* Main content */}
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

          {/* Comments area */}
          <section id="comments" className="pt-12">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {actionData?.error && <p className="text-red-600 mb-4">{actionData.error}</p>}
           <CommentForm postId={post._id} slug={post.slug} userName="" userEmail="" fetcher={commentFetcher} />
            <div className="mt-6 space-y-4">{renderTree(roots)}</div>
          </section>
        </article>

        {/* Sidebar */}
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