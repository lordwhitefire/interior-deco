import type { LoaderFunction } from "@remix-run/node";
import { SITE_URL } from "~/utils/seo";
import projectsData from "~/data/projects.json";
import { articles } from "~/data/blogMock";
import staffData from "~/data/team/staff.json";

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

export const loader: LoaderFunction = () => {
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
    ...Object.keys(projectsData).map((slug) => `/projects/${slug}`),
    ...articles.map((article) => `/blog/${article.slug}`),
    ...Object.keys(staffData.members).map((slug) => `/team/${slug}`),
    ...serviceSlugs.map((slug) => `/services/${slug}`),
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