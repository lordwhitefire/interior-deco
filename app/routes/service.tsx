// app/routes/service.tsx
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import DescriptionSection from '~/components/DescriptionSection';
import HowWeWorkSection from '~/components/HowWeWorkSection';
import Join from '~/components/Join';

/* ----------  Sanity fetch  ---------- */
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';

const sanityClient = createClient({
  projectId: 'pzhistba',
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: true,
});
const builder = imageUrlBuilder(sanityClient);

export async function loader() {
  const services = await sanityClient.fetch(
    groq`*[_type == "serviceCard"] | order(displayOrder asc) {
      title,
      slug,                 // <- still the object { current: string }
      shortDesc
    }`
  );

  // flatten slug -> string
  const flatServices = services.map((s: any) => ({
    ...s,
    slug: s.slug.current
  }));

  const howWeWork = await sanityClient.fetch(
    groq`*[_type == "howWeWork"][0] {
      title,
      intro,
      steps[] {
        number,
        icon,
        title,
        intro,
        image
      }
    }`
  );

  howWeWork.steps.forEach((s: any) => {
    if (s.image) s.imageUrl = builder.image(s.image).url();
  });

  return json({ services: flatServices, howWeWork });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Services | Interior Decorators Inc." },
    { name: "description", content: "Explore our interior decoration services and see how we work." },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export default function Services() {
  const { services, howWeWork } = useLoaderData<typeof loader>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenuDropdown = () => setIsMenuOpen((v) => !v);

  const BannerSection = (
    <div className="relative">
      <div className="h-60 bg-cover bg-center background6" />
      <div className="absolute inset-0 flex justify-center items-end">
        <div className="bg-white py-8 px-16 rounded-t-[1rem] shadow-lg flex flex-col items-center">
          <h2 className="text-3xl font-bold font1">services</h2>
          <p className="text-center text-gray-700">
            <Link to="/" className="hover:underline">home</Link> / services
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      
      {BannerSection}
      <DescriptionSection services={services} />
      <HowWeWorkSection
        title={howWeWork.title}
        intro={howWeWork.intro}
        steps={howWeWork.steps}
      />
      <Join />
    </div>
  );
}
