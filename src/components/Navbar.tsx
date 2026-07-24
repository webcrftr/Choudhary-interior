/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Design Gallery', path: '/design-gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#121212]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop 3-Column Layout (Hidden on Mobile/Tablet < lg) */}
          <div className="hidden lg:grid grid-cols-12 items-center h-16 w-full" id="desktop-navbar-grid">
            {/* 1. Left Column: Brand Logo */}
            <div className="col-span-3 flex items-center justify-start min-w-0">
              <NavLink to="/" className="flex-shrink-0 flex items-center" id="nav-logo-link">
                <Logo size="sm" />
              </NavLink>
            </div>

            {/* 2. Center Column: Perfectly Centered Nav Links */}
            <div className="col-span-6 flex items-center justify-center gap-4 xl:gap-7 min-w-0" id="desktop-nav-menu">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) =>
                    `relative text-[11px] xl:text-xs tracking-[0.14em] xl:tracking-[0.18em] uppercase font-sans font-medium transition-colors duration-300 py-2 whitespace-nowrap hover:text-[#C9A227] ${
                      isActive ? 'text-[#C9A227]' : 'text-zinc-300'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavBorder"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A227]"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* 3. Right Column: Phone Number & Book Consultation Button */}
            <div className="col-span-3 flex items-center justify-end gap-3 xl:gap-5 min-w-0" id="nav-cta-group">
              <a
                href="tel:+918793306513"
                className="hidden xl:flex items-center gap-2 text-[11px] tracking-wider text-zinc-300 hover:text-[#C9A227] transition-all duration-300 font-mono whitespace-nowrap"
                id="nav-phone-call"
              >
                <Phone size={13} className="text-[#C9A227]" />
                +91 8793306513
              </a>
              <NavLink
                to="/contact"
                className="relative overflow-hidden group px-4 xl:px-5 py-2.5 bg-[#C9A227] text-black hover:text-white rounded-sm text-[11px] font-sans tracking-[0.12em] xl:tracking-[0.15em] uppercase font-semibold transition-all duration-500 whitespace-nowrap flex-shrink-0"
                id="nav-consultation-btn"
              >
                <span className="relative z-10">Book Consultation</span>
                <span className="absolute inset-0 bg-[#1A110B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </NavLink>
            </div>
          </div>

          {/* Mobile & Tablet Layout (< lg) */}
          <div className="flex lg:hidden items-center justify-between h-14" id="mobile-navbar-bar">
            {/* Logo */}
            <NavLink to="/" className="flex-shrink-0" id="mobile-nav-logo">
              <Logo size="sm" />
            </NavLink>

            {/* Actions: Phone Icon & Hamburger Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3" id="nav-mobile-toggle-group">
              <a
                href="tel:+918793306513"
                className="p-2 text-zinc-300 hover:text-[#C9A227] transition-colors rounded-full bg-white/5 border border-white/10"
                aria-label="Call Studio"
              >
                <Phone size={16} className="text-[#C9A227]" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                id="mobile-menu-toggle-btn"
                className="p-2 rounded-lg text-zinc-300 hover:text-[#C9A227] bg-white/5 border border-white/10 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-[#121212]/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="px-5 pt-4 pb-8 space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    id={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm tracking-[0.2em] uppercase font-medium transition-all ${
                        isActive
                          ? 'text-[#C9A227] bg-[#C9A227]/10 border border-[#C9A227]/30'
                          : 'text-zinc-300 hover:text-[#C9A227] hover:bg-white/5'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3 px-2" id="mobile-nav-cta">
                  <a
                    href="tel:+918793306513"
                    className="flex items-center justify-center gap-3 text-zinc-300 font-mono text-xs py-2 bg-white/5 rounded-lg border border-white/10"
                  >
                    <Phone size={14} className="text-[#C9A227]" />
                    +91 8793306513
                  </a>
                  <NavLink
                    to="/contact"
                    className="w-full text-center py-3 bg-[#C9A227] text-black font-semibold tracking-[0.2em] uppercase text-xs rounded-lg hover:bg-white transition-colors shadow-lg"
                  >
                    Book Consultation
                  </NavLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
