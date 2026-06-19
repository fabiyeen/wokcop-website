import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
interface FilmProject {
  title: string;
  director?: string;
  heroImage?: any;
  posterImage?: any;
  premise?: string;
  logline?: string;
  trailerUrl?: string;
  synopsis?: string;
  cast?: string;
  productionYear?: string;
  availableOn?: string;
}

function getYouTubeEmbedUrl(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
}

export const revalidate = 0;

export default async function FilmDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let film: FilmProject | null = null;

  try {
    film = await client.fetch<FilmProject | null>(
      `*[_type == "filmProject" && slug.current == $slug][0]{
        title,
        director,
        heroImage,
        posterImage,
        premise,
        logline,
        trailerUrl,
        synopsis,
        cast,
        productionYear,
        availableOn
      }`,
      { slug },
      { cache: 'no-store' }
    );
  } catch (err) {
    console.error('Failed to fetch film project:', err);
  }

  if (!film) {
    // Show 404 if the film doesn't exist
    notFound();
  }

  const posterImageUrl = film?.posterImage?.asset?._ref 
    ? urlFor(film.posterImage).width(600).url() 
    : (film?.heroImage?.asset?._ref ? urlFor(film.heroImage).width(600).url() : null);
    
  const heroImageUrl = film?.heroImage?.asset?._ref 
    ? urlFor(film.heroImage).width(1920).url() 
    : (film?.posterImage?.asset?._ref ? urlFor(film.posterImage).width(1920).url() : null);

  console.log('[Sanity Debug]', {
    title: film?.title,
    posterImageUrl,
    heroImageUrl,
    posterImageRaw: film?.posterImage,
  });

  return (
    <main className="min-h-screen bg-wokcop-bg text-wokcop-dark font-sans relative">
      <Navbar transparentOnTop={true} />

      {/* Hero Section (Fades) */}
      <div className="relative w-full h-[55vh] -mt-[84px]">
        {/* We use -mt-[84px] to pull the image up under the transparent navbar */}
        {heroImageUrl ? (
          <Image 
            src={heroImageUrl} 
            alt={`${film.title} Hero Background`} 
            fill 
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-black/20" />
        )}
        
        {/* Left and Right fades */}
        <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-wokcop-bg to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-wokcop-bg to-transparent pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-wokcop-bg to-transparent pointer-events-none" />
      </div>

      {/* Content Section: 2 Columns (Pulled down onto the clear background fade) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24 flex flex-col md:flex-row gap-12 md:gap-16 -mt-8 md:-mt-12">
        
        {/* Left Column: Poster */}
        <div className="shrink-0 w-full max-w-[300px] mx-auto md:mx-0 aspect-[2/3] bg-[#222] rounded flex items-center justify-center relative overflow-hidden shadow-2xl">
          {posterImageUrl ? (
            <Image 
              src={posterImageUrl} 
              alt={`${film.title} Poster`} 
              fill 
              className="object-cover md:object-contain rounded-xl shadow-2xl"
              unoptimized
            />
          ) : (
            <p className="text-white/80 font-bold tracking-widest text-lg">
              [POSTER]
            </p>
          )}
        </div>

        {/* Right Column: Text Details */}
        <div className="flex-grow flex flex-col gap-8 pt-0">

          {/* Title & Director */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-bold">{film.title}</span>
              {film.director && (
                <span className="font-semibold text-wokcop-dark/80">directed by {film.director}</span>
              )}
            </h1>
          </div>
          
          {/* Premise */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Premise</h3>
            <p className="text-lg md:text-xl leading-relaxed text-wokcop-dark/80 font-medium">
              {film.premise || 'No premise available.'}
            </p>
          </div>

          {/* Logline */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Logline</h3>
            <p className="text-lg md:text-xl leading-relaxed text-wokcop-dark/80 font-medium">
              {film.logline || 'No logline available.'}
            </p>
          </div>
          
        </div>
      </div>

      {/* --- Section 2 --- */}
      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-20 border-t border-wokcop-dark/10">
        
        {/* Video Player */}
        <div className="w-full aspect-video bg-[#222] rounded-xl flex items-center justify-center mb-12 shadow-2xl overflow-hidden relative">
          {film.trailerUrl && getYouTubeEmbedUrl(film.trailerUrl) ? (
            <iframe
              src={getYouTubeEmbedUrl(film.trailerUrl)!}
              title="Official Trailer"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : film.trailerUrl ? (
            <p className="text-white">Trailer link provided is not a supported YouTube URL.</p>
          ) : (
            <div className="text-center">
              <p className="text-white/80 font-bold tracking-widest text-lg">[OFFICIAL TRAILER]</p>
              <p className="text-white/50 text-sm mt-2">LINK TO YOUTUBE</p>
            </div>
          )}
        </div>

        {/* Synopsis */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Synopsis</h2>
          {film.synopsis ? (
            <div className="text-lg md:text-xl leading-relaxed text-wokcop-dark/80 font-medium space-y-6">
              {film.synopsis.split('\n').map((paragraph, index) => (
                paragraph.trim() ? <p key={index}>{paragraph}</p> : null
              ))}
            </div>
          ) : (
            <p className="text-lg md:text-xl leading-relaxed text-wokcop-dark/80 font-medium italic">
              No synopsis available.
            </p>
          )}
        </div>
        
      </div>

      {/* --- Section 3 --- */}
      <div className="w-full max-w-5xl mx-auto px-6 py-12 pb-24 md:py-20 md:pb-32 flex justify-between gap-12 text-wokcop-dark font-sans">
        
        {/* Left Side: Cast */}
        <div className="max-w-xl flex-grow">
          <h2 className="text-xl font-bold mb-2 inline-block border-b-2 border-wokcop-dark pb-0.5">Cast</h2>
          {film.cast ? (
            <p className="text-lg leading-relaxed text-wokcop-dark/80 font-medium whitespace-pre-wrap">
              {film.cast}
            </p>
          ) : (
            <p className="text-lg leading-relaxed text-wokcop-dark/80 font-medium italic">
              No cast information.
            </p>
          )}
        </div>

        {/* Right Side: Production Year & Available On */}
        <div className="flex flex-col items-end text-right min-w-[200px] gap-8">
          
          <div>
            <h2 className="text-xl font-bold mb-2 inline-block border-b-2 border-wokcop-dark pb-0.5">Production Year</h2>
            <p className="text-lg leading-relaxed text-wokcop-dark/80 font-medium">
              {film.productionYear || 'TBA'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 inline-block border-b-2 border-wokcop-dark pb-0.5">Available on</h2>
            <p className="text-lg leading-relaxed text-wokcop-dark/80 font-medium">
              {film.availableOn || 'TBA'}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
