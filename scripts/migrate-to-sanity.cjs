#!/usr/bin/env node
// Migrates ALL local content and images into the Sanity production dataset:
//  - uploads 12 local images (8 service heroes + 4 about)
//  - creates servicePage x8, blogArticle x6, blogCategory x6, homePage,
//    aboutPage, contactPage, testimonialsPage, teamPage, siteConfig
//  - deletes ~84 legacy docs of 24 unused types (keeps all images + used types)
// Idempotent: skips docs that already exist (matched by _type + slug).
"use strict";

const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

const ROOT = path.resolve(__dirname, "..");
const DATA = (...parts) => path.join(ROOT, "app", "data", ...parts);

const env = fs.readFileSync(path.join(ROOT, ".env"), "utf8");
const tokenMatch = env.match(/^SANITY_API_WRITE_TOKEN=(.+)$/m);
if (!tokenMatch) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env");
  process.exit(1);
}

const client = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-12-01",
  token: tokenMatch[1].trim(),
  useCdn: false,
});

const LEGACY_TYPES = [
  "blogCard", "blogDetail", "article", "author", "tag", "category",
  "aiAnswer", "project", "service", "serviceCard", "latestNews", "blogPage",
  "join", "siteSettings", "contactInfo", "successStats", "testimonials",
  "banner", "howWeWork", "comment", "session",
];

const KEEP_TYPES = [
  "sanity.imageAsset", "projectPage", "testimonial", "faqPage", "faqCategory",
  "faqItem", "hero", "stylish", "client", "staff",
];

const ASSETS_DIR = path.join(ROOT, "app", "assets", "images");

function urlToAssetRef(url) {
  // https://cdn.sanity.io/images/{projectId}/{dataset}/{assetId}-{w}x{h}.{ext}?...
  const m = url && url.match(/production\/([a-f0-9]+)-(\d+)x(\d+)\.\w+/);
  if (!m) throw new Error(`Cannot parse asset from URL: ${url}`);
  return `image-${m[1]}-${m[2]}x${m[3]}`;
}

const assetRefCache = new Map();
let existingAssetIds = new Set();

async function loadAssetIds() {
  const docs = await client.fetch(`*[_type == "sanity.imageAsset"]{_id}`);
  existingAssetIds = new Set(docs.map((d) => d._id));
  console.log(`  ${existingAssetIds.size} existing image assets`);
}

async function assetRefForUrl(url) {
  if (!url) return null;
  if (assetRefCache.has(url)) return assetRefCache.get(url);
  const derived = urlToAssetRef(url);
  if (existingAssetIds.has(derived)) {
    assetRefCache.set(url, derived);
    return derived;
  }
  // Asset is referenced by URL but missing from the dataset — download and upload it.
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const basename = url.split("/").pop().split("?")[0];
  const asset = await client.assets.upload("image", buf, {
    filename: basename,
  });
  existingAssetIds.add(asset._id);
  assetRefCache.set(url, asset._id);
  console.log(`  uploaded missing asset ${asset._id} <- ${url}`);
  return asset._id;
}

const uploadedRefs = new Map();
async function uploadLocal(fileName) {
  if (uploadedRefs.has(fileName)) return uploadedRefs.get(fileName);
  const filePath = path.join(ASSETS_DIR, fileName);
  if (!fs.existsSync(filePath)) throw new Error(`Missing local image: ${fileName}`);
  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(filePath),
    { filename: fileName }
  );
  uploadedRefs.set(fileName, asset._id);
  console.log(`  uploaded ${fileName} -> ${asset._id}`);
  return asset._id;
}

async function fetchExistingBySlug(type) {
  const docs = await client.fetch(
    `*[_type == $type && !(_id in path("drafts.**"))]{_id, slug}`,
    { type }
  );
  const map = new Map();
  for (const d of docs) {
    const slug = typeof d.slug === "string" ? d.slug : d.slug?.current;
    if (slug) map.set(slug, d._id);
  }
  return map;
}

async function fetchAll(type, projection) {
  return client.fetch(`*[_type == $type && !(_id in path("drafts.**"))]{${projection}}`, {
    type,
  });
}

