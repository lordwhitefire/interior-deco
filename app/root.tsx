// app/root.tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { MetaFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import groq from 'groq';

import NavigationBar from '~/components/NavigationBar';
import Footer from '~/components/Footer';
import { sanityClient } from '~/lib/sanity';
import { urlFor } from '~/lib/sanity';
import tailwindStyles from '~/tailwind.css';

export const meta: MetaFunction = () => {
  return [
    { name: 'description', content: 'Elevate your spaces with our expert interior decoration services. Discover innovative designs tailored to your style.' },
    { property: 'og:title', content: 'Interior Decorators Inc. - Transforming Spaces' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://drive.google.com/uc?export=view&id=1G6deIUVFQG1pD-yxvBXrSRhe591u1REy' },
    { property: 'og:url', content: 'https://interior-deco-kappa.vercel.app' },
    { property: 'og:description', content: 'Elevate your spaces with our expert interior decoration services. Discover innovative designs tailored to your style.' },
    { property: 'og:site_name', content: 'Interior Decorators Inc.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export const links = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'icon', href: 'https://lordwhitefire.github.io/interior-deco-assets/logo/favicon.ico', type: 'image/x-icon' },
  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css' },
];

/* ---------- fallback data (unchanged) ---------- */
const fallbackFooterData = {
  logo: 'https://lordwhitefire.github.io/interior-deco-assets/logo/Logo.png',
  description: 'Transforming spaces into stunning, functional environments that reflect your unique style and personality.',
  social: [
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' }
  ],
  sections: [
    {
      title: 'Company',
      links: [
        { label: 'Our Team', url: '/team' },
        { label: 'FAQ', url: '/faq' },
        { label: 'Testimonials', url: '/testimonials' },
        { label: 'Projects', url: '/projects' },
        { label: 'Blog', url: '/blog' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Interior Design', url: '/services/interior-design' },
        { label: 'Home Staging', url: '/services/home-staging' },
        { label: 'Consultation', url: '/services/consultation' },
        { label: 'Project Management', url: '/services/project-management' }
      ]
    },
    {
      title: 'Contact Info',
      links: [
        { label: 'info@interiordecorators.com', url: 'mailto:info@interiordecorators.com', icon: 'Mail' },
        { label: '+1 (555) 123-4567', url: 'tel:+15551234567', icon: 'Phone' },
        { label: '123 Design Street, Creative City', url: '#', icon: 'MapPin' }
      ]
    }
  ],
  copyright: '© 2024 Interior Decorators Inc. All rights reserved.',
  legal: [
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' }
  ]
};

export const loader: LoaderFunction = async () => {
  /* Fetch footer data from Sanity */
  const footerDoc = await sanityClient.fetch(
    groq`*[_type == "siteSettings"][0]{
      logo,
      description,
      social,
      copyright,
      legal,
      companyLinks,
      servicesLinks,
      contactLinks
    }`
  ).catch(() => null); // Gracefully handle fetch errors

  const footerData = footerDoc ? {
    logo: footerDoc.logo ? urlFor(footerDoc.logo).url() : fallbackFooterData.logo,
    description: footerDoc.description || fallbackFooterData.description,
    social: footerDoc.social?.length ? footerDoc.social : fallbackFooterData.social,
    sections: [
      {
        title: 'Company',
        links: footerDoc.companyLinks?.length ? footerDoc.companyLinks : fallbackFooterData.sections[0].links
      },
      {
        title: 'Services', 
        links: footerDoc.servicesLinks?.length ? footerDoc.servicesLinks : fallbackFooterData.sections[1].links
      },
      {
        title: 'Contact Info',
        links: footerDoc.contactLinks?.length ? footerDoc.contactLinks : fallbackFooterData.sections[2].links
      }
    ],
    copyright: footerDoc.copyright || fallbackFooterData.copyright,
    legal: footerDoc.legal?.length ? footerDoc.legal : fallbackFooterData.legal
  } : fallbackFooterData;

  return json({ footerData });
};

export default function Root() {
  const { footerData } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-100 text-gray-800">
        <header role="banner">
          <NavigationBar />
        </header>
        <main className="flex-grow">
          <Outlet />
        </main>
        <footer role="contentinfo">
          <Footer data={footerData} />
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <title>Error - Interior Deco</title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-100 text-gray-800">
        <header role="banner">
          <NavigationBar />
        </header>
        <main className="flex-grow flex items-center justify-center mt-16 sm:mt-0">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Oops, something went wrong!</h1>
            <p className="mb-4">We're sorry, but an error occurred. Please try again later.</p>
            <a href="/" className="text-amber-600 hover:underline">Return to Home</a>
          </div>
        </main>
        <footer role="contentinfo">
          <Footer data={fallbackFooterData} />
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}