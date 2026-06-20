'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  galleryUrls: string[];
  description?: string;
}

export default function StudioCollageSection({ galleryUrls, description }: Props) {
  const images = [...galleryUrls];
  // Require 8 images for a 2x4 layout
  while (images.length < 8) {
    images.push('/LOGO%20WOKCOP.png');
  }
  const finalImages = images.slice(0, 8);

  const fallbackDescription = `KAMI ADALAH PRODUCTION HOUSE YANG BERGERAK PADA BIDANG PRODUKSI KOMERSIAL DAN BERBAGAI KEBUTUHAN KREATIF LAINNYA.
KAMI AHLI DALAM MEMPRODUKSI BERBAGAI MACAM PRODUK KREATIF SEPERTI TVC, DVC, KONTEN MEDIA SOSIAL, HINGGA BERAGAM PRODUK
KREATIF LAINNYA. WOKCOP STUDIO TELAH BEKERJASAMA DENGAN BANYAK ESTABLISHED BRAND YANG MEMBUAT REPUTASI KAMI KUAT.

DENGAN VERSATILITY TINGGI, WOKCOP STUDIO MEMBERI LAYANAN FULL PRODUCTION MENCAKUP PRE-, PRO-, DAN POST-PRODUCTION.`;

  const imageStyles = [
    // 0: Top Left (Sepia)
    { width: '28%', height: '45%', left: '-2%', top: '5%', rotate: 'rotate-[3deg]', blendColor: '#9c7d5c', zIndex: 1 },
    // 1: Bottom Left (Cyan-ish)
    { width: '32%', height: '65%', left: '-4%', top: '38%', rotate: 'rotate-[-4deg]', blendColor: '#486e7a', zIndex: 2 },
    // 2: Top Mid-Left (Cyan-ish)
    { width: '30%', height: '55%', left: '20%', top: '-5%', rotate: 'rotate-[-2deg]', blendColor: '#486e7a', zIndex: 3 },
    // 3: Bottom Mid-Left (Sepia)
    { width: '28%', height: '60%', left: '24%', top: '42%', rotate: 'rotate-[1deg]', blendColor: '#9c7d5c', zIndex: 4 },
    // 4: Top Mid-Right (Sepia)
    { width: '30%', height: '52%', left: '46%', top: '0%', rotate: 'rotate-[3deg]', blendColor: '#9c7d5c', zIndex: 2 },
    // 5: Bottom Mid-Right (Cyan-ish)
    { width: '28%', height: '55%', left: '48%', top: '44%', rotate: 'rotate-[-2deg]', blendColor: '#486e7a', zIndex: 5 },
    // 6: Top Right (Cyan-ish)
    { width: '32%', height: '60%', left: '72%', top: '-6%', rotate: 'rotate-[-3deg]', blendColor: '#486e7a', zIndex: 3 },
    // 7: Bottom Right (Sepia)
    { width: '30%', height: '58%', left: '74%', top: '46%', rotate: 'rotate-[2deg]', blendColor: '#9c7d5c', zIndex: 4 },
  ];

  return (
    <section id="about-studio" className="py-24 flex flex-col items-center">
      {/* Container for the messy collage */}
      <div className="relative w-full h-[700px] lg:h-[850px] mb-16 bg-wokcop-bg">
        
        {finalImages.map((src, i) => {
          const style = imageStyles[i] || imageStyles[0];

          return (
            <motion.div
              key={i}
              className={`absolute shadow-xl drop-shadow-2xl ${style.rotate}`}
              style={{
                left: style.left,
                top: style.top,
                width: style.width,
                height: style.height,
                zIndex: style.zIndex,
              }}
              animate={{ y: [0, -15, 0, 15, 0] }}
              transition={{ duration: 12 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            >
              <div className="relative w-full h-full border-[8px] border-white shadow-2xl overflow-hidden">
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  className="object-cover grayscale contrast-125 brightness-[0.60]"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
                {style.blendColor && (
                  <div 
                    className="absolute inset-0 mix-blend-color opacity-70 pointer-events-none" 
                    style={{ backgroundColor: style.blendColor }} 
                  />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Typography Placement */}
        <div className="z-40 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full text-center">
          <h2 
            className="font-normal tracking-[0.15em] text-white text-[70pt] md:text-[105pt] uppercase drop-shadow-2xl whitespace-nowrap"
            style={{ fontFamily: 'BebasNeue, Impact, sans-serif' }}
          >
            WOKCOP STUDIO
          </h2>
        </div>
      </div>

      {/* Description Text */}
      <div className="max-w-[1400px] mx-auto text-center px-6">
        <p className="text-lg md:text-xl text-[#3d3c3b] uppercase whitespace-pre-wrap leading-relaxed tracking-wide font-normal" style={{ fontFamily: 'BebasNeue, Arial, sans-serif', fontWeight: 400 }}>
          {description || fallbackDescription}
        </p>
      </div>
    </section>
  );
}
