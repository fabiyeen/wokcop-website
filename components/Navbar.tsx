'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'NEWS', href: '/news' },
  { label: 'PRESS RELEASE', href: '/press-release' },
  { label: 'FILM', href: '/#film' },
  { label: 'COMMERCIAL', href: '/#commercial' },
] as const;

interface NavbarProps {
  transparentOnTop?: boolean;
}

export default function Navbar({ transparentOnTop = false }: NavbarProps) {
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparentOnTop) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparentOnTop]);

  const isTransparent = transparentOnTop && !scrolled;

  return (
    <nav
      className={`sticky top-0 z-[100] flex items-center justify-center transition-all duration-300 ${!isTransparent ? 'border-b border-black/10 shadow-md' : ''}`}
      style={{ 
        backgroundColor: isTransparent ? 'transparent' : '#F5EFE6', 
        paddingTop: '10px', 
        paddingBottom: '10px', 
        paddingLeft: '40px', 
        paddingRight: '40px' 
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center" style={{ gap: '40px' }}>
        {/* Logo — immediately to the left of the links */}
        <Link href="/" className="shrink-0 flex items-center" aria-label="WOKCOP — Home">
          {!logoError ? (
            <span className="relative block transition-all duration-300" style={{ width: '64px', height: '64px', filter: isTransparent ? 'invert(1) brightness(2)' : 'none' }}>
              <Image
                src="/LOGO WOKCOP.png"
                alt="WOKCOP"
                fill
                className="object-contain"
                priority
                onError={() => setLogoError(true)}
              />
            </span>
          ) : (
            <span
              className="font-black tracking-[0.18em] text-xl uppercase"
              style={{ fontFamily: 'BiggerDisplay, Arial, sans-serif' }}
            >
              WOKCOP
            </span>
          )}
        </Link>

        {/* Nav links + CONTACT US */}
        <ul
          className="hidden md:flex items-center justify-center list-none m-0 p-0"
          style={{ gap: '40px' }}
          role="menubar"
        >
          {navLinks.map(({ label, href }) => (
            <li key={label} role="none">
              <Link
                href={href}
                role="menuitem"
                className={`text-[13pt] font-normal uppercase hover:opacity-50 transition-all duration-300 whitespace-nowrap ${isTransparent ? 'text-white drop-shadow-md' : 'text-wokcop-dark'}`}
                style={{ letterSpacing: '0.05em', fontFamily: 'BebasNeue, Arial, sans-serif' }}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* CONTACT US pill */}
          <li role="none">
            <a
              id="navbar-contact-btn"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=fabianabubakar1125@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11.08pt] font-normal uppercase rounded-full whitespace-nowrap transition-all duration-300 active:scale-95 ${isTransparent ? 'bg-white/20 text-white hover:bg-white hover:text-black backdrop-blur-sm' : 'hover:opacity-80'}`}
              style={
                !isTransparent 
                ? {
                  backgroundColor: '#C8C3BC',
                  color: '#1A1A1A',
                  letterSpacing: '0.05em',
                  padding: '8px 24px',
                  fontFamily: 'BebasNeue, Arial, sans-serif',
                }
                : {
                  letterSpacing: '0.05em',
                  padding: '8px 24px',
                  fontFamily: 'BebasNeue, Arial, sans-serif',
                }
              }
              aria-label="Contact WOKCOP via email"
            >
              CONTACT US
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
