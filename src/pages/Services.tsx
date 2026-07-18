import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  MapPin,
  Calendar,
  Ruler,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Upload,
  Plus,
  Trash2,
  FolderOpen,
  Camera,
  Check,
  Loader2,
  Sparkles,
  Lock,
  ArrowLeft,
  Grid,
  Sparkle
} from 'lucide-react';
import { projectsData as defaultProjects } from '../data/projects';
import { Project, GalleryImage } from '../types';

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load custom projects from localStorage
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState<Project['category']>('Residential');
  const [newArea, setNewArea] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCoverFile, setNewCoverFile] = useState<string>('');
  const [newGalleryFiles, setNewGalleryFiles] = useState<{ url: string; title: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Gallery view and Lightbox State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  // File Inputs Ref
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Initialize projects
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
        console.error('Error parsing projects', e);
      }
    }
    setProjects(defaultProjects);
  }, []);

  // Sync selected project with search param `?project=id`
  useEffect(() => {
    const projectId = searchParams.get('project');
    if (projectId && projects.length > 0) {
      const found = projects.find((p) => p.id === projectId);
      if (found) {
        setSelectedProject(found);
        // Scroll to top of the detailed view when selected
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSelectedProject(null);
      }
    } else {
      setSelectedProject(null);
    }
  }, [searchParams, projects]);

  // Handle opening a project's gallery
  const handleOpenProject = (id: string) => {
    setSearchParams({ project: id });
  };

  // Close gallery view and clear search param
  const handleCloseProject = () => {
    setSearchParams({});
    setSelectedProject(null);
    setLightboxIndex(null);
    setIsZoomed(false);
  };

  // Handle cover image upload to Base64
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCoverFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle multi-image gallery upload
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length > 20) {
        setUploadError('Please select maximum 20 gallery images.');
        return;
      }
      setUploadError('');
      const promises = (Array.from(files) as File[]).map((file) => {
        return new Promise<{ url: string; title: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Use the file name (without extension) as the default caption/title
            const title = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
            resolve({
              url: reader.result as string,
              title: title.charAt(0).toUpperCase() + title.slice(1)
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((results) => {
        setNewGalleryFiles((prev) => [...prev, ...results]);
      });
    }
  };

  // Delete a specific uploaded gallery image before submitting
  const handleRemoveGalleryFile = (index: number) => {
    setNewGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle adding a new project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription || !newCoverFile) {
      setUploadError('Title, description, and cover image are required.');
      return;
    }
    if (newGalleryFiles.length < 1) {
      setUploadError('Please upload at least 1 gallery image.');
      return;
    }

    setIsSubmitting(true);

    const generatedId = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const newProject: Project = {
      id: generatedId,
      title: newTitle,
      location: newLocation || 'Mumbai',
      category: newCategory,
      area: newArea || 'Custom Size',
      year: newYear || new Date().getFullYear().toString(),
      description: newDescription,
      coverImage: newCoverFile,
      galleryImages: newGalleryFiles
    };

    // Save custom projects separately in localStorage
    const saved = localStorage.getItem('choudhary_studio_projects');
    let customList: Project[] = [];
    if (saved) {
      try {
        customList = JSON.parse(saved);
      } catch (err) {
        console.error(err);
      }
    }
    customList.push(newProject);
    localStorage.setItem('choudhary_studio_projects', JSON.stringify(customList));

    // Update state
    setProjects([...defaultProjects, ...customList]);

    // Reset Form
    setNewTitle('');
    setNewLocation('');
    setNewCategory('Residential');
    setNewArea('');
    setNewYear('');
    setNewDescription('');
    setNewCoverFile('');
    setNewGalleryFiles([]);
    setIsAdminOpen(false);
    setIsSubmitting(false);
    setUploadError('');

    // Open the new project immediately
    handleOpenProject(generatedId);
  };

  // Reset custom portfolio back to defaults
  const handleResetPortfolio = () => {
    if (window.confirm('Are you sure you want to restore the portfolio to its original state? This will delete all custom uploaded projects.')) {
      localStorage.removeItem('choudhary_studio_projects');
      setProjects(defaultProjects);
    }
  };

  // Next/Prev Lightbox navigation
  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProject && lightboxIndex !== null) {
      setIsZoomed(false);
      setIsLoadingImage(true);
      setLightboxIndex((prev) => (prev === 0 ? selectedProject.galleryImages.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProject && lightboxIndex !== null) {
      setIsZoomed(false);
      setIsLoadingImage(true);
      setLightboxIndex((prev) => (prev === selectedProject.galleryImages.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  // Keyboard navigation inside lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'ArrowRight') handleNextImage();
        if (e.key === 'Escape') {
          setLightboxIndex(null);
          setIsZoomed(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, selectedProject]);

  return (
    <div className="bg-[#121212] text-white pt-24 min-h-screen relative font-sans" id="services-page-root">
      
      {/* Absolute Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C9A227 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      {/* Main page content (hidden if viewing a project detailed gallery view for complete focus) */}
      <div className={`${selectedProject ? 'hidden' : 'block'}`}>
        
        {/* 1. HEADER BANNER */}
        <section className="py-20 border-b border-white/5 relative text-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="text-[#C9A227] text-xs font-mono tracking-[0.4em] uppercase block mb-3">
              Masterpieces
            </span>
            <h1 className="text-4xl md:text-6xl font-sans font-semibold uppercase tracking-tight text-white mb-6">
              Project Portfolio
            </h1>
            <div className="w-16 h-[2px] bg-[#C9A227] mx-auto mb-6" />
            <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Explore our luxury home interior projects. Organize spaces seamlessly and trace the meticulous craftsmanship of every completed landmark site.
            </p>
          </div>
        </section>

        {/* 2. ADMIN/WORKSPACE SECTION (COLLAPSIBLE) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#C9A227]/30 hover:border-[#C9A227] text-zinc-300 hover:text-[#C9A227] text-xs font-mono tracking-wider uppercase bg-zinc-950/50 hover:bg-zinc-950 rounded-sm transition-all cursor-pointer"
            >
              <FolderOpen size={14} />
              <span>{isAdminOpen ? 'Close Studio Workspace' : 'Studio Workspace (Admin)'}</span>
            </button>
            {projects.length > defaultProjects.length && (
              <button
                onClick={handleResetPortfolio}
                className="inline-flex items-center gap-2 px-3 py-2 border border-red-500/30 hover:border-red-500 text-red-400 hover:bg-red-950/20 text-xs font-mono tracking-wider uppercase rounded-sm transition-all cursor-pointer"
                title="Reset to defaults"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>

          <AnimatePresence>
            {isAdminOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden mt-6"
              >
                <div className="p-6 md:p-8 glass rounded-xl border border-white/10 space-y-8 bg-zinc-950/80">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="text-[#C9A227]" size={20} />
                      <h3 className="text-lg font-sans font-medium uppercase tracking-wider text-white">
                        Create & Publish New Masterpiece
                      </h3>
                    </div>
                    <span className="text-zinc-500 font-mono text-[10px] uppercase">
                      Client-Side Sandbox Storage
                    </span>
                  </div>

                  {!isAdminAuthenticated ? (
                    <div className="max-w-md mx-auto py-8 text-center space-y-4">
                      <Lock size={28} className="mx-auto text-[#C9A227]/70" />
                      <div>
                        <h4 className="text-sm font-sans uppercase tracking-wider text-white mb-2">Workspace Verification</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed">Enter security passcode <code className="text-[#C9A227] bg-white/5 px-1.5 py-0.5 rounded font-mono">1234</code> to access the live uploader dashboard.</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                        <input
                          type="password"
                          placeholder="••••"
                          value={adminPassword}
                          onChange={(e) => {
                            setAdminPassword(e.target.value);
                            if (e.target.value === '1234') {
                              setIsAdminAuthenticated(true);
                              setAdminPassword('');
                            }
                          }}
                          className="w-full text-center px-3 py-2 bg-zinc-900 border border-white/10 rounded-md text-sm text-white focus:outline-none focus:border-[#C9A227] font-mono tracking-[0.5em]"
                        />
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleAddProject} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Project Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Modern 3BHK Apartment - Mumbai"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none"
                          />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Bandra, Mumbai or Koregaon Park, Pune"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none"
                          />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Category</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value as Project['category'])}
                            className="w-full px-4 py-3 bg-zinc-900 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none"
                          >
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Office">Office</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Specifications */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Area (e.g. 1,850 sq ft)</label>
                            <input
                              type="text"
                              placeholder="1,850 sq ft"
                              value={newArea}
                              onChange={(e) => setNewArea(e.target.value)}
                              className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Year (optional)</label>
                            <input
                              type="text"
                              placeholder="2025"
                              value={newYear}
                              onChange={(e) => setNewYear(e.target.value)}
                              className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Short Description *</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Enter project summary and key interior features..."
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          className="w-full px-4 py-3 bg-[#121212]/45 border border-white/10 hover:border-white/20 focus:border-[#C9A227] rounded-md text-sm text-white focus:outline-none resize-none"
                        />
                      </div>

                      {/* Media Uploaders */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        
                        {/* Cover Image */}
                        <div className="space-y-4">
                          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-semibold">Project Cover Photo *</label>
                          <div
                            onClick={() => coverInputRef.current?.click()}
                            className="border-2 border-dashed border-white/10 hover:border-[#C9A227]/50 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[#121212]/30 transition-all group"
                          >
                            <input
                              type="file"
                              ref={coverInputRef}
                              onChange={handleCoverUpload}
                              accept="image/*"
                              className="hidden"
                            />
                            {newCoverFile ? (
                              <div className="relative w-full h-36 rounded-md overflow-hidden border border-white/10">
                                <img src={newCoverFile} alt="Cover preview" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); setNewCoverFile(''); }}
                                  className="absolute top-2.5 right-2.5 p-1.5 bg-black/80 text-white rounded-full hover:text-red-400 transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-[#C9A227] transition-colors">
                                  <Camera size={18} />
                                </div>
                                <span className="text-xs text-zinc-400 group-hover:text-zinc-200">Upload primary cover picture</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Gallery Images */}
                        <div className="space-y-4">
                          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-semibold">Gallery Images (Upload 5–20 Photos) *</label>
                          <div
                            onClick={() => galleryInputRef.current?.click()}
                            className="border-2 border-dashed border-white/10 hover:border-[#C9A227]/50 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[#121212]/30 transition-all group"
                          >
                            <input
                              type="file"
                              ref={galleryInputRef}
                              onChange={handleGalleryUpload}
                              accept="image/*"
                              multiple
                              className="hidden"
                            />
                            <div className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-[#C9A227] transition-colors">
                              <Upload size={18} />
                            </div>
                            <span className="text-xs text-zinc-400 group-hover:text-zinc-200">Select multiple project images (5-20 recommended)</span>
                          </div>
                        </div>

                      </div>

                      {/* Preview Uploaded Gallery Images with Labels */}
                      {newGalleryFiles.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                              Uploaded Gallery Files ({newGalleryFiles.length}) — Click title to edit labels:
                            </span>
                            <button
                              type="button"
                              onClick={() => setNewGalleryFiles([])}
                              className="text-red-400 text-xs hover:underline flex items-center gap-1"
                            >
                              <Trash2 size={12} /> Clear All
                            </button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 max-h-72 overflow-y-auto p-2 border border-white/5 bg-black/40 rounded-lg scrollbar-thin">
                            {newGalleryFiles.map((file, idx) => (
                              <div key={idx} className="relative group/thumb border border-white/10 rounded overflow-hidden aspect-square bg-zinc-950 flex flex-col justify-between">
                                <img src={file.url} alt={file.title} className="w-full h-16 object-cover" />
                                <input
                                  type="text"
                                  value={file.title}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setNewGalleryFiles((prev) =>
                                      prev.map((f, i) => (i === idx ? { ...f, title: val } : f))
                                    );
                                  }}
                                  className="w-full bg-black/80 text-[10px] text-zinc-300 px-1 py-0.5 border-t border-white/5 outline-none focus:border-[#C9A227]"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGalleryFile(idx)}
                                  className="absolute top-1 right-1 p-1 bg-black/90 rounded-full text-zinc-400 hover:text-red-400 opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                                >
                                  <X size={10} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Submit / Error states */}
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                        {uploadError && (
                          <span className="text-red-400 text-xs font-mono">
                            {uploadError}
                          </span>
                        )}
                        <div className="flex items-center gap-4 ml-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAdminAuthenticated(false);
                              setIsAdminOpen(false);
                            }}
                            className="px-5 py-2.5 bg-transparent border border-white/10 text-zinc-400 hover:text-white rounded-sm text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Lock Dashboard
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-[#C9A227] text-black hover:bg-[#b08d20] rounded-sm text-xs font-sans tracking-widest font-bold uppercase transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 size={14} className="animate-spin" />
                                <span>Publishing...</span>
                              </>
                            ) : (
                              <>
                                <Plus size={14} />
                                <span>Publish Project</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 3. PORTFOLIO CARD GRID */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8" id="projects-grid">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group relative glass rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#C9A227]/30 hover:shadow-2xl hover:shadow-[#C9A227]/5 transition-all duration-500"
                id={`project-card-${project.id}`}
              >
                {/* Image backdrop container */}
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

                {/* Information block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-zinc-950/40">
                  <div>
                    <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1.5">
                      <MapPin size={11} className="text-zinc-500 shrink-0" />
                      <span>{project.location}</span>
                    </div>
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
                    <button
                      onClick={() => handleOpenProject(project.id)}
                      className="px-3.5 py-2 bg-transparent hover:bg-[#C9A227] text-[#C9A227] hover:text-black border border-[#C9A227]/20 hover:border-transparent text-[10px] font-mono uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Project</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* 4. IMMERSIVE PROJECT DETAIL GALLERY VIEW (rendered only when state selected) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            {/* Header / Back Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-8 mb-10" id="project-gallery-header">
              <button
                onClick={handleCloseProject}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:text-[#C9A227] transition-colors cursor-pointer group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Portfolio</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#C9A227]/5 border border-[#C9A227]/20 text-[#C9A227] font-mono text-[10px] uppercase tracking-widest rounded-sm">
                  {selectedProject.category}
                </span>
                {selectedProject.year && (
                  <span className="inline-flex items-center gap-1 text-zinc-400 font-mono text-[10px] uppercase">
                    <Calendar size={11} className="text-zinc-500" />
                    <span>Completed: {selectedProject.year}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-zinc-400 font-mono text-[10px] uppercase">
                  <Ruler size={11} className="text-zinc-500" />
                  <span>{selectedProject.area}</span>
                </span>
              </div>
            </div>

            {/* Project Cover & Text details layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px] uppercase tracking-widest">
                  <MapPin size={12} className="text-[#C9A227]" />
                  <span>{selectedProject.location}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-sans font-semibold tracking-tight text-white uppercase leading-tight">
                  {selectedProject.title}
                </h2>
                <div className="w-12 h-[2px] bg-[#C9A227] my-6" />
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              <div className="lg:col-span-8 rounded-xl overflow-hidden border border-white/5 aspect-[16/9] shadow-2xl relative">
                <img
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>

            {/* Masonry-like modern photo grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <Grid size={16} className="text-[#C9A227]" />
                  <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-300">
                    Space Galleries ({selectedProject.galleryImages.length} spaces)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
                  Click any image to launch full-screen cinema view
                </span>
              </div>

              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6" id="masonry-gallery">
                {selectedProject.galleryImages.map((image, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setIsZoomed(false);
                      setIsLoadingImage(true);
                    }}
                    className="break-inside-avoid relative overflow-hidden rounded-xl border border-white/5 bg-zinc-950/50 hover:border-[#C9A227]/30 transition-all duration-500 cursor-pointer group shadow-lg"
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient and caption overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <span className="text-[#C9A227] text-[10px] font-mono tracking-widest uppercase mb-1">
                        Space Details
                      </span>
                      <h4 className="text-sm font-sans font-semibold text-white uppercase tracking-wider">
                        {image.title}
                      </h4>
                    </div>

                    {/* Always visible minimal caption footer for clear spacing reference */}
                    <div className="p-3 bg-zinc-950/80 border-t border-white/5 flex items-center justify-between sm:hidden">
                      <span className="text-xs font-mono uppercase text-zinc-300 tracking-wider">
                        {image.title}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Back Button Footer */}
            <div className="pt-16 text-center border-t border-white/5 mt-20">
              <button
                onClick={handleCloseProject}
                className="px-8 py-4 bg-zinc-900 hover:bg-[#C9A227] text-white hover:text-black border border-white/10 hover:border-transparent font-mono text-xs tracking-widest uppercase rounded-sm transition-all cursor-pointer"
              >
                Back to All Projects
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. IMMERSIVE FULL-SCREEN LIGHTBOX WITH ZOOM & PREV/NEXT */}
      <AnimatePresence>
        {selectedProject && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setLightboxIndex(null); setIsZoomed(false); }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4"
            id="fullscreen-lightbox"
          >
            {/* Top Bar controls */}
            <div className="flex items-center justify-between w-full relative z-10 px-4 pt-4">
              <div className="text-left">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest block">
                  Project: {selectedProject.title}
                </span>
                <span className="text-white font-sans font-medium text-xs tracking-wider uppercase">
                  Space: {selectedProject.galleryImages[lightboxIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Zoom Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                  className="p-2 text-zinc-400 hover:text-[#C9A227] hover:bg-white/5 rounded-full transition-all cursor-pointer"
                  title="Toggle Zoom"
                >
                  {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => { setLightboxIndex(null); setIsZoomed(false); }}
                  className="p-2 text-zinc-400 hover:text-[#C9A227] hover:bg-white/5 rounded-full transition-all cursor-pointer"
                  title="Close Lightbox"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Central Large Image */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden select-none">
              
              {/* Prev Arrow */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 md:left-8 z-10 h-12 w-12 border border-white/10 hover:border-[#C9A227] bg-black/50 text-white hover:text-[#C9A227] rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                aria-label="Previous space photo"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Main Photo Canvas */}
              <div
                className="max-w-[90vw] max-h-[75vh] flex items-center justify-center overflow-auto pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                {isLoadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="animate-spin text-[#C9A227]" size={36} />
                  </div>
                )}
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  onLoad={() => setIsLoadingImage(false)}
                  src={selectedProject.galleryImages[lightboxIndex].url}
                  alt={selectedProject.galleryImages[lightboxIndex].title}
                  className={`max-w-full max-h-[75vh] object-contain rounded-lg border border-white/5 transition-all shadow-2xl pointer-events-auto ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                />
              </div>

              {/* Next Arrow */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 md:right-8 z-10 h-12 w-12 border border-white/10 hover:border-[#C9A227] bg-black/50 text-white hover:text-[#C9A227] rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                aria-label="Next space photo"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Bottom Bar Details */}
            <div className="w-full text-center relative z-10 px-4 pb-4">
              <span className="inline-block px-4 py-1.5 bg-zinc-900 border border-white/5 text-xs font-mono text-zinc-400 rounded-full tracking-wider">
                Photo {lightboxIndex + 1} of {selectedProject.galleryImages.length}
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
