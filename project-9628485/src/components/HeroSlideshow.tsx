import { useState, useEffect, useRef, useCallback } from 'react';

interface Slide {
  type: 'image' | 'video';
  src: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
  /** Pause without resetting, so playback resumes where it left off */
  paused?: boolean;
  /** Opacity of the dark overlay on top of the slides (0–1) */
  overlayOpacity?: number;
}

export default function HeroSlideshow({ slides, paused = false, overlayOpacity = 0.3 }: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Slide changed: start the new slide from the beginning
  useEffect(() => {
    clearTimer();

    const currentSlide = slides[activeIndex];

    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        video.currentTime = 0;
        if (!pausedRef.current) video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });

    if (currentSlide.type === 'image' && !pausedRef.current) {
      timeoutRef.current = setTimeout(goToNext, 5000);
    }

    return clearTimer;
  }, [activeIndex, slides, goToNext]);

  // Paused / resumed: keep the current slide and position
  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (paused) {
      video?.pause();
      clearTimer();
      return;
    }
    if (video) {
      video.play().catch(() => {});
    } else if (slides[activeIndex].type === 'image' && !timeoutRef.current) {
      timeoutRef.current = setTimeout(goToNext, 5000);
    }
  }, [paused, activeIndex, slides, goToNext]);

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
      <div
        className="absolute inset-0 bg-black z-[3] pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
