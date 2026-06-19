'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  galleryUrls: string[];
  description: string;
}

export default function AboutPicturesClient({ galleryUrls, description }: Props) {
  // We need 7 images for the design. If Sanity has fewer, pad with fallbacks.
  const images = [...galleryUrls];
  while (images.length < 7) {
    images.push('/hero-placeholder-1.jpg'); // Fallback placeholder
  }
  const finalImages = images.slice(0, 7);

  const fallbackDescription = `WOKCOP PICTURES MERUPAKAN RUMAH PRODUKSI YANG BERGERAK PADA BIDANG PERFILMAN. WOKCOP PICTURES DIDIRIKAN OLEH
FRANKLIN DARMADI DAN ALFIE LIM SEJAK 2020 DAN TELAH MENGHASILKAN KARYA-KARYA YANG PATUT DIBANGGAKAN. KAMI PERCAYA
BAHWA INTEGRASI ANTARA IDE CEMERLANG DENGAN AUDIO-VISUAL YANG BAIK, AKAN MENGHASILKAN MANFAAT YANG BESAR.

WOKCOP PICTURES TIDAK HANYA MEREKAM GAMBAR TETAPI MENGHIDUPKAN CERITA DAN MENYISIPKAN MAKNA.`;

  return (
    <section id="about-pictures" className="py-24 overflow-hidden relative flex flex-col items-center" style={{ backgroundColor: '#FBF6EF' }}>
      
      {/* Gallery Collage */}
      <div className="relative w-full max-w-[1400px] h-[450px] md:h-[600px] flex items-center justify-center mb-16 px-4">
         
         {/* Render images with staggered animations, rotation, and alternating filters */}
         <div className="absolute inset-0 flex items-center justify-center">
           {finalImages.map((src, i) => {
             // Alternate between blue greyscale (even) and sepia greyscale (odd)
             const isBlue = i % 2 === 0;
             const filterClass = isBlue
               ? 'grayscale sepia-[.3] hue-rotate-[200deg] contrast-[1.1] brightness-[0.8]'
               : 'grayscale sepia-[.7] contrast-[1.2] brightness-[0.9] hue-rotate-[-10deg]';

             // Staggered bobbing animation (up and down)
             const yOffset = [0, -30, 0, 30, 0];
             
             // Scattered positions to look like the reference design collage
             // Hand-picked rotations and horizontal spacing to look natural
             const rotations = [-8, 6, -4, 9, -7, 4, -10];
             const zIndexes = [1, 3, 2, 5, 4, 3, 2];
             
             // Spread them across the container width
             // 0 -> far left, 6 -> far right
             const leftPercent = 5 + (i * 14.5);
             const widthPercent = [16, 15, 17, 18, 16, 15, 17][i];
             // varied aspect ratios to match the messy collage look
             const aspectRatios = ['3/4', '4/3', '3/4', '4/5', '3/4', '4/3', '3/4'][i];

             return (
               <motion.div
                 key={i}
                 className={`absolute shadow-2xl ${filterClass}`}
                 style={{ 
                   width: `${widthPercent}%`,
                   aspectRatio: aspectRatios, 
                   zIndex: zIndexes[i],
                   rotate: rotations[i],
                   left: `${leftPercent}%`, 
                   top: '50%',
                   marginTop: '-15%', // center offset roughly
                 }}
                 animate={{ y: yOffset }}
                 transition={{ 
                   duration: 5 + (i % 3), // varied duration so they don't move in total sync
                   repeat: Infinity, 
                   ease: 'easeInOut',
                   delay: i * 0.4 // staggered start
                 }}
               >
                 <Image 
                   src={src} 
                   alt={`Gallery image ${i + 1}`} 
                   fill 
                   className="object-cover border-4 border-[#FBF6EF]/20" 
                 />
               </motion.div>
             );
           })}
         </div>

         {/* Center Title overlaying the images */}
         <div className="absolute z-10 w-full text-center pointer-events-none drop-shadow-2xl">
           <h2 
             className="text-white leading-none"
             style={{ 
               fontFamily: 'BebasNeue, Impact, sans-serif', 
               fontSize: '70.86pt', // Exact size requested
               letterSpacing: '0.05em',
               textShadow: '0 4px 24px rgba(0,0,0,0.6)'
             }}
           >
             WOKCOP PICTURES
           </h2>
         </div>
      </div>

      {/* Description Text */}
      <div className="max-w-4xl text-center px-6">
        <p 
          className="text-[#1A1A1A] uppercase whitespace-pre-wrap leading-relaxed"
          style={{ 
            fontFamily: 'BebasNeue, Impact, sans-serif',
            fontSize: '18px', 
            letterSpacing: '0.05em'
          }}
        >
          {description || fallbackDescription}
        </p>
      </div>
    </section>
  );
}
