import type { LoaderFunction } from "@remix-run/node";
import { CREATOR, SITE_URL } from "~/utils/seo";
import {
  getBlogSlugs,
  getProjectSlugs,
  getServiceSlugs,
  getStaffSlugs,
  getProjectsIndexData,
  getBlogIndexData,
  getTeamIndexData,
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
  const [projectSlugs, articleSlugs, memberSlugs, serviceSlugsLive, projects, articles, team] =
    await Promise.all([
      getProjectSlugs(),
      getBlogSlugs(),
      getStaffSlugs(),
      getServiceSlugs(),
      getProjectsIndexData(),
      getBlogIndexData(),
      getTeamIndexData(),
    ]);

  const projectBySlug = new Map<string, { slug: string; title: string; location: string }>(
    projects.projects.map((p) => [p.slug, p] as const)
  );
  const articleBySlug = new Map<string, { slug: string; title: string; excerpt: string }>(
    articles.articles.map((a) => [a.slug, a] as const)
  );
  const memberBySlug = new Map<string, { slug: string; fullName: string; role: string }>(
    (team.shownMembers as { slug: string; fullName: string; role: string }[]).map((m) => [m.slug, m] as const)
  );

  const usedServiceSlugs = serviceSlugsLive.length > 0 ? serviceSlugsLive : serviceSlugs;

  const body = `# Whitefire Interior

> Whitefire Interior is an Amsterdam-based interior design studio creating beautiful, functional spaces for homes and businesses — residential and commercial projects across the Netherlands and internationally.

The site is organized as: a home page, an about page, a services overview with detail pages for each service, a projects portfolio with a detail page per project, a blog with articles, a team page with a profile page per designer, plus testimonials, FAQ, and contact pages. This file lists the key pages so agents can navigate the site.

## Services

- [Services overview](${SITE_URL}/services): All services offered by the studio
${usedServiceSlugs.map((slug) => `- [${slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")}](${SITE_URL}/services/${slug}): Detail page for this service`).join("\n")}

## Projects

- [Projects portfolio](${SITE_URL}/projects): All ${projectSlugs.length} completed projects
${projectSlugs.map((slug) => {
  const p = projectBySlug.get(slug);
  return `- [${p?.title ?? slug}](${SITE_URL}/projects/${slug})${p?.location ? `: ${p.title} project in ${p.location}` : ""}`;
}).join("\n")}

## Blog

- [Blog index](${SITE_URL}/blog): Design inspiration and advice articles
${articleSlugs.map((slug) => {
  const a = articleBySlug.get(slug);
  return `- [${a?.title ?? slug}](${SITE_URL}/blog/${slug}): ${a?.excerpt ?? "Article"}`;
}).join("\n")}

## Team

- [Our team](${SITE_URL}/team): Meet the studio's designers
${memberSlugs.map((slug) => {
  const m = memberBySlug.get(slug);
  return `- [${m?.fullName ?? slug}](${SITE_URL}/team/${slug}): ${m?.role ?? "Designer profile"}`;
}).join("\n")}

## About and Contact

- [About](${SITE_URL}/about): About Whitefire Interior
- [Testimonials](${SITE_URL}/testimonials): Client reviews
- [FAQ](${SITE_URL}/faq): Frequently asked questions
- [Contact](${SITE_URL}/contact): Studio contact details and booking

## Optional

- [Studio brand](${SITE_URL}/favicon.svg): Favicon
- [Sitemap](${SITE_URL}/sitemap.xml): Full URL list for search engines

Created by [${CREATOR.name}](${CREATOR.linkedin}) — contact: ${CREATOR.email}`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};