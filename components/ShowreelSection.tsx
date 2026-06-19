import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Carousel from './Carousel';

interface ProjectData {
  title: string;
  image: any;
  videoUrl?: string;
}

interface HomepageData {
  commercial?: ProjectData[];
}

export default async function ShowreelSection() {
  let data: HomepageData = {};

  try {
    data = await client.fetch<HomepageData>(
      `*[_type == "homepage" && _id == "homepage"][0]{ commercial }`,
      {},
      { cache: 'no-store' }
    );
  } catch (err) {
    console.warn('[Showreel] Sanity fetch failed:', err);
  }

    const items = data?.commercial
    ? data.commercial.map((item: any) => ({
        title: item.title,
        image: item.image?.asset?._ref ? urlFor(item.image).width(800).url() : '/LOGO WOKCOP.png',
        videoUrl: item.videoUrl,
      }))
    : [];

  return (
    <section id="commercial">
      <Carousel title="Showreel" items={items} type="commercial" />
    </section>
  );
}
