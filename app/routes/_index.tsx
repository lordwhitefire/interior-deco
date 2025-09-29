import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
 const heroData = {
    title: "Transform Your Space with Elegance",
    subtitle: "Discover innovative designs tailored to your style",
    // image no longer required – supplied in Hero.tsx
    };

  const servicesData = [
    { id: "1", name: "Project Plan", description: "Strategic planning for your dream space" },
    { id: "2", name: "Sketch of Project", description: "Detailed sketches bringing ideas to life" },
    { id: "3", name: "Final Design", description: "Polished designs ready for implementation" },
  ];

  const stylishData = {
    title: "Stylish Living Designs",
    description: "Elevate your home with our expert touch in modern interiors",
  };

  // Static testimonials data (matches your hard-coded array; used as fallback in component)
 const testimonialsData = [
    {
      id: 1,
      img: "https://lordwhitefire.github.io/interior-deco-assets/images/person1.jpg ",
      name: "Sarah Mitchell",
      location: "Manhattan, New York",
      rating: 5,
      text: "Transformed our living space beyond imagination. The attention to detail and creative vision made our house feel like a luxury hotel. Absolutely thrilled with the results!",
      verified: true,
      project: "Living Room Design",
    },
    {
      id: 2,
      img: "https://lordwhitefire.github.io/interior-deco-assets/images/person2.jpg ",
      name: "James Chen",
      location: "San Francisco, CA",
      rating: 5,
      text: "Professional, creative, and delivered exactly what we envisioned. The 3D renderings helped us see the final result before committing. Worth every penny!",
      verified: true,
      project: "Kitchen Remodel",
    },
    {
      id: 3,
      img: "https://lordwhitefire.github.io/interior-deco-assets/images/person3.jpg ",
      name: "Emma Thompson",
      location: "Austin, Texas",
      rating: 5,
      text: "Outstanding service from start to finish. They listened to our needs and created a space that perfectly reflects our personality. Highly recommend!",
      verified: true,
      project: "Bedroom Design",
    },
    {
      id: 4,
      img: "https://lordwhitefire.github.io/interior-deco-assets/images/lady3.jpg ",
      name: "Michael Rodriguez",
      location: "Miami, FL",
      rating: 5,
      text: "The team exceeded all expectations. Their ability to blend modern aesthetics with comfort is remarkable. Our home feels like a designer showcase!",
      verified: true,
      project: "Complete Home Design",
    },
    {
      id: 5,
      img: "https://lordwhitefire.github.io/interior-deco-assets/images/guy3.jpg ",
      name: "Lisa Park",
      location: "Seattle, WA",
      rating: 5,
      text: "Incredible transformation! They maximized our small space and made it feel twice as big. The storage solutions are both beautiful and functional.",
      verified: true,
      project: "Small Space Design",
    },
    {
      id: 6,
      img: "https://lordwhitefire.github.io/interior-deco-assets/images/lady4.jpg ",
      name: "David Kim",
      location: "Los Angeles, CA",
      rating: 5,
      text: "Professional, punctual, and passionate about design. They transformed our outdated office into a modern, inspiring workspace. Our team loves it!",
      verified: true,
      project: "Office Design",
    },
  ];

  
  return json({ heroData, servicesData, stylishData, testimonialsData });
}


export default function Index() {
  const { heroData, servicesData, stylishData, testimonialsData } = useLoaderData<typeof loader>();

  return (
    <div>
      <Hero data={heroData} />
      <Services data={servicesData} />
      <Stylish data={stylishData} />
      <Testimonials data={testimonialsData} /> {/* Passes data for dynamic prep; falls back to hard-coded */}
      <ClientShowcase />
      <FeaturedProjectsB />
      <SuccessStats />
      <Article />
      <Join />
    
    </div>
  );
}