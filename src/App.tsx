/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

// Subpages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import DesignGallery from './pages/DesignGallery';
import Contact from './pages/Contact';

// Scroll To Top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#121212] text-[#F5F2ED] flex flex-col font-sans select-none antialiased">
        
        {/* Transparent glassmorphic header */}
        <Navbar />

        {/* Core page layouts */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/design-gallery" element={<DesignGallery />} />
            <Route path="/services" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Sophisticated footer */}
        <Footer />

        {/* Floating whatsapp, phone & scroll top */}
        <FloatingActions />

      </div>
    </Router>
  );
}
