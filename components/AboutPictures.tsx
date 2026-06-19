import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import CollageSection from './CollageSection';

interface HomepageData {
  aboutPicturesGallery?: any[];
  aboutPicturesDescription?: string;
}

export default async function AboutPictures() {
  let data: HomepageData = {};

  try {
    data = await client.fetch<HomepageData>(
      `*[_type == "homepage" && _id == "homepage"][0]{ aboutPicturesGallery, aboutPicturesDescription }`,
    );
  } catch (err) {
    console.warn('[AboutPictures] Sanity fetch failed:', err);
  }

  const galleryUrls = data?.aboutPicturesGallery
    ? data.aboutPicturesGallery.map((img) => urlFor(img).width(600).url())
    : [];

  return (
    <CollageSection
      galleryUrls={galleryUrls}
      description={data?.aboutPicturesDescription || ''}
    />
  );
}
