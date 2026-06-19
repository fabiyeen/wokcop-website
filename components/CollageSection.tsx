'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  galleryUrls: string[];
  description?: string;
}

export default function CollageSection({ galleryUrls, description }: Props) {
  const images = [...galleryUrls];
  while (images.length < 7) {
    images.push('/LOGO%20WOKCOP.png');
  }
  const finalImages = images.slice(0, 7);

  const fallbackDescription = `WOKCOP PICTURES MERUPAKAN RUMAH PRODUKSI YANG BERGERAK PADA BIDANG PERFILMAN. WOKCOP PICTURES DIDIRIKAN OLEH
FRANKLIN DARMADI DAN ALFIE LIM SEJAK 2020 DAN TELAH MENGHASILKAN KARYA-KARYA YANG PATUT DIBANGGAKAN. KAMI PERCAYA
BAHWA INTEGRASI ANTARA IDE CEMERLANG DENGAN AUDIO-VISUAL YANG BAIK, AKAN MENGHASILKAN MANFAAT YANG BESAR.

WOKCOP PICTURES TIDAK HANYA MEREKAM GAMBAR TETAPI MENGHIDUPKAN CERITA DAN MENYISIPKAN MAKNA.`;

  return (
    <section id="about-pictures" className="py-24 flex flex-col items-center">
      {/* 1. Strict Center Alignment Container */}
      <div className="relative flex justify-center items-center w-full min-h-[600px] overflow-hidden mb-16 bg-wokcop-bg">
        
        {finalImages.map((src, i) => {
          // Spread images evenly from 0% to 100% across the screen to span edge to edge without spaces
          const leftCalc = `${i * 16.66}%`;

          // Alternating random rotations to match the messy collage
          const rotations = [
            'rotate-[-6deg]', 
            'rotate-[4deg]', 
            'rotate-[-3deg]', 
            'rotate-[5deg]', 
            'rotate-[-5deg]', 
            'rotate-[3deg]', 
            'rotate-[-4deg]'
          ];

          return (
            <motion.div
              key={i}
              className={`absolute shadow-xl drop-shadow-2xl ${rotations[i]}`}
              style={{
                left: leftCalc,
                top: '50%',
                zIndex: i === 3 ? 10 : 5,
                x: '-50%',
                y: '-50%',
              }}
              animate={{ y: ['-50%', '-52%', '-50%', '-48%', '-50%'] }}
              transition={{ duration: 12 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <div className="relative w-[320px] h-[400px] border-[8px] border-white shadow-2xl overflow-hidden">
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  className="object-cover grayscale contrast-[1.15]"
                  sizes="(max-width: 1200px) 100vw, 320px"
                />
              </div>
            </motion.div>
          );
        })}

        {/* 4. Typography Placement */}
        <div className="z-40 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full text-center">
          <h2 
            className="font-normal tracking-[0.05em] text-white text-[70.86pt] uppercase drop-shadow-2xl"
            style={{ fontFamily: 'BebasNeue, Impact, sans-serif' }}
          >
            WOKCOP PICTURES
          </h2>
        </div>
      </div>

      {/* Description Text */}
      <div className="max-w-[1400px] mx-auto text-center px-6">
        <p className="text-lg md:text-xl leading-relaxed text-[#292929] font-medium whitespace-pre-wrap">
          {description || fallbackDescription}
        </p>
      </div>
    </section>
  );
}
