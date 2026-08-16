import type { LoaderFunction } from "@remix-run/node";
import { CREATOR, SITE_URL } from "~/utils/seo";
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

const projectEntries = Object.entries(projectsData as Record<string, { title: string; location: string }>);
const memberEntries = Object.values(staffData.members as Record<string, { fullName: string; role: string }>);

export const loader: LoaderFunction = () => {
  const body = `# Whitefire Interior

> Whitefire Interior is an Amsterdam-based interior design studio creating beautiful, functional spaces for homes and businesses — residential and commercial projects across the Netherlands and internationally.

The site is organized as: a home page, an about page, a services overview with detail pages for each service, a projects portfolio with a detail page per project, a blog with articles, a team page with a profile page per designer, plus testimonials, FAQ, and contact pages. This file lists the key pages so agents can navigate the site.

## Services

- [Services overview](${SITE_URL}/services): All services offered by the studio
${serviceSlugs.map((slug) => `- [${slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")}](${SITE_URL}/services/${slug}): Detail page for this service`).join("\n")}

## Projects

- [Projects portfolio](${SITE_URL}/projects): All 18 completed projects
${projectEntries.map(([slug, p]) => `- [${p.title}](${SITE_URL}/projects/${slug})${p.location ? `: ${p.title} project in ${p.location}` : ""}`).join("\n")}

## Blog

- [Blog index](${SITE_URL}/blog): Design inspiration and advice articles
${articles.map((a) => `- [${a.title}](${SITE_URL}/blog/${a.slug}): ${a.excerpt}`).join("\n")}

## Team

- [Our team](${SITE_URL}/team): Meet the studio's designers
${memberEntries.map((m) => `- [${m.fullName}](${SITE_URL}/team/${m.slug}): ${m.role}`).join("\n")}

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