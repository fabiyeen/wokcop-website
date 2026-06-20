'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CarouselItem {
  image: string;
  title: string;
  slug?: string;
  videoUrl?: string;
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

  // If no items, provide a fallback
  const safeItems = items && items.length > 0 ? items : [
    { image: '/LOGO%20WOKCOP.png', title: 'Example Project 1' },
    { image: '/LOGO%20WOKCOP.png', title: 'Example Project 2' },
    { image: '/LOGO%20WOKCOP.png', title: 'Example Project 3' },
  ];

  // To make the infinite math work nicely, we need at least 5 items.
  // We'll duplicate the array if it's too small.
  let displayItems = [...safeItems];
  while (displayItems.length < 5) {
    displayItems = [...displayItems, ...safeItems];
  }

  const next = () => setActiveIndex((prev) => (prev + 1) % displayItems.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 relative">
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-medium uppercase tracking-widest text-wokcop-dark border-b-2 border-wokcop-dark inline-block pr-8 pb-1" style={{ fontFamily: 'BebasNeue, Arial, sans-serif' }}>
          {title}
        </h2>
      </div>

      <div className="relative w-full h-[280px] md:h-[350px] flex items-center justify-center overflow-hidden">
        
        {/* Carousel Items Container */}
        <div className="relative w-full max-w-[900px] h-full flex items-center justify-center">
          {displayItems.map((item, index) => {
            // Calculate shortest distance to activeIndex in a circular array
            let offset = (index - activeIndex) % displayItems.length;
            if (offset > Math.floor(displayItems.length / 2)) {
              offset -= displayItems.length;
            } else if (offset < -Math.floor(displayItems.length / 2)) {
              offset += displayItems.length;
            }

            // Determine position and visibility
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = isCenter || isLeft || isRight;

            let x = '0%';
            let scale = 1;
            let opacity = 1;
            let zIndex = 0;

            if (isCenter) {
              x = '0%';
              scale = 1;
              zIndex = 10;
              opacity = 1;
            } else if (isLeft) {
              x = '-105%';
              scale = 1;
              zIndex = 5;
              opacity = 1;
            } else if (isRight) {
              x = '105%';
              scale = 1;
              zIndex = 5;
              opacity = 1;
            } else if (offset === -2) {
              x = '-70%';
              scale = 0.8;
              zIndex = 4;
              opacity = 1;
            } else if (offset === 2) {
              x = '70%';
              scale = 0.8;
              zIndex = 4;
              opacity = 1;
            } else if (offset === -3) {
              x = '-30%';
              scale = 0.6;
              zIndex = 3;
              opacity = 1;
            } else if (offset === 3) {
              x = '30%';
              scale = 0.6;
              zIndex = 3;
              opacity = 1;
            } else {
              x = '0%';
              scale = 0.4;
              opacity = 0;
              zIndex = 0;
            }

            // Hover animation values based on type
            const hoverScale = 1.05;
            const hoverY = type === 'film' ? 16 : -16;

            return (
              <motion.div
                key={index}
                className={`absolute w-[280px] md:w-[380px] h-[200px] md:h-[260px] rounded-xl overflow-hidden shadow-xl ${isCenter ? 'group cursor-pointer' : ''}`}
                initial={false}
                animate={{ x, scale, opacity, zIndex, y: 0 }}
                whileHover={isCenter ? { scale: hoverScale, y: hoverY } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ originX: 0.5, originY: 0.5 }}
              >
                {/* If Center & Film -> Link to Film Page */}
                {isCenter && type === 'film' ? (
                  <Link href={`/film/${item.slug || encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`} className="block w-full h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 300px, 400px"
                        unoptimized
                      />
                      <div className="absolute bottom-0 w-full bg-black/80 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-center">
                        <h3 className="text-white text-lg font-bold uppercase tracking-wider text-center" style={{ fontFamily: 'BebasNeue, Impact, sans-serif' }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div 
                    className="relative w-full h-full"
                    onClick={() => {
                      if (isCenter && type === 'commercial') {
                        setLightboxUrl(item.videoUrl || item.slug || '');
                      }
                    }}
                  >
                    {isCenter && type === 'commercial' && (item.videoUrl || item.slug) ? (
                      <div className="absolute inset-0 z-0 pointer-events-none">
                        <iframe
                          src={`${getYouTubeEmbedUrl(item.videoUrl || item.slug || '')}&mute=1&controls=0`}
                          title={item.title}
                          className="absolute top-0 left-0 w-full h-full object-cover scale-[1.3]"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover z-0"
                        sizes="(max-width: 768px) 300px, 400px"
                        unoptimized
                      />
                    )}
                    
                    {isCenter && (
                      <div className="absolute z-10 bottom-0 w-full bg-black/80 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center justify-center pointer-events-none">
                        <h3 className="text-white text-lg font-bold uppercase tracking-wider text-center" style={{ fontFamily: 'BebasNeue, Impact, sans-serif' }}>
                          {item.title}
                        </h3>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Left/Right Fades to match the cream background */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-wokcop-bg to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-wokcop-bg to-transparent z-20 pointer-events-none" />

        {/* Navigation Arrows */}
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

      {/* Lightbox Modal */}
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
