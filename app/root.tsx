// app/root.tsx - Whitefire
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

import { SiteFooter } from '~/components/whitefire/SiteFooter';
import { SiteHeader } from '~/components/whitefire/SiteHeader';
import { JsonLd } from '~/utils/seo';

import tailwindStyles from '~/tailwind.css';
import { CREATOR, SITE_URL } from '~/utils/seo';

export const meta: MetaFunction = () => {
  return [
    { title: 'Whitefire Interior — Amsterdam Interior Design Studio' },
    { name: 'description', content: 'Whitefire Interior — an Amsterdam interior design studio creating beautiful, functional spaces for homes and businesses.' },
    { name: 'author', content: CREATOR.name },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Whitefire Interior' },
    { property: 'og:url', content: SITE_URL },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ];
};

export const links = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css' },
];

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Whitefire Interior',
  url: SITE_URL,
  email: 'hello@whitefireinterior.com',
  logo: `${SITE_URL}/favicon.svg`,
  founder: {
    '@type': 'Person',
    name: CREATOR.name,
    email: CREATOR.email,
    url: CREATOR.linkedin,
    sameAs: [CREATOR.linkedin],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@whitefireinterior.com',
    areaServed: 'NL',
    availableLanguage: ['English', 'Dutch'],
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Whitefire Interior',
  description: 'Amsterdam interior design studio creating beautiful, functional spaces for homes and businesses.',
  url: SITE_URL,
  image: `${SITE_URL}/favicon.svg`,
  email: 'hello@whitefireinterior.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '101 Prinsengracht',
    addressLocality: 'Amsterdam',
    postalCode: '1015 HR',
    addressCountry: 'NL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.3738,
    longitude: 4.8906,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '€€',
  founder: {
    '@type': 'Person',
    name: CREATOR.name,
    email: CREATOR.email,
    url: CREATOR.linkedin,
  },
};

export default function Root() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={localBusinessJsonLd} />
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-100 text-gray-800">
        <main className="flex-grow">
          <Outlet />
        </main>
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
        <title>Something went wrong | Whitefire Interior</title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-[#E8E2D8] font-sans text-[#171615]">
        <div className="mx-auto min-h-screen max-w-[1440px] bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
          <SiteHeader activePath="/" />

          <main className="flex min-h-[60vh] items-center justify-center px-6 py-16 text-center">
            <div>
              <h1 className="font-serif text-[32px] tracking-[-0.02em]">
                Oops, something went wrong!
              </h1>
              <p className="mx-auto mt-3 max-w-[420px] text-[13px] leading-6 text-[#292929]">
                We're sorry, but an error occurred. Please try again later.
              </p>
              <a
                href="/"
                className="mt-6 inline-flex min-h-[43px] items-center bg-[#b58a52] px-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#c39b69]"
              >
                RETURN TO HOME
              </a>
            </div>
          </main>

          <SiteFooter />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}