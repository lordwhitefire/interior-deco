// app/root.tsx - Whitefire
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
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
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Whitefire Interior' },
    { property: 'og:url', content: SITE_URL },
  ];
};

export const links = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'stylesheet', href: '/vendor/swiper-bundle.min.css' },
];

export const headers = () => {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://cdn.sanity.io",
      "font-src 'self'",
      "connect-src 'self'",
      'frame-src https://www.google.com https://maps.google.com',
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  };
};

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
  const location = useLocation();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={CREATOR.name} />
        <Meta />
        <Links />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={localBusinessJsonLd} />
      </head>
      <body className="min-h-screen flex flex-col text-gray-800">
        <SiteHeader activePath={location.pathname} />
        <main id="main" className="mx-auto w-full max-w-[1440px] flex-grow">
          <Outlet />
        </main>
        <SiteFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const status =
    error instanceof Response
      ? error.status
      : (error as { status?: number } | null | undefined)?.status ?? 500;
  const notFound = status === 404;

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <title>
          {notFound
            ? 'Page not found | Whitefire Interior'
            : 'Something went wrong | Whitefire Interior'}
        </title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen font-sans text-[#171615]">
        <div className="mx-auto min-h-screen max-w-[1440px] bg-[#F7F4EE] shadow-[0_0_0_1px_rgba(25,22,18,0.08)]">
          <SiteHeader activePath="/" />

          <main className="flex min-h-[60vh] items-center justify-center px-6 py-16 text-center">
            <div>
              <h1 className="font-serif text-[32px] tracking-[-0.02em]">
                {notFound ? 'Page not found' : 'Oops, something went wrong!'}
              </h1>
              <p className="mx-auto mt-3 max-w-[420px] text-[13px] leading-6 text-[#292929]">
                {notFound
                  ? "The page you're looking for doesn't exist or has moved."
                  : "We're sorry, but an error occurred. Please try again later."}
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