import { Link } from 'react-router-dom';
import { filmPhotographyProjects } from '../../mocks/portfolio-data';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function FilmPhotography() {
  const gridFade = useFadeIn(180);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E86B2C' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#E86B2C' }}>
        <div className="w-full px-6 md:px-12 py-3 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
          <Link to="/" className="text-base md:text-xl font-light tracking-wider text-white cursor-pointer text-center md:text-left">
            Simon&apos;s World
          </Link>
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <Link to="/film-photography" className="text-xs md:text-sm font-light tracking-wide text-white border-b border-white/60 pb-0.5 whitespace-nowrap cursor-pointer">
              Film
            </Link>
            <Link to="/photography" className="text-xs md:text-sm font-light tracking-wide text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer">
              Photography
            </Link>
            <Link to="/model-works" className="text-xs md:text-sm font-light tracking-wide text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer">
              Model Works
            </Link>
          </div>
        </div>
      </nav>

      {/* Content - Mobile: full-bleed seamless stack / Desktop: grid */}

      {/* Mobile List */}
      <div className="md:hidden pt-16" style={gridFade.style}>
        {filmPhotographyProjects.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className="block relative w-full cursor-pointer"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              {/* Dark gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              {/* Title & Date bottom-left */}
              <div className="absolute bottom-3 left-4">
                <h3 className="text-sm font-semibold text-white leading-snug">{project.title}</h3>
                <p className="text-xs text-white/60 font-light mt-0.5">{project.year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:block pt-32 px-12 pb-20">
        <div className="grid grid-cols-3 gap-8" style={gridFade.style}>
          {filmPhotographyProjects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden mb-4 transition-all duration-300 group-hover:-translate-y-1">
                <div className="relative w-full aspect-[4/3]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              </div>
              <div className="px-2">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white leading-snug">{project.title}</h3>
                  <i className="ri-arrow-right-line text-xl text-white/70 transition-transform group-hover:translate-x-1 group-hover:text-white"></i>
                </div>
                <p className="text-xs text-white/40 font-light mt-1">{project.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
