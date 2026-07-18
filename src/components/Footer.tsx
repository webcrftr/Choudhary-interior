/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Linkedin, ExternalLink } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ];

  const projects = [
    { name: 'Modern 3BHK Apartment', path: '/portfolio?project=modern-3bhk-mumbai' },
    { name: 'Luxury Villa Pune', path: '/portfolio?project=luxury-villa-pune' },
    { name: 'Contemporary Flat Delhi', path: '/portfolio?project=contemporary-flat-delhi' },
    { name: 'Premium Duplex Hyderabad', path: '/portfolio?project=premium-duplex-hyderabad' }
  ];

  return (
    <footer id="main-footer" className="bg-[#0a0a0a] border-t border-white/10 pt-20 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Information */}
        <div className="flex flex-col space-y-6" id="footer-col-brand">
          <Link to="/" id="footer-logo-link">
            <Logo size="lg" />
          </Link>
          <p className="text-sm leading-relaxed text-zinc-400">
            Designing sophisticated, bespoke living spaces. We craft architectural perfection that transforms daily living into a luxurious experience.
          </p>
          <div className="flex items-center space-x-4" id="footer-social-links">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 hover:border-[#C9A227] text-zinc-300 hover:text-[#C9A227] transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 hover:border-[#C9A227] text-zinc-300 hover:text-[#C9A227] transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-white/10 hover:border-[#C9A227] text-zinc-300 hover:text-[#C9A227] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-6" id="footer-col-quicklinks">
          <h4 className="text-white text-sm font-semibold tracking-[0.2em] uppercase border-l-2 border-[#C9A227] pl-3">
            Navigation
          </h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-[#C9A227] hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Portfolio Projects Links */}
        <div className="flex flex-col space-y-6" id="footer-col-projects">
          <h4 className="text-white text-sm font-semibold tracking-[0.2em] uppercase border-l-2 border-[#C9A227] pl-3">
            Projects
          </h4>
          <ul className="space-y-3 text-sm">
            {projects.map((project) => (
              <li key={project.name}>
                <Link
                  to={project.path}
                  className="hover:text-[#C9A227] hover:translate-x-1 transition-all duration-300 inline-block text-zinc-400"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio Location & Contacts */}
        <div className="flex flex-col space-y-6 text-sm" id="footer-col-contact">
          <h4 className="text-white text-sm font-semibold tracking-[0.2em] uppercase border-l-2 border-[#C9A227] pl-3">
            Studio
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#C9A227] shrink-0 mt-0.5" />
              <span>
                Shop No.19, Ashokvan,<br />
                Vasant Karishma, Vasai City,<br />
                Maharashtra - 401202
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#C9A227]" />
              <a href="tel:+918793306513" className="hover:text-[#C9A227] transition-colors">
                +91 8793306513
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#C9A227]" />
              <a href="mailto:choudharyinterior1@gmail.com" className="hover:text-[#C9A227] transition-colors break-all">
                choudharyinterior1@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={16} className="text-[#C9A227]" />
              <span>Mon - Sat: 10:00 AM - 08:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans tracking-wide">
        <p className="text-zinc-500" id="footer-copyright-text">
          &copy; {currentYear} Choudhary Interior Studio. All rights reserved.
        </p>
        <div className="flex items-center gap-1 text-zinc-500" id="footer-designer-credit">
          <span>Principal Designer:</span>
          <span className="text-[#C9A227] font-medium uppercase tracking-wider">Abdullah Choudhary</span>
        </div>
      </div>
    </footer>
  );
}