async function createIfMissing(type, slug, doc) {
  const existing = await fetchExistingBySlug(type);
  if (existing.has(slug)) {
    console.log(`  skip ${type} "${slug}" (exists: ${existing.get(slug)})`);
    return existing.get(slug);
  }
  const created = await client.create(doc);
  await sleep(120);
  console.log(`  created ${type} "${slug}" -> ${created._id}`);
  return created._id;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log("== Phase 0: project pages (slug -> _id) ==");
  const projectPages = await fetchAll("projectPage", '_id, "slug": slug.current');
  const projectIdBySlug = new Map(projectPages.map((p) => [p.slug, p._id]));
  console.log(`  ${projectPages.length} projectPage docs`);

  console.log("== Phase 1: upload local images ==");
  await loadAssetIds();
  const serviceFiles = fs.readdirSync(DATA("services")).filter((f) => f.endsWith(".json"));
  const heroImages = {};
  for (const f of serviceFiles) {
    const data = JSON.parse(fs.readFileSync(DATA("services", f), "utf8"));
    heroImages[data.slug] = await uploadLocal(data.hero.image);
  }
  const aboutImages = {
    hero: await uploadLocal("about_hero_dark_living_room_fireplace.jpg"),
    story: await uploadLocal("about_story_console_vase_dome_lamp.jpg"),
    approach: await uploadLocal("about_approach_three_designers_worktable.jpg"),
    closing: await uploadLocal("about_closing_dark_banner_table_vase.jpg"),
  };
  console.log("  uploads done");

  console.log("== Phase 2: servicePage x8 ==");
  for (const f of serviceFiles) {
    const s = JSON.parse(fs.readFileSync(DATA("services", f), "utf8"));
    const projectIds = s.gallery
      .map((g) => projectIdBySlug.get(g.project))
      .filter(Boolean);
    const doc = {
      _type: "servicePage",
      slug: s.slug,
      title: s.hero.title,
      heroEyebrow: s.hero.eyebrow,
      heroTitle: s.hero.title,
      heroDescription: s.hero.description,
      heroImage: { _type: "image", asset: { _ref: heroImages[s.slug] } },
      heroImageAlt: s.hero.imageAlt,
      primaryCtaLabel: s.hero.primaryCta.label,
      primaryCtaHref: s.hero.primaryCta.href,
      secondaryCtaLabel: s.hero.secondaryCta.label,
      secondaryCtaHref: s.hero.secondaryCta.href,
      inclusions: s.inclusions.map((i) => ({
        _key: i.icon ?? i.title.toLowerCase().replace(/\s+/g, "-"),
        title: i.title,
        description: i.description,
        icon: i.icon,
      })),
      inclusionsProject: projectIdBySlug.get(s.inclusionsProject) ?? null,
      inclusionsImageAlt: s.inclusionsImageAlt,
      process: s.process.map((p) => ({
        _key: p.number,
        number: p.number,
        title: p.title,
        description: p.description,
        icon: p.icon,
      })),
      gallery: projectIds.map((id) => ({ _type: "reference", _ref: id })),
      galleryHeading: s.galleryHeading,
      galleryTitle: s.galleryTitle,
      ctaEyebrow: s.cta.eyebrow,
      ctaTitle: s.cta.title,
      ctaDescription: s.cta.description,
      ctaImage: { _type: "image", asset: { _ref: aboutImages.closing } },
      ctaImageAlt: s.cta.imageAlt || "Whitefire Interior studio — consultation",
      trust: s.trust.map((t) => ({
        _key: t.icon,
        title: t.title,
        description: t.description,
        icon: t.icon,
      })),
      metaTitle: s.hero.title,
      metaDescription: s.hero.description,
    };
    await createIfMissing("servicePage", s.slug, doc);
  }

  console.log("== Phase 3: blogCategory x6 ==");
  const meta = JSON.parse(fs.readFileSync(DATA("blogs", "meta.json"), "utf8"));
  const realCategories = meta.categories.filter((c) => c.slug !== "all");
  for (const c of realCategories) {
    await createIfMissing("blogCategory", c.slug, {
      _type: "blogCategory",
      slug: c.slug,
      name: c.name,
      count: c.count,
    });
  }

  console.log("== Phase 4: blogArticle x6 ==");
  const blogFiles = fs
    .readdirSync(DATA("blogs"))
    .filter((f) => f.endsWith(".json") && f !== "meta.json");
  for (const f of blogFiles) {
    const a = JSON.parse(fs.readFileSync(DATA("blogs", f), "utf8"));
    const toImg = async (img) =>
      img
        ? {
            _type: "image",
            asset: { _ref: await assetRefForUrl(img.src) },
            alt: img.alt,
          }
        : null;
    const doc = {
      _type: "blogArticle",
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      date: a.date,
      readTime: a.readTime,
      categoryName: a.category,
      categorySlug: a.categorySlug,
      featured: Boolean(a.featured),
      image: await toImg(a.image),
      heroImage: await toImg(a.heroImage),
      leadImage: await toImg(a.leadImage),
      intro: a.intro,
      sections: await Promise.all(
        a.sections.map(async (sec) => ({
          _key: String(sec.number),
          number: sec.number,
          title: sec.title,
          paragraphs: sec.paragraphs ?? [],
          images: (sec.images ?? []).length
            ? await Promise.all((sec.images ?? []).map(toImg))
            : [],
        }))
      ),
      metaTitle: a.title,
      metaDescription: a.excerpt,
    };
    await createIfMissing("blogArticle", a.slug, doc);
  }

  console.log("== Phase 5: singleton pages ==");
  const sitepages = JSON.parse(fs.readFileSync(DATA("sitepages.json"), "utf8"));
  const staff = JSON.parse(fs.readFileSync(DATA("team", "staff.json"), "utf8"));

  await createIfMissing("siteConfig", "site-config", {
    _type: "siteConfig",
    slug: "site-config",
    newsletterEyebrow: "JOIN OUR COMMUNITY",
    newsletterTitle: "Design Inspiration Straight to Your Inbox",
    newsletterBody:
      "Get the latest trends, project updates and exclusive design tips delivered to your inbox.",
    newsletterPrivacyNote: "We respect your privacy. Unsubscribe anytime.",
    socialLinks: [
      { _key: "instagram", platform: "Instagram", url: "#" },
      { _key: "pinterest", platform: "Pinterest", url: "#" },
      { _key: "linkedin", platform: "LinkedIn", url: "#" },
    ],
  });

  await createIfMissing("homePage", "home", {
    _type: "homePage",
    slug: "home",
    heroEyebrow: "LUXURY INTERIOR DESIGN STUDIO",
    heroTitle: ["Designing Spaces.", "Elevating Lives."],
    heroDescription:
      "We create timeless, functional and beautiful spaces that reflect who you are.",
    primaryCtaLabel: "VIEW OUR PROJECTS",
    primaryCtaHref: "/projects",
    showreelLabel: "PLAY SHOWREEL",
    showreelHref: "#showreel",
    servicesEyebrow: "WHAT WE DO",
    servicesTitle: "Comprehensive Interior Design Services",
    studioEyebrow: "STYLISH SPACES",
    studioTitle: "Where Aesthetics Meet Function",
    studioBody:
      "We believe that great design is more than beautiful spaces. It's about creating environments that inspire, support, and elevate everyday living.",
    studioCtaLabel: "About Our Studio",
    studioCtaHref: "/about",
    clientsEyebrow: "CLIENTS LOVE US",
    clientsTitle: "What Our Clients Are Saying",
    brandsEyebrow: "TRUSTED BY LEADING BRANDS",
    projectsEyebrow: "FEATURED PROJECTS",
    projectsTitle: "Spaces We're Proud Of",
    projectsCtaLabel: "View All Projects",
    articlesEyebrow: "INSIGHTS & IDEAS",
    articlesTitle: "Latest Articles",
    articlesCtaLabel: "View All Articles",
    stats: [
      { _key: "projects", value: "350+", label: "Projects Completed", icon: "Building2" },
      { _key: "satisfaction", value: "98%", label: "Client Satisfaction", icon: "BadgeCheck" },
      { _key: "experience", value: "12+", label: "Years of Experience", icon: "Award" },
      { _key: "awards", value: "20+", label: "Design Awards", icon: "Trophy" },
    ],
    metaTitle: "Whitefire Interior — Amsterdam Interior Design Studio",
    metaDescription:
      "Whitefire Interior — an Amsterdam interior design studio creating beautiful, functional spaces for homes and businesses.",
  });

  await createIfMissing("aboutPage", "about", {
    _type: "aboutPage",
    slug: "about",
    heroEyebrow: "ABOUT WHITEFIRE INTERIOR",
    heroTitle: "Thoughtful Design. Meaningful Spaces.",
    heroDescription:
      "Whitefire Interior is a luxury interior design studio dedicated to creating timeless, functional spaces that elevate everyday living.",
    heroCtaLabel: "OUR APPROACH",
    heroCtaHref: "#our-approach",
    heroImage: { _type: "image", asset: { _ref: aboutImages.hero } },
    heroImageAlt:
      "Warm luxury living room with dark wood cabinetry, fireplace, neutral seating and greenery.",
    storyEyebrow: "OUR STORY",
    storyTitle: "Designing with Purpose, Delivering with Passion.",
    storyParagraphs: [
      "Founded with a passion for artistry and a commitment to excellence, Whitefire Interior has completed projects across residential, commercial, and hospitality spaces.",
      "We believe good design goes beyond aesthetics—it’s about how a space makes you feel and supports how you live and work.",
    ],
    storyImage: { _type: "image", asset: { _ref: aboutImages.story } },
    storyImageAlt:
      "Sophisticated interior console with vase, greenery, lamp and architectural artwork.",
    valuesEyebrow: "OUR VALUES",
    values: [
      {
        _key: "timeless-design",
        title: "Timeless Design",
        description:
          "We create enduring spaces that stand the test of time in both style and quality.",
        icon: "timeless",
      },
      {
        _key: "sustainability",
        title: "Sustainability",
        description:
          "We prioritize responsible choices and sustainable materials wherever possible.",
        icon: "sustainability",
      },
      {
        _key: "client-centered",
        title: "Client-Centered",
        description: "Your vision is our guide. We listen, collaborate, and bring your ideas to life.",
        icon: "client",
      },
      {
        _key: "excellence",
        title: "Excellence",
        description: "We are committed to the highest standards in every detail of our work.",
        icon: "excellence",
      },
    ],
    approachEyebrow: "OUR APPROACH",
    approachTitle: "A Collaborative Journey from Concept to Creation",
    approachDescription:
      "Our process is immersive and tailored to each client. From the initial consultation to the final reveal, we ensure a seamless experience and exceptional results.",
    approachImage: { _type: "image", asset: { _ref: aboutImages.approach } },
    approachImageAlt:
      "Three interior designers collaborating over plans and material samples at a design studio table.",
    approachSteps: [
      { _key: "discover", title: "Discover", description: "Understanding your needs and vision" },
      { _key: "design", title: "Design", description: "Curating concepts and material palettes" },
      { _key: "develop", title: "Develop", description: "Bringing ideas to life with precision" },
      { _key: "deliver", title: "Deliver", description: "Flawless execution and final installation" },
    ],
    closingEyebrow: "LET’S CREATE SOMETHING BEAUTIFUL",
    closingTitle: "Ready to Start Your Project?",
    closingDescription:
      "We’d love to hear about your vision and help you create a space that inspires.",
    closingCtaLabel: "GET IN TOUCH",
    closingCtaHref: "/contact",
    closingImage: { _type: "image", asset: { _ref: aboutImages.closing } },
    closingImageAlt: "Dark luxury interior with round table, vase, artwork and neutral seating.",
    metaTitle: "About | Whitefire Interior",
    metaDescription:
      "Discover Whitefire Interior, a luxury interior design studio creating timeless, functional spaces with thoughtful design and exceptional craftsmanship.",
  });

  await createIfMissing("contactPage", "contact", {
    _type: "contactPage",
    slug: "contact",
    heroEyebrow: "LET'S CREATE SOMETHING EXTRAORDINARY",
    heroTitle: ["We'd Love to Hear", "From You"],
    heroDescription:
      "Whether you're dreaming of a full home renovation or a single-room refresh, our team is ready to bring your vision to life.",
    heroImage: {
      _type: "image",
      asset: { _ref: await assetRefForUrl(sitepages.contact.hero.src) },
    },
    heroImageAlt: sitepages.contact.hero.alt,
    infoEyebrow: "CONTACT INFORMATION",
    infoTitle: "Let's Connect",
    infoDescription:
      "We're here to help. Reach out through any of the channels below and let's start creating something beautiful together.",
    addressLines: ["101 Prinsengracht, Suite 3A", "1016 EA Amsterdam, Netherlands"],
    phone: "+31 20 8765 4321",
    email: "hello@whitefireinterior.com",
    hoursLines: [
      "Monday – Friday: 9:00 AM – 6:00 PM",
      "Saturday: By Appointment",
      "Sunday: Closed",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps?q=101+Prinsengracht,+Amsterdam,+Netherlands&z=15&output=embed",
    workEyebrow: "WORK WITH US",
    workTitle: "Have a Project in Mind?",
    workDescription:
      "From concept to completion, we partner with you to create spaces that reflect your style and elevate your everyday.",
    workCtaLabel: "SCHEDULE A CONSULTATION",
    workCtaImage: {
      _type: "image",
      asset: { _ref: await assetRefForUrl(sitepages.contact.cta.src) },
    },
    workCtaImageAlt: sitepages.contact.cta.alt,
    metaTitle: "Contact | Whitefire Interior",
    metaDescription:
      "Get in touch with Whitefire Interior in Amsterdam. Schedule a consultation for your residential or commercial interior design project.",
  });

  await createIfMissing("testimonialsPage", "testimonials", {
    _type: "testimonialsPage",
    slug: "testimonials",
    heroEyebrow: "TESTIMONIALS",
    heroTitle: ["Kind Words.", "Beautiful Spaces."],
    heroDescription:
      "We're honored to work with incredible clients and bring their visions to life.",
    heroImage: {
      _type: "image",
      asset: { _ref: await assetRefForUrl(sitepages.testimonials.hero.src) },
    },
    heroImageAlt: sitepages.testimonials.hero.alt,
    introEyebrow: "CLIENT TESTIMONIALS",
    introTitle: "What Our Clients Say",
    introDescription:
      "From concept to completion, we're passionate about creating spaces that reflect our clients' stories and elevate their everyday.",
    ctaEyebrow: "READY TO CREATE YOUR OWN STORY?",
    ctaTitle: "Let's Design Something Beautiful",
    ctaDescription:
      "We'd love to hear about your project and help bring your vision to life.",
    ctaLabel: "SCHEDULE A CONSULTATION",
    ctaHref: "/contact",
    ctaImage: {
      _type: "image",
      asset: { _ref: await assetRefForUrl(sitepages.testimonials.cta.src) },
    },
    ctaImageAlt: sitepages.testimonials.cta.alt,
    stats: [
      { _key: "projects", value: "18+", label: "Projects Completed", icon: "armchair" },
      { _key: "clients", value: "18+", label: "Happy Clients", icon: "users" },
      { _key: "rating", value: "5/5", label: "Average Rating", icon: "star" },
      { _key: "experience", value: "8", label: "Team Members", icon: "calendar" },
    ],
    metaTitle: "Testimonials | Whitefire Interior",
    metaDescription:
      "Discover what Whitefire Interior clients say about their interior design projects and experiences.",
  });

  await createIfMissing("teamPage", "team", {
    _type: "teamPage",
    slug: "team",
    heroImage: {
      _type: "image",
      asset: { _ref: await assetRefForUrl(staff.teamHero.src) },
    },
    heroImageAlt: staff.teamHero.alt,
    introEyebrow: "MEET THE TEAM",
    introTitle: "Expertise. Creativity. Collaboration.",
    introDescription:
      "We believe great design is the result of collaboration, curiosity, and attention to detail. Get to know the talented individuals who bring our vision to life.",
    values: [
      {
        _key: "client-centered",
        title: "Client-Centered",
        description:
          "We listen, collaborate, and tailor every project to your lifestyle and needs.",
        icon: "users-round",
      },
      {
        _key: "thoughtful-design",
        title: "Thoughtful Design",
        description:
          "Every detail is intentional, balancing beauty, function, and timeless appeal.",
        icon: "pencil-ruler",
      },
      {
        _key: "quality-integrity",
        title: "Quality & Integrity",
        description:
          "We are committed to quality craftsmanship and honest, transparent communication.",
        icon: "shield-check",
      },
      {
        _key: "sustainable-approach",
        title: "Sustainable Approach",
        description:
          "We source responsibly and design with longevity and the environment in mind.",
        icon: "leaf",
      },
    ],
    projectCtaEyebrow: "LET'S WORK TOGETHER",
    projectCtaTitle: "Have a Project in Mind?",
    projectCtaDescription:
      "We'd love to hear about your project and help you create a space that inspires.",
    projectCtaLabel: "SCHEDULE A CONSULTATION",
    projectCtaHref: "/contact",
    projectCtaImage: {
      _type: "image",
      asset: { _ref: await assetRefForUrl(staff.cta.src) },
    },
    projectCtaImageAlt: staff.cta.alt,
    consultationEyebrow: "LET'S CREATE SOMETHING BEAUTIFUL",
    consultationTitle: "Have a project in mind?",
    consultationDescription:
      "Let's collaborate to create a space that inspires you every day.",
    consultationLabel: "SCHEDULE A CONSULTATION",
    consultationHref: "/contact",
    consultationImage: {
      _type: "image",
      asset: { _ref: await assetRefForUrl(staff.consultationCta.src) },
    },
    consultationImageAlt: staff.consultationCta.alt,
    metaTitle: "Our Team | Whitefire Interior",
    metaDescription:
      "Meet the Whitefire Interior team — designers, architects, and specialists crafting timeless spaces across Amsterdam and beyond.",
  });

  console.log("== Phase 6: delete legacy docs ==");
  const legacyDocs = await client.fetch(`*[_type in $types]{_id}`, {
    types: LEGACY_TYPES,
  });
  console.log(`  ${legacyDocs.length} legacy docs to delete`);
  const pending = new Map(legacyDocs.map((d) => [d._id, d._id]));
  let pass = 1;
  while (pending.size > 0) {
    let deleted = 0;
    let errors = 0;
    for (const id of [...pending.keys()]) {
      try {
        await client.delete(id);
        await sleep(100);
        pending.delete(id);
        deleted++;
      } catch (err) {
        const item = err?.response?.body?.error?.items?.[0]?.error;
        const body = err?.response?.body;
        const raw = typeof body === "string" ? body : JSON.stringify(body ?? "");
        if (raw.includes("documentHasExistingReferencesError") && item?.referencingIDs) {
          for (const rid of item.referencingIDs) pending.set(rid, rid);
          errors++;
        } else {
          throw err;
        }
      }
    }
    console.log(`  pass ${pass}: deleted ${deleted}, deferred ${errors} (${pending.size} remaining)`);
    pass++;
    if (pass > 10) break;
  }
  if (pending.size > 0) {
    console.log("  still blocked:");
    for (const id of pending.keys()) {
      const refs = await client.fetch(
        `*[references($id)]{_id, _type}`,
        { id }
      );
      console.log(`    ${id} <- ${refs.map((r) => `${r._type}:${r._id}`).join(", ")}`);
    }
  }

  console.log("== Phase 7: summary ==");
  const allDocs = await client.fetch(`*[_type != "sanity.imageAsset"]{_type}`);
  const counts = {};
  for (const d of allDocs) counts[d._type] = (counts[d._type] || 0) + 1;
  console.table(Object.entries(counts).map(([type, count]) => ({ type, count })));
  console.log("image assets:", await client.fetch(`count(*[_type == "sanity.imageAsset"])`));
  console.log("DONE");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});