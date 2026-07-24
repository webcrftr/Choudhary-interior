import React, { useEffect, useState } from 'react';
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { PortfolioImage } from '../types';

interface PortfolioLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
  images: PortfolioImage[];
  currentIndex: number;
  onIndexChange: (idx: number) => void;
}

export default function PortfolioLightbox({
  isOpen,
  onClose,
  projectTitle = 'Portfolio Gallery',
  images,
  currentIndex,
  onIndexChange,
}: PortfolioLightboxProps) {
  const [zoom, setZoom] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    setZoom(1);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onIndexChange(prevIndex);
    setZoom(1);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    onIndexChange(nextIndex);
    setZoom(1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 transition-opacity duration-300"
      id="fullscreen-lightbox"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Lightbox Top Control Bar */}
      <div className="flex items-center justify-between py-2 px-2 sm:px-4 border-b border-white/10 select-none">
        <div className="flex items-center gap-3">
          {/* Clean header with no image titles or metadata */}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setZoom((prev) => Math.max(1, prev - 0.5))}
            className="text-zinc-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="text-zinc-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors hidden sm:block"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setZoom((prev) => Math.min(3, prev + 0.5))}
            className="text-zinc-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn size={18} />
          </button>

          <span className="text-xs font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
            {currentIndex + 1} / {images.length}
          </span>

          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-[#C9A227] p-2.5 rounded-full text-zinc-300 hover:text-black transition-all duration-300 ml-2"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Lightbox Image Stage */}
      <div className="flex-grow flex items-center justify-center relative overflow-hidden my-4">
        {/* Left Nav Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 bg-black/70 hover:bg-[#C9A227] border border-white/10 hover:border-transparent text-white hover:text-black p-4 rounded-full transition-all duration-300 hidden md:flex items-center justify-center shadow-2xl"
          aria-label="Previous Image"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          className="max-h-[80vh] max-w-[92vw] transition-transform duration-300 flex items-center justify-center relative"
          style={{ transform: `scale(${zoom})` }}
        >
          {currentImage && (
            <img
              src={currentImage.url}
              alt="Portfolio Photograph"
              className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl pointer-events-none select-none transition-opacity duration-300"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Right Nav Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-20 bg-black/70 hover:bg-[#C9A227] border border-white/10 hover:border-transparent text-white hover:text-black p-4 rounded-full transition-all duration-300 hidden md:flex items-center justify-center shadow-2xl"
          aria-label="Next Image"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Lightbox Footer */}
      <div className="text-center py-2 border-t border-white/10 select-none">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Use keyboard ← → to navigate • Swipe left/right on mobile • Press ESC to close
        </p>
      </div>
    </div>
  );
}
