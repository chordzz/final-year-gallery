'use client'
import React from 'react';
import PhotoCard from './PhotoCard';

interface MasonryItem {
  id: string;
  src: string;
  alt: string;
  aspectRatio: number;
  priority?: boolean;
}

interface MasonryLayoutProps {
  items: MasonryItem[];
  columns?: number;
  gap?: number;
  onItemClick?: (index: number) => void;
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  items,
  columns = 3,
  gap = 16,
  onItemClick
}) => {
  const getMasonryClass = () => {
    switch (columns) {
      case 2:
        return 'masonry-layout-2';
      case 3:
        return 'masonry-layout-3';
      default:
        return 'masonry-layout';
    }
  };

  return (
    <div className={`${getMasonryClass()} w-full`}>
      {items.map((item, index) => (
        <div key={item.id} className="masonry-item">
          <div 
            className="w-full aspect-square"
            style={{ aspectRatio: item.aspectRatio }}
          >
            <PhotoCard
              src={item.src}
              alt={item.alt}
              index={index}
              priority={item.priority}
              onClick={() => onItemClick?.(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;
