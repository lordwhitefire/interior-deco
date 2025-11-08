// app/routes/faq.tsx  –  REMIX + SANITY  –  6+3 LOAD-MORE
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Link } from "@remix-run/react";
import groq from "groq";

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import NavigationBar from "~/components/NavigationBar";
import Footer from "~/components/Footer";

/* ------------------------------------------------------------------ */
/*  Sanity client                                                     */
/* ------------------------------------------------------------------ */
const sanityClient = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
});
const builder = imageUrlBuilder(sanityClient);

/* ------------------------------------------------------------------ */
/*  Loader – same as before                                            */
/* ------------------------------------------------------------------ */
export async function loader() {
  const pageContent = await sanityClient.fetch(
    groq`*[_type == "faqPage"][0]{
      title, heroHeadline, heroBackgroundImage,
      generalFaqsTitle, projectFaqsTitle, seoTitle, seoDescription
    }`
  );

  const faqItems = await sanityClient.fetch(
    groq`*[_type == "faqItem"] | order(displayOrder asc){
      _id, question, answer, isFeatured,
      category->{ _id, title, isProjectRelated }
    }`
  );

  const generalFaqs = faqItems
    .filter((i) => !i.category.isProjectRelated)
    .map((i) => ({ id: i._id, question: i.question, answer: i.answer }));

  const projectFaqs = faqItems
    .filter((i) => i.category.isProjectRelated)
    .map((i) => ({ id: i._id, question: i.question, answer: i.answer }));

  const heroImageUrl = pageContent?.heroBackgroundImage
    ? builder.image(pageContent.heroBackgroundImage).width(1600).url()
    : null;

  return json({
    pageContent: { ...pageContent, heroBackgroundImage: heroImageUrl },
    generalFaqs,
    projectFaqs,
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data?.pageContent?.seoTitle || "FAQ | Interior Decorators Inc.";
  const desc  = data?.pageContent?.seoDescription || "Find answers to common interior-design questions.";
  const img   = data?.pageContent?.heroBackgroundImage || "https://cdn.sanity.io/images/pzhistba/production/4e3667f477a817910a90e23a5d34748c339a8054-1600x896.jpg?w=2000&fit=max&auto=format";
  const url   = "https://interior-deco-kappa.vercel.app/faq";

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
/*  Accordion with 6+3 load-more                                       */
/* ------------------------------------------------------------------ */
interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: Faq[];
  title: string;
}

function FaqAccordion({ faqs, title }: FaqAccordionProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState(6);          // start at 6

  const toggle = (id: string) =>
    setExpanded((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const showMore = () => setVisible((v) => Math.min(v + 3, faqs.length));
  const canLoadMore = visible < faqs.length;
  const slice = faqs.slice(0, visible);

  if (!faqs.length) return null;

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mt-8 mb-12 font-serif">{title}</h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {slice.map((f) => (
          <div key={f.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(f.id)}
              className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{f.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  expanded.has(f.id) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded.has(f.id) && (
              <div className="px-6 pb-6 text-gray-700">
                <p className="leading-relaxed">{f.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {canLoadMore && (
        <div className="mt-8 text-center">
          <button
            onClick={showMore}
            className="inline-block border border-gray-400 px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Banner                                                         */
/* ------------------------------------------------------------------ */
function HeroBanner({ headline, backgroundImage }: { headline: string; backgroundImage: string | null }) {
  return (
    <div className="relative">
      <div
        className="h-60 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : "linear-gradient(to right, #8B7355, #D2B48C)",
        }}
      />
      <div className="absolute inset-0 flex justify-center items-end">
        <div className="bg-white py-8 px-16 rounded-t-2xl flex flex-col items-center">
          <h1 className="text-3xl font-bold font-serif">{headline}</h1>
          <p className="text-center text-gray-700 mt-2">home / faq</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function Faq() {
  const { pageContent, generalFaqs, projectFaqs } = useLoaderData<typeof loader>();
  const [menu, setMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white">
    

      <HeroBanner
        headline={pageContent.heroHeadline}
        backgroundImage={pageContent.heroBackgroundImage}
      />

      <main className="py-16">
        <FaqAccordion faqs={generalFaqs} title={pageContent.generalFaqsTitle} />
        <FaqAccordion faqs={projectFaqs} title={pageContent.projectFaqsTitle} />

        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <Link
            to="/contact"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Contact Us
          </Link>
        </div>
      </main>

     
    </div>
  );
}