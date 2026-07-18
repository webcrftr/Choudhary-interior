/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Turnkey Projects',
    budget: '₹5L - ₹10L',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const projectTypes = [
    'Luxury Living Room',
    'Bedroom Design',
    'Modular Kitchen',
    'False Ceiling',
    'Wardrobes',
    'TV Units',
    'Office Interiors',
    'Commercial Spaces',
    'Restaurant Interiors',
    'Cafe Interiors',
    'Turnkey Projects'
  ];

  const budgets = [
    '₹3L - ₹5L (Starter)',
    '₹5L - ₹10L (Executive)',
    '₹10L - ₹20L (Premium)',
    '₹20L - ₹50L (Luxury)',
    '₹50L+ (Bespoke Villa)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        projectType: 'Turnkey Projects',
        budget: '₹5L - ₹10L',
        message: ''
      });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#121212] text-white pt-24 min-h-screen" id="contact-page-root">
      
      {/* 1. HERO BANNER */}
      <section className="bg-[#121212] py-20 border-b border-white/5 relative text-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C9A227 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[#C9A227] text-xs font-mono tracking-[0.4em] uppercase block mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-medium uppercase tracking-tight text-white mb-6">
            Begin Your Project
          </h1>
          <div className="w-16 h-[2px] bg-[#C9A227] mx-auto mb-6" />
          <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Contact Abdullah Choudhary to discuss your requirements or schedule a private site measurement inspection.
          </p>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & CONTACT FORM */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16" id="contact-details-grid">
        
        {/* Left column: Contact Info & Address */}
        <div className="lg:col-span-5 space-y-8" id="contact-info-cards-column">
          <div className="space-y-4">
            <span className="text-[#C9A227] text-xs font-mono tracking-[0.3em] uppercase">
              Channels
            </span>
            <h2 className="text-3xl font-sans font-medium uppercase text-white">
              Studio Contacts
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            
            {/* Phone Card */}
            <div className="p-6 glass rounded-xl flex items-start gap-4">
              <div className="h-10 w-10 shrink-0 bg-zinc-900 border border-white/10 text-[#C9A227] rounded-md flex items-center justify-center">
                <Phone size={18} />
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block">
                  Phone / Whatsapp
                </span>
                <a href="tel:+918793306513" className="text-white hover:text-[#C9A227] transition-colors font-mono font-medium text-base">
                  +91 8793306513
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 glass rounded-xl flex items-start gap-4">
              <div className="h-10 w-10 shrink-0 bg-zinc-900 border border-white/10 text-[#C9A227] rounded-md flex items-center justify-center">
                <Mail size={18} />
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block">
                  Studio Email
                </span>
                <a href="mailto:choudharyinterior1@gmail.com" className="text-white hover:text-[#C9A227] transition-colors font-sans font-medium text-base break-all">
                  choudharyinterior1@gmail.com
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-6 glass rounded-xl flex items-start gap-4">
              <div className="h-10 w-10 shrink-0 bg-zinc-900 border border-white/10 text-[#C9A227] rounded-md flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block">
                  Physical Studio
                </span>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Shop No.19, Ashokvan,<br />
                  Vasant Karishma, Vasai City,<br />
                  Maharashtra - 401202
                </p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 glass rounded-xl flex items-start gap-4">
              <div className="h-10 w-10 shrink-0 bg-zinc-900 border border-white/10 text-[#C9A227] rounded-md flex items-center justify-center">
                <Clock size={18} />
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block">
                  Office Hours
                </span>
                <p className="text-zinc-300 text-sm font-medium">
                  Monday - Saturday: 10:00 AM - 08:00 PM
                </p>
                <p className="text-zinc-500 text-xs">
                  Sunday: Closed (Site measurements by appointment)
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right column: Contact Form */}
        <div className="lg:col-span-7" id="contact-form-column">
          <div className="p-8 md:p-12 glass rounded-2xl shadow-2xl relative">
            
            {/* Form Title */}
            <div className="mb-8 space-y-2">
              <h3 className="text-[#C9A227] text-xs font-mono tracking-[0.3em] uppercase">
                Consultation Sheet
              </h3>
              <h2 className="text-2xl font-sans font-medium uppercase text-white">
                Book A Private Session
              </h2>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Provide specifications on your room scale, preferred budget bracket, and timing below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" id="consultation-form">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none focus:ring-0 placeholder-zinc-600 transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none focus:ring-0 placeholder-zinc-600 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none focus:ring-0 placeholder-zinc-600 transition-all"
                  />
                </div>

                {/* Project Type Dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="projectType" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                    Project Focus
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none focus:ring-0 transition-all appearance-none cursor-pointer"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#0d0d0d] text-white py-2">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Bracket Dropdown */}
              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  Target Budget Bracket
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none focus:ring-0 transition-all appearance-none cursor-pointer"
                >
                  {budgets.map((b) => (
                    <option key={b} value={b} className="bg-[#0d0d0d] text-white py-2">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  Message / Client Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your space. E.g. dimensions, timelines, style preference..."
                  className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none focus:ring-0 placeholder-zinc-600 transition-all resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#C9A227] hover:bg-white hover:text-black text-black font-semibold tracking-[0.2em] uppercase text-xs rounded-sm transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Sheet...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Submit Consultation Sheet</span>
                  </>
                )}
              </button>

            </form>

            {/* STATE SUCCESS OVERLAY */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#121212]/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-8 text-center z-10"
                  id="submission-success-overlay"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="h-20 w-20 bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-full flex items-center justify-center text-[#C9A227] mb-6"
                  >
                    <CheckCircle size={40} />
                  </motion.div>

                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-sans font-medium text-white uppercase tracking-wider mb-2"
                  >
                    Sheet Transmitted
                  </motion.h3>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed font-light"
                  >
                    Thank you. Your project brief has been logged in Choudhary Studio's system. Abdullah Choudhary will review your details and contact you within 24 business hours.
                  </motion.p>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 bg-zinc-900 border border-white/10 hover:border-[#C9A227] text-white hover:text-[#C9A227] text-xs font-mono tracking-widest uppercase rounded-sm transition-all cursor-pointer"
                  >
                    Submit Another Brief
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </section>

      {/* 3. PHYSICAL GEOLOCATION GOOGLE MAP IFRAME */}
      <section className="py-12 bg-[#121212] border-t border-b border-white/5" id="geolocation-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-[#C9A227] text-xs font-mono tracking-[0.4em] uppercase block mb-3">
                Location
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium uppercase tracking-tight text-white">
                Studio Location
              </h2>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm font-mono tracking-wide max-w-sm">
              Shop No.19, Ashokvan, Vasant Karishma, Vasai City, Maharashtra - 401202
            </p>
          </div>

          {/* Actual Google Map iframe with clean border layout */}
          <div className="w-full h-96 md:h-[450px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative" id="google-map-container">
            <iframe
              title="Choudhary Interior Studio Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m3!1d3763.5359400266013!2d72.8422471!3d19.3888365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a964a32ef667%3A0xe9cf3994e09f58cb!2sVasant%20Karishma%2C%20Ashokvan%20Co-op%20Hsg%20Soc%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%) brightness(95%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              id="google-map-iframe"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
