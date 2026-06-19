import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';

interface PressReleaseItem {
  _key: string;
  categoryTitle: string;
  date: string;
  releaseTitle: string;
  pdfUrl: string;
}

interface PressReleasePageData {
  releases?: PressReleaseItem[];
}

export const revalidate = 60; // Revalidate every minute

export default async function PressReleasePage() {
  let data: PressReleasePageData = {};

  try {
    data = await client.fetch<PressReleasePageData>(
      `*[_type == "pressReleasePage" && _id == "pressReleasePage"][0]{ 
        releases[]{
          _key,
          categoryTitle,
          date,
          releaseTitle,
          "pdfUrl": pdfFile.asset->url
        } 
      }`,
    );
  } catch (err) {
    console.warn('[Press Release] Sanity fetch failed:', err);
  }

  // Fallback data if none exists yet
  const releaseItems = data?.releases || [
    {
      _key: '1',
      categoryTitle: 'MAJU: JEJAK PAHIT SI KEMBANG GULA',
      date: '16 APRIL 2025',
      releaseTitle: 'MAJU: JEJAK PAHIT SI KEMBANG GULA SIAP SYUTING!',
      pdfUrl: '#',
    },
    {
      _key: '2',
      categoryTitle: 'SURAT KE 8',
      date: '9 JANUARI 2026',
      releaseTitle: 'SURAT KE 8 SIAP DIPRODUKSI!',
      pdfUrl: '#',
    },
  ];

  return (
    <main className="min-h-screen bg-wokcop-bg text-wokcop-dark flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-5xl mx-auto w-full px-6 py-12 md:py-20">
        {/* Page Title */}
        <h1 
          className="text-4xl md:text-5xl font-bold uppercase text-center mb-20 tracking-wider" 
          style={{ fontFamily: 'BebasNeue, Impact, sans-serif' }}
        >
          PRESS RELEASE
        </h1>

        {/* Press Releases List */}
        <div className="flex flex-col gap-12">
          {releaseItems.map((item) => (
            <div key={item._key} className="w-full">
              {/* Category Title with underline */}
              <div className="border-b-2 border-wokcop-dark pb-2 mb-2 w-[280px] md:w-[450px]">
                <h2 
                  className="text-2xl font-normal uppercase tracking-wider text-wokcop-dark"
                  style={{ fontFamily: 'BebasNeue, Impact, sans-serif' }}
                >
                  {item.categoryTitle}
                </h2>
              </div>
              
              {/* Date & Title Hyperlink */}
              <a 
                href={item.pdfUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block group hover:opacity-60 transition-opacity duration-200"
                download // Suggests to the browser to download the file if possible
              >
                <p 
                  className="text-xl md:text-2xl font-normal uppercase tracking-wide leading-relaxed underline underline-offset-4 decoration-2"
                  style={{ fontFamily: 'BebasNeue, Impact, sans-serif' }}
                >
                  {item.date} - {item.releaseTitle}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 border-t border-black/10 text-center text-[10px] font-semibold tracking-[0.2em] uppercase text-wokcop-muted">
        © 2026 WOKCOP PICTURES. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
