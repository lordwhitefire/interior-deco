// scripts/patch-services-cta-image.cjs
// One-off: set siteConfig.servicesCtaImage to the about-closing asset
// (services._index ServicesCTA background). Idempotent.
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

async function main() {
  const siteDoc = await client.fetch(`*[_type == "siteConfig"][0]{_id}`);
  if (!siteDoc) throw new Error("siteConfig doc not found");
  const asset = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == "about_closing_dark_banner_table_vase.jpg"][0]{_id}`
  );
  if (!asset) throw new Error("about closing asset not found");
  await client.patch(siteDoc._id).set({
    servicesCtaImage: { _type: "image", asset: { _ref: asset._id } },
  }).commit();
  console.log(`patched ${siteDoc._id}.servicesCtaImage ->`, asset._id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});