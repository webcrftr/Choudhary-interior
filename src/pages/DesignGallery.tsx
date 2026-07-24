import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Sparkles, Bath } from 'lucide-react';
import { luxuryBathroomDesigns } from '../data/bathroomDesigns';
import { PortfolioImage } from '../types';
import PortfolioLightbox from '../components/PortfolioLightbox';

export default function DesignGallery() {
  const [activeLightbox, setActiveLightbox] = useState<{
    projectLabel: string;
    images: PortfolioImage[];
    currentIndex: number;
  } | null>(null);

  const openLightbox = (projectLabel: string, images: PortfolioImage[], index: number) => {
    setActiveLightbox({
      projectLabel,
      images,
      currentIndex: index,
    });
  };

  return (
    <div className="bg-[#121212] text-[#F5F2ED] pt-28 pb-24 min-h-screen font-sans selection:bg-[#C9A227] selection:text-black" id="design-gallery-page">
      {/* Design Gallery Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 text-center" id="design-gallery-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-[#C9A227] text-xs font-mono uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
            <Sparkles size={13} className="text-[#C9A227]" />
            Curated Inspiration Showcase
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-light tracking-tight text-white uppercase mb-6">
            Design Gallery
          </h1>
          <div className="w-12 h-[1px] bg-[#C9A227]/40 mb-6" />
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Explore curated design inspiration galleries showcasing bespoke material palettes, room concepts, and luxury architectural details.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Luxury Bathroom Designs */}
        <section id="luxury-bathroom-designs-section" className="scroll-mt-28">
          <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-6 md:p-10 lg:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden">
            {/* Subtle gold ambient lighting accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[32rem] h-40 bg-[#C9A227]/10 blur-3xl rounded-full pointer-events-none" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 relative z-10">
              <span className="text-[#C9A227] text-xs font-mono uppercase tracking-[0.4em] mb-3 inline-flex items-center gap-2">
                <Bath size={14} className="text-[#C9A227]" />
                Curated Concept Gallery
              </span>
              <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight text-white uppercase mb-4">
                Luxury Bathroom Designs
              </h2>
              <div className="w-12 h-[1px] bg-[#C9A227]/40 mx-auto mb-5" />
              <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed">
                A curated gallery of elegant bathroom concepts featuring premium materials, timeless finishes, modern fixtures, and sophisticated design details.
              </p>
            </div>

            {/* 4 cols Desktop, 2 cols Tablet, 1 col Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {luxuryBathroomDesigns.map((item, idx) => (
                <motion.div
                  key={`bathroom-${idx}`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 8) * 0.04 }}
                  onClick={() =>
                    openLightbox('Luxury Bathroom Designs', luxuryBathroomDesigns, idx)
                  }
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-black border border-white/10 hover:border-[#C9A227]/60 transition-all duration-500 shadow-xl"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img
                      src={item.url}
                      alt={`Luxury Bathroom Concept ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Expand Icon */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/15 text-white group-hover:bg-[#C9A227] group-hover:text-black p-2 rounded-full transition-all duration-300 transform group-hover:scale-110 opacity-0 group-hover:opacity-100">
                      <Maximize2 size={15} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
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
