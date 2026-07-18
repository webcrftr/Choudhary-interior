/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const whatsappNumber = '918793306513';
  const whatsappMessage = encodeURIComponent(
    'Hello Choudhary Interior Studio, I would like to book a luxury interior design consultation for my space.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col gap-3" id="floating-actions-container">
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="h-12 w-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        aria-label="Chat on WhatsApp"
        id="floating-whatsapp"
      >
        <MessageSquare size={20} className="fill-current" />
      </motion.a>

      {/* Call Button */}
      <motion.a
        href="tel:+918793306513"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="h-12 w-12 bg-[#C9A227] hover:bg-[#b08d20] text-black rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        aria-label="Call Choudhary Interior"
        id="floating-phone-call"
      >
        <Phone size={20} className="fill-current" />
      </motion.a>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="h-12 w-12 bg-zinc-900 border border-white/10 hover:border-[#C9A227] text-white hover:text-[#C9A227] rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            aria-label="Scroll to top"
            id="floating-scroll-top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
