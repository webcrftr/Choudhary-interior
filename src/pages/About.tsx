/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Compass, Target, Landmark, CheckCircle, Award } from 'lucide-react';

export default function About() {
  const profileImage = '/src/assets/images/abdullah_choudhary_1784009190446.jpg';

  const timeline = [
    {
      year: '2018',
      title: 'Studio Foundation',
      desc: 'Abdullah Choudhary establishes Choudhary Interior Studio in Vasai, offering bespoke home makeover consultations to clients in Mumbai suburbs.'
    },
    {
      year: '2020',
      title: 'Workshop Expansion',
      desc: 'Opened a dedicated 3,000 sq ft manufacturing and pre-fabrication carpentry workshop in Vasai to ensure complete quality control over our raw materials and delivery speeds.'
    },
    {
      year: '2022',
      title: 'Commercial Milestone',
      desc: 'Delivered our first major multi-level corporate workspace (Fintech HQ) in Andheri, receiving awards for biophilic acoustic workspace design.'
    },
    {
      year: '2024',
      title: 'Luxury Portfolio Integration',
      desc: 'Expanded deep into premium villas and duplex penthouses across Juhu, Worli Sea Face, and Lonavala. Gained traction as a top-tier Mumbai-region studio.'
    },
    {
      year: '2026',
      title: 'Pioneering Future Standards',
      desc: 'Launched digital turnkey status logs, integrated smart home technology standards, and established direct Italian supply lines for high-quality stone and veneers.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission',
      desc: 'To deliver uncompromising spatial elegance, custom-tailored to our clients’ daily routines, utilizing pristine materials and flawless carpentry.'
    },
    {
      icon: Compass,
      title: 'Vision',
      desc: 'To set the benchmark for luxury interior architecture in Western India, recognized for our stress-free turnkey process and breathtaking layouts.'
    },
    {
      icon: Shield,
      title: 'Aesthetic Honesty',
      desc: 'We prioritize raw stones, authentic veneers, high-end PVD gold metals, and clean architectural lines over temporary cheap trends.'
    }
  ];

  return (
    <div className="bg-[#121212] text-[#F5F2ED] pt-24 overflow-hidden" id="about-page-root">
      
      {/* 1. LARGE BANNER */}
      <section className="relative py-28 md:py-36 bg-[#121212] border-b border-white/5" id="about-hero">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C9A227 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#C9A227] text-xs font-mono tracking-[0.4em] uppercase block mb-3"
          >
            The Legacy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium uppercase tracking-tight text-white mb-6"
          >
            Our Story & Philosophy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-[2px] bg-[#C9A227] mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-400 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed font-light font-sans"
          >
            Choudhary Interior Studio represents a pursuit of architectural perfection. We believe that an interior is not just furniture; it is an intimate expression of soul and luxury living.
          </motion.p>
        </div>
      </section>

      {/* 2. COMPANY STORY, MISSION, VISION, VALUES */}
      <section className="py-24 bg-[#121212] relative border-b border-white/5" id="about-story-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-[#C9A227] text-xs font-mono tracking-[0.3em] uppercase block">
              EST. 2018
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-white">
              Shaping Timeless Spaces
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Founded by principal designer Abdullah Choudhary, Choudhary Interior Studio has evolved from a small suburban consultation desk into one of Mumbai’s most sought-after full-service interior firms. Operating with our own dedicated state-of-the-art manufacturing workshop in Vasai, we eliminate intermediate builder markups and maintain absolute control over every wooden fluted panel, steel frame, and custom upholstery joint.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              We specialize in blending the moodiest dark tones — high-contrast matte black, warm off-white, and rich dark wood brown — highlighted by meticulous brass and PVD gold metal trimmings. This distinct aesthetic palette forms the foundation of our design signature, rendering every home with a rich sense of calm luxury.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 gap-6"
          >
            {values.map((v, idx) => (
              <div
                key={idx}
                className="p-6 glass rounded-lg flex items-start gap-4 hover:border-[#C9A227]/20 transition-all"
              >
                <div className="h-10 w-10 shrink-0 bg-zinc-900 border border-white/10 rounded-md flex items-center justify-center text-[#C9A227]">
                  <v.icon size={18} />
                </div>
                <div>
                  <h3 className="text-white font-sans font-medium text-base mb-2">
                    {v.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 3. MEET ABDULLAH CHOUDHARY */}
      <section className="py-24 bg-[#121212] border-b border-white/5 relative" id="founder-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Founder Image Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
            id="founder-image-container"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#C9A227]/30 to-transparent rounded-lg blur-md opacity-70" />
            <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden rounded-lg border border-white/10">
              <img
                src={profileImage}
                alt="Abdullah Choudhary - Principal Interior Designer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay with Gold Text */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 text-center">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C9A227] block mb-1">
                  Principal Interior Designer
                </span>
                <span className="text-lg font-sans font-medium uppercase tracking-widest text-white block">
                  Abdullah Choudhary
                </span>
              </div>
            </div>
          </motion.div>

          {/* Founder Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
            id="founder-bio"
          >
            <span className="text-[#C9A227] text-xs font-mono tracking-[0.4em] uppercase block">
              The Visionary
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-white leading-tight">
              Meet Abdullah Choudhary
            </h2>
            <div className="w-12 h-[1px] bg-[#C9A227] my-4" />
            
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              "Luxury is not about clutter or expensive pricing. It is about spatial harmony, the touch of a perfectly aligned solid wood molding, the warmth of hidden lights reflecting off Italian veins, and an unwavering respect for the client’s lifestyle. At Choudhary Interior Studio, we approach design as an art form and a promise."
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              With over 8 years of personal experience in high-end luxury interiors, Abdullah oversees every project personally. From the first structural pencil sketch to the selection of marble lots at quarry yards, his attention to detail ensures that the final result remains completely aligned with the initial rendering.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5 text-sm" id="founder-stats">
              <div>
                <span className="text-zinc-500 font-mono block mb-1">Email</span>
                <a href="mailto:choudharyinterior1@gmail.com" className="text-white hover:text-[#C9A227] transition-colors font-sans font-medium">
                  choudharyinterior1@gmail.com
                </a>
              </div>
              <div>
                <span className="text-zinc-500 font-mono block mb-1">Direct Call</span>
                <a href="tel:+918793306513" className="text-white hover:text-[#C9A227] transition-colors font-mono font-medium">
                  +91 8793306513
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. TIMELINE OF EXPERIENCE */}
      <section className="py-24 bg-[#121212] relative border-b border-white/5" id="timeline-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#C9A227] text-xs font-mono tracking-[0.4em] uppercase block mb-3">
              Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-white uppercase">
              Timeline Of Excellence
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C9A227] mx-auto mt-6" />
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-12" id="about-timeline-trail">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Year tag left aligned on desktop */}
                <span className="md:absolute md:-left-32 md:top-0 text-2xl font-sans font-bold text-[#C9A227] tracking-tight block mb-2 md:mb-0">
                  {item.year}
                </span>

                {/* Bullets indicator */}
                <span className="absolute -left-2.5 top-2.5 h-5 w-5 rounded-full bg-[#121212] border-2 border-[#C9A227] flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
                </span>

                <h3 className="text-xl font-sans font-medium text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CLIENTS TRUST US */}
      <section className="py-24 bg-[#121212] relative text-center" id="trust-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#C9A227] text-xs font-mono tracking-[0.4em] uppercase block mb-3">
            Standards
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-medium uppercase tracking-tight text-white mb-12">
            Why Our Clients Trust Us Explicitly
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 glass rounded-lg text-center hover:border-[#C9A227]/20 transition-all duration-300">
              <div className="h-12 w-12 bg-zinc-900 border border-[#C9A227]/30 text-[#C9A227] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={20} />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">100% Transparency</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We specify exact brands and grading on laminates, adhesives, and wiring sheets inside contracts. No substitutes.
              </p>
            </div>
            <div className="p-6 glass rounded-lg text-center hover:border-[#C9A227]/20 transition-all duration-300">
              <div className="h-12 w-12 bg-zinc-900 border border-[#C9A227]/30 text-[#C9A227] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={20} />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">Structure Guarantee</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We provide a 5-year structural guarantee on all carpentry modules, hinges, hydraulic lift ups, and modular systems.
              </p>
            </div>
            <div className="p-6 glass rounded-lg text-center hover:border-[#C9A227]/20 transition-all duration-300">
              <div className="h-12 w-12 bg-zinc-900 border border-[#C9A227]/30 text-[#C9A227] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={20} />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">Workshop Advantage</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Having our own machinery ensures flawless finishing lines that are impossible to achieve via traditional handheld carpenters.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
