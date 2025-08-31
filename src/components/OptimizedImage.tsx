'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { imageCache } from '../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  layout?: 'grid' | 'masonry' | 'masonry-2' | 'masonry-3' | 'featured' | 'pinterest';
  index?: number;
  totalImages?: number;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  layout = 'grid',
  index = 0,
  totalImages = 1,
  priority = false,
  className = '',
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate responsive sizes based on layout
  const getResponsiveSizes = () => {
    switch (layout) {
      case 'featured':
        return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
      case 'pinterest':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw';
      case 'masonry':
        return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
      default:
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw';
    }
  };

  // Generate srcSet for responsive images
  const getSrcSet = () => {
    const sizes = [400, 600, 800, 1200, 1600];
    return sizes
      .map(size => `${src}?w=${size}&h=${size}&q=90 ${size}w`)
      .join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!priority && imageRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        },
        {
          rootMargin: '50px',
          threshold: 0.1
        }
      );

      observerRef.current.observe(imageRef.current);
    } else {
      setIsInView(true);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Check if image is cached
  const isCached = imageCache.has(src);

  if (!isInView && !priority) {
    return (
      <div 
        ref={imageRef}
        className={`${className} bg-gray-200 animate-pulse rounded-lg`}
        style={{ aspectRatio: '1' }}
      />
    );
  }

  return (
    <div ref={imageRef} className="relative w-full h-full">
      {/* Loading placeholder */}
      {isLoading && !isCached && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Failed to load</p>
          </div>
        </div>
      )}

      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        width={800}
        height={800}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        sizes={getResponsiveSizes()}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </div>
  );
};

export default OptimizedImage;
