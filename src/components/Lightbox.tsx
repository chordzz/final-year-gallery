'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  title?: string;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  title
}) => {
  const [isLoading, setIsLoading] = useState(true);

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

  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      

      {/* Navigation arrows */}
      {!isFirst && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black/20 rounded-full backdrop-blur-sm"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {!isLast && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black/20 rounded-full backdrop-blur-sm"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        
        <div className="relative">
          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}

          {/* Close button - Subtle X at top right */}
      <button
        onClick={onClose}
        className="absolute top-8 right-[29%] z-20 p-2.5 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm flex items-center justify-center shadow-lg"
        aria-label="Close lightbox"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
          
          {/* Main image */}
          <Image
            src={currentImage}
            alt={`${title || 'Gallery'} image ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            priority
          />
        </div>
      </div>

      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Title */}
      {title && (
        <div className="absolute top-4 left-4 z-10 text-white text-lg font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          {title}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
