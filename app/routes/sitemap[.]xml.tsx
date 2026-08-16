import type { LoaderFunction } from "@remix-run/node";
import { SITE_URL } from "~/utils/seo";
import {
  getBlogSlugs,
  getProjectSlugs,
  getServiceSlugs,
  getStaffSlugs,
} from "~/lib/content";

const serviceSlugs = [
  "bedrooms-retreats",
  "boutique-transitional",
  "compact-micro-spaces",
  "hospitality-retail",
  "kitchens-dining",
  "living-spaces",
  "minimalist-scandinavian",
  "workspaces",
];

export const loader: LoaderFunction = async () => {
  const [projectSlugs, articleSlugs, memberSlugs, serviceSlugsLive] =
    await Promise.all([
      getProjectSlugs(),
      getBlogSlugs(),
      getStaffSlugs(),
      getServiceSlugs(),
    ]);

  const paths = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/team",
    "/testimonials",
    "/faq",
    "/contact",
    ...projectSlugs.map((slug) => `/projects/${slug}`),
    ...articleSlugs.map((slug) => `/blog/${slug}`),
    ...memberSlugs.map((slug) => `/team/${slug}`),
    ...(serviceSlugsLive.length > 0 ? serviceSlugsLive : serviceSlugs).map(
      (slug) => `/services/${slug}`
    ),
  ];

  const urls = paths
    .map(
      (path) =>
        `<url><loc>${SITE_URL}${path === "/" ? "" : path}</loc></url>`
    )
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};