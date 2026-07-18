/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GalleryImage {
  url: string;
  title: string;
}

export interface Project {
  id: string;
  title: string;
  coverImage: string;
  galleryImages: GalleryImage[];
  location: string;
  category: 'Living Room' | 'Bedroom' | 'Kitchen' | 'Office' | 'Commercial' | 'Restaurant' | 'Villa' | 'Apartment' | 'Residential' | 'Other';
  area: string; // e.g., "1,200 sq ft"
  year?: string; // e.g., "2025"
  description: string;
  clientRequirements?: string;
  designConcept?: string;
  materialsUsed?: string[];
  timeline?: string;
  challenges?: string;
  finalOutcome?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  description: string;
  longDescription: string;
  benefits: string[];
  timeline: string; // e.g., "2-3 weeks", "4 weeks"
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  projectType: string;
  avatar: string;
  videoPlaceholder?: boolean;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
}
