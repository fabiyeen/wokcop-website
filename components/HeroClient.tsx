'use client';

import { useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroClientProps {
  bgImage1Url?: string;
  bgImage2Url?: string;
}

const FALLBACK_BG_1 =
  'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2000&auto=format&fit=crop';
const FALLBACK_BG_2 =
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop';

export default function HeroClient({ bgImage1Url, bgImage2Url }: HeroClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const bg1 = bgImage1Url || FALLBACK_BG_1;
  const bg2 = bgImage2Url || FALLBACK_BG_2;

  /* Parallax mouse tracking */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || !textRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    const nx = ((e.clientX - left) / width - 0.5) * 2;
    const ny = ((e.clientY - top) / height - 0.5) * 2;
    textRef.current.style.transform = `translate3d(${nx * 14}px, ${ny * 8}px, 0)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!textRef.current) return;
    textRef.current.style.transform = 'translate3d(0px, 0px, 0)';
  }, []);

  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: '58vh', minHeight: '380px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero section"
    >
      {/* Two images side by side */}
      <div className="absolute inset-0 grid grid-cols-2" aria-hidden="true">
        {/* Left image */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${bg1}')`,
              filter: 'grayscale(100%) contrast(125%) brightness(0.60)',
            }}
          />
          <div 
            className="absolute inset-0 mix-blend-color opacity-70 pointer-events-none" 
            style={{ backgroundColor: '#486e7a' }} 
          />
        </div>
        {/* Right image */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${bg2}')`,
              filter: 'grayscale(100%) contrast(125%) brightness(0.60)',
            }}
          />
          <div 
            className="absolute inset-0 mix-blend-color opacity-70 pointer-events-none" 
            style={{ backgroundColor: '#486e7a' }} 
          />
        </div>
      </div>

      {/* Subtle dark overlay for text legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'rgba(0,0,0,0.18)' }}
        aria-hidden="true"
      />

      {/* Hero text — centered over both images */}
      <motion.div 
        className="relative z-[10] flex flex-col items-center justify-center text-center px-6 select-none w-full"
        style={{ opacity: titleOpacity }}
      >
        <div
          ref={textRef}
          style={{ transition: 'transform 0.08s linear', willChange: 'transform' }}
          className="flex flex-col items-center"
        >
          {/* "Welcome to" — Abuget script font */}
          <motion.span
            className="text-[clamp(32px,4vw,60px)] text-white leading-none z-10 -mb-1 md:-mb-5 drop-shadow-md"
            style={{
              fontFamily: 'Abuget, "Brush Script MT", cursive',
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            Welcome to
          </motion.span>

          {/* "WOKCOP" — BiggerDisplay font */}
          <motion.h1
            className="text-[clamp(80px,12vw,200px)] text-white leading-none uppercase drop-shadow-xl"
            style={{
              fontFamily: 'BiggerDisplay, Impact, "Arial Narrow Bold", sans-serif',
              fontWeight: 900,
              letterSpacing: '-0.01em',
              transform: 'scaleY(1.1)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            WOKCOP
          </motion.h1>

          {/* "OFFICIAL SITE" — BiggerDisplay font */}
          <motion.span
            className="text-[clamp(14px,1.5vw,24px)] tracking-[0.46em] text-white/80 uppercase -mt-2 md:-mt-4 drop-shadow-md"
            style={{
              fontFamily: 'BiggerDisplay, Impact, "Arial Narrow Bold", sans-serif',
              fontWeight: 600,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
            OFFICIAL SITE
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}