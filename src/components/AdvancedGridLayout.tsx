'use client'
import React, { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';
import MobilePhotoCard from './MobilePhotoCard';
import MasonryLayout from './MasonryLayout';
import { GridLayout } from '../utils/gridLayouts';

export type LayoutType = 'grid' | 'masonry' | 'masonry-2' | 'masonry-3' | 'featured' | 'pinterest';

interface GridItem {
  id: string;
  src: string;
  alt: string;
  aspectRatio: string;
  priority?: boolean;
  featured?: boolean;
}

interface AdvancedGridLayoutProps {
  items: GridItem[];
  layout: LayoutType;
  onItemClick?: (index: number) => void;
  className?: string;
}

const AdvancedGridLayout: React.FC<AdvancedGridLayoutProps> = ({
  items,
  layout,
  onItemClick,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for layout calculations
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [items, layout]);

  // Featured layout with one large image and smaller ones
  const renderFeaturedLayout = () => {
    const [featured, ...others] = items;
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Featured image */}
        <div className="lg:col-span-2 lg:row-span-2">
          <div className="h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
            <div className="w-full h-full aspect-[4/3] lg:aspect-[3/2]">
              {/* Desktop PhotoCard */}
              <div className="hidden md:block h-full">
                <PhotoCard
                  src={featured.src}
                  alt={featured.alt}
                  index={0}
                  priority={true}
                  layout={layout}
                  totalImages={items.length}
                  onClick={() => onItemClick?.(0)}
                />
              </div>
              {/* Mobile PhotoCard */}
              <div className="md:hidden h-full">
                <MobilePhotoCard
                  src={featured.src}
                  alt={featured.alt}
                  index={0}
                  priority={true}
                  layout={layout}
                  totalImages={items.length}
                  onClick={() => onItemClick?.(0)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Other images */}
        {others.slice(0, 4).map((item, index) => (
          <div key={item.id} className="aspect-square">
            {/* Desktop PhotoCard */}
            <div className="hidden md:block h-full">
              <PhotoCard
                src={item.src}
                alt={item.alt}
                index={index + 1}
                layout={layout}
                totalImages={items.length}
                onClick={() => onItemClick?.(index + 1)}
              />
            </div>
            {/* Mobile PhotoCard */}
            <div className="md:hidden h-full">
              <MobilePhotoCard
                src={item.src}
                alt={item.alt}
                index={index + 1}
                layout={layout}
                totalImages={items.length}
                onClick={() => onItemClick?.(index + 1)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Pinterest-style layout
  const renderPinterestLayout = () => {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
        {items.map((item, index) => (
          <div key={item.id} className="break-inside-avoid mb-4 sm:mb-6">
            <div className={`w-full ${item.aspectRatio}`}>
              {/* Desktop PhotoCard */}
              <div className="hidden md:block">
                <PhotoCard
                  src={item.src}
                  alt={item.alt}
                  index={index}
                  priority={index < 4}
                  layout={layout}
                  totalImages={items.length}
                  onClick={() => onItemClick?.(index)}
                />
              </div>
              {/* Mobile PhotoCard */}
              <div className="md:hidden">
                <MobilePhotoCard
                  src={item.src}
                  alt={item.alt}
                  index={index}
                  priority={index < 4}
                  layout={layout}
                  totalImages={items.length}
                  onClick={() => onItemClick?.(index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Standard grid layout
  const renderGridLayout = () => {
    const getGridClass = () => {
      switch (layout) {
        case 'grid':
          return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        case 'masonry-2':
          return 'grid-cols-1 sm:grid-cols-2';
        case 'masonry-3':
          return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
        default:
          return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      }
    };

    return (
      <div className={`grid ${getGridClass()} gap-3 sm:gap-4 lg:gap-6 transition-all duration-500`}>
        {items.map((item, index) => (
          <div key={item.id} className={`w-full ${item.aspectRatio} transition-all duration-300`}>
            {/* Desktop PhotoCard */}
            <div className="hidden md:block">
              <PhotoCard
                src={item.src}
                alt={item.alt}
                index={index}
                priority={index < 6}
                layout={layout}
                totalImages={items.length}
                onClick={() => onItemClick?.(index)}
              />
            </div>
            {/* Mobile PhotoCard */}
            <div className="md:hidden">
              <MobilePhotoCard
                src={item.src}
                alt={item.alt}
                index={index}
                priority={index < 6}
                layout={layout}
                totalImages={items.length}
                onClick={() => onItemClick?.(index)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Masonry layout using CSS Grid
  const renderMasonryLayout = () => {
    const masonryItems = items.map(item => ({
      id: item.id,
      src: item.src,
      alt: item.alt,
      aspectRatio: 1.0, // Will be calculated dynamically
      priority: item.priority
    }));

    return (
      <div className="w-full">
        <MasonryLayout
          items={masonryItems}
          columns={layout === 'masonry' ? 3 : layout === 'masonry-2' ? 2 : 3}
          gap={16}
          onItemClick={onItemClick}
        />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className={`${className} transition-all duration-500 ease-in-out`}>
      {layout === 'featured' && renderFeaturedLayout()}
      {layout === 'pinterest' && renderPinterestLayout()}
      {layout === 'masonry' && renderMasonryLayout()}
      {layout === 'masonry-2' && renderMasonryLayout()}
      {layout === 'masonry-3' && renderMasonryLayout()}
      {layout === 'grid' && renderGridLayout()}
    </div>
  );
};

export default AdvancedGridLayout;
