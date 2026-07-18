/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext
}: LightboxProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Reset zoom on index change
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe left (next) or right (prev)
    if (diff > 50) {
      onNext();
    } else if (diff < -50) {
      onPrev();
    }
    setTouchStart(null);
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 2 : 1));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4"
        id="lightbox-backdrop"
      >
        {/* Top bar controls */}
        <div className="flex items-center justify-between text-white py-2 px-4 z-10" id="lightbox-topbar">
          <span className="font-mono text-xs tracking-widest text-[#C9A227]">
            {currentIndex + 1} / {images.length}
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleZoom}
              className="p-2 hover:text-[#C9A227] transition-colors cursor-pointer"
              title="Zoom Image"
            >
              {zoomLevel === 1 ? <ZoomIn size={20} /> : <ZoomOut size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:text-[#C9A227] transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Main image container */}
        <div
          className="flex-1 flex items-center justify-center relative select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          id="lightbox-image-viewer"
        >
          {/* Navigation - Left Arrow */}
          <button
            onClick={onPrev}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#C9A227] text-white transition-all z-10 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Core Image Display with animated scale / opacity */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-[75vh] md:max-h-[80vh] flex items-center justify-center overflow-hidden"
          >
            <img
              src={images[currentIndex]}
              alt={`Gallery item ${currentIndex + 1}`}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </motion.div>

          {/* Navigation - Right Arrow */}
          <button
            onClick={onNext}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#C9A227] text-white transition-all z-10 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Bottom index indicator strip */}
        <div className="flex justify-center gap-2 overflow-x-auto py-4 px-8 z-10" id="lightbox-thumbnails">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx !== currentIndex) {
                  // Direct jump
                  const diff = idx - currentIndex;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext();
                  } else {
                    for (let i = 0; i < Math.abs(diff); i++) onPrev();
                  }
                }
              }}
              className={`h-12 w-16 md:h-16 md:w-24 shrink-0 rounded border-2 overflow-hidden transition-all duration-300 ${
                idx === currentIndex ? 'border-[#C9A227] opacity-100 scale-105' : 'border-transparent opacity-40 hover:opacity-80'
              }`}
            >
              <img
                src={img}
                alt={`Thumb ${idx}`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
