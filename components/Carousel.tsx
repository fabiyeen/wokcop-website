'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
  image: string;
  title: string;
  slug?: string;
  videoUrl?: string;
  hoverGifUrl?: string;
}

function getYouTubeEmbedUrl(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
}

interface Props {
  title: string;
  items: CarouselItem[];
  type: 'film' | 'commercial';
}

export default function Carousel({ title, items, type }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const safeItems = items && items.length > 0 ? items : [
    { image: '/LOGO%20WOKCOP.png', title: 'Example Project 1' },
    { image: '/LOGO%20WOKCOP.png', title: 'Example Project 2' },
    { image: '/LOGO%20WOKCOP.png', title: 'Example Project 3' },
  ];

  let displayItems = [...safeItems];
  while (displayItems.length < 5) {
    displayItems = [...displayItems, ...safeItems];
  }

  const next = () => setActiveIndex((prev) => (prev + 1) % displayItems.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 relative">
      <div className="mb-8">
        <h2 
          className="text-2xl md:text-3xl font-bold font-bebas uppercase tracking-widest text-wokcop-dark border-b-2 border-wokcop-dark inline-block pr-8 pb-1"
        >
          {title}
        </h2>
      </div>

      <div className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[1000px] h-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {displayItems.map((item, index) => {
              let offset = (index - activeIndex) % displayItems.length;
              if (offset > Math.floor(displayItems.length / 2)) {
                offset -= displayItems.length;
              } else if (offset < -Math.floor(displayItems.length / 2)) {
                offset += displayItems.length;
              }

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              let x = '0%';
              let opacity = 1;
              let zIndex = 0;
              
              if (isCenter) {
                x = '0%';
                zIndex = 10;
                opacity = 1;
              } else if (isLeft) {
                x = '-105%';
                zIndex = 5;
                opacity = 0.4;
              } else if (isRight) {
                x = '105%';
                zIndex = 5;
                opacity = 0.4;
              } else if (offset < 0) {
                x = '-210%';
                opacity = 0;
              } else {
                x = '210%';
                opacity = 0;
              }

              const hoverScale = 1.05;
              const hoverY = type === 'film' ? 16 : -16;

              return (
                <motion.div
                  key={index}
                  className={`absolute w-[300px] md:w-[450px] h-[220px] md:h-[320px] rounded-xl overflow-hidden shadow-xl ${isCenter ? 'group cursor-pointer' : ''}`}
                  initial={false}
                  animate={{ x, opacity, zIndex, y: 0, scale: 1 }}
                  whileHover={isCenter ? { scale: hoverScale, y: hoverY } : {}}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div 
                    className="relative w-full h-full"
                    onClick={() => {
                      if (isCenter && type === 'commercial' && (item.videoUrl || item.slug)) {
                        setLightboxUrl(item.videoUrl || item.slug || '');
                      }
                    }}
                  >
                    {isCenter && type === 'film' ? (
                      <Link href={`/film/${item.slug || encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`} className="block w-full h-full relative">
                        <Image
                          src={item.image}
                          alt={item.title || "Project image"}
                          fill
                          className={`object-cover z-0 transition-opacity duration-300 ${item.hoverGifUrl ? 'group-hover:opacity-0' : ''}`}
                          sizes="(max-width: 768px) 300px, 450px"
                          unoptimized
                        />
                        {item.hoverGifUrl && (
                          <Image
                            src={item.hoverGifUrl}
                            alt={`${item.title || "Project"} hover preview`}
                            fill
                            className="object-cover absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            unoptimized
                          />
                        )}
                        <div className="absolute z-30 bottom-0 w-full bg-black/80 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center">
                          <h3 className="text-white text-lg font-bebas font-bold uppercase tracking-wider text-center drop-shadow-md">
                            {item.title || "Untitled Project"}
                          </h3>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <Image
                          src={item.image}
                          alt={item.title || "Project image"}
                          fill
                          className={`object-cover z-0 transition-opacity duration-300 ${isCenter && item.hoverGifUrl ? 'group-hover:opacity-0' : ''}`}
                          sizes="(max-width: 768px) 300px, 450px"
                          unoptimized
                        />
                        {isCenter && item.hoverGifUrl && (
                          <Image
                            src={item.hoverGifUrl}
                            alt={`${item.title || "Project"} hover preview`}
                            fill
                            className="object-cover absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            unoptimized
                          />
                        )}
                        {isCenter && (
                          <div className="absolute z-30 bottom-0 w-full bg-black/80 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center">
                            <h3 className="text-white text-lg font-bebas font-bold uppercase tracking-wider text-center drop-shadow-md">
                              {item.title || "Untitled Project"}
                            </h3>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-wokcop-bg to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-wokcop-bg to-transparent z-20 pointer-events-none" />

        <button
          onClick={prev}
          className="absolute left-2 md:left-8 z-30 p-2 text-black hover:scale-110 transition-transform"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 md:w-14 md:h-14">
            <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-2 md:right-8 z-30 p-2 text-black hover:scale-110 transition-transform"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 md:w-14 md:h-14">
            <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {lightboxUrl && (
        <div 
          className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center p-12 md:p-24 pt-32 pb-16"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            onClick={() => setLightboxUrl(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 z-[101]"
            aria-label="Close Lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="w-full max-w-5xl aspect-video bg-black relative"
            onClick={(e) => e.stopPropagation()}
          >
            {getYouTubeEmbedUrl(lightboxUrl) ? (
              <iframe
                src={getYouTubeEmbedUrl(lightboxUrl)!}
                title="Commercial Video"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white">
                <p>No valid video URL provided.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
