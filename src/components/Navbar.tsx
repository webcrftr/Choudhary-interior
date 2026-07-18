/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
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
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#121212]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <NavLink to="/" className="flex-shrink-0" id="nav-logo-link">
              <Logo />
            </NavLink>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8" id="desktop-nav-menu">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  className={({ isActive }) =>
                    `relative text-sm tracking-[0.18em] uppercase font-sans font-medium transition-colors duration-300 py-2 hover:text-[#C9A227] ${
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

            {/* CTA Button (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4" id="nav-cta-group">
              <a
                href="tel:+918793306513"
                className="flex items-center gap-2 text-xs tracking-wider text-zinc-300 hover:text-[#C9A227] transition-all duration-300 font-mono"
                id="nav-phone-call"
              >
                <Phone size={14} className="text-[#C9A227]" />
                +91 8793306513
              </a>
              <NavLink
                to="/contact"
                className="relative overflow-hidden group px-5 py-2.5 bg-[#C9A227] text-black hover:text-white rounded-sm text-xs font-sans tracking-[0.15em] uppercase font-semibold transition-all duration-500"
                id="nav-consultation-btn"
              >
                <span className="relative z-10">Book Consultation</span>
                <span className="absolute inset-0 bg-[#1A110B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4" id="nav-mobile-toggle-group">
              <a
                href="tel:+918793306513"
                className="p-2 text-zinc-300 hover:text-[#C9A227] transition-colors"
                aria-label="Call"
              >
                <Phone size={18} />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                id="mobile-menu-toggle-btn"
                className="p-2 rounded-md text-zinc-300 hover:text-[#C9A227] transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="md:hidden bg-[#121212]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-8 space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    id={`mobile-nav-link-${link.name.toLowerCase()}`}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base tracking-[0.2em] uppercase font-medium transition-all ${
                        isActive
                          ? 'text-[#C9A227] bg-white/5'
                          : 'text-zinc-300 hover:text-[#C9A227] hover:bg-white/5'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <div className="pt-4 border-t border-white/5 flex flex-col gap-4 px-3" id="mobile-nav-cta">
                  <a
                    href="tel:+918793306513"
                    className="flex items-center gap-3 text-zinc-300 font-mono text-sm"
                  >
                    <Phone size={16} className="text-[#C9A227]" />
                    +91 8793306513
                  </a>
                  <NavLink
                    to="/contact"
                    className="w-full text-center py-3 bg-[#C9A227] text-black font-semibold tracking-[0.2em] uppercase text-xs rounded-sm hover:bg-white hover:text-black transition-colors"
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
