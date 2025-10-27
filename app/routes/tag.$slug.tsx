import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link, useParams } from "@remix-run/react";
import groq from "groq";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = "pzhistba";
const dataset = "production";
const apiVersion = "2023-12-01";
const sanity = createClient({ projectId, dataset, apiVersion, useCdn: true });
const builder = imageUrlBuilder(sanity);

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) throw new Response("Missing tag slug", { status: 404 });

  const [tag, posts] = await Promise.all([
    sanity.fetch(groq`*[_type == "tag" && slug.current == $slug][0]{ title }`, { slug }),
    sanity.fetch(
      groq`*[_type == "blogDetail" && references(*[_type == "tag" && slug.current == $slug][0]._id)] | order(publishDate desc){
        title,
        "slug": slug.current,
        publishDate,
        coverImage,
        excerpt
      }`,
      { slug }
    ),
  ]);

  if (!tag) throw new Response("Tag not found", { status: 404 });

  return json({ tag, posts });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: `${data?.tag.title || "Tag"} – Tag` },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' }
];

export default function TagPage() {
  const { tag, posts } = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-white max-w-7xl mx-auto px-4 mt-16 py-12">
      <h1 className="text-4xl font-bold mb-2">{tag.title}</h1>
      <p className="text-gray-600 mb-8">Articles tagged with {tag.title}</p>

      {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="group">
            <Link to={`/blogs/${p.slug}`}>
              <img
                src={builder.image(p.coverImage).width(600).url()}
                alt={p.title}
                className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition"
              />
              <h3 className="font-semibold mt-3 group-hover:underline">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{new Date(p.publishDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">{p.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}