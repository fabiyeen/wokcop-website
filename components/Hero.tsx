import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import HeroClient from './HeroClient';

interface HomepageData {
  heroBgImage1?: any;
  heroBgImage2?: any;
}

/**
 * Hero — Server Component
 * Fetches background images from Sanity and passes resolved URLs to
 * the interactive HeroClient (Client Component).
 */
export default async function Hero() {
  let data: HomepageData = {};

  try {
    data = await client.fetch<HomepageData>(
      `*[_type == "homepage" && _id == "homepage"][0]{ heroBgImage1, heroBgImage2 }`,
    );
  } catch (err) {
    // Sanity not yet configured — graceful fallback to placeholder images
    console.warn('[Hero] Sanity fetch skipped:', err);
  }

  const bgImage1Url = data?.heroBgImage1
    ? urlFor(data.heroBgImage1).width(2000).quality(85).url()
    : undefined;

  const bgImage2Url = data?.heroBgImage2
    ? urlFor(data.heroBgImage2).width(2000).quality(85).url()
    : undefined;

  return <HeroClient bgImage1Url={bgImage1Url} bgImage2Url={bgImage2Url} />;
}
