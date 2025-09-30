import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { urlFor } from '~/lib/sanity'   // we’ll create this helper in Step 3
import { sanityClient } from '~/lib/sanity' // Add this
import groq  from 'groq'; // Fix this import


import Hero from "~/components/Hero";
import Services from "~/components/Services";
import Stylish from "~/components/Stylish";
import Testimonials from "~/components/Testimonials";
import ClientShowcase from "~/components/ClientShowcase";
import FeaturedProjectsB from "~/components/FeaturedProjectsB";
import SuccessStats from "~/components/SuccessStats";
import Article from "~/components/Article";
import Join from "~/components/Join";

// Static fallback data (TODO: Replace with Sanity fetch later, e.g., await sanityServerClient.fetch(TESTIMONIALS_QUERY))
export async function loader() {
  // TODO: Replace with Sanity fetch later (e.g., await sanityServerClient.fetch(BANNER_DATA_QUERY))
  // For now, use static fallback data
  const heroDoc = await sanityClient.fetch(
    groq`*[_type == "hero"][0]{title, subtitle, images}`
  )

  /* 2.  build the 4-image string array  */
  const heroImages = heroDoc.images.map((img: any) => urlFor(img).url())

  /* 3.  assemble the home-page payload  */
  const heroData = {
    title: heroDoc.title,
    subtitle: heroDoc.subtitle,
    images: heroImages   // 4 strings – replaces local IMAGES
  }

  const servicesData = [
    { id: "1", name: "Project Plan", description: "Strategic planning for your dream space" },
    { id: "2", name: "Sketch of Project", description: "Detailed sketches bringing ideas to life" },
    { id: "3", name: "Final Design", description: "Polished designs ready for implementation" },
  ];

  const stylishDoc = await sanityClient.fetch(
  groq`*[_type == "stylish"][0]{title, description, images}`
)

  const stylishImages = stylishDoc.images.map((img: any) => urlFor(img).url())

  const stylishData = {
    title: stylishDoc.title,
    description: stylishDoc.description,
    images: stylishImages
  }

// Fetch testimonials from Sanity
  const testimonialsDoc = await sanityClient.fetch(
    groq`*[_type == "testimonials"][0]{testimonials}`
  )

  const testimonialsData = testimonialsDoc?.testimonials?.map((item: any) => ({
    id: item._key,
    img: urlFor(item.image).url(),
    name: item.name,
    location: item.location,
    rating: item.rating,
    text: item.text,
    verified: item.verified,
    project: item.project
  })) || []

  
 // Fetch clients from Sanity
const clientsDoc = await sanityClient.fetch(
  groq`*[_type == "client"] | order(id asc){id, name, logo}`
)

const clientShowcaseData = clientsDoc.map((client: any) => ({
  id: parseInt(client.id),
  name: client.name,
  logo: urlFor(client.logo).url(),
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
  image: urlFor(project.image).url(),
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
  image: urlFor(article.image).url(),
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

  return json({ heroData, servicesData, stylishData, testimonialsData, clientShowcaseData, featuredProjectsData, successStatsData, articleData, joinData });
}


export default function Index() {
  const { heroData, servicesData, stylishData, testimonialsData, clientShowcaseData, featuredProjectsData, successStatsData, articleData, joinData } = useLoaderData<typeof loader>();

  return (
    <div>
      <Hero data={heroData} />
      <Services data={servicesData} />
      <Stylish data={stylishData} />
      <Testimonials data={testimonialsData} /> {/* Passes data for dynamic prep; falls back to hard-coded */}
      <ClientShowcase data={clientShowcaseData} />
      <FeaturedProjectsB data={featuredProjectsData} />
      <SuccessStats data={successStatsData} />
      <Article data={articleData} />
     <Join data={joinData} />
    </div>
  );
}