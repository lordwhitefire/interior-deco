// app/lib/sanity.client.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Read-only client (for data fetching)
export const sanityClient = createClient({
  projectId: 'pzhistba',
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: true,
});

// Write client (for mutations) - uses your token
export const writeClient = createClient({
  projectId: 'pzhistba',
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: false, // Never use CDN for writes
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}