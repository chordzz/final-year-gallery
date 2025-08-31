'use client'
import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import PhotoCard from './PhotoCard';
import MobilePhotoCard from './MobilePhotoCard';
import Lightbox from './Lightbox';
import MobileLightbox from './MobileLightbox';
import AdvancedGridLayout, { LayoutType } from './AdvancedGridLayout';
import LayoutSelector from './LayoutSelector';
import { generateGridLayout } from '../utils/gridLayouts';

interface GallerySectionProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  accentColor: string;
  dayIndex: number;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  id,
  title,
  description,
  images,
  accentColor,
  dayIndex
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentLayout, setCurrentLayout] = useState<LayoutType>('grid');
  const [isMobile, setIsMobile] = useState(false);
  const layout = generateGridLayout(images.length);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer for section animations
  const { ref: sectionRef, hasIntersected: sectionVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handleNavigate = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleLayoutChange = (layout: LayoutType) => {
    setCurrentLayout(layout);
  };

  // Force grid layout on mobile
  const effectiveLayout = isMobile ? 'grid' : currentLayout;

  // Convert images to grid items format
  const gridItems = images.map((image, index) => ({
    id: `${id}-${index}`,
    src: image,
    alt: `${title} photo ${index + 1}`,
    aspectRatio: 'aspect-square',
    priority: index < 6,
    featured: index === 0
  }));

  return (
    <>
      <section 
        ref={sectionRef}
        id={id}
        className="scroll-mt-24 mb-32 relative z-10 px-4 sm:px-0 gallery-section"
        style={{ animationDelay: `${dayIndex * 0.2}s` }}
      >
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div 
                className={`w-2 h-8 rounded-full ${accentColor} transition-all duration-1000 ${
                  sectionVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                }`}
                style={{ transitionDelay: '0.2s' }}
              />
              <h2 
                className={`text-xl sm:text-2xl lg:text-3xl font-medium day-title transition-all duration-700 ${
                  sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '0.3s' }}
              >
                {title}
              </h2>
            </div>
            
            {/* Layout Selector - Hidden on mobile */}
            <LayoutSelector
              currentLayout={currentLayout}
              onLayoutChange={handleLayoutChange}
              className={`self-start lg:self-auto transition-all duration-700 ${
                sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            />
          </div>
          
          <p 
            className={`text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl day-description transition-all duration-700 ${
              sectionVisible ? 'opacity-100 translate-y-0 font-extrabold ' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.5s' }}
          >
            {description}
          </p>
          
          {/* Image count indicator */}
          <div 
            className={`mt-4 flex items-center justify-between transition-all duration-700 ${
              sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{images.length} {images.length === 1 ? 'photo' : 'photos'}</span>
            </div>
          </div>
        </div>
        
        {/* Advanced Grid Layout */}
        <div 
          className={`transition-all duration-1000 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.7s' }}
        >
          <AdvancedGridLayout
            items={gridItems}
            layout={effectiveLayout}
            onItemClick={handleImageClick}
            className="gallery-grid"
          />
        </div>
      </section>

      {/* Desktop Lightbox */}
      <div className="hidden md:block">
        <Lightbox
          isOpen={lightboxOpen}
          onClose={handleLightboxClose}
          images={images}
          currentIndex={currentImageIndex}
          onNavigate={handleNavigate}
          title={title}
        />
      </div>

      {/* Mobile Lightbox */}
      <div className="md:hidden">
        <MobileLightbox
          isOpen={lightboxOpen}
          onClose={handleLightboxClose}
          images={images}
          currentIndex={currentImageIndex}
          onNavigate={handleNavigate}
          title={title}
        />
      </div>
    </>
  );
};

export default GallerySection;
