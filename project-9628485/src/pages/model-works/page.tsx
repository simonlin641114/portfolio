import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFadeIn } from '../../hooks/useFadeIn';

type MediaItem =
  | { id: number; type: 'image'; src: string; alt: string }
  | { id: number; type: 'youtube'; videoId: string; alt: string; customThumbnail?: string };

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: 'youtube',
    videoId: 'NtjxK6RAs-k',
    alt: 'Model Works Video',
  },
  {
    id: 2,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/7fe9777843e60405674edb50476c7879.jpeg',
    alt: 'Model Works',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/52a470c49acf941a9e3259ff23f971b0.jpeg',
    alt: 'Model Works',
  },
  {
    id: 4,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/3967bca5adab3957321f4c8bd27317af.jpeg',
    alt: 'Model Works',
  },
  {
    id: 6,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/1dee225c5e162032e600eac92daaeea0.jpeg',
    alt: 'Model Works',
  },
  {
    id: 7,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/0e139a5a4e2ed6104b251227fb8842e9.jpeg',
    alt: 'Model Works',
  },
  {
    id: 8,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/94337822a2665d98ce6d63f27478e30e.jpeg',
    alt: 'Model Works',
  },
  {
    id: 9,
    type: 'youtube',
    videoId: 'WTn0ep1UgJM',
    alt: 'Model Works Video',
    customThumbnail: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/0e5e538e92ada009fb3d9b14084c81e0.jpeg',
  },
  {
    id: 10,
    type: 'youtube',
    videoId: 'PxkXn54lvEU',
    alt: 'Model Works Video',
    customThumbnail: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/b7bfd747b55cb21d503455e51f820e99.jpeg',
  },
  {
    id: 11,
    type: 'youtube',
    videoId: 'Vh66ms1GckE',
    alt: 'Model Works Video',
  },
  {
    id: 12,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/adb05cd630f1d6f8517ec5c09f96c587.jpeg',
    alt: 'Model Works',
  },
  {
    id: 13,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/7dee5924decdb87a7c9432baee3c9647.jpeg',
    alt: 'Model Works',
  },
  {
    id: 14,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/41ffc1225c8a050692543992ad04cb98.jpeg',
    alt: 'Model Works',
  },
  {
    id: 15,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/c517ec26f8d246e85434ef24d1754b12.jpeg',
    alt: 'Model Works',
  },
  {
    id: 16,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/845a315973b1d6d1eebaf6003f1e3610.jpeg',
    alt: 'Model Works',
  },
  {
    id: 17,
    type: 'youtube',
    videoId: '59s-e_7QOIY',
    alt: 'Model Works Video',
    customThumbnail: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/ec3f79944d4a7a764ff17ea589ab515f.jpeg',
  },
  {
    id: 18,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/c9a79d536d8b930a8ce257fc94c9eba9.jpeg',
    alt: 'Model Works',
  },
  {
    id: 19,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/526281e679f05beee663b7c4c60c5865.jpeg',
    alt: 'Model Works',
  },
  {
    id: 20,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/1cf853b2765147e1d04e815ca5bfcb7b.jpeg',
    alt: 'Model Works',
  },
  {
    id: 21,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/dd447b342fa9fe014ad991ef25d90746.jpeg',
    alt: 'Model Works',
  },
  {
    id: 22,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/7dc68bd9d365d5de48dcdf403d8b224a.jpeg',
    alt: 'Model Works',
  },
  {
    id: 23,
    type: 'image',
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/8385e2324e3ea1b69dcebdabe65fa888.jpeg',
    alt: 'Model Works',
  },
];

function getThumbnail(item: MediaItem): string {
  if (item.type === 'image') return item.src;
  if (item.customThumbnail) return item.customThumbnail;
  return `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`;
}

export default function ModelWorks() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gridFade = useFadeIn(80);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveIndex(null);
    document.body.style.overflow = '';
  };

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + mediaItems.length) % mediaItems.length);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % mediaItems.length);
  }, [activeIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, goPrev, goNext]);

  const activeItem = activeIndex !== null ? mediaItems[activeIndex] : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E86B2C' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#E86B2C' }}>
        <div className="w-full px-6 md:px-12 py-3 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
          <Link to="/" className="text-base font-light tracking-wider text-white cursor-pointer text-center md:text-left">
            Simon&apos;s World
          </Link>
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <Link
              to="/film-photography"
              className="text-xs md:text-sm font-light tracking-wide text-white/60 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Film
            </Link>
            <Link
              to="/photography"
              className="text-xs md:text-sm font-light tracking-wide text-white/60 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Photography
            </Link>
            <Link
              to="/model-works"
              className="text-xs md:text-sm font-light tracking-wide text-white border-b border-white pb-0.5 whitespace-nowrap cursor-pointer"
            >
              Model Works
            </Link>
          </div>
        </div>
      </nav>

      {/* Masonry Grid */}
      <div className="pt-20 md:pt-20 px-4 md:px-8 pb-16" style={gridFade.style}>
        {mediaItems.length > 0 && (
          <div
            style={{
              columnCount: 4,
              columnGap: '24px',
            }}
          >
            {mediaItems.map((item, index) => (
              <div
                key={item.id}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '24px',
                  display: 'inline-block',
                  width: '100%',
                  position: 'relative',
                }}
                onClick={() => openLightbox(index)}
                className="cursor-pointer group"
              >
                <img
                  src={getThumbnail(item)}
                  alt={item.alt}
                  className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-80"
                  style={{ display: 'block' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (item.type === 'youtube' && target.src.includes('maxresdefault')) {
                      target.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {activeItem !== null && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-8 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
            onClick={closeLightbox}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-close-line" style={{ fontSize: '28px' }} />
            </div>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest font-light">
            {activeIndex + 1} / {mediaItems.length}
          </div>

          {/* Prev button */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <i className="ri-arrow-left-line" style={{ fontSize: '28px' }} />
            </div>
          </button>

          {/* Next button */}
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <i className="ri-arrow-right-line" style={{ fontSize: '28px' }} />
            </div>
          </button>

          {/* Content */}
          <div
            className="flex items-center justify-center px-10 md:px-20"
            style={{ maxHeight: '90vh', maxWidth: '100vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.type === 'youtube' ? (
              <div style={{ width: '92vw', maxWidth: '960px', aspectRatio: '16/9' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${activeItem.videoId}?autoplay=1&rel=0`}
                  title={activeItem.alt}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ display: 'block' }}
                />
              </div>
            ) : (
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                style={{
                  maxHeight: '90vh',
                  maxWidth: '92vw',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
