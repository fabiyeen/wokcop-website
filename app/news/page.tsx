import { client } from '@/sanity/lib/client';
import Navbar from '@/components/Navbar';

interface NewsItem {
  _key: string;
  company: string;
  title: string;
  date: string;
  link: string;
}

interface NewsPageData {
  newsList?: NewsItem[];
}

export const revalidate = 60; // Revalidate every minute

export default async function NewsPage() {
  let data: NewsPageData = {};

  try {
    data = await client.fetch<NewsPageData>(
      `*[_type == "newsPage" && _id == "newsPage"][0]{ newsList }`,
    );
  } catch (err) {
    console.warn('[News] Sanity fetch failed:', err);
  }

  // Fallback data if none exists yet
  const newsItems = data?.newsList || [
    {
      _key: '1',
      company: 'LIBERTYMAGZ.COM',
      title: 'AURORA RIBERO, ARIEF DIDU, DAN UNIQUE PRISCILLA DI PERTEMUKAN DALAM SATU LAYAR "SURAT KE-8"',
      date: '09/01/26',
      link: '#',
    },
    {
      _key: '2',
      company: 'BROADCASTMAGZ',
      title: 'WOKCOP PICTURES MULAI PRODUKSI FILM DRAMA KELUARGA SURAT KE 8',
      date: '12/01/26',
      link: '#',
    },
    {
      _key: '3',
      company: 'LAYAR.ID',
      title: 'FILM SURAT KE 8, DRAMA KELUARGA YANG LAYAK DINANTI',
      date: '02/26',
      link: '#',
    },
    {
      _key: '4',
      company: 'HARIAN BOGOR RAYA',
      title: 'SINOPSIS FILM SURAT KE 8: KISAH SURAT-SURAT YANG MENGUNGKAP CINTA, LUKA, DAN KEIKHLASAN DALAM KELUARGA',
      date: '10/01/26',
      link: '#',
    },
    {
      _key: '5',
      company: 'KOMPAS.COM',
      title: 'AURORA RIBERO BINTANGI FILM DRAMA KELUARGA BERJUDUL SURAT KE 8',
      date: '09/01/26',
      link: '#',
    },
  ];

  return (
    <main className="min-h-screen bg-wokcop-bg text-wokcop-dark flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-5xl mx-auto w-full px-6 py-12 md:py-20">
        {/* Page Title */}
        <h1 
          className="text-4xl md:text-5xl font-normal uppercase text-center mb-20 tracking-widest" 
          style={{ fontFamily: 'BebasNeue, Arial, sans-serif' }}
        >
          NEWS
        </h1>

        {/* News List */}
        <div className="flex flex-col gap-12">
          {newsItems.map((item) => (
            <div key={item._key} className="w-full">
              {/* Company Name with underline */}
              <div className="border-b-2 border-wokcop-dark pb-2 mb-4 w-[250px] md:w-[400px]">
                <h2 
                  className="text-2xl font-semibold uppercase tracking-wider text-wokcop-dark"
                  style={{ fontFamily: 'BebasNeue, Arial, sans-serif' }}
                >
                  {item.company}
                </h2>
              </div>
              
              {/* Title and Date Hyperlink */}
              <a 
                href={item.link || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex justify-between items-start group hover:opacity-60 transition-opacity duration-200 w-full"
              >
                <h3 
                  className="text-xl md:text-2xl font-normal uppercase tracking-wide leading-relaxed max-w-3xl pr-4"
                  style={{ fontFamily: 'BebasNeue, Arial, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-xl md:text-2xl font-normal uppercase tracking-wider shrink-0"
                  style={{ fontFamily: 'BebasNeue, Arial, sans-serif' }}
                >
                  {item.date}
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
