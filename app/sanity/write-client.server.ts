import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = "pzhistba";
const dataset = "production";
const apiVersion = "2023-12-01";

// Write client (for mutations) - uses your token
export const writeClient = createClient({ 
  projectId, 
  dataset, 
  apiVersion, 
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN
});

// Read-only client (for data fetching)
export const sanity = createClient({ 
  projectId, 
  dataset, 
  apiVersion, 
  useCdn: true 
});

// Image URL builder
export const builder = imageUrlBuilder(sanity);

export { projectId, dataset, apiVersion };