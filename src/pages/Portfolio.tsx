import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Sparkles } from 'lucide-react';
import { portfolioProjects } from '../data/projects';
import { PortfolioImage } from '../types';
import PortfolioLightbox from '../components/PortfolioLightbox';

export default function Portfolio() {
  const [activeLightbox, setActiveLightbox] = useState<{
    projectLabel: string;
    images: PortfolioImage[];
    currentIndex: number;
  } | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, []);

  const openLightbox = (projectLabel: string, images: PortfolioImage[], index: number) => {
    setActiveLightbox({
      projectLabel,
      images,
      currentIndex: index,
    });
  };

  return (
    <div className="bg-[#121212] text-[#F5F2ED] pt-28 pb-24 min-h-screen font-sans selection:bg-[#C9A227] selection:text-black" id="portfolio-page">
      {/* Portfolio Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 text-center" id="portfolio-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-[#C9A227] text-xs font-mono uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
            <Sparkles size={13} className="text-[#C9A227]" />
            Completed Works & Concepts
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-light tracking-tight text-white uppercase mb-6">
            Interior Portfolio
          </h1>
          <div className="w-12 h-[1px] bg-[#C9A227]/40 mb-6" />
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            A visual gallery of bespoke interior designs crafted with architectural precision and timeless luxury.
          </p>
        </motion.div>
      </section>

      {/* Projects List: Collection 01 to Collection 10 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 md:space-y-36" id="projects-container">
        {portfolioProjects.map((project, projectIdx) => {
          const projectLabel = project.label || `Project ${String(projectIdx + 1).padStart(2, '0')}`;
          const images = project.images || [];
          const heroImage = images[0];
          const remainingImages = images.slice(1);

          return (
            <motion.article
              key={project.id || projectIdx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative scroll-mt-28"
              id={project.id}
            >
              {/* Small Minimal Project Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs md:text-sm font-mono text-[#C9A227] uppercase tracking-[0.3em] font-medium">
                    {projectLabel}
                  </span>
                  {project.badge && (
                    <span className="border border-[#C9A227]/40 bg-black/60 text-[#C9A227] px-3 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase">
                      {project.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                  {images.length} Photographs
                </span>
              </div>

              {/* Project Image Gallery Grid */}
              <div className="space-y-4 md:space-y-6">
                {/* Featured Large Hero Image */}
                {heroImage && (
                  <div
                    onClick={() => openLightbox(projectLabel, images, 0)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl bg-zinc-900 border border-white/5 hover:border-[#C9A227]/40 transition-all duration-500 shadow-2xl"
                    id={`project-${project.id}-hero-image`}
                  >
                    <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden relative">
                      <img
                        src={heroImage.url}
                        alt={projectLabel}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Expand Icon */}
                      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-white group-hover:bg-[#C9A227] group-hover:text-black p-3 rounded-full transition-all duration-300 transform group-hover:scale-110 opacity-0 group-hover:opacity-100">
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Grid of Supporting Images */}
                {remainingImages.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {remainingImages.map((img, imgIdx) => {
                      const actualIdx = imgIdx + 1;
                      return (
                        <div
                          key={imgIdx}
                          onClick={() => openLightbox(projectLabel, images, actualIdx)}
                          className="group relative cursor-pointer overflow-hidden rounded-xl bg-zinc-900 border border-white/5 hover:border-[#C9A227]/40 transition-all duration-500 shadow-lg"
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden relative">
                            <img
                              src={img.url}
                              alt={projectLabel}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white group-hover:bg-[#C9A227] group-hover:text-black p-2 rounded-full transition-all duration-300">
                                <Maximize2 size={14} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightbox && (
        <PortfolioLightbox
          isOpen={!!activeLightbox}
          onClose={() => setActiveLightbox(null)}
          projectTitle={activeLightbox.projectLabel}
          images={activeLightbox.images}
          currentIndex={activeLightbox.currentIndex}
          onIndexChange={(idx) =>
            setActiveLightbox((prev) => (prev ? { ...prev, currentIndex: idx } : null))
          }
        />
      )}
    </div>
  );
}
