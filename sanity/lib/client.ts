import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: process.env.SANITY_API_TOKEN, // for server-side reads
});

/**
 * Fetches the singleton homepage document from Sanity.
 */
export async function getHomepageData() {
  try {
    return await client.fetch<{
      heroBgImage1?: unknown;
      heroBgImage2?: unknown;
    }>(
      `*[_type == "homepage" && _id == "homepage"][0]{ heroBgImage1, heroBgImage2 }`,
    );
  } catch (err) {
    console.warn('[Sanity] Homepage fetch failed:', err);
    return null;
  }
}
