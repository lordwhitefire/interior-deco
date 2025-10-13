// app/routes/_index.tsx - COMPLETE BYPASS VERSION
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useParams } from '@remix-run/react';
import groq from 'groq';
import ServiceSingleBanner from '~/components/ServiceSingleBanner';
import SetTheTrendSection from '~/components/SetTheTrendSection';
import ClientShowcaseForServicesSingle from "~/components/logo1";
import InteriorSection from '../components/InteriorSection';
import LoveDesignSection from '../components/LoveDesignSection';
import MapSection from '../components/MapSection';
import SuccessStats from "~/components/SuccessStats";
import Join from "~/components/Join";

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create directly in index.tsx - BYPASS THE BROKEN CHAIN
const sanityClient = createClient({
  projectId: 'pzhistba',
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export { sanityClient, builder };

export async function loader() {

  // Fetch clients from Sanity
  const clientsDoc = await sanityClient.fetch(
    groq`*[_type == "client"] | order(id asc){id, name, logo}`
  )

  const clientShowcaseData = clientsDoc.map((client: any) => ({
    id: parseInt(client.id),
    name: client.name,
    logo: builder.image(client.logo).url(),
    alt: client.name
  }))

  // Fetch projects from Sanity
  const projectsDoc = await sanityClient.fetch(
    groq`*[_type == "project"] | order(id asc){id, title, type, description, image, category, features, budget, timeline, link}`
  )

  const featuredProjectsData = projectsDoc.map((project: any) => ({
    id: project.id,
    title: project.title,
    type: project.type,
    description: project.description,
    image: builder.image(project.image).url(),
    category: project.category,
    features: project.features || [],
    budget: project.budget,
    timeline: project.timeline,
    link: project.link || `/projects/${project.id}`
  }))

  // Fetch success stats from Sanity
  const successStatsDoc = await sanityClient.fetch(
    groq`*[_type == "successStats"][0]{stats}`
  )

  const successStatsData = successStatsDoc?.stats?.map((stat: any) => ({
    id: stat.id,
    number: stat.number,
    suffix: stat.suffix || '',
    label: stat.label,
    icon: stat.icon,
    color: stat.color
  })) || []

  // Fetch articles from Sanity
  const articlesDoc = await sanityClient.fetch(
    groq`*[_type == "article"] | order(date desc){id, title, slug, excerpt, category, author, date, readTime, image, featured, tags}`
  )

  const articleData = articlesDoc.map((article: any) => ({
    id: article._id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    author: article.author,
    date: article.date,
    readTime: article.readTime,
    image: builder.image(article.image).url(),
    featured: article.featured,
    tags: article.tags || [],
    slug: article.slug.current
  }))

  // Fetch join section data from Sanity
  const joinDoc = await sanityClient.fetch(
    groq`*[_type == "join"][0]{headline, subline, placeholder, buttonText, privacy, successMsg}`
  )

  const joinData = joinDoc || {
    headline: 'Stay Ahead of the Curve',
    subline: 'Get exclusive design tips, early access to new collections, and special offers delivered to your inbox.',
    placeholder: 'Enter your email',
    buttonText: 'Join Now',
    privacy: 'No spam, unsubscribe anytime.',
    successMsg: 'Welcome! Check your inbox for confirmation.'
  }

  return json({ clientShowcaseData, featuredProjectsData, successStatsData, articleData, joinData });
};

export default function Index() {
  const {  clientShowcaseData, featuredProjectsData, successStatsData, articleData, joinData } = useLoaderData<typeof loader>();
    // Use useParams() to get the dynamic parameter
  const { serviceid } = useParams();
  return (
    <div>
        <ServiceSingleBanner />
        <SetTheTrendSection />
      <ClientShowcaseForServicesSingle data={clientShowcaseData} />
       {/* Pass serviceId as a prop to MapSection */}
      <MapSection serviceId={serviceid} />
      <InteriorSection />
      <LoveDesignSection />
      <SuccessStats data={successStatsData} />

     <Join data={joinData} />
    </div>
  );
}