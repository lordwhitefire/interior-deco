import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import groq from "groq";

// same inline client you use on _index.tsx
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { AboutHero } from "~/components/AboutHero";
import { AboutQuote } from "~/components/AboutQuote";
import { AboutTeam } from "~/components/AboutTeam";
import { AboutCtaForm } from "~/components/AboutCtaForm";

// ------------------------------------------------------------------
// 1.  INLINE CLIENT  (identical to _index.tsx)
// ------------------------------------------------------------------
const sanityClient = createClient({
  projectId: "pzhistba",        // yours
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

// ------------------------------------------------------------------
// 2.  LOADER
// ------------------------------------------------------------------
export const loader = async () => {
  const doc = await sanityClient.fetch(
    groq`*[_type == "aboutPage"][0]{
      heroHeadline,
      heroSubText,
      quoteText,
      quoteAuthor,
      teamGallery[]{
        photo,
        name,
        title,
        twitter,
        linkedin,
        instagram
      },
      ctaHeadline,
      ctaSubText,
      ctaButtonText,
      seoTitle,
      seoDescription,
      mailchimpTag          // ← ADD THIS LINE (note the comma above)
    }`
  );

  const teamGallery = (doc?.teamGallery || []).map((m: any) => ({
    ...m,
    src: builder.image(m.photo).width(600).auto("format").url(),
    alt: m.name,
  }));

  return json({
    data: doc,
    teamGallery,
    mailchimpTag: doc.mailchimpTag || "project-lead"   // ← ADD THIS LINE
  });
};
// ------------------------------------------------------------------
// 3.  META
// ------------------------------------------------------------------
export const meta: MetaFunction = ({ data }) => {
  const title = data?.data?.seoTitle || "About Us";
  const desc  = data?.data?.seoDescription || "Learn more about Interior Decorators Inc.";
  const img   = "https://cdn.sanity.io/images/pzhistba/production/c24058cf07028ab0cd90ca5b9465891324b7002e-1600x896.jpg?w=2000&fit=max&auto=format";
  const url   = "https://interior-deco-kappa.vercel.app/about";

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
// ------------------------------------------------------------------
// 4.  PAGE
// ------------------------------------------------------------------
export default function About() {
  const { data, teamGallery, mailchimpTag  } = useLoaderData<typeof loader>();

  return (
    <>
      <AboutHero
        headline={data.heroHeadline}
        subText={data.heroSubText}
        slug="about"
      />
      <AboutQuote text={data.quoteText} author={data.quoteAuthor} />
      <AboutTeam members={teamGallery} />
      <AboutCtaForm
        headline={data.ctaHeadline}
        subText={data.ctaSubText}
        buttonText={data.ctaButtonText}
        mailchimpTag={mailchimpTag}
      />
    </>
  );
}