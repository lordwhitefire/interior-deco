// app/lib/sanity.client.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create client immediately
export const sanityClient = createClient({
  projectId: 'pzhistba',
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: true,
});

// Create builder immediately
export const builder = imageUrlBuilder(sanityClient);

// Export urlFor function
export function urlFor(source: any) {
  return builder.image(source);
}

// Test that it worked
console.log('✅ SANITY CLIENT CREATED:', typeof sanityClient);
console.log('✅ SANITY CLIENT FETCH:', typeof sanityClient.fetch);