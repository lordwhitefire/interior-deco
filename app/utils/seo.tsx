import type { MetaDescriptor } from "@remix-run/node";

export const SITE_URL = "https://interior-deco-kappa.vercel.app";

export const CREATOR = {
  name: "Makuo Ifedike",
  email: "mifedike@gmail.com",
  linkedin: "https://www.linkedin.com/in/makuo-ifedike-216607350/",
};

export const absoluteUrl = (path: string) =>
  path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const imageAbsolute = (src: string) =>
  src.startsWith("http") ? src : absoluteUrl(src);

interface SeoArgs {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
}

export const seo = ({
  title,
  description,
  path,
  image,
  type = "website",
}: SeoArgs): MetaDescriptor[] => {
  const url = absoluteUrl(path);
  const img = image ? imageAbsolute(image) : undefined;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "Whitefire Interior" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    ...(img ? [{ property: "og:image", content: img }] : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    ...(img ? [{ name: "twitter:image", content: img }] : []),
  ];
};

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}