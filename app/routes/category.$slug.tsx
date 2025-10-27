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

// Fallback image URL for coverImage (replace with your asset)
const FALLBACK_COVER_IMAGE = "https://via.placeholder.com/600x400?text=Fallback+Cover+Image";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) throw new Response("Missing category slug", { status: 404 });

  const [category, posts] = await Promise.all([
    sanity.fetch(groq`*[_type == "category" && slug.current == $slug][0]{ title }`, { slug }),
    sanity.fetch(
      groq`*[_type == "blogDetail" && category._ref == *[_type == "category" && slug.current == $slug][0]._id] | order(publishDate desc){
        title,
        "slug": slug.current,
        publishDate,
        coverImage,
        excerpt
      }`,
      { slug }
    ),
  ]);

  if (!category) throw new Response("Category not found", { status: 404 });

  // Log missing coverImage for debugging
  posts.forEach((post: any, index: number) => {
    if (!post.coverImage) {
      console.warn(`No coverImage for blog post "${post.title}" at index ${index} in category "${slug}"`);
    }
  });

  return json({ category, posts });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: `${data?.category.title || "Category"} – Category` },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' }
];

export default function CategoryPage() {
  const { category, posts } = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-white max-w-7xl mx-auto mt-16 px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">{category.title}</h1>
      <p className="text-gray-600 mb-8">Articles in this category</p>

      {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="group">
            <Link to={`/blogs/${p.slug}`}>
              <img
                src={p.coverImage ? builder.image(p.coverImage).width(600).url() : FALLBACK_COVER_IMAGE}
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