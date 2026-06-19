import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import StudioCollageSection from './StudioCollageSection';

interface HomepageData {
  aboutStudioGallery?: SanityImageSource[];
  aboutStudioDescription?: string;
}

export default async function AboutStudio() {
  let data: HomepageData = {};

  try {
    data = await client.fetch<HomepageData>(
      `*[_type == "homepage" && _id == "homepage"][0]{ aboutStudioGallery, aboutStudioDescription }`,
    );
  } catch (err) {
    console.warn('[AboutStudio] Sanity fetch failed:', err);
  }

  const galleryUrls = data?.aboutStudioGallery
    ? data.aboutStudioGallery.map((img) => urlFor(img).width(600).url())
    : [];

  return (
    <StudioCollageSection
      galleryUrls={galleryUrls}
      description={data?.aboutStudioDescription || ''}
    />
  );
}
