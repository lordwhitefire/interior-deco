const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

const client = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
});

const withParams = (url, w, h) =>
  `${url}?w=${w}&h=${h}&fit=crop&crop=center&auto=format&q=85`;

async function main() {
  const staff = await client.fetch(
    `*[_type == "staff"] | order(order asc) {
      "slug": slug.current,
      fullName,
      role,
      order,
      featured,
      "bio": pt::text(bio),
      "photo": photo.asset->url,
      social,
      metaTitle,
      metaDescription
    }`
  );
  if (!Array.isArray(staff) || staff.length === 0) {
    console.error("No staff fetched — aborting.");
    process.exit(1);
  }

  const projects = await client.fetch(
    `*[_type == "projectPage"] {
      "slug": slug.current,
      "title": coalesce(projectName, title),
      location,
      "thumb": thumbnail.asset->url,
      "hero": heroImage.asset->url,
      "gallery": gallery[]{ "url": asset->url, isFeatured }
    }`
  );

  const used = new Set();
  for (const p of projects) {
    if (p.thumb) used.add(p.thumb.split("?")[0]);
    if (p.hero) used.add(p.hero.split("?")[0]);
    const g = p.gallery || [];
    if (g[0]) used.add(g[0].url.split("?")[0]);
    const featuredFirst = [...g]
      .sort((a, b) => Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false))
      .slice(0, 5);
    for (const img of featuredFirst) used.add(img.url.split("?")[0]);
  }

  const unusedByProject = {};
  for (const p of projects) {
    unusedByProject[p.slug] = (p.gallery || [])
      .map((img) => img.url.split("?")[0])
      .filter((u) => !used.has(u));
  }

  const sortedSlugs = Object.keys(unusedByProject).sort();
  const pool = [];
  for (const slug of sortedSlugs) {
    for (const url of unusedByProject[slug]) {
      pool.push({ url, project: slug });
    }
  }

  let idx = 0;
  const take = (role) => {
    const item = pool[idx++];
    const project = projects.find((p) => p.slug === item.project);
    const alt = `${project?.title ?? item.project} interior — ${role} photograph`;
    return { src: withParams(item.url, 1920, 1080), alt };
  };

  const teamHero = take("team hero");
  const cta = take("CTA");
  const consultationCta = take("consultation CTA");

  const members = {};
  for (let i = 0; i < staff.length; i++) {
    const s = staff[i];
    const heroImage = take("member hero");
    const featured = [sortedSlugs[i % 18], sortedSlugs[(i + 6) % 18], sortedSlugs[(i + 12) % 18]].map((slug) => {
      const project = projects.find((p) => p.slug === slug);
      const img = unusedByProject[slug][0];
      return {
        slug,
        title: project?.title ?? slug,
        location: project?.location ?? "",
        image: `${img}?w=1280&h=720&fit=crop&crop=center&auto=format&q=85`,
        imageAlt: `${project?.title ?? slug} interior — featured photograph`,
        href: `/projects/${slug}`,
      };
    });
    members[s.slug] = {
      slug: s.slug,
      fullName: s.fullName,
      role: s.role,
      order: s.order,
      featured: s.featured,
      bio: (s.bio || "").trim(),
      photoUrl: s.photo ? withParams(s.photo, 600, 750) : null,
      social: s.social || [],
      metaTitle: s.metaTitle || `${s.fullName} | Whitefire Interior`,
      metaDescription: s.metaDescription || `Meet ${s.fullName}, ${s.role} at Whitefire Interior.`,
      heroImage,
      featuredProjects: featured,
    };
  }

  const out = { teamHero, cta, consultationCta, members };
  const filePath = path.join(__dirname, "..", "app", "data", "team", "staff.json");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(out, null, 2) + "\n");

  console.log(`Wrote ${Object.keys(members).length} staff → ${filePath}`);
  console.log(`Pool used: ${idx} (teamHero, CTA, consultationCTA, ${staff.length} member heroes, featured cards)`);
  console.log(`Unused project images remaining: ${pool.length - idx}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});