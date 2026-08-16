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
  const projects = await client.fetch(
    `*[_type == "projectPage"] {
      "slug": slug.current,
      "title": coalesce(projectName, title),
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

  const staffPath = path.join(__dirname, "..", "app", "data", "team", "staff.json");
  const staff = JSON.parse(fs.readFileSync(staffPath, "utf8"));
  for (const m of Object.values(staff.members)) {
    used.add(m.heroImage.src.split("?")[0]);
    for (const f of m.featuredProjects) used.add(f.image.split("?")[0]);
  }
  used.add(staff.teamHero.src.split("?")[0]);
  used.add(staff.cta.src.split("?")[0]);
  used.add(staff.consultationCta.src.split("?")[0]);

  const pool = [];
  for (const p of projects) {
    for (const img of p.gallery || []) {
      const u = img.url.split("?")[0];
      if (!used.has(u)) pool.push({ url: u, project: p });
    }
  }

  let idx = 0;
  const take = (role, w, h) => {
    const item = pool[idx++];
    const alt = `${item.project.title} interior — ${role} photograph`;
    return { src: withParams(item.url, w, h), alt };
  };

  const out = {
    testimonials: {
      hero: take("testimonials hero", 1920, 1080),
      cta: take("testimonials CTA", 1280, 720),
    },
    faq: {
      sidebar: take("FAQ sidebar", 800, 1000),
      cta: take("FAQ CTA", 1280, 720),
    },
    contact: {
      hero: take("contact hero", 1920, 1080),
      cta: take("contact CTA", 1280, 720),
    },
  };

  const filePath = path.join(__dirname, "..", "app", "data", "sitepages.json");
  fs.writeFileSync(filePath, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote sitepages.json (${idx} images). Unused pool remaining: ${pool.length - idx}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});