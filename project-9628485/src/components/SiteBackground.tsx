import { useLocation } from 'react-router-dom';
import HeroSlideshow from './HeroSlideshow';

// Most videos are web-compressed MP4s in public/hero; the fresh-air hook clip and photos are on Supabase Storage
const slides = [
  {
    type: 'video' as const,
    src: 'https://wtfnqottifcsyqyayssq.supabase.co/storage/v1/object/public/portfolio/26.05.13_Get%20some%20fresh%20air%20hook.mov',
  },
  {
    type: 'video' as const,
    src: '/hero/fresh-air-run.mp4',
  },
  {
    type: 'video' as const,
    src: '/hero/training-day-highlight.mp4',
  },
  {
    type: 'video' as const,
    src: '/hero/combo-go-highlight.mp4',
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

const categoryPaths = ['/film-photography', '/photography', '/model-works'];

/**
 * Fullscreen slideshow that stays mounted across routes, so it keeps playing
 * from the home page into the category pages. On other pages (project detail,
 * 404) it is hidden and paused, then resumes where it left off.
 */
export default function SiteBackground() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isCategory = categoryPaths.includes(pathname);
  const visible = isHome || isCategory;

  return (
    <div
      className="fixed inset-0 z-0 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, visibility: visible ? 'visible' : 'hidden' }}
      aria-hidden="true"
    >
      <HeroSlideshow slides={slides} paused={!visible} overlayOpacity={isCategory ? 0.65 : 0.3} />
    </div>
  );
}
