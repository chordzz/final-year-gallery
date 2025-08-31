'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface MobileLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  title?: string;
}

const MobileLightbox: React.FC<MobileLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  title
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onNavigate(Math.max(0, currentIndex - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNavigate(Math.min(images.length - 1, currentIndex + 1));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart && touchEnd) {
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      } else if (isRightSwipe && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      

      {/* Image container with swipe gestures */}
      <div 
        ref={containerRef}
        className="relative z-10 max-w-[95vw] max-h-[95vh] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button - Subtle X at top right */}
        <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-white hover:text-gray-300 transition-colors bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm flex items-center justify-center"
            aria-label="Close lightbox"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <div className="relative">
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          
          {/* Main image */}
          <Image
            src={currentImage}
            alt={`${title || 'Gallery'} image ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-w-full max-h-[95vh] object-contain rounded-lg select-none"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Mobile navigation indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute bottom-6 left-6 z-10 text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Title */}
      {title && (
        <div className="absolute top-6 left-6 z-10 text-white text-lg font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
          {title}
        </div>
      )}

      {/* Swipe hint */}
      {/*<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm opacity-50">
        Swipe to navigate
      </div>
      */}
    </div>
  );
};

export default MobileLightbox;
