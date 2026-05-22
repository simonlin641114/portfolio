import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFadeIn } from '../../hooks/useFadeIn';

const photos = [
  {
    id: 14,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/ec819561cdf1e1dea6bde70045deb243.jpeg',
    alt: 'Jumping Nike shoes foggy mountain portrait',
  },
  {
    id: 1,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/3805dd0cdcf890db593ece6465b15d48.jpeg',
    alt: 'Cross necklace',
  },
  {
    id: 2,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/0e04ca994b435a22d30e1ca65741bc0b.jpeg',
    alt: 'Rooftop figure',
  },
  {
    id: 3,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/d597707825c407c6e23e50bad3a43e2c.jpeg',
    alt: 'Bridge portrait',
  },
  {
    id: 18,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/bdef7963-3a26-4907-8af6-80091561c8e6_SIM01359.jpg?v=6db7531ac8a94f88212c12461f8a67fe',
    alt: 'SIM01359 portrait',
  },
  {
    id: 4,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/aacc6003188b8e2b85908196a79f70c7.jpeg',
    alt: 'Riverside portrait',
  },
  {
    id: 5,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/a0983d1db05a82b0695a91574895b337.jpeg',
    alt: 'Overpass fashion portrait',
  },
  {
    id: 6,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/4fd71f6f5141872ed570a6011ad5504c.jpeg',
    alt: 'Wall bouquet portrait',
  },
  {
    id: 24,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/940608de-be93-4b36-bec6-23bd2344c4ea_SIM02132.jpg?v=e44a0ee9bb0bd710b0eb21a4f651b3e4',
    alt: 'SIM02132 portrait',
  },
  {
    id: 7,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/84fc064842b2c6a83ce257ab53a619f0.jpeg',
    alt: 'Bouquet face portrait',
  },
  {
    id: 20,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/a61488b1-4578-4dd6-a639-b1b6513b8839_SIM01391.jpg?v=db49cfcae3471767ef899367aec367a7',
    alt: 'SIM01391 portrait',
  },
  {
    id: 8,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/a0e598dad19936624fa0ee8fe5a9c969.jpeg',
    alt: 'Concrete building standing portrait',
  },
  {
    id: 9,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/b1d3cad39f4c28096015f3e0fd381e20.jpeg',
    alt: 'Sitting wall bouquet portrait',
  },
  {
    id: 10,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/41b9302039d26b202e7130b5c68e0489.jpeg',
    alt: 'Tying shoes stormy sky portrait',
  },
  {
    id: 23,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/02203d5c-3fad-41ab-b8f7-4e9861ccc447_SIM01882.jpg?v=d852b7ee09ca7014aec494e9fd6efc1b',
    alt: 'SIM01882 portrait',
  },
  {
    id: 17,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/a1f1ed25-cb35-44d6-8cf7-b6802e9286df_SIM01172.jpg?v=a6696349b5b328fcc8bec1c9d7e10809',
    alt: 'SIM01172 portrait',
  },
  {
    id: 11,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/e5893f396288c74e5bbbd7d52d79f61d.jpeg',
    alt: 'Nike Pro shield sunglasses portrait',
  },
  {
    id: 25,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/7840e492-9942-4350-9e5f-accfbdd17491_SIM02288.jpg?v=6f4618cf825523518b5c4a0b561c6da7',
    alt: 'SIM02288 portrait',
  },
  {
    id: 12,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/fc17a9adfff9226be94c4bd1a5e7883f.jpeg',
    alt: 'Nike shoes grassland action portrait',
  },
  {
    id: 13,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/69871d31e7dd1f0f98af2dcfc0ca737b.jpeg',
    alt: 'Running uphill grassland back view',
  },
  {
    id: 19,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/5ecef517-52cd-46f4-bde9-e9460b781062_SIM01386.jpg?v=b07f5d1db4e5a02fab5bf8b3e427a3d4',
    alt: 'SIM01386 portrait',
  },
  {
    id: 15,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/4fa7e2b3985f26d573d5e88554bb61f4.jpeg',
    alt: 'Nike Pro mountain grassland wide portrait',
  },
  {
    id: 16,
    src: 'https://static.readdy.ai/image/b290264234a056df4191074a7ef54686/716dc6dc64cf8482795e7d2653ad864e.jpeg',
    alt: 'Denim jacket backpack carousel portrait',
  },
  {
    id: 22,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/73a468ec-7e61-4689-aca6-66f8edf16410_SIM01880.jpg?v=5f4a1d0b6405ff73b2e34aa656b8a413',
    alt: 'SIM01880 portrait',
  },
  {
    id: 26,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/72efa504-e2b5-4fbc-af6f-4afb9d6636d4_SIM02206.jpg?v=28ce6ea376eb4d5d6a8435fc7808d462',
    alt: 'SIM02206 portrait',
  },
  {
    id: 21,
    src: 'https://storage.readdy-site.link/project_files/50e5a307-2aaf-4cb2-bdb1-623cca6d9d7f/7beda4c4-c6b7-4ac2-b57a-7b9794ea889c_SIM01955-2.jpg?v=8bfd0c01ef0f6bc334007705095a2f8b',
    alt: 'SIM01955-2 portrait',
  },
];

export default function Photography() {
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
    setActiveIndex((activeIndex - 1 + photos.length) % photos.length);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % photos.length);
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
              className="text-xs md:text-sm font-light tracking-wide text-white border-b border-white pb-0.5 whitespace-nowrap cursor-pointer"
            >
              Photography
            </Link>
            <Link
              to="/model-works"
              className="text-xs md:text-sm font-light tracking-wide text-white/60 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Model Works
            </Link>
          </div>
        </div>
      </nav>

      {/* Masonry Photo Grid */}
      <div className="pt-20 px-4 md:px-8 pb-16" style={gridFade.style}>
        <div
          style={{
            columnCount: 4,
            columnGap: '24px',
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              style={{
                breakInside: 'avoid',
                marginBottom: '24px',
                display: 'inline-block',
                width: '100%',
              }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto block cursor-pointer transition-opacity duration-300 hover:opacity-80"
                style={{ display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
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
            {activeIndex + 1} / {photos.length}
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

          {/* Image */}
          <div
            className="flex items-center justify-center px-20"
            style={{ maxHeight: '90vh', maxWidth: '90vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              style={{
                maxHeight: '88vh',
                maxWidth: '80vw',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
