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

  
   const clientShowcaseData = [
    { id: 1, name: 'Luxe Interiors',    logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/01.svg', alt: 'Luxe Interiors' },
    { id: 2, name: 'Urban Nest',        logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/02.svg', alt: 'Urban Nest' },
    { id: 3, name: 'Elite Homes',       logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/03.svg', alt: 'Elite Homes' },
    { id: 4, name: 'Modern Living',     logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/04.svg', alt: 'Modern Living' },
    { id: 5, name: 'Prestige Properties',logo:'https://lordwhitefire.github.io/interior-deco-assets/icon/05.svg', alt: 'Prestige Properties' },
    { id: 6, name: 'Signature Spaces',  logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/01.svg', alt: 'Signature Spaces' },
    { id: 7, name: 'Royal Residence',   logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/02.svg', alt: 'Royal Residence' },
    { id: 8, name: 'Diamond Designs',   logo: 'https://lordwhitefire.github.io/interior-deco-assets/icon/03.svg', alt: 'Diamond Designs' },
  ];

  const featuredProjectsData = [
    {
      id: '1',
      title: 'Modern Luxury Kitchen',
      type: 'Kitchen Design',
      description: 'Complete renovation featuring custom cabinetry, quartz countertops, and premium appliances. Designed for both functionality and entertainment.',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/Modern_kitchen.jpg',
      category: 'kitchen',
      features: ['Custom Cabinetry', 'Quartz Countertops', 'Premium Appliances'],
      budget: '$$$',
      timeline: '6 weeks',
      link: '/projects/1'
    },
    {
      id: '2',
      title: 'Contemporary Living Space',
      type: 'Living Room',
      description: 'Open concept transformation with natural lighting, custom built-ins, and a cohesive color palette that creates warmth and sophistication.',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/modern_cupboard.jpg',
      category: 'living-room',
      features: ['Open Concept', 'Custom Built-ins', 'Natural Lighting'],
      budget: '$$',
      timeline: '4 weeks',
      link: '/projects/2'
    },
    {
      id: '3',
      title: 'Elegant Master Bedroom',
      type: 'Bedroom Design',
      description: 'Serene retreat featuring custom storage solutions, ambient lighting, and a calming color scheme designed for rest and relaxation.',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/modern_dining.jpg',
      category: 'bedroom',
      features: ['Custom Storage', 'Ambient Lighting', 'Calming Palette'],
      budget: '$$',
      timeline: '3 weeks',
      link: '/projects/3'
    },
    {
      id: '4',
      title: 'Sophisticated Dining Area',
      type: 'Dining Room',
      description: 'Perfect entertaining space with statement lighting, custom dining table, and sophisticated color palette for memorable gatherings.',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/modern_reading.jpg',
      category: 'dining-room',
      features: ['Statement Lighting', 'Custom Furniture', 'Sophisticated Palette'],
      budget: '$$$',
      timeline: '5 weeks',
      link: '/projects/4'
    },
    {
      id: '5',
      title: 'Modern Home Office',
      type: 'Office Design',
      description: 'Productivity-focused workspace with ergonomic furniture, optimal lighting, and organized storage solutions for maximum efficiency.',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/Modern_kitchen.jpg',
      category: 'office',
      features: ['Ergonomic Design', 'Optimal Lighting', 'Organized Storage'],
      budget: '$',
      timeline: '2 weeks',
      link: '/projects/5'
    },
    {
      id: '6',
      title: 'Luxury Bathroom Suite',
      type: 'Bathroom Design',
      description: 'Spa-like retreat with premium fixtures, custom vanities, and luxurious materials that create a personal sanctuary.',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/modern_cupboard.jpg',
      category: 'bathroom',
      features: ['Premium Fixtures', 'Custom Vanities', 'Luxury Materials'],
      budget: '$$$$',
      timeline: '8 weeks',
      link: '/projects/6'
    }
  ];

  const successStatsData = [
    { id: '1', number: '12', suffix: '',  label: 'Years of Experience',       icon: 'Calendar', color: 'from-blue-500 to-blue-600' },
    { id: '2', number: '85', suffix: '+', label: 'Successful Projects',       icon: 'Briefcase', color: 'from-green-500 to-green-600' },
    { id: '3', number: '15', suffix: '',  label: 'Active Projects',           icon: 'Star', color: 'from-yellow-500 to-yellow-600' },
    { id: '4', number: '95', suffix: '+', label: 'Happy Customers',           icon: 'Users', color: 'from-purple-500 to-purple-600' }
  ];

  const articleData = [
    {
      id: '1',
      title: 'Modern Kitchen Design Trends 2024',
      excerpt: 'Discover the latest innovations in kitchen design, from smart appliances to sustainable materials that are transforming culinary spaces.',
      category: 'Kitchen Design',
      author: 'Sarah Mitchell',
      date: '2024-01-15',
      readTime: '5 min read',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/article-1.jpg',
      featured: true,
      tags: ['Kitchen', 'Modern', 'Trends'],
      slug: '/blog/modern-kitchen-trends-2024'
    },
    {
      id: '2',
      title: 'Creating Serene Bedroom Retreats 2025',
      excerpt: 'Learn how to transform your bedroom into a peaceful sanctuary with the right color palettes, lighting, and storage solutions.',
      category: 'Bedroom Design',
      author: 'James Chen',
      date: '2024-01-12',
      readTime: '4 min read',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/article-2.jpg',
      featured: false,
      tags: ['Bedroom', 'Serene', 'Lighting'],
      slug: '/blog/serene-bedroom-retreats'
    },
    {
      id: '3',
      title: 'Sustainable Living Room Makeovers 2022',
      excerpt: 'Eco-friendly design solutions that don\'t compromise on style. Discover sustainable materials and energy-efficient lighting options.',
      category: 'Living Room',
      author: 'Emma Thompson',
      date: '2024-01-10',
      readTime: '6 min read',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/article-3.jpg',
      featured: false,
      tags: ['Sustainable', 'Eco-friendly', 'Living Room'],
      slug: '/blog/sustainable-living-room-makeovers'
    },
    {
      id: '4',
      title: 'Luxury Bathroom Design Essentials 2021',
      excerpt: 'Transform your bathroom into a spa-like retreat with premium fixtures, smart storage, and luxurious materials that create wow factor.',
      category: 'Bathroom Design',
      author: 'Michael Rodri',
      date: '2024-01-08',
      readTime: '7 min read',
      image: 'https://lordwhitefire.github.io/interior-deco-assets/images/article-4.jpg',
      featured: true,
      tags: ['Bathroom', 'Luxury', 'Spa'],
      slug: '/blog/luxury-bathroom-essentials'
    }
  ];
// in app/routes/_index.tsx loader
const joinData = {
  headline: 'Stay Ahead of the Curve',
  subline: 'Get exclusive design tips, early access to new collections, and special offers delivered to your inbox.',
  placeholder: 'Enter your email',
  buttonText: 'Join Now',
  privacy: 'No spam, unsubscribe anytime.',
  successMsg: 'Welcome! Check your inbox for confirmation.'
};

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