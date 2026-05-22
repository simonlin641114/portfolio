import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { modelWorksProjects, filmPhotographyProjects } from '../../mocks/portfolio-data';

export default function ProjectDetail() {
  const { id } = useParams();
  const allProjects = [...modelWorksProjects, ...filmPhotographyProjects];
  const project = allProjects.find(p => p.id === Number(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project?.videoUrl && project.videoUrl.includes('vimeo')) {
      const existing = document.querySelector('script[src="https://player.vimeo.com/api/player.js"]');
      if (!existing) {
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }
    }
    return undefined;
  }, [project?.videoUrl]);

  if (!project) {
    return <div>Project not found</div>;
  }

  const isVideo = project.type === 'video';
  const hasImages = project.images && project.images.length > 0;
  const isPortrait = (project as any).videoAspectRatio === 'portrait';

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const relatedProjects = allProjects
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E86B2C' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#E86B2C' }}>
        <div className="w-full px-4 md:px-12 py-4 md:py-6 flex items-center justify-between">
          <Link to="/" className="text-lg md:text-xl font-light tracking-wider text-white cursor-pointer whitespace-nowrap">
            Simon&apos;s World
          </Link>
          <div className="flex items-center gap-4 md:gap-12">
            <Link to="/model-works" className="text-xs md:text-sm font-light tracking-wide text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer">
              Model Works
            </Link>
            <Link to="/film-photography" className="text-xs md:text-sm font-light tracking-wide text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer">
              Film &amp; Photography
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 md:pt-32 px-4 md:px-12 pb-20">
        {/* Project Header */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex items-center justify-center text-sm text-white/60">
            <span className="font-light">{project.year}</span>
          </div>
        </div>

        {/* Video Player */}
        {isVideo && project.videoUrl && (
          <div className={`mx-auto mb-20 w-full ${isPortrait ? 'max-w-sm' : 'max-w-5xl'}`}>
            <div
              className="relative rounded-xl md:rounded-2xl overflow-hidden bg-black"
              style={{ paddingBottom: isPortrait ? '177.78%' : '56.25%' }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={project.videoUrl}
                title={project.title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Image Gallery with Carousel */}
        {hasImages && (
          <div className="max-w-5xl mx-auto mb-20">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-black/20 mb-6">
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

              {/* Navigation Buttons */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer text-white"
                    aria-label="Previous image"
                  >
                    <i className="ri-arrow-left-line text-xl"></i>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer text-white"
                    aria-label="Next image"
                  >
                    <i className="ri-arrow-right-line text-xl"></i>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {project.images.length > 1 && (
              <div className="flex items-center justify-center gap-3">
                {project.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      index === currentImageIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
