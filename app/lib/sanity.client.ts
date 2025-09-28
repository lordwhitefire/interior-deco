import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'pzhistba',  // ✅ Your actual project ID
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: true,
});