// scripts/patch-blog-meta.cjs
// One-off: siteConfig gains blogHero image + philosophy CTA copy
// (blog._index BlogHero + BlogPhilosophyCTA). Idempotent.
const path = require("path");
const { createClient } = require("@sanity/client");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const client = createClient({
  projectId: "pzhistba",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const HERO_URL = "https://cdn.sanity.io/images/pzhistba/production/bbd87c413ec386d39cbd1ee81cf635b8324b541e-1600x896.jpg";
const PHIL_URL = "https://cdn.sanity.io/images/pzhistba/production/f19b768d49a4712a231bc2843dc3b66b7ec1d591-1600x896.jpg";

async function assetRefForUrl(url) {
  const parsed = new URL(url);
  const parts = parsed.pathname.split("/");
  const file = parts[parts.length - 1];
  const id = file.split("-")[0];
  const [asset] = await client.fetch(
    `*[_type == "sanity.imageAsset" && _id match $pattern][0..0]{_id}`,
    { pattern: `image-${id}*` }
  );
  if (!asset) throw new Error(`asset not found for ${id}`);
  return asset._id;
}

async function main() {
  const siteDoc = await client.fetch(`*[_type == "siteConfig"][0]{_id}`);
  if (!siteDoc) throw new Error("siteConfig doc not found");
  const heroRef = await assetRefForUrl(HERO_URL);
  const philRef = await assetRefForUrl(PHIL_URL);
  await client
    .patch(siteDoc._id)
    .set({
      blogHeroImage: { _type: "image", asset: { _ref: heroRef } },
      blogHeroAlt:
        "Warm contemporary kitchen with pendant lighting and natural materials",
      philosophyEyebrow: "OUR PHILOSOPHY",
      philosophyTitle:
        "Timeless Design. Thoughtful Spaces. Inspired Living.",
      philosophyBody:
        "We believe great design is more than beautiful spaces—it's about creating environments that reflect who you are and how you live.",
      philosophyHref: "/about",
      philosophyImage: { _type: "image", asset: { _ref: philRef } },
      philosophyImageAlt:
        "Warm interior vignette with a sculptural vase, books, and natural light",
    })
    .commit();
  console.log("patched blog hero + philosophy on", siteDoc._id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});