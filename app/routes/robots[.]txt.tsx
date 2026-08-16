import type { LoaderFunction } from "@remix-run/node";
import { SITE_URL } from "~/utils/seo";

export const loader: LoaderFunction = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};