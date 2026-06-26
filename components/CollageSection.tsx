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

  const fallbackDescription = `Wokcop Pictures merupakan rumah produksi yang bergerak pada bidang perfilman. Wokcop Pictures didirikan oleh Franklin Darmadi dan Alfie Lim sejak 2020 dan telah menghasilkan karya-karya yang patut dibanggakan. Kami percaya bahwa intergrasi antara ide cemerlang dengan audio-visual yang baik, akan menghasilkan manfaat yang besar.\n\nWokcop Pictures tidak hanya merekam gambar tetapi menghidupkan cerita dan menyisipkan makna.`;

  return (
    <section id="about-pictures" className="py-24 flex flex-col items-center">
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

          // Alternating blue/brown blend colors
          const blendColors = [
            '#486e7a', // 0: Blue
            '#9c7d5c', // 1: Brown
            '#486e7a', // 2: Blue
            '#9c7d5c', // 3: Brown
            '#486e7a', // 4: Blue
            '#9c7d5c', // 5: Brown
            '#486e7a', // 6: Blue
          ];
          const blendColor = blendColors[i];

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
                  className="object-cover grayscale contrast-125 brightness-110"
                  sizes="(max-width: 1200px) 100vw, 320px"
                />
                {blendColor && (
                  <div 
                    className="absolute inset-0 mix-blend-color opacity-60 pointer-events-none" 
                    style={{ backgroundColor: blendColor }} 
                  />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* 4. Typography Placement */}
        <div className="z-40 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full text-center">
          <h2 
            className="font-bebas font-normal tracking-[10px] text-white text-[115pt] uppercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          >
            WOKCOP PICTURES
          </h2>
        </div>
      </div>

      {/* Description Text */}
      <div className="max-w-[1400px] mx-auto text-center px-30">
        <p className="text-lg md:text-xl text-[#292929] uppercase whitespace-pre-wrap leading-relaxed tracking-wide font-bebas font-normal">
          {description || fallbackDescription}
        </p>
      </div>
    </section>
  );
}
