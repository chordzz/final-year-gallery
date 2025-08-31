'use client'
import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';

interface PhotoCardProps {
  src: string;
  alt: string;
  index: number;
  title?: string;
  priority?: boolean;
  layout?: 'grid' | 'masonry' | 'masonry-2' | 'masonry-3' | 'featured' | 'pinterest';
  totalImages?: number;
  onClick?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ 
  src, 
  alt, 
  index, 
  title, 
  priority = false,
  layout = 'grid',
  totalImages = 1,
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if the source is a video file
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className="w-full h-full overflow-hidden photo-card group cursor-pointer animate-scale-in relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative w-full h-full">
        {isVideo ? (
          // Video element for video files
          <video 
            src={src}
            controls
            className="absolute inset-0 w-full h-full object-cover"
            title={title || alt}
          />
        ) : (
          // Optimized image for image files
          <OptimizedImage
            src={src}
            alt={alt}
            layout={layout}
            index={index}
            totalImages={totalImages}
            priority={priority}
            className="w-full h-full object-cover"
          />
        )}

        {/* Hover overlay with zoom icon */}
        {!isVideo && (
          <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        )}

        {/* Image number indicator */}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {index + 1}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;