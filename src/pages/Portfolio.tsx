import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Calendar as CalendarIcon,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  Star,
  Phone,
  MessageCircle,
  Clock,
  Briefcase,
  Users,
  Compass,
  ArrowRight,
  Check,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Info
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import PortfolioLightbox from '../components/PortfolioLightbox';

// Animated Count Up Component
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string; key?: React.Key }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          let start = 0;
          const duration = 2000;
          const increment = value / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={elementRef} className="text-center p-6 bg-zinc-950/40 border border-white/5 rounded-xl backdrop-blur-md">
      <div className="text-3xl md:text-5xl font-mono font-bold text-[#C9A227] mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-zinc-400">
        {label}
      </div>
    </div>
  );
}

// Before / After Slider Component
function BeforeAfterSlider({
  title,
  beforeImage,
  afterImage
}: {
  title: string;
  beforeImage: string;
  afterImage: string;
  key?: React.Key;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="flex flex-col space-y-4" id="before-after-container">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-sans tracking-[0.15em] text-[#C9A227] uppercase font-semibold">
          {title}
        </h4>
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
          <span className="px-2 py-0.5 bg-zinc-950/60 border border-white/5 rounded-sm">Before</span>
          <span className="px-2 py-0.5 bg-[#C9A227]/10 border border-[#C9A227]/20 text-[#C9A227] rounded-sm">After</span>
        </div>
      </div>
      
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl select-none cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Before Image (Background) */}
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        {/* After Image (Clipped Overlay) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={afterImage}
            alt="After"
            className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Sliding Bar Divider */}
        <div
          className="absolute inset-y-0 w-0.5 bg-[#C9A227] shadow-xl pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 border-2 border-[#C9A227] flex items-center justify-center text-[#C9A227] shadow-2xl">
            <SlidersHorizontal size={12} className="rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeProjectId = searchParams.get('project');

  // Core state for portfolio
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [sortBy, setSortBy] = useState('Newest');

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [touchStartX, setTouchStartX] = useState(0);

  // Stats
  const stats = [
    { value: 100, suffix: '+', label: 'Completed Projects' },
    { value: 150, suffix: '+', label: 'Happy Clients' },
    { value: 8, suffix: '+', label: 'Years Experience' },
    { value: 20, suffix: '+', label: 'Design Experts' }
  ];

  // Filters categories list
  const categories = [
    'All Projects',
    'Residential',
    'Commercial',
    'Living Room',
    'Bedroom',
    'Kitchen',
    'Dining',
    'TV Unit',
    'Wardrobe',
    'False Ceiling',
    'Office',
    'Cafe',
    'Restaurant',
    'Villa',
    'Apartment'
  ];

  // Testimonial list
  const testimonials = [
    {
      id: '1',
      name: 'Rohan Malhotra',
      role: 'Owner, Luxury Villa Pune',
      rating: 5,
      text: 'Choudhary Interior Studio transformed our blank villa in Pune into an absolute architectural masterpiece. The biophilic materials, floating teak stairs, and raw stone textures have created an environment that is both relaxing and incredibly premium.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: '2',
      name: 'Aishwarya Sen',
      role: 'Resident, Modern 3BHK Mumbai',
      rating: 5,
      text: 'From the initial design concept to final delivery, Abdullah and his team displayed flawless workmanship. The space optimization in our Bandra apartment is genius. We got exactly what was promised, within our timeline.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: '3',
      name: 'Dr. Vikram Grover',
      role: 'Art Collector, Contemporary Delhi Flat',
      rating: 5,
      text: 'Their attention to acoustic design and private gallery lighting was marvelous. The sound-insulation is pristine and our art collection is illuminated exactly like a world-class exhibition. Uncompromising luxury indeed!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Before & After comparisons
  const beforeAfters = [
    {
      id: 'living',
      title: 'Bandra Living Area Remodel',
      before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'kitchen',
      title: 'Gourmet Kitchen Transformation',
      before: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
      after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  // Fetch projects from local storage and default projects
  useEffect(() => {
    const saved = localStorage.getItem('choudhary_studio_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom clientRequirements details if not present
          const merged = parsed.map((p: any) => ({
            clientRequirements: p.clientRequirements || 'Incorporate luxurious finishes and optimize layout for spacious living.',
            designConcept: p.designConcept || 'Modern Elegance incorporating premium custom cabinetry and golden hardware.',
            materialsUsed: p.materialsUsed || ['Italian Marble', 'Fluted Charcoal Panels', 'LED Lighting Profile'],
            challenges: p.challenges || 'Managing tight structural alignments while installing custom heavy panels.',
            finalOutcome: p.finalOutcome || 'A pristine contemporary space finished with high gloss cabinetry and luxurious textures.',
            ...p
          }));
          setProjects([...projectsData, ...merged]);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setProjects(projectsData);
  }, []);

  // Filter & Sort Logic
  const filteredProjects = projects.filter((project) => {
    // Search query match
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(q) ||
      project.category.toLowerCase().includes(q) ||
      (project.location && project.location.toLowerCase().includes(q)) ||
      (project.description && project.description.toLowerCase().includes(q));

    // Category filter match
    if (selectedCategory === 'All Projects') return matchesSearch;

    const f = selectedCategory.toLowerCase();
    const cat = project.category.toLowerCase();
    const desc = project.description.toLowerCase();
    const title = project.title.toLowerCase();

    let matchesCategory = false;
    if (f === 'residential') {
      matchesCategory = ['apartment', 'villa', 'residential', 'flat', 'bedroom', 'living room', 'kitchen'].includes(cat) || cat.includes('apartment') || cat.includes('villa');
    } else if (f === 'commercial') {
      matchesCategory = ['office', 'cafe', 'restaurant', 'commercial'].includes(cat);
    } else if (cat === f) {
      matchesCategory = true;
    } else {
      matchesCategory = desc.includes(f) || title.includes(f);
    }

    return matchesSearch && matchesCategory;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'Newest') {
      return (b.year || '0').localeCompare(a.year || '0');
    }
    if (sortBy === 'Oldest') {
      return (a.year || '0').localeCompare(b.year || '0');
    }
    if (sortBy === 'Residential') {
      const isARes = ['apartment', 'villa', 'residential', 'flat', 'bedroom', 'living room', 'kitchen'].includes(a.category.toLowerCase());
      const isBRes = ['apartment', 'villa', 'residential', 'flat', 'bedroom', 'living room', 'kitchen'].includes(b.category.toLowerCase());
      return isARes === isBRes ? 0 : isARes ? -1 : 1;
    }
    if (sortBy === 'Commercial') {
      const isACom = ['office', 'cafe', 'restaurant', 'commercial'].includes(a.category.toLowerCase());
      const isBCom = ['office', 'cafe', 'restaurant', 'commercial'].includes(b.category.toLowerCase());
      return isACom === isBCom ? 0 : isACom ? -1 : 1;
    }
    if (sortBy === 'Alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Highlighted Featured Project (First project in data is default premium)
  const featuredProject = projects.find(p => p.id === 'modern-3bhk-mumbai') || projects[0];

  // Active individual project selection
  const activeProjectIndex = projects.findIndex((p) => p.id === activeProjectId);
  const activeProject = activeProjectIndex !== -1 ? projects[activeProjectIndex] : null;

  // Next / Prev project navigation
  const navigateProject = (direction: 'next' | 'prev') => {
    if (projects.length === 0) return;
    let nextIdx = activeProjectIndex;
    if (direction === 'next') {
      nextIdx = (activeProjectIndex + 1) % projects.length;
    } else {
      nextIdx = (activeProjectIndex - 1 + projects.length) % projects.length;
    }
    setSearchParams({ project: projects[nextIdx].id });
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null || !activeProject) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % activeProject.galleryImages.length : 0));
        setLightboxZoom(1);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + activeProject.galleryImages.length) % activeProject.galleryImages.length : 0
        );
        setLightboxZoom(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeProject]);

  // Touch Swipe for Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (lightboxIndex === null || !activeProject) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // swipe left -> next
        setLightboxIndex((lightboxIndex + 1) % activeProject.galleryImages.length);
      } else {
        // swipe right -> prev
        setLightboxIndex((lightboxIndex - 1 + activeProject.galleryImages.length) % activeProject.galleryImages.length);
      }
      setLightboxZoom(1);
    }
  };

  if (!activeProject) {
    return (
      <div className="bg-[#121212] text-[#F5F2ED] pt-24 overflow-hidden min-h-screen" id="portfolio-page-root">
        <AnimatePresence mode="wait">
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 1. HERO BANNER WITH PARALLAX */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden" id="portfolio-hero">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600"
                  alt="Premium Luxury Interior"
                  className="w-full h-full object-cover scale-105 motion-safe:animate-[pulse_8s_infinite_alternate]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#121212]" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-xs font-mono tracking-[0.3em] text-[#C9A227] uppercase font-bold block mb-4">
                    Masterpieces of Design
                  </span>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-medium tracking-tight text-white uppercase mb-6 leading-tight">
                    Our Portfolio
                  </h1>
                  <p className="text-zinc-400 text-sm sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                    Explore our finest residential and commercial interior design projects crafted with creativity, precision, and attention to detail.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* 2. STATS SECTION */}
            <section className="py-12 -mt-16 relative z-25 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="portfolio-stats">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <StatCounter key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
            </section>

            {/* 3. HIGHLIGHTED FEATURED PROJECT */}
            {featuredProject && (
              <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-project-highlight">
                <div className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-950/40 backdrop-blur-md relative p-8 md:p-12">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#C9A227]">
                      <Sparkles size={11} />
                      Featured Masterpiece
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 h-80 sm:h-96 rounded-xl overflow-hidden relative group">
                      <img
                        src={featuredProject.coverImage}
                        alt={featuredProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-[#C9A227] uppercase">
                          {featuredProject.category} | {featuredProject.location}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-sans font-medium text-white uppercase">
                          {featuredProject.title}
                        </h3>
                      </div>
                      
                      <p className="text-zinc-400 text-sm leading-relaxed font-light">
                        {featuredProject.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-xs font-mono text-zinc-400 pt-2 border-t border-white/5">
                        <div>
                          <span className="text-zinc-600 block text-[10px] uppercase">Built Area</span>
                          <span className="text-white text-sm font-semibold">{featuredProject.area}</span>
                        </div>
                        <div>
                          <span className="text-zinc-600 block text-[10px] uppercase">Year</span>
                          <span className="text-white text-sm font-semibold">{featuredProject.year || '2025'}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSearchParams({ project: featuredProject.id })}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A227] hover:bg-[#b08d20] text-black text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-xl"
                      >
                        View Full Project
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 4. GALLERY CONTROLS: SEARCH, SORT, FILTERS */}
            <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5" id="gallery-controls">
              {/* Search & Sort Panel */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                {/* Search Bar */}
                <div className="relative w-full md:max-w-md">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search by name, category, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-950/60 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#C9A227]/50 transition-all font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Sort by</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-zinc-950/60 border border-white/10 rounded-lg px-4 py-2 text-xs text-[#C9A227] font-mono focus:outline-none focus:border-[#C9A227] cursor-pointer"
                  >
                    <option value="Newest">Newest Projects</option>
                    <option value="Oldest">Oldest Projects</option>
                    <option value="Residential">Residential Focus</option>
                    <option value="Commercial">Commercial Focus</option>
                    <option value="Alphabetical">Alphabetical A-Z</option>
                  </select>
                </div>
              </div>

              {/* Animated Category Filters horizontal scroll list */}
              <div className="relative mb-12 overflow-x-auto no-scrollbar scroll-smooth flex gap-3 py-2 border-b border-white/5" id="category-filter-bar">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                        isActive
                          ? 'bg-[#C9A227] text-black border-[#C9A227] shadow-lg shadow-[#C9A227]/10'
                          : 'bg-zinc-950/40 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Filtering results summary */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-8">
                <span>
                  Showing {sortedProjects.length} of {projects.length} premium creations
                </span>
                {selectedCategory !== 'All Projects' || searchQuery ? (
                  <button
                    onClick={() => {
                      setSelectedCategory('All Projects');
                      setSearchQuery('');
                    }}
                    className="text-[#C9A227] hover:underline"
                  >
                    Reset Filters
                  </button>
                ) : null}
              </div>

              {/* 5. MASONRY PORTFOLIO GRID */}
              {sortedProjects.length === 0 ? (
                <div className="text-center py-20 bg-zinc-950/20 border border-white/5 rounded-xl">
                  <Info size={32} className="text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-lg font-sans font-medium text-white mb-1">No Projects Found</h3>
                  <p className="text-zinc-500 text-sm max-w-sm mx-auto font-light">
                    We couldn't find any projects matching "{searchQuery}" under "{selectedCategory}".
                  </p>
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  id="portfolio-masonry-grid"
                >
                  <AnimatePresence>
                    {sortedProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="group bg-zinc-950/40 border border-white/5 rounded-2xl overflow-hidden hover:border-[#C9A227]/30 hover:shadow-2xl hover:shadow-[#C9A227]/5 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
                      >
                        {/* Card Image Cover wrapper */}
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                          
                          {/* Floating Badge */}
                          <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#C9A227]/30 px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-[#C9A227] rounded-sm">
                            {project.category}
                          </span>

                          {/* Photos quantity indicator */}
                          <span className="absolute bottom-4 right-4 bg-zinc-950/95 border border-white/5 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-zinc-300 rounded-sm">
                            {project.galleryImages.length} Photos
                          </span>
                        </div>

                        {/* Card Text Area */}
                        <div className="p-6 space-y-4 bg-zinc-950/20 flex-1 flex flex-col justify-between">
                          <div>
                            {project.location && (
                              <div className="flex items-center gap-1 text-zinc-500 font-mono text-[9px] uppercase tracking-widest mb-1">
                                <MapPin size={10} className="text-zinc-600" />
                                <span>{project.location}</span>
                              </div>
                            )}
                            <h3 className="text-lg font-sans font-medium text-white group-hover:text-[#C9A227] transition-all duration-300">
                              {project.title}
                            </h3>
                            <p className="text-zinc-400 text-xs font-light leading-relaxed mt-2 line-clamp-2">
                              {project.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                              {project.area} | {project.year || '2025'}
                            </span>
                            <button
                              onClick={() => setSearchParams({ project: project.id })}
                              className="px-3.5 py-1.5 bg-transparent hover:bg-[#C9A227] text-[#C9A227] hover:text-black border border-[#C9A227]/20 hover:border-transparent text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Project</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </section>

            {/* 6. INTERACTIVE BEFORE & AFTER SLIDERS */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5" id="before-after-transformations">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span className="text-xs font-mono tracking-[0.3em] text-[#C9A227] uppercase font-bold">
                  Dramatic Transformations
                </span>
                <h2 className="text-3xl md:text-5xl font-sans font-medium text-white uppercase tracking-tight">
                  Before & After
                </h2>
                <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-lg mx-auto">
                  Drag the sliders to experience the premium design transformations achieved by Choudhary Interior Studio.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {beforeAfters.map((ba) => (
                  <BeforeAfterSlider
                    key={ba.id}
                    title={ba.title}
                    beforeImage={ba.before}
                    afterImage={ba.after}
                  />
                ))}
              </div>
            </section>

            {/* 7. REVIEWS & RATINGS SLIDER */}
            <section className="py-24 bg-zinc-950/20 border-t border-white/5" id="portfolio-reviews-slider">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-3 mb-16">
                  <span className="text-xs font-mono tracking-[0.3em] text-[#C9A227] uppercase font-bold">
                    Client Testimonials
                  </span>
                  <h2 className="text-2xl md:text-4xl font-sans font-medium text-white uppercase">
                    Trusted by elite clients
                  </h2>
                </div>

                <div className="relative border border-white/5 bg-zinc-950/60 p-8 md:p-12 rounded-2xl shadow-xl backdrop-blur-md">
                  <div className="absolute top-8 right-8 text-[#C9A227]/10 text-8xl font-serif select-none font-bold">
                    “
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* 5-Star Indicator */}
                      <div className="flex gap-1">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, idx) => (
                          <Star key={idx} size={16} fill="#C9A227" className="text-[#C9A227]" />
                        ))}
                      </div>

                      {/* Review text */}
                      <p className="text-zinc-300 text-sm sm:text-lg font-light leading-relaxed italic">
                        "{testimonials[activeTestimonial].text}"
                      </p>

                      {/* Client details */}
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonials[activeTestimonial].avatar}
                          alt={testimonials[activeTestimonial].name}
                          className="w-12 h-12 rounded-full object-cover border border-[#C9A227]/30"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {testimonials[activeTestimonial].name}
                          </h4>
                          <span className="text-xs font-mono text-[#C9A227] uppercase">
                            {testimonials[activeTestimonial].role}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Bullets */}
                  <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          activeTestimonial === i ? 'bg-[#C9A227] w-6' : 'bg-zinc-700 hover:bg-zinc-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 8. CALL TO ACTION SECTION */}
            <section className="py-24 bg-gradient-to-t from-black via-[#121212] to-[#121212] relative overflow-hidden" id="portfolio-cta">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A227]/5 via-transparent to-transparent opacity-50 z-0" />
              
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
                <span className="text-xs font-mono tracking-[0.3em] text-[#C9A227] uppercase font-bold block">
                  Let's Create Together
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-medium text-white uppercase tracking-tight">
                  Ready to Transform Your Space?
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
                  Schedule a private visual consultation with our design experts and begin your journey towards absolute spatial luxury.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/contact?action=consultation"
                    className="px-8 py-4 bg-[#C9A227] hover:bg-[#b08d20] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 shadow-xl"
                  >
                    Book Consultation
                  </Link>
                  <a
                    href="tel:+919324673321"
                    className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center gap-2"
                  >
                    <Phone size={14} />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/919324673321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center gap-2"
                  >
                    <MessageCircle size={14} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] text-[#F5F2ED] pt-24 overflow-hidden min-h-screen" id="portfolio-page-root">
      <AnimatePresence mode="wait">
        <motion.div
            key="project-detail"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="pb-24"
          >
            {/* Project Hero Header */}
            <section className="relative h-[65vh] flex items-end overflow-hidden" id="project-detail-hero">
              <div className="absolute inset-0 z-0">
                <img
                  src={activeProject.coverImage}
                  alt={activeProject.title}
                  className="w-full h-full object-cover scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-black/60" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 space-y-4">
                <button
                  onClick={() => setSearchParams({})}
                  className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-[#C9A227] hover:text-white transition-colors mb-4"
                >
                  <ChevronLeft size={16} />
                  <span>Back to Portfolio</span>
                </button>

                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-widest text-[#C9A227] uppercase bg-black/40 border border-[#C9A227]/20 px-3 py-1 rounded-sm inline-block">
                    {activeProject.category}
                  </span>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-medium text-white uppercase leading-tight tracking-tight">
                    {activeProject.title}
                  </h1>
                </div>

                <div className="flex flex-wrap gap-y-4 gap-x-8 text-xs font-mono text-zinc-400 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#C9A227]" />
                    <span>{activeProject.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={14} className="text-[#C9A227]" />
                    <span>Completion: {activeProject.year || '2025'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize2 size={14} className="text-[#C9A227]" />
                    <span>Built Area: {activeProject.area}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Project Specifications & Narrative Description */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12" id="project-brief">
              {/* Left narrative */}
              <div className="lg:col-span-8 space-y-8">
                {/* Introduction */}
                <div className="space-y-4">
                  <h2 className="text-xl font-sans font-medium uppercase text-[#C9A227] tracking-wider border-b border-white/5 pb-2">
                    The Design Narrative
                  </h2>
                  <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* Requirements & Concept Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="p-6 bg-zinc-950/40 border border-white/5 rounded-xl space-y-3">
                    <h4 className="text-sm font-sans tracking-widest text-white uppercase font-semibold">
                      Client Brief & Requirements
                    </h4>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">
                      {activeProject.clientRequirements || 'To design a breathtakingly contemporary residence matching the owners energetic lifestyles and expectations of spatial purity.'}
                    </p>
                  </div>

                  <div className="p-6 bg-zinc-950/40 border border-white/5 rounded-xl space-y-3">
                    <h4 className="text-sm font-sans tracking-widest text-white uppercase font-semibold">
                      Our Design Concept
                    </h4>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">
                      {activeProject.designConcept || 'A harmonious integration of organic natural textures with raw metals, focused around a centerpiece layout that optimizes daylight infiltration.'}
                    </p>
                  </div>
                </div>

                {/* Challenges & Outcomes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-zinc-950/40 border border-white/5 rounded-xl space-y-3">
                    <h4 className="text-sm font-sans tracking-widest text-white uppercase font-semibold">
                      The Challenges Overcome
                    </h4>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">
                      {activeProject.challenges || 'Installing custom fluted glass doors and heavy marble block counters within tight layout tolerances without disrupting structural column alignment.'}
                    </p>
                  </div>

                  <div className="p-6 bg-zinc-950/40 border border-[#C9A227]/10 rounded-xl space-y-3">
                    <h4 className="text-sm font-sans tracking-widest text-[#C9A227] uppercase font-semibold">
                      Final Architectural Outcome
                    </h4>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">
                      {activeProject.finalOutcome || 'Delivered an iconic residency featuring high-gloss walnut claddings and integrated automation that exceeds the client\'s initial expectations.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Sidebar specs */}
              <div className="lg:col-span-4 space-y-6">
                <div className="border border-white/5 bg-zinc-950/60 p-6 rounded-xl space-y-6">
                  <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-3">
                    Project Specifications
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase block">Client Name</span>
                      <span className="text-white text-sm">Confidential Residence</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase block">Location</span>
                      <span className="text-white text-sm">{activeProject.location}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase block">Total Area</span>
                      <span className="text-white text-sm">{activeProject.area}</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase block">Design Style</span>
                      <span className="text-white text-sm">Luxury Modernist Minimal</span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-zinc-600 uppercase block">Materials & Brands Used</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {(activeProject.materialsUsed || ['Marble', 'Teak Wood', 'Acoustics', 'Veneer']).map((mat, i) => (
                          <span
                            key={i}
                            className="bg-zinc-900 border border-white/5 px-2.5 py-1 text-[9px] font-mono uppercase text-zinc-300 rounded-sm"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Individual Project Gallery (Masonry layout supporting 5-20 images) */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5" id="project-photo-gallery">
              <div className="text-center space-y-2 mb-12">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C9A227] uppercase font-bold">
                  Bespoke Visuals
                </span>
                <h3 className="text-xl md:text-3xl font-sans font-medium text-white uppercase">
                  Project Gallery
                </h3>
                <p className="text-zinc-500 text-xs font-light">
                  Click on any photograph to experience the interactive immersive lightbox.
                </p>
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6" id="masonry-gallery-container">
                {activeProject.galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxZoom(1);
                    }}
                    className="break-inside-avoid relative overflow-hidden rounded-xl border border-white/5 group cursor-zoom-in"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-4">
                        <Maximize2 size={18} className="text-[#C9A227] mx-auto mb-2" />
                        <span className="text-xs font-mono uppercase text-white tracking-widest">
                          {img.title}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Project Navigation (Prev, Next, Back) */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6" id="project-pagination">
              <button
                onClick={() => navigateProject('prev')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-950 hover:bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest rounded-sm transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Previous Project</span>
              </button>

              <button
                onClick={() => setSearchParams({})}
                className="w-full sm:w-auto text-center text-xs font-mono uppercase tracking-widest text-[#C9A227] hover:text-white transition-colors py-2 border-b border-[#C9A227]/20 hover:border-white cursor-pointer"
              >
                Back to Portfolio
              </button>

              <button
                onClick={() => navigateProject('next')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-950 hover:bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest rounded-sm transition-colors cursor-pointer"
              >
                <span>Next Project</span>
                <ChevronRight size={16} />
              </button>
            </section>
          </motion.div>
        </AnimatePresence>

      {lightboxIndex !== null && activeProject && (
        <PortfolioLightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          project={activeProject}
          currentIndex={lightboxIndex || 0}
          onIndexChange={(idx) => setLightboxIndex(idx)}
          zoom={lightboxZoom}
          onZoomChange={(zoom) => setLightboxZoom(zoom)}
        />
      )}
    </div>
  );
}
