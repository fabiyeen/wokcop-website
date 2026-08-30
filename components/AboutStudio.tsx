import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import StudioCollageSection from './StudioCollageSection';

interface HomepageData {
  aboutStudioGallery?: any[];
  aboutStudioDescription?: string;
}

export default async function AboutStudio() {
  let data: HomepageData = {};

  try {
    data = await client.fetch<HomepageData>(
      `*[_type == "homepage"] | order(_updatedAt desc)[0]{ aboutStudioGallery, aboutStudioDescription }`,
      {},
      { cache: 'no-store' }
    );
  } catch (err) {
    console.warn('[AboutStudio] Sanity fetch failed:', err);
  }

  const galleryUrls = data?.aboutStudioGallery
    ? data.aboutStudioGallery.map((img) => urlFor(img).width(1600).quality(95).auto('format').url())
    : [];

  return (
    <StudioCollageSection
      galleryUrls={galleryUrls}
      description={data?.aboutStudioDescription || ''}
    />
  );
}
