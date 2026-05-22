import { useState, useEffect, useRef, useCallback } from 'react';

interface Slide {
  type: 'image' | 'video';
  src: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
}

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const currentSlide = slides[activeIndex];

    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });

    if (currentSlide.type === 'image') {
      timeoutRef.current = setTimeout(goToNext, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, slides, goToNext]);

  const handleVideoEnded = () => {
    goToNext();
  };

  if (slides.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: idx === activeIndex ? 1 : 0,
            zIndex: idx === activeIndex ? 2 : 1,
          }}
        >
          {slide.type === 'video' ? (
            <video
              ref={(el) => { videoRefs.current[idx] = el; }}
              src={slide.src}
              muted
              playsInline
              preload="auto"
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
            />
          ) : (
            <img
              src={slide.src}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
            />
          )}
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-[3] pointer-events-none" />
    </div>
  );
}