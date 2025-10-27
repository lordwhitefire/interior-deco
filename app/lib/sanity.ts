import { createClient } from "@sanity/client";

const projectId = "pzhistba";
const dataset = "production";
const apiVersion = "2023-12-01";

export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const getClient = (write = false) =>
  createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !write,
    token: write ? process.env.SANITY_API_WRITE_TOKEN : undefined,
  });