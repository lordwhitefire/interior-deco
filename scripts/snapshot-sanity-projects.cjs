const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

const client = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
});

const QUERY = `*[_type == "projectPage"] {
  "slug": slug.current,
  "title": coalesce(projectName, title),
  location,
  category,
  style,
  squareFootage,
  budget,
  timeline,
  tags,
  "thumb": thumbnail.asset->url,
  "hero": heroImage.asset->url,
  "galleryFirst": gallery[0].asset->url,
  "galleryCount": count(gallery)
}`;

function withParams(url, w, h) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}w=${w}&h=${h}&fit=crop&crop=center&auto=format&q=85`;
}

async function main() {
  const projects = await client.fetch(QUERY);
  if (!Array.isArray(projects) || projects.length === 0) {
    console.error("No projects fetched — aborting.");
    process.exit(1);
  }

  const out = {};
  for (const p of projects) {
    if (!p.slug || !p.title) {
      console.warn(`SKIPPED project without slug/title: ${JSON.stringify(p.title)}`);
      continue;
    }
    out[p.slug] = {
      slug: p.slug,
      title: p.title,
      location: p.location || "",
      category: p.category || "",
      style: Array.isArray(p.style) ? p.style : [],
      squareFootage: p.squareFootage || null,
      budget: p.budget || "",
      timeline: p.timeline || "",
      tags: Array.isArray(p.tags) ? p.tags : [],
      thumbUrl: p.thumb ? withParams(p.thumb, 1280, 800) : null,
      cardUrl: p.thumb ? withParams(p.thumb, 1280, 960) : null,
      heroUrl: p.hero ? withParams(p.hero, 1280, 800) : null,
      galleryFirstUrl: p.galleryFirst ? withParams(p.galleryFirst, 1024, 1024) : null,
      galleryCount: p.galleryCount || 0,
    };
  }

  const filePath = path.join(__dirname, "..", "app", "data", "projects.json");
  fs.writeFileSync(filePath, JSON.stringify(out, null, 2) + "\n");

  const missing = Object.values(out).filter((p) => !p.thumbUrl || !p.galleryFirstUrl);
  console.log(`Wrote ${Object.keys(out).length} projects → ${filePath}`);
  if (missing.length) {
    console.warn(`${missing.length} projects missing thumb or galleryFirst:`);
    for (const m of missing) console.warn(`  ${m.slug}: thumb=${!!m.thumbUrl} galleryFirst=${!!m.galleryFirstUrl}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});