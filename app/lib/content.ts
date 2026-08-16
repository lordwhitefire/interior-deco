// app/lib/content.ts
// Typed GROQ content queries. Every function returns data shaped exactly like
// the shapes the route components consume, so components stay untouched.
import { sanityClient, urlFor } from "./sanity";

function withParams(url: string, w: number, h: number, fit = "crop") {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}w=${w}&h=${h}&fit=${fit}&auto=format&q=85`;
}

function img(source: any, w: number, h: number, fit = "crop") {
  if (!source) return "";
  try {
    return urlFor(source).width(w).height(h).fit(fit as any).url();
  } catch {
    return "";
  }
}

function imgUrl(url: string | undefined, w: number, h: number, fit = "crop") {
  if (!url) return "";
  return withParams(url, w, h, fit);
}

export { img, imgUrl, withParams };

/* ----------  Home  ---------- */

const HOME_SERVICE_ICONS: Record<string, string> = {
  "bedrooms-retreats": "BedDouble",
  "boutique-transitional": "Store",
  "compact-micro-spaces": "Boxes",
  "hospitality-retail": "UtensilsCrossed",
  "kitchens-dining": "ChefHat",
  "living-spaces": "Sofa",
  "minimalist-scandinavian": "Minus",
  workspaces: "Building2",
};

export async function getHomePageData() {
  const [homeDoc, heroDoc, stylishDoc, clientsDoc, testimonialsDoc, servicesDoc, projectsDoc, articlesDoc] =
    await Promise.all([
      sanityClient.fetch(`*[_type == "homePage"][0]`),
      sanityClient.fetch(`*[_type == "hero"][0]{images}`),
      sanityClient.fetch(`*[_type == "stylish"][0]{images}`),
      sanityClient.fetch(`*[_type == "client"] | order(id asc){id, name, logo}`),
      sanityClient.fetch(
        `*[_type == "testimonial"] | order(date desc){_id, clientName, clientLocation, review}`
      ),
      sanityClient.fetch(
        `*[_type == "servicePage"] | order(cardNumber asc){slug, heroTitle, heroDescription, "heroImage": heroImage.asset->url}`
      ),
      sanityClient.fetch(
        `*[_type == "projectPage"] | order(completionDate desc)[0..4] {
          "slug": slug.current, title, location, "thumb": thumbnail.asset->url
        }`
      ),
      sanityClient.fetch(
        `*[_type == "blogArticle"] | order(date desc)[0..2] {
          slug, title, excerpt, date, readTime, categoryName,
          "image": image.asset->url, "imageAlt": image.alt
        }`
      ),
    ]);

  const heroImages: string[] = (heroDoc?.images ?? []).map((image: any) =>
    urlFor(image).url()
  );
  const studioImage: string | null = stylishDoc?.images?.[0]
    ? urlFor(stylishDoc.images[0]).url()
    : null;

  const baseLogos = (clientsDoc ?? []).map((client: any) => ({
    id: String(client.id),
    name: client.name,
    src: urlFor(client.logo).url(),
    alt: client.name,
  }));
  const clientLogos = Array.from({ length: 12 }, (_, index) => {
    const logo = baseLogos[index % baseLogos.length];
    return { ...logo, id: `${logo.id}-${index}` };
  });

  const testimonials = (testimonialsDoc ?? []).slice(0, 6).map((t: any) => ({
    id: t._id,
    quote: t.review ?? "",
    clientName: t.clientName ?? "",
    location: t.clientLocation ?? "",
  }));

  const services = (servicesDoc ?? []).map((s: any, index: number) => ({
    id: s.slug,
    title: s.heroTitle,
    description: s.heroDescription,
    href: `/services/${s.slug}`,
    icon: HOME_SERVICE_ICONS[s.slug] ?? "Armchair",
  }));

  const projects = (projectsDoc ?? []).map((p: any) => ({
    id: p.slug,
    title: p.title,
    location: p.location || "",
    image: {
      src: p.thumb ? imgUrl(p.thumb, 800, 625) : "",
      alt: p.title,
    },
    href: `/projects/${p.slug}`,
  }));

  const articles = (articlesDoc ?? []).map((a: any) => ({
    id: a.slug,
    category: a.categoryName ?? "",
    title: a.title ?? "",
    date: a.date ?? "",
    readTime: a.readTime ?? "",
    image: { src: imgUrl(a.image, 900, 500), alt: a.imageAlt ?? a.title },
    href: `/blog/${a.slug}`,
  }));

  const stats = (homeDoc?.stats ?? []).map((s: any) => ({
    value: s.value ?? "",
    label: s.label ?? "",
    icon: s.icon ?? "Building2",
  }));

  return {
    hero: {
      eyebrow: homeDoc?.heroEyebrow ?? "",
      title: homeDoc?.heroTitle ?? [],
      description: homeDoc?.heroDescription ?? "",
      primaryCta: {
        label: homeDoc?.primaryCtaLabel ?? "",
        href: homeDoc?.primaryCtaHref ?? "",
      },
      showreel: {
        label: homeDoc?.showreelLabel ?? "",
        href: homeDoc?.showreelHref ?? "",
      },
    },
    heroImages,
    studioImage,
    services,
    servicesEyebrow: homeDoc?.servicesEyebrow ?? "",
    servicesTitle: homeDoc?.servicesTitle ?? "",
    studioEyebrow: homeDoc?.studioEyebrow ?? "",
    studioTitle: homeDoc?.studioTitle ?? "",
    studioBody: homeDoc?.studioBody ?? "",
    studioCtaLabel: homeDoc?.studioCtaLabel ?? "",
    studioCtaHref: homeDoc?.studioCtaHref ?? "",
    clientsEyebrow: homeDoc?.clientsEyebrow ?? "",
    clientsTitle: homeDoc?.clientsTitle ?? "",
    brandsEyebrow: homeDoc?.brandsEyebrow ?? "",
    clientLogos,
    testimonials,
    projectsEyebrow: homeDoc?.projectsEyebrow ?? "",
    projectsTitle: homeDoc?.projectsTitle ?? "",
    projectsCtaLabel: homeDoc?.projectsCtaLabel ?? "",
    projects,
    stats,
    articlesEyebrow: homeDoc?.articlesEyebrow ?? "",
    articlesTitle: homeDoc?.articlesTitle ?? "",
    articlesCtaLabel: homeDoc?.articlesCtaLabel ?? "",
    articles,
    metaTitle: homeDoc?.metaTitle ?? "",
    metaDescription: homeDoc?.metaDescription ?? "",
  };
}

function plainText(blocks: any): string {
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((b: any) =>
      b._type === "block" ? (b.children ?? []).map((c: any) => c.text ?? "").join("") : ""
    )
    .join("\n");
}

/* ----------  Services  ---------- */

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export async function getServicesIndexData() {
  const [config, servicesDoc] = await Promise.all([
    sanityClient.fetch(`*[_type == "siteConfig"][0]`),
    sanityClient.fetch(
      `*[_type == "servicePage"] | order(cardNumber asc) {
        slug, heroTitle, heroDescription, cardNumber, cardDescription,
        "heroImage": heroImage.asset->url, "heroImageAlt": heroImageAlt
      }`
    ),
  ]);

  const services: ServiceItem[] = (servicesDoc ?? []).map((s: any) => ({
    id: s.slug,
    number: s.cardNumber ?? "",
    title: s.heroTitle,
    description: s.cardDescription ?? s.heroDescription,
    image: imgUrl(s.heroImage, 900, 600),
    href: `/services/${s.slug}`,
  }));

  return {
    hero: {
      eyebrow: config?.servicesHeroEyebrow ?? "",
      title: config?.servicesHeroTitle ?? "",
      description: config?.servicesHeroDescription ?? "",
      ctaLabel: config?.servicesHeroCtaLabel ?? "",
      ctaHref: config?.servicesHeroCtaHref ?? "",
      image: "",
    },
    intro: {
      eyebrow: config?.servicesIntroEyebrow ?? "",
      title: config?.servicesIntroTitle ?? "",
      description: config?.servicesIntroDescription ?? "",
    },
    cta: {
      image: img(config?.servicesCtaImage, 900, 800),
      imageAlt: "Decorative interior styling with a vase and branches",
    },
    services,
  };
}

export async function getServicePageData(slug: string) {
  const doc = await sanityClient.fetch(
    `*[_type == "servicePage" && slug == $slug][0] {
      slug,
      heroEyebrow, heroTitle, heroDescription,
      "heroImage": heroImage.asset->url, heroImageAlt,
      primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref,
      inclusions, inclusionsImageAlt,
      "inclusionsProject": inclusionsProject->{title, "galleryFirstUrl": gallery[0].asset->url},
      process, galleryHeading, galleryTitle,
      ctaEyebrow, ctaTitle, ctaDescription,
      "ctaImage": ctaImage.asset->url, ctaImageAlt,
      trust,
      "gallery": gallery[]->{
        "slug": slug.current, title, location,
        "thumbUrl": thumbnail.asset->url,
        "galleryFirstUrl": gallery[0].asset->url
      }
    }`,
    { slug }
  );
  if (!doc) return null;

  const gallery = (doc.gallery ?? []).map((p: any) => ({
    title: p.title,
    image: p.thumbUrl ? imgUrl(p.thumbUrl, 900, 700) : "",
    imageAlt: `${p.title}${p.location ? ` — ${p.location}` : ""}`,
    href: `/projects/${p.slug}`,
  }));

  return {
    slug: doc.slug,
    hero: {
      eyebrow: doc.heroEyebrow,
      title: doc.heroTitle,
      description: doc.heroDescription,
      image: imgUrl(doc.heroImage, 1920, 1080),
      imageAlt: doc.heroImageAlt,
      primaryCta: { label: doc.primaryCtaLabel, href: doc.primaryCtaHref },
      secondaryCta: { label: doc.secondaryCtaLabel, href: doc.secondaryCtaHref },
    },
    inclusions: (doc.inclusions ?? []).map((i: any) => ({
      title: i.title,
      description: i.description,
      icon: i.icon,
    })),
    inclusionsProject: doc.inclusionsProject?.slug ?? "",
    inclusionsImage: imgUrl(doc.inclusionsProject?.galleryFirstUrl, 900, 700),
    inclusionsImageAlt: doc.inclusionsImageAlt,
    process: (doc.process ?? []).map((p: any) => ({
      number: p.number,
      title: p.title,
      description: p.description,
      icon: p.icon,
    })),
    gallery,
    galleryHeading: doc.galleryHeading,
    galleryTitle: doc.galleryTitle,
    cta: {
      eyebrow: doc.ctaEyebrow,
      title: doc.ctaTitle,
      description: doc.ctaDescription,
      image: imgUrl(doc.ctaImage, 1920, 1080),
      imageAlt: doc.ctaImageAlt,
    },
    trust: (doc.trust ?? []).map((t: any) => ({
      title: t.title,
      description: t.description,
      icon: t.icon,
    })),
  };
}

export async function getServiceSlugs(): Promise<string[]> {
  const docs = await sanityClient.fetch(`*[_type == "servicePage"]{slug}`);
  return docs.map((d: any) => d.slug);
}

/* ----------  Projects  ---------- */

export async function getProjectsIndexData() {
  const projects = await sanityClient.fetch(
    `*[_type == "projectPage"] {
      "slug": slug.current, title, location, category, completionDate,
      "thumb": thumbnail.asset->url
    } | order(completionDate desc)`
  );

  const heroDoc = await sanityClient.fetch(
    `*[_type == "projectPage" && slug.current == $slug][0] {
      "hero": heroImage.asset->url
    }`,
    { slug: "london-mayfair-townhouse" }
  );

  const cards: {
    slug: string;
    title: string;
    location: string;
    category: string;
    completionDate: string | null;
    image: string;
    imageAlt: string;
  }[] = (projects ?? []).map((p: any) => ({
    slug: p.slug,
    title: p.title,
    location: p.location || "",
    category: p.category || "",
    completionDate: p.completionDate || null,
    image: p.thumb ? imgUrl(p.thumb, 1280, 960) : "",
    imageAlt: `${p.title}${p.location ? ` — ${p.location}` : ""}`,
  }));

  return {
    heroImage: heroDoc?.hero ? imgUrl(heroDoc.hero, 1920, 880) : "",
    heroImageAlt: "London Mayfair Townhouse — premium transitional living room",
    projects: cards,
  };
}

export async function getProjectDetailData(slug: string) {
  const project = await sanityClient.fetch(
    `*[_type == "projectPage" && slug.current == $slug][0] {
      "slug": slug.current, title, location, category, completionDate,
      squareFootage, challenge, solution, process, materials, colorPalette,
      metaTitle, metaDescription,
      "heroImage": heroImage.asset->url, heroImageAlt,
      "thumbnail": thumbnail.asset->url,
      "gallery": gallery[]{"url": asset->url, caption, isFeatured}
    }`,
    { slug }
  );
  if (!project) return null;

  const gallery = [...(project.gallery ?? [])]
    .sort((a: any, b: any) => Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false))
    .slice(0, 5)
    .map((g: any, index: number) => ({
      url: g.url ? imgUrl(g.url, 640, 610) : "",
      caption: g.caption || `Project photo ${index + 1}`,
    }));

  return {
    slug: project.slug,
    title: project.title,
    location: project.location || "",
    category: project.category || "",
    completionDate: project.completionDate ?? null,
    squareFootage: project.squareFootage ?? null,
    challenge: project.challenge || "",
    solution: project.solution || "",
    process: project.process || "",
    materials: project.materials ?? [],
    colorPalette: project.colorPalette ?? [],
    metaTitle: project.metaTitle || "",
    metaDescription: project.metaDescription || "",
    heroImage: project.heroImage ? imgUrl(project.heroImage, 1920, 880) : "",
    heroImageAlt: project.heroImageAlt ?? "",
    storyImage: project.thumbnail ? imgUrl(project.thumbnail, 900, 620) : "",
    gallery,
  };
}

export async function getProjectSlugs(): Promise<string[]> {
  const docs = await sanityClient.fetch(
    `*[_type == "projectPage"]{"slug": slug.current}`
  );
  return docs.map((d: any) => d.slug);
}

/* ----------  Blog  ---------- */

export async function getBlogIndexData() {
  const [config, categoriesDoc, articlesDoc] = await Promise.all([
    sanityClient.fetch(`*[_type == "siteConfig"][0]`),
    sanityClient.fetch(`*[_type == "blogCategory"]{slug, name, count} | order(slug)`),
    sanityClient.fetch(
      `*[_type == "blogArticle"] | order(date desc) {
        slug, title, excerpt, date, readTime, categoryName, categorySlug,
        featured, "image": image.asset->url, "imageAlt": image.alt
      }`
    ),
  ]);

  const categories = [
    { name: "All Articles", slug: "all", count: 24 },
    ...(categoriesDoc ?? []).map((c: any) => ({
      name: c.name,
      slug: c.slug,
      count: c.count ?? 0,
    })),
  ];

  const articles: {
    id: string;
    slug: string;
    category: string;
    categorySlug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    featured: boolean;
    image: { src: string; alt: string };
    href: string;
  }[] = (articlesDoc ?? []).map((a: any) => ({
    id: a.slug,
    slug: a.slug,
    category: a.categoryName ?? "",
    categorySlug: a.categorySlug ?? "",
    title: a.title ?? "",
    excerpt: a.excerpt ?? "",
    date: a.date ?? "",
    readTime: a.readTime ?? "",
    featured: Boolean(a.featured),
    image: { src: imgUrl(a.image, 900, 500), alt: a.imageAlt ?? a.title },
    href: `/blog/${a.slug}`,
  }));

  return {
    blogHero: {
      src: img(config?.blogHeroImage, 1920, 1080),
      alt: config?.blogHeroAlt ?? "",
    },
    philosophy: {
      eyebrow: config?.philosophyEyebrow ?? "",
      title: config?.philosophyTitle ?? "",
      body: config?.philosophyBody ?? "",
      href: config?.philosophyHref ?? "/about",
      image: {
        src: img(config?.philosophyImage, 1280, 800),
        alt: config?.philosophyImageAlt ?? "",
      },
    },
    categories,
    articles,
    featuredArticle: articles.find((a: any) => a.featured) ?? articles[0] ?? null,
  };
}

export async function getBlogArticleData(slug: string) {
  const article = await sanityClient.fetch(
    `*[_type == "blogArticle" && slug == $slug][0] {
      slug, title, excerpt, date, readTime, categoryName, categorySlug, featured,
      "image": { "url": image.asset->url, alt },
      "heroImage": { "url": heroImage.asset->url, alt },
      "leadImage": { "url": leadImage.asset->url, alt },
      intro,
      "sections": sections[]{
        number, title, paragraphs,
        "images": [{ "url": asset->url, alt }]
      },
      metaTitle, metaDescription
    }`,
    { slug }
  );
  if (!article) return null;

  const toBlogImage = (i: any) =>
    i?.url ? { src: imgUrl(i.url, 1600, 900), alt: i.alt ?? "" } : null;

  const transformed = {
    ...article,
    image: toBlogImage(article.image),
    heroImage: toBlogImage(article.heroImage),
    leadImage: toBlogImage(article.leadImage),
    sections: (article.sections ?? []).map((s: any) => ({
      number: s.number,
      title: s.title,
      paragraphs: s.paragraphs ?? [],
      images: (s.images ?? []).map((i: any) => ({
        src: imgUrl(i.url, 1200, 800),
        alt: i.alt ?? "",
      })),
    })),
  };

  const posts = await sanityClient.fetch(
    `*[_type == "blogArticle"] | order(date desc) {
      slug, title, date, "image": image.asset->url
    }`
  );
  const index = posts.findIndex((a: any) => a.slug === slug);
  const prev =
    posts[(index - 1 + posts.length) % posts.length] ?? null;
  const next = posts[(index + 1) % posts.length] ?? null;
  const toPost = (a: any) =>
    a ? { slug: a.slug, title: a.title, date: a.date, image: { src: imgUrl(a.image, 700, 420), alt: a.title } } : null;

  return {
    article: transformed,
    previousPost: toPost(prev),
    nextPost: toPost(next),
  };
}

export async function getBlogSlugs(): Promise<string[]> {
  const docs = await sanityClient.fetch(`*[_type == "blogArticle"]{slug}`);
  return docs.map((d: any) => d.slug);
}

export async function getBlogCategories() {
  return sanityClient.fetch(
    `*[_type == "blogCategory"]{slug, name, count} | order(slug)`
  );
}

export async function getBlogRecentPosts(limit = 3) {
  const docs = await sanityClient.fetch(
    `*[_type == "blogArticle"] | order(date desc)[0..$limit] {
      slug, title, date, "image": image.asset->url
    }`,
    { limit: limit - 1 }
  );
  return (docs ?? []).map((a: any) => ({
    slug: a.slug,
    title: a.title,
    date: a.date,
    image: { src: imgUrl(a.image, 700, 420), alt: a.title },
  }));
}

/* ----------  Team  ---------- */

export async function getTeamIndexData() {
  const [teamDoc, membersDoc] = await Promise.all([
    sanityClient.fetch(`*[_type == "teamPage"][0]`),
    sanityClient.fetch(
      `*[_type == "staff"] | order(order asc) {
        "slug": slug.current, fullName, role, order, featured, bio,
        "photoUrl": photo.asset->url, social
      }`
    ),
  ]);

  return {
    heroImage: img(teamDoc?.heroImage, 1920, 1080),
    heroImageAlt: teamDoc?.heroImageAlt ?? "",
    intro: {
      eyebrow: teamDoc?.introEyebrow ?? "",
      title: teamDoc?.introTitle ?? "",
      description: teamDoc?.introDescription ?? "",
    },
    values: (teamDoc?.values ?? []).map((v: any) => ({
      id: v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: v.title,
      description: v.description,
      icon: v.icon,
    })),
    shownMembers: (
      membersDoc as { slug: string; fullName: string; role: string; order: number; featured: boolean; bio: string; photoUrl: string; social?: { platform: string; url: string }[] }[]
    )
      .filter((m) => m.order <= 5)
      .map((m) => ({ ...m, bio: plainText(m.bio), photoUrl: m.photoUrl ?? "" })),
    projectCta: {
      eyebrow: teamDoc?.projectCtaEyebrow ?? "",
      title: teamDoc?.projectCtaTitle ?? "",
      description: teamDoc?.projectCtaDescription ?? "",
      image: img(teamDoc?.projectCtaImage, 1920, 1080),
      imageAlt: teamDoc?.projectCtaImageAlt ?? "",
      buttonLabel: teamDoc?.projectCtaLabel ?? "",
      buttonHref: teamDoc?.projectCtaHref ?? "",
    },
    metaTitle: teamDoc?.metaTitle ?? "",
    metaDescription: teamDoc?.metaDescription ?? "",
  };
}

export async function getTeamMemberData(slug: string) {
  const [teamDoc, members] = await Promise.all([
    sanityClient.fetch(`*[_type == "teamPage"][0]`),
    sanityClient.fetch(
      `*[_type == "staff"] | order(order asc) {
        "slug": slug.current, fullName, role, order, featured, bio, metaTitle, metaDescription,
        "photoUrl": photo.asset->url, social,
        "heroImage": { "url": heroImage.asset->url, alt },
        "featuredProjects": featuredProjects[]->{
          "slug": slug.current, title, location, "image": thumbnail.asset->url
        }
      }`
    ),
  ]);

  const index = members.findIndex((m: any) => m.slug === slug);
  if (index === -1) return null;

  const member = members[index];
  const previous = members[(index - 1 + members.length) % members.length];
  const next = members[(index + 1) % members.length];

  const withProjectImages = (m: any) => ({
    ...m,
    bio: plainText(m.bio),
    photoUrl: m.photoUrl ?? "",
    heroImage: m.heroImage?.url
      ? { src: imgUrl(m.heroImage.url, 1920, 1080), alt: m.heroImage.alt ?? "" }
      : null,
    featuredProjects: (m.featuredProjects ?? []).map((p: any) => ({
      slug: p.slug,
      title: p.title,
      location: p.location,
      image: p.image ? imgUrl(p.image, 1280, 720) : "",
      imageAlt: `${p.title} interior — featured photograph`,
      href: `/projects/${p.slug}`,
    })),
  });

  return {
    member: withProjectImages(member),
    previous: withProjectImages(previous),
    next: withProjectImages(next),
    profileFixture: {
      headline: teamDoc?.profileHeadline ?? "",
      paragraphs: teamDoc?.profileParagraphs ?? [],
      facts: (teamDoc?.profileFacts ?? []).map((f: any) => ({
        key: f.key,
        label: f.label,
        values: f.values ?? [],
        icon: f.icon,
      })),
    },
    approachFixture: {
      headline: teamDoc?.approachHeadline ?? "",
      description: teamDoc?.approachDescription ?? "",
      steps: (teamDoc?.approachSteps ?? []).map((s: any) => ({
        id: s.title.toLowerCase(),
        title: s.title,
        description: s.description,
        icon: s.icon,
      })),
    },
    consultationCta: {
      eyebrow: teamDoc?.consultationEyebrow ?? "",
      headline: teamDoc?.consultationTitle ?? "",
      description: teamDoc?.consultationDescription ?? "",
      image: { src: img(teamDoc?.consultationImage, 1920, 1080), alt: teamDoc?.consultationImageAlt ?? "" },
      buttonLabel: teamDoc?.consultationLabel ?? "",
      buttonHref: teamDoc?.consultationHref ?? "",
    },
  };
}

export async function getStaffSlugs(): Promise<string[]> {
  const docs = await sanityClient.fetch(`*[_type == "staff"]{"slug": slug.current}`);
  return docs.map((d: any) => d.slug);
}

/* ----------  Static pages  ---------- */

export async function getAboutPageData() {
  const doc = await sanityClient.fetch(`*[_type == "aboutPage"][0]`);
  if (!doc) return null;

  return {
    hero: {
      eyebrow: doc.heroEyebrow,
      title: doc.heroTitle,
      description: doc.heroDescription,
      ctaLabel: doc.heroCtaLabel,
      ctaHref: doc.heroCtaHref,
      image: { src: img(doc.heroImage, 1920, 1080), alt: doc.heroImageAlt },
    },
    story: {
      eyebrow: doc.storyEyebrow,
      title: doc.storyTitle,
      paragraphs: doc.storyParagraphs ?? [],
      image: { src: img(doc.storyImage, 900, 700), alt: doc.storyImageAlt },
    },
    values: {
      eyebrow: doc.valuesEyebrow,
      items: (doc.values ?? []).map((v: any) => ({
        id: v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: v.title,
        description: v.description,
        icon: v.icon,
      })),
    },
    approach: {
      eyebrow: doc.approachEyebrow,
      title: doc.approachTitle,
      description: doc.approachDescription,
      image: { src: img(doc.approachImage, 900, 700), alt: doc.approachImageAlt },
      steps: (doc.approachSteps ?? []).map((s: any) => ({
        id: s.title.toLowerCase(),
        title: s.title,
        description: s.description,
      })),
    },
    closingCta: {
      eyebrow: doc.closingEyebrow,
      title: doc.closingTitle,
      description: doc.closingDescription,
      ctaLabel: doc.closingCtaLabel,
      ctaHref: doc.closingCtaHref,
      image: { src: img(doc.closingImage, 1920, 1080), alt: doc.closingImageAlt },
    },
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
  };
}

export async function getContactPageData() {
  const doc = await sanityClient.fetch(`*[_type == "contactPage"][0]`);
  if (!doc) return null;

  return {
    hero: {
      eyebrow: doc.heroEyebrow,
      title: doc.heroTitle ?? [],
      description: doc.heroDescription,
      image: { src: img(doc.heroImage, 1920, 1080), alt: doc.heroImageAlt },
    },
    info: {
      eyebrow: doc.infoEyebrow,
      title: doc.infoTitle,
      description: doc.infoDescription,
      addressLines: doc.addressLines ?? [],
      phone: doc.phone ?? "",
      email: doc.email ?? "",
      hoursLines: doc.hoursLines ?? [],
      mapEmbedUrl: doc.mapEmbedUrl ?? "",
    },
    workWithUs: {
      eyebrow: doc.workEyebrow,
      title: doc.workTitle,
      description: doc.workDescription,
      ctaLabel: doc.workCtaLabel,
    },
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
  };
}

export async function getTestimonialsPageData() {
  const [pageDoc, testimonialsDoc, projectsDoc] = await Promise.all([
    sanityClient.fetch(`*[_type == "testimonialsPage"][0]`),
    sanityClient.fetch(
      `*[_type == "testimonial"] | order(date desc) {
        _id, clientName, clientLocation, rating, review, date,
        "clientImage": clientImage.asset->url
      }`
    ),
    sanityClient.fetch(
      `*[_type == "projectPage"]{"slug": slug.current, title, location}`
    ),
  ]);

  const projectsByLocation = new Map<string, { slug: string; title: string }>();
  for (const p of projectsDoc ?? []) {
    projectsByLocation.set((p.location ?? "").toLowerCase(), p);
  }

  const testimonials = (testimonialsDoc ?? []).slice(0, 6).map((t: any) => {
    const project = projectsByLocation.get((t.clientLocation ?? "").toLowerCase());
    return {
      id: t._id,
      quote: t.review ?? "",
      clientName: t.clientName ?? "",
      projectName: project?.title ?? "",
      location: t.clientLocation ?? "",
      clientImage: t.clientImage ? imgUrl(t.clientImage, 100, 100) : undefined,
      clientImageAlt: `Portrait of ${t.clientName ?? "client"}`,
      projectSlug: project?.slug,
    };
  });

  const stats = (pageDoc?.stats ?? []).map((s: any) => ({
    id: s.title ? s.title.toLowerCase().replace(/\s+/g, "-") : s.icon,
    value: s.value ?? "",
    label: s.label ?? "",
    icon: s.icon ?? "star",
  }));

  return {
    hero: {
      eyebrow: pageDoc?.heroEyebrow ?? "",
      title: pageDoc?.heroTitle ?? [],
      description: pageDoc?.heroDescription ?? "",
      image: { src: img(pageDoc?.heroImage, 1920, 1080), alt: pageDoc?.heroImageAlt ?? "" },
    },
    intro: {
      eyebrow: pageDoc?.introEyebrow ?? "",
      title: pageDoc?.introTitle ?? "",
      description: pageDoc?.introDescription ?? "",
    },
    testimonials,
    stats,
    cta: {
      eyebrow: pageDoc?.ctaEyebrow ?? "",
      title: pageDoc?.ctaTitle ?? "",
      description: pageDoc?.ctaDescription ?? "",
      ctaLabel: pageDoc?.ctaLabel ?? "",
      ctaHref: pageDoc?.ctaHref ?? "",
      image: { src: img(pageDoc?.ctaImage, 1920, 1080), alt: pageDoc?.ctaImageAlt ?? "" },
    },
    metaTitle: pageDoc?.metaTitle ?? "",
    metaDescription: pageDoc?.metaDescription ?? "",
  };
}

/* ----------  FAQ  ---------- */

export async function getFaqPageData() {
  const [faqDoc, categoriesDoc, itemsDoc] = await Promise.all([
    sanityClient.fetch(`*[_type == "faqPage"][0]`),
    sanityClient.fetch(
      `*[_type == "faqCategory"] | order(displayOrder asc){_id, title}`
    ),
    sanityClient.fetch(
      `*[_type == "faqItem"] | order(displayOrder asc){
        _id, question, answer, "categoryTitle": category->title
      }`
    ),
  ]);

  const categories: { _id: string; title: string }[] = (categoriesDoc ?? []).map((c: any) => ({
    _id: c._id,
    title: c.title,
  }));

  const items: { _id: string; question: string; answer: string; category: string }[] = (
    itemsDoc ?? []
  ).map((i: any) => ({
    _id: i._id,
    question: i.question,
    answer: i.answer,
    category: i.categoryTitle ?? "General Questions",
  }));

  return {
    page: {
      title: faqDoc?.title ?? "",
      heroHeadline: faqDoc?.heroHeadline ?? "",
      heroImage: img(faqDoc?.heroBackgroundImage, 1920, 1080),
      heroImageAlt: "Whitefire Interior studio — frequently asked questions",
      generalFaqsTitle: faqDoc?.generalFaqsTitle ?? "",
      projectFaqsTitle: faqDoc?.projectFaqsTitle ?? "",
      sidebarImage: img(faqDoc?.sidebarImage, 900, 1100),
      sidebarImageAlt: faqDoc?.sidebarImageAlt ?? "",
      ctaImage: img(faqDoc?.ctaImage, 1920, 1080),
      ctaImageAlt: faqDoc?.ctaImageAlt ?? "",
      seoTitle: faqDoc?.seoTitle ?? "",
      seoDescription: faqDoc?.seoDescription ?? "",
    },
    categories,
    items,
  };
}

/* ----------  Site-wide  ---------- */

export async function getSiteConfig() {
  return sanityClient.fetch(`*[_type == "siteConfig"][0]`);
}
