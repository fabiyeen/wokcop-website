import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const abuget = localFont({
  src: '../public/fonts/Abuget.ttf',
  variable: '--font-abuget',
  display: 'swap',
});

const biggerDisplay = localFont({
  src: '../public/fonts/BiggerDisplay.otf',
  variable: '--font-bigger-display',
  display: 'swap',
});

const bebasNeue = localFont({
  src: '../public/fonts/BebasNeue-Regular.woff2',
  variable: '--font-bebas-neue',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WOKCOP — Official Site',
  description:
    'WOKCOP is a premium film production house dedicated to creating visually striking and emotionally resonant cinematic experiences.',
  keywords: [
    'WOKCOP',
    'Wokcop Pictures',
    'film production',
    'Wokcop Studio',
    'commercial',
    'filmography',
  ],
  openGraph: {
    title: 'WOKCOP — Official Site',
    description:
      'Premium film production house creating visually striking cinematic experiences.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${abuget.variable} ${biggerDisplay.variable} ${bebasNeue.variable} antialiased`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
