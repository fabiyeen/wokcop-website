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

  const fallbackDescription = `Wokcop Pictures merupakan rumah produksi yang bergerak pada bidang perfilman. Wokcop Pictures didirikan oleh Franklin Darmadi dan Alfie Lim sejak 2020 dan telah menghasilkan karya-karya yang patut dibanggakan. Kami percaya bahwa intergrasi antara ide cemerlang dengan audio-visual yang baik, akan menghasilkan manfaat yang besar.\n\nWokcop Pictures tidak hanya merekam gambar tetapi menghidupkan cerita dan menyisipkan makna.`;

  const imageStyles = [
    // 0: Top Left (grey/none)
    { width: '25%', height: '45%', left: '-1%', top: '9%', rotate: 'rotate-[-2deg]', blendColor: '#9c7d5c', zIndex: 5 },
    // 1: Bottom Left (blue)
    { width: '35%', height: '55%', left: '-5%', top: '35%', rotate: 'rotate-[3deg]', blendColor: '#486e7a', zIndex: 5 },
    // 2: Top Mid-Left (blue)
    { width: '30%', height: '55%', left: '20%', top: '10%', rotate: 'rotate-[2deg]', blendColor: '#486e7a', zIndex: 3 },
    // 3: Bottom Mid-Left (brown)
    { width: '29%', height: '47%', left: '24%', top: '43%', rotate: 'rotate-[-2deg]', blendColor: '#9c7d5c', zIndex: 4 },
    // 4: Top Mid-Right (brown)
    { width: '34%', height: '52%', left: '45%', top: '6%', rotate: 'rotate-[-3deg]', blendColor: '#9c7d5c', zIndex: 2 },
    // 5: Bottom Mid-Right (blue)
    { width: '30%', height: '50%', left: '48%', top: '42%', rotate: 'rotate-[4deg]', blendColor: '#486e7a', zIndex: 3 },
    // 6: Top Right (blue)
    { width: '42%', height: '52%', left: '73%', top: '4%', rotate: 'rotate-[1deg]', blendColor: '#486e7a', zIndex: 5 },
    // 7: Bottom Right (brown)
    { width: '35%', height: '52%', left: '72%', top: '45%', rotate: 'rotate-[3deg]', blendColor: '#9c7d5c', zIndex: 4 },
  ];

  return (
    <section id="about-studio" className="flex flex-col items-center">
      {/* Container for the messy collage */}
      <div className="relative w-full bg-wokcop-bg flex items-center justify-center">

        {/* Inner div for pictures to be contained with height 635px */}
        <div className="w-full min-h-[635px] overflow-hidden">
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
                    className="object-cover object-[center_top] grayscale contrast-125 brightness-110"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                  {style.blendColor && (
                    <div
                      className="absolute inset-0 mix-blend-color opacity-60 pointer-events-none"
                      style={{ backgroundColor: style.blendColor }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Typography Placement */}
        <div className="z-40 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full text-center">
          <h2
            className="font-bebas font-normal tracking-[10px] text-white text-[115pt] uppercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          >
            WOKCOP STUDIO
          </h2>
        </div>
      </div>

      {/* Description Text */}
      <div className="max-w-[1400px] mx-auto text-center px-30 py-16">
        <p className="text-lg md:text-xl text-[#3d3c3b] uppercase whitespace-pre-wrap leading-relaxed tracking-wide font-bebas font-normal">
          {description || fallbackDescription}
        </p>
      </div>
    </section>
  );
}
