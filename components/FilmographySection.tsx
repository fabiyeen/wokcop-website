import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Carousel from './Carousel';

interface ProjectData {
  title: string;
  slug?: string;
  posterImage?: any;
  homepagePoster?: any;
  heroImage?: any;
  hoverGif?: any;
}

interface HomepageData {
  filmProjects?: ProjectData[];
}

export default async function FilmographySection() {
  let data: HomepageData = {};

  try {
    data = await client.fetch<HomepageData>(
      `*[_type == "homepage"] | order(_updatedAt desc)[0]{ 
        filmProjects[]->{
          title,
          "slug": slug.current,
          posterImage,
          heroImage,
          homepagePoster,
          hoverGif
        } 
      }`,
      {},
      { cache: 'no-store' }
    );
  } catch (err) {
    console.warn('[Filmography] Sanity fetch failed:', err);
  }

    const items = data?.filmProjects
    ? data.filmProjects.filter((item) => item !== null && item !== undefined).map((item) => ({
        title: item.title,
        slug: item.slug,
        image: item.homepagePoster?.asset?._ref
          ? urlFor(item.homepagePoster).width(800).url()
          : (item.posterImage?.asset?._ref 
            ? urlFor(item.posterImage).width(800).url() 
            : (item.heroImage?.asset?._ref ? urlFor(item.heroImage).width(800).url() : '/LOGO WOKCOP.png')),
        hoverGifUrl: item.hoverGif?.asset?._ref ? urlFor(item.hoverGif).url() : undefined,
      }))
    : [];

  return (
    <section id="film">
      <Carousel title="Filmography" items={items} type="film" />
    </section>
  );
}
