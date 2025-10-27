import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData, Link, Form } from "@remix-run/react";
import groq from "groq";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import CommentForm from "~/components/CommentForm";
import CommentThread from "~/components/CommentThread";

const projectId = "pzhistba";
const dataset = "production";
const apiVersion = "2023-12-01";

// Read-only client (for data fetching)
const sanity = createClient({ 
  projectId, 
  dataset, 
  apiVersion, 
  useCdn: true 
});

// Write client (for mutations) - uses your token
const writeClient = createClient({ 
  projectId, 
  dataset, 
  apiVersion, 
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN
});

const builder = imageUrlBuilder(sanity);

// Helper function to get the right client
function getClient(write: boolean = false) {
  return write ? writeClient : sanity;
}

/* ------------  loader  ------------ */
export async function loader({ params, request }: LoaderFunctionArgs) {
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

  const [latestPosts, categories, tags] = await Promise.all([
    sanity.fetch(groq`*[_type == "blogDetail"] | order(publishDate desc)[0...3]{ title, "slug": slug.current, publishDate }`),
    sanity.fetch(groq`*[_type == "category"] | order(_createdAt asc)[0...3]{ title, "slug": slug.current }`),
    sanity.fetch(groq`*[_type == "tag"] | order(_createdAt asc)[0...5]{ title, "slug": slug.current }`),
  ]);

  const topLevel = await sanity.fetch(
    groq`*[_type == "comment" && post._ref == $postId && !defined(parent._ref)] | order(likes desc, _createdAt desc)[0...10]{
      _id, name, message, likes, _createdAt,
      "replies": *[_type == "comment" && parent._ref == ^._id] | order(_createdAt asc)[0...3]
    }`,
    { postId: post._id }
  );

  return json({ post, latestPosts, categories, tags, topLevel });
}

/* ------------  meta  ------------ */
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const post = data?.post;
  const ogImage = post?.ogImage ? builder.image(post.ogImage).width(1200).height(630).url() : null;

  return [
    { title: post?.metaTitle || post?.title || "Blog" },
    { name: "description", content: post?.metaDescription || post?.excerpt || "" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
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

/* ------------  action  ------------ */
export async function action({ request, params }: ActionFunctionArgs) {
  const { slug } = params;
  const form = await request.formData();
  const intent = form.get("intent");
  const writeClient = getClient(true);

  if (intent === "comment") {
    const name = (form.get("name") as string).trim();
    const email = (form.get("email") as string).trim();
    const website = (form.get("website") as string).trim();
    const message = (form.get("message") as string).trim();
    const postId = form.get("postId") as string;
    if (!name || !email || !message) return json({ error: "Name, email and message required" }, 400);
    await writeClient.create({ _type: "comment", post: { _type: "reference", _ref: postId }, name, email, website: website || undefined, message, likes: 0, approved: true });
    return redirect(`/blogs/${slug}#comments`);
  }

  if (intent === "like") {
    const commentId = form.get("commentId") as string;
    await writeClient.patch(commentId).inc({ likes: 1 }).commit();
    return json({ ok: true });
  }

  if (intent === "reply") {
    const parentId = form.get("parentId") as string;
    const name = (form.get("name") as string).trim();
    const email = (form.get("email") as string).trim();
    const website = (form.get("website") as string).trim();
    const message = (form.get("message") as string).trim();
    if (!name || !email || !message) return json({ error: "Required fields missing" }, 400);
    await writeClient.create({ _type: "comment", post: { _type: "reference", _ref: form.get("postId") as string }, parent: { _type: "reference", _ref: parentId }, name, email, website: website || undefined, message, likes: 0, approved: true });
    return redirect(`/blogs/${slug}#comments`);
  }

  return json({ error: "Unknown intent" }, 400);
}

// Rest of your component code stays the same...

/* ------------  section renderer  ------------ */
function Section({ block }: { block: any }) {
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
      return <img src={builder.image(block.asset).width(800).url()} alt={block.alt || ""} className="w-full rounded-xl shadow-lg my-6" />;
    case "button":
      return <a href={block.url} className="inline-block px-5 py-2 bg-black text-white rounded hover:bg-gray-800 my-6">{block.label}</a>;
    default:
      return null;
  }
}

/* ------------  page  ------------ */
export default function BlogDetail() {
  const { post, latestPosts, categories, tags, topLevel } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <main className="min-h-screen bg-white">
      {/* HERO BANNER */}
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${builder.image(post.heroBackgroundImage).width(1600).url()})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative text-4xl md:text-5xl font-bold">{post.title}</h1>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {/* MAIN */}
        <article className="md:col-span-2 space-y-6">
          {/* COVER IMAGE */}
          <img
            src={builder.image(post.coverImage).width(800).url()}
            alt={post.title}
            className="w-full rounded-2xl shadow-lg"
          />

          {/* META BAR */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.author}</span>
            <span>•</span>
            <Link to={`/category/${post.categorySlug}`} className="hover:underline">{post.category}</Link>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link
                key={t.slug}
                to={`/tag/${t.slug}`}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:underline"
              >
                {t.title}
              </Link>
            ))}
          </div>

          {/* QUOTE TEXT */}
          {post.quoteText && (
            <blockquote className="border-l-4 border-black pl-4 italic my-6 text-lg">
              {post.quoteText}
            </blockquote>
          )}

          {/* SECTIONS */}
          <div className="prose prose-lg max-w-none">
            {post.sections.map((block) => (
              <Section key={block._key} block={block} />
            ))}
          </div>

          {/* COMMENTS */}
          <section id="comments" className="pt-12">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {actionData?.error && <p className="text-red-600 mb-4">{actionData.error}</p>}
            <CommentForm postId={post._id} />
            <CommentThread comments={topLevel} postId={post._id} />
          </section>
        </article>

        {/* SIDEBAR */}
        <aside className="space-y-10">
          <div>
            <h3 className="font-semibold mb-3">Latest Posts</h3>
            <ul className="space-y-2 text-sm">
              {latestPosts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blogs/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                  <div className="text-gray-500">{new Date(p.publishDate).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-1 text-sm">
              {categories.map((c) => (
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
              {tags.map((t) => (
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