import React from 'react';
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface PortfolioLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  currentIndex: number;
  onIndexChange: (idx: number) => void;
  zoom: number;
  onZoomChange: (zoom: number | ((z: number) => number)) => void;
}

export default function PortfolioLightbox({
  isOpen,
  onClose,
  project,
  currentIndex,
  onIndexChange,
  zoom,
  onZoomChange,
}: PortfolioLightboxProps) {
  if (!isOpen) return null;

  const currentImage = project.galleryImages[currentIndex];

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + project.galleryImages.length) % project.galleryImages.length;
    onIndexChange(prevIndex);
    onZoomChange(1);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % project.galleryImages.length;
    onIndexChange(nextIndex);
    onZoomChange(1);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4"
      id="fullscreen-lightbox"
    >
      {/* Lightbox Header */}
      <div className="flex items-center justify-between py-2 px-4 border-b border-white/5">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#C9A227] tracking-wider block">
            {project.title}
          </span>
          <span className="text-white text-xs font-semibold">
            {currentImage?.title || 'Gallery'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onZoomChange((prev) => Math.max(1, prev - 0.5))}
            className="text-zinc-400 hover:text-white p-2"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={() => onZoomChange((prev) => Math.min(3, prev + 0.5))}
            className="text-zinc-400 hover:text-white p-2"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>

          <span className="text-xs font-mono text-zinc-500">
            {currentIndex + 1} / {project.galleryImages.length}
          </span>

          <button
            onClick={onClose}
            className="bg-white/5 hover:bg-white/15 p-2 rounded-full text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Lightbox Content Image */}
      <div className="flex-grow flex items-center justify-center relative overflow-hidden my-4">
        <button
          onClick={handlePrev}
          className="absolute left-4 z-10 bg-black/60 hover:bg-[#C9A227] border border-white/10 hover:border-transparent text-white hover:text-black p-3.5 rounded-full transition-colors hidden md:block"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          className="max-h-[75vh] max-w-[90vw] transition-transform duration-300 flex items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          {currentImage && (
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl pointer-events-none select-none transition-opacity duration-300"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 z-10 bg-black/60 hover:bg-[#C9A227] border border-white/10 hover:border-transparent text-white hover:text-black p-3.5 rounded-full transition-colors hidden md:block"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Lightbox Footer */}
      <div className="text-center py-4 border-t border-white/5">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Use keyboard ← → to navigate or swipe left/right on mobile. Tap escape or close to exit.
        </p>
      </div>
    </div>
  );
}
