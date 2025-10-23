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
  return [
    { title: data?.data?.seoTitle || "About Us" },
    { name: "description", content: data?.data?.seoDescription },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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