import { Link } from 'react-router-dom';
import { useFadeIn } from '../../hooks/useFadeIn';
import HeroSlideshow from './components/HeroSlideshow';

// Slides using Supabase Storage assets
const slides = [
  {
    type: 'video' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/26.05.13_Get%20some%20fresh%20air%20hook.mov',
  },
  {
    type: 'video' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/26.05.13_Get%20some%20fresh%20air%20run.mov',
  },
  {
    type: 'video' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/26.05.13_training%20day%20highlight.mov',
  },
  {
    type: 'video' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/26.05.13_combo%20go%20highlight.mov',
  },
  {
    type: 'video' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/25.08.12_The%20Daily%20Prophet.mov',
  },
  {
    type: 'image' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/SIM00625.jpg',
  },
  {
    type: 'image' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/SIM01882.jpg',
  },
  {
    type: 'image' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/SIM01955-2.jpg',
  },
  {
    type: 'image' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/SIM02201-2.jpg',
  },
];

export default function Home() {
  const link1Fade = useFadeIn(200);
  const link2Fade = useFadeIn(340);
  const link3Fade = useFadeIn(480);
  const bottomFade = useFadeIn(620);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fullscreen Slideshow Background */}
      <HeroSlideshow slides={slides} />

      {/* Navigation */}
      <nav className="relative z-10 w-full px-6 md:px-12 py-4 md:py-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-base md:text-xl font-light tracking-wider text-white cursor-pointer whitespace-nowrap"
        >
          Simon&apos;s World
        </Link>
        <div className="flex items-center gap-4 md:gap-10">
          <Link
            to="/film-photography"
            className="text-xs md:text-sm font-light tracking-wide text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            Film
          </Link>
          <Link
            to="/photography"
            className="text-xs md:text-sm font-light tracking-wide text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            Photography
          </Link>
          <Link
            to="/model-works"
            className="text-xs md:text-sm font-light tracking-wide text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            Model Works
          </Link>
        </div>
      </nav>

      {/* Main Content Overlay */}
      <div
        className="relative z-10 flex flex-col justify-end md:items-end px-6 md:px-12 pb-8 md:pb-12"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        {/* Category Links */}
        <div className="flex flex-col gap-4 md:gap-6 md:absolute md:left-12 md:top-1/2 md:-translate-y-1/2">
          <div style={link1Fade.style}>
            <Link to="/film-photography" className="group cursor-pointer">
              <div className="flex items-baseline gap-5">
                <h2
                  className="text-white leading-none transition-all duration-500 group-hover:text-[#B8CDD8]"
                  style={{
                    fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
                    fontWeight: 200,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  Film
                </h2>
                <i className="ri-arrow-right-up-line text-2xl text-white/0 group-hover:text-[#B8CDD8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 ml-auto"></i>
              </div>
            </Link>
          </div>

          <div className="w-full h-px bg-white/20"></div>

          <div style={link2Fade.style}>
            <Link to="/photography" className="group cursor-pointer">
              <div className="flex items-baseline gap-5">
                <h2
                  className="text-white leading-none transition-all duration-500 group-hover:text-[#B8CDD8]"
                  style={{
                    fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
                    fontWeight: 200,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  Photography
                </h2>
                <i className="ri-arrow-right-up-line text-2xl text-white/0 group-hover:text-[#B8CDD8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 ml-auto"></i>
              </div>
            </Link>
          </div>

          <div className="w-full h-px bg-white/20"></div>

          <div style={link3Fade.style}>
            <Link to="/model-works" className="group cursor-pointer">
              <div className="flex items-baseline gap-5">
                <h2
                  className="text-white leading-none transition-all duration-500 group-hover:text-[#B8CDD8]"
                  style={{
                    fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
                    fontWeight: 200,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  Model Works
                </h2>
                <i className="ri-arrow-right-up-line text-2xl text-white/0 group-hover:text-[#B8CDD8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 ml-auto"></i>
              </div>
            </Link>
          </div>
        </div>

        {/* Contact & Social + Copyright */}
        <div style={bottomFade.style} className="flex flex-col items-start gap-2 md:gap-4 mt-12 md:mt-0 w-full md:w-auto">
          <div className="flex items-start justify-between w-full md:flex-col md:items-end md:gap-4">
            <div className="flex items-center gap-3 md:order-1">
              <a
                href="https://www.instagram.com/sssmn.l/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-white/30 text-white/60 hover:text-white hover:border-white transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-base md:text-lg"></i>
              </a>
              <a
                href="mailto:lin890410@gmail.com"
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-white/30 text-white/60 hover:text-white hover:border-white transition-all cursor-pointer"
                aria-label="Email"
              >
                <i className="ri-mail-line text-base md:text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}