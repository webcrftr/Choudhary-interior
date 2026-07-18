/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  HeartHandshake,
  DollarSign,
  ArrowRight,
  ArrowUpRight,
  Sofa,
  BedDouble,
  CookingPot,
  Grid,
  Layers,
  Tv,
  Briefcase,
  Building,
  Utensils,
  Coffee,
  Key
} from 'lucide-react';
import { MapPin, Camera, ChevronRight } from 'lucide-react';
import { projectsData as defaultProjects } from '../data/projects';
import { Project } from '../types';

// Animated Count Up Component
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // ~60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 border-r border-white/5 last:border-r-0 md:border-r" id={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[#C9A227] tracking-tight mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-xs md:text-sm tracking-[0.2em] text-zinc-400 uppercase font-medium">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('choudhary_studio_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects([...defaultProjects, ...parsed]);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setProjects(defaultProjects);
  }, []);

  const featuredProjects = projects.slice(0, 4);

  // Why choose us items
  const whyChooseUs = [
    {
      icon: Sparkles,
      title: 'Customized Designs',
      desc: '100% tailor-made plans designed down to your posture, styling preferences, and family habits.'
    },
    {
      icon: ShieldCheck,
      title: 'Premium Materials',
      desc: 'Only authentic Saint-Gobain gypsum, Italian Statuario, Blum hardware, and marine-grade plywood.'
    },
    {
      icon: Award,
      title: 'Expert Team',
      desc: 'Highly trained interior architects, PVD coating experts, and master carpenters led by Abdullah.'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      desc: 'Pre-fabricated off-site module carpentry ensures we hand over keys exactly on or ahead of schedule.'
    },
    {
      icon: DollarSign,
      title: 'Affordable Luxury',
      desc: 'Direct workshop sourcing means we cut builder margins to offer you pristine five-star results honestly.'
    },
    {
      icon: HeartHandshake,
      title: '100% Client Satisfaction',
      desc: 'Zero-stress turnkey process with weekly video logs, visual checklist alignments, and prompt feedback.'
    }
  ];

  // Hero Background Image
  // Using our generated luxury_living_room image
  const heroImage = '/src/assets/images/luxury_living_room_1784009174690.jpg';

  return (
    <div className="bg-[#121212] text-[#F5F2ED] overflow-hidden" id="home-page-root">
      
      {/* 1. HERO SECTION WITH IMAGE PARALLAX BACKGROUND */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" id="hero-section">
        {/* Fullscreen Backdrop with subtle dark-overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxury Interior Living Room Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
            style={{ filter: 'brightness(0.45)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
            id="hero-badge"
          >
            <Sparkles size={14} className="text-[#C9A227]" />
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-zinc-300">
              Choudhary Interior Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-medium tracking-tight text-white mb-6 leading-[1.1]"
            id="hero-title"
          >
            Luxury Interiors <br />
            <span className="text-[#C9A227] font-normal italic">Crafted With Perfection</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="text-zinc-400 text-sm sm:text-lg md:text-xl max-w-2xl font-sans font-light tracking-wide mb-10 leading-relaxed"
            id="hero-subtitle"
          >
            Transforming houses into timeless, high-end living spaces. Structured with premium marble, gold trim, and beautiful dark woods.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
            id="hero-cta-buttons"
          >
            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-[#C9A227] hover:bg-[#b08d20] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl"
            >
              Explore Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-[#C9A227] font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>

        {/* Floating Mouse indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" id="scroll-indicator">
          <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Scroll</span>
          <div className="w-[1.5px] h-8 bg-gradient-to-b from-[#C9A227] to-transparent animate-bounce" />
        </div>
      </section>

      {/* 2. WHY CHOOSE US SECTION */}
      <section className="py-24 bg-[#121212] relative border-b border-white/5" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C9A227] text-xs font-mono tracking-[0.4em] uppercase block mb-3">
              The Studio Standard
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-white uppercase">
              Why Discerning Clients Choose Us
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C9A227] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, borderColor: 'rgba(201, 162, 39, 0.3)' }}
                className="p-8 glass rounded-lg transition-all duration-300 hover:shadow-2xl hover:border-[#C9A227]/30"
              >
                <div className="h-12 w-12 bg-zinc-900 border border-white/10 rounded-md flex items-center justify-center text-[#C9A227] mb-6">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-sans font-medium text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="py-24 bg-[#121212] relative border-b border-white/5" id="projects-grid-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="text-[#C9A227] text-xs font-mono tracking-[0.4em] uppercase block mb-3">
                Craftsmanship
              </span>
              <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-white uppercase">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="text-xs font-sans tracking-[0.2em] text-[#C9A227] hover:text-white uppercase font-bold flex items-center gap-2 group transition-all"
            >
              View All Completed Projects
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {featuredProjects.map((project, idx) => {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative overflow-hidden glass rounded-xl flex flex-col justify-between hover:border-[#C9A227]/30 hover:shadow-2xl transition-all duration-500"
                  id={`project-card-${project.id}`}
                >
                  {/* Card Cover image backdrop */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    
                    {/* Category Pill Tag */}
                    <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#C9A227]/30 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#C9A227] rounded-sm">
                      {project.category}
                    </span>

                    {/* Photo count indicator */}
                    <span className="absolute bottom-4 right-4 bg-zinc-950/90 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-zinc-300 rounded-sm flex items-center gap-1.5">
                      <Camera size={11} className="text-[#C9A227]" />
                      <span>{project.galleryImages.length} Photos</span>
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-zinc-950/40">
                    <div>
                      {project.location && (
                        <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1.5">
                          <MapPin size={11} className="text-zinc-500 shrink-0" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      <h3 className="text-lg font-sans font-medium text-white group-hover:text-[#C9A227] transition-all duration-300 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed mt-2 line-clamp-2 font-light">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        Area: {project.area}
                      </span>
                      <Link
                        to={`/portfolio?project=${project.id}`}
                        className="px-3.5 py-2 bg-transparent hover:bg-[#C9A227] text-[#C9A227] hover:text-black border border-[#C9A227]/20 hover:border-transparent text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>View Project</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. STATISTICS SECTION */}
      <section className="py-20 bg-[#121212] border-b border-white/5 relative" id="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value={100} suffix="+" label="Completed Projects" />
            <StatCounter value={8} suffix="+" label="Years Experience" />
            <StatCounter value={150} suffix="+" label="Happy Clients" />
            <StatCounter value={20} suffix="+" label="Professional Team" />
          </div>
        </div>
      </section>

      {/* 5. PREMIUM CTA BANNER */}
      <section className="py-24 bg-gradient-to-r from-[#1A110B] via-[#121212] to-[#1A110B] border-t border-white/5 text-center relative" id="cta-section">
        {/* Abstract pattern lines in background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C9A227 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl font-sans font-medium tracking-tight text-white uppercase mb-6">
            Need Your Dream Home?
          </h2>
          <p className="text-[#C9A227] text-lg sm:text-2xl font-sans tracking-wide italic mb-10 max-w-2xl font-light">
            Book a Free Interior Consultation with Abdullah Choudhary today.
          </p>
          <Link
            to="/contact"
            className="px-10 py-5 bg-[#C9A227] hover:bg-white hover:text-black text-black font-semibold tracking-[0.25em] uppercase text-xs transition-all duration-500 rounded-sm shadow-2xl flex items-center gap-2 group cursor-pointer"
            id="cta-contact-btn"
          >
            Contact Our Studio
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      
    </div>
  );
}
