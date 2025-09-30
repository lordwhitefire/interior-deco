import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'pzhistba',  // ✅ Your actual project ID
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: true,
});

// Builder for generating image URLs
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}