import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams, Link } from "@remix-run/react";
import groq from "groq";

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import BlogCard from "~/components/BlogCard";

/* ------------------------------------------------------------------ */
/* 1.  INLINE SANITY CLIENT                                           */
/* ------------------------------------------------------------------ */
const projectId  = "pzhistba";
const dataset    = "production";
const apiVersion = "2023-12-01";

const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(sanity);

/* ------------------------------------------------------------------ */
/* 2.  LOADER                                                         */
/* ------------------------------------------------------------------ */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page  = Number(url.searchParams.get("page") || "1");
  const limit = 6;
  const offset = (page - 1) * limit;

  /* --- 2a. blogPage doc ------------------------------------------- */
  const blogPage = await sanity.fetch(
    groq`*[_type == "blogPage"][0]{
      title,
      "bg": heroBackgroundImage.asset->url,
      articlesTitle,
      articlesParagraph
    }`
  );

  /* --- 2b. latestNews doc ----------------------------------------- */
  const latest = await sanity.fetch(
    groq`*[_type == "latestNews" && featured == true][0]{
      title,
       "slug": slug.current,
      excerpt,
      extraParagraph1,
      extraParagraph2,
      publishDate,
      "category": category->title,
      "author": author->name,
      "cover": coverImage.asset->url
    }`
  );

  /* --- 2c. blogCard docs (6 per page) ----------------------------- */
  const cards = await sanity.fetch(
    groq`*[_type == "blogCard" && featured != true] | order(publishDate desc)[${offset}...${offset + limit}]{
      title,
       "slug": slug.current,
      excerpt,
      publishDate,
      "category": category->title,
      "cover": coverImage.asset->url
    }`
  );

  /* --- 2d. total for pagination ---------------------------------- */
  const total = await sanity.fetch(
    groq`count(*[_type == "blogCard" && featured != true])`
  );

  return json({ blogPage, latest, cards, total, page, limit });
}

/* ------------------------------------------------------------------ */
/* 3.  META                                                           */
/* ------------------------------------------------------------------ */
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.blogPage?.title || "Blog";
  const desc  = "Articles, tips and news from our interior-design experts.";
  const img   = "https://cdn.sanity.io/images/pzhistba/production/264a05e5631468c24669feaee63d38c226eb8bc9-1600x896.jpg?w=2000&fit=max&auto=format";
  const url   = "https://interior-deco-kappa.vercel.app/blog";

  return [
    { title },
    { name: "description", content: desc },
    { name: "viewport", content: "width=device-width, initial-scale=1" },

    // open-graph
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:site_name", content: "Interior Decorators Inc." },

    // twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: img },
  ];
};

/* ------------------------------------------------------------------ */
/* 4.  UI                                                             */
/* ------------------------------------------------------------------ */
export default function BlogRoute() {
  const { blogPage, latest, cards, total, page, limit } =
    useLoaderData<typeof loader>();
  const [, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(total / limit);

  const goPage = (p: number) =>
    setSearchParams((prev) => {
      prev.set("page", String(p));
      return prev;
    });

  return (
    <main className="min-h-screen bg-white">
      {/* -------- HERO BANNER -------- */}
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${builder.image(blogPage.bg).width(1600).url()})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative text-4xl md:text-5xl font-bold">{blogPage.title}</h1>
      </section>

      {/* -------- LATEST NEWS -------- */}
      {latest && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 space-y-4">
              <p className="text-sm text-gray-500">
                {new Date(latest.publishDate).toLocaleDateString()} · {latest.category}
              </p>
              <h2 className="text-2xl font-semibold">{latest.title}</h2>
              <p className="text-gray-700">{latest.excerpt}</p>
              {latest.extraParagraph1 && (
                <p className="text-gray-700">{latest.extraParagraph1}</p>
              )}
              {latest.extraParagraph2 && (
                <p className="text-gray-700">{latest.extraParagraph2}</p>
              )}
              <p className="text-sm text-gray-500">By {latest.author}</p>
              <Link
                to={`/blogs/${latest.slug}`}
                className="inline-block mt-2 px-5 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Read more
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={builder.image(latest.cover).width(800).url()}
                alt={latest.title}
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* -------- ARTICLES & NEWS GRID -------- */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-semibold mb-2">{blogPage.articlesTitle}</h2>
        <p className="text-gray-600 mb-8">{blogPage.articlesParagraph}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <BlogCard key={card.slug} card={card} />
          ))}
        </div>

        {/* -------- PAGINATION -------- */}
        {totalPages > 1 && (
          <nav className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goPage(p)}
                className={`px-3 py-1 rounded ${
                  p === page ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {String(p).padStart(2, "0")}
              </button>
            ))}
          </nav>
        )}
      </section>
    </main>
  );
}