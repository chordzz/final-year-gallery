// Image optimization utilities
export interface ImageSize {
  width: number;
  height: number;
  quality?: number;
}

export interface OptimizedImage {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  format: 'webp' | 'jpeg' | 'png';
  priority: boolean;
}

// Responsive breakpoints for different screen sizes
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
};

// Image size configurations for different use cases
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150, quality: 80 },
  small: { width: 300, height: 300, quality: 85 },
  medium: { width: 600, height: 600, quality: 90 },
  large: { width: 1200, height: 1200, quality: 95 },
  xlarge: { width: 1920, height: 1920, quality: 95 },
};

// Generate responsive image sizes
export const generateResponsiveSizes = (baseSize: ImageSize): ImageSize[] => {
  return [
    { ...baseSize, width: Math.round(baseSize.width * 0.5), height: Math.round(baseSize.height * 0.5) },
    { ...baseSize, width: Math.round(baseSize.width * 0.75), height: Math.round(baseSize.height * 0.75) },
    baseSize,
    { ...baseSize, width: Math.round(baseSize.width * 1.25), height: Math.round(baseSize.height * 1.25) },
    { ...baseSize, width: Math.round(baseSize.width * 1.5), height: Math.round(baseSize.height * 1.5) },
  ];
};

// Generate srcSet for responsive images
export const generateSrcSet = (src: string, sizes: ImageSize[]): string => {
  return sizes
    .map(size => `${src}?w=${size.width}&h=${size.height}&q=${size.quality || 90} ${size.width}w`)
    .join(', ');
};

// Generate sizes attribute for responsive images
export const generateSizes = (columns: number = 1): string => {
  return `(max-width: ${BREAKPOINTS.mobile}px) ${100 / columns}vw, (max-width: ${BREAKPOINTS.tablet}px) ${100 / Math.min(columns, 2)}vw, (max-width: ${BREAKPOINTS.laptop}px) ${100 / Math.min(columns, 3)}vw, ${100 / Math.min(columns, 4)}vw`;
};

// Optimize image for different layouts
export const optimizeImageForLayout = (
  src: string,
  layout: 'grid' | 'masonry' | 'featured' | 'pinterest',
  index: number = 0,
  totalImages: number = 1
): OptimizedImage => {
  const isPriority = index < 6; // First 6 images are priority
  
  let baseSize: ImageSize;
  let columns: number;
  
  switch (layout) {
    case 'grid':
      baseSize = IMAGE_SIZES.medium;
      columns = 4;
      break;
    case 'masonry':
      baseSize = IMAGE_SIZES.large;
      columns = 3;
      break;
    case 'featured':
      if (index === 0) {
        baseSize = IMAGE_SIZES.xlarge;
        columns = 1;
      } else {
        baseSize = IMAGE_SIZES.small;
        columns = 2;
      }
      break;
    case 'pinterest':
      baseSize = IMAGE_SIZES.medium;
      columns = 4;
      break;
    default:
      baseSize = IMAGE_SIZES.medium;
      columns = 3;
  }
  
  const responsiveSizes = generateResponsiveSizes(baseSize);
  
  return {
    src: `${src}?w=${baseSize.width}&h=${baseSize.height}&q=${baseSize.quality}`,
    srcSet: generateSrcSet(src, responsiveSizes),
    sizes: generateSizes(columns),
    width: baseSize.width,
    height: baseSize.height,
    format: 'webp',
    priority: isPriority,
  };
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

// Batch preload images
export const preloadImages = async (images: string[], maxConcurrent: number = 3): Promise<void> => {
  const chunks = [];
  for (let i = 0; i < images.length; i += maxConcurrent) {
    chunks.push(images.slice(i, i + maxConcurrent));
  }
  
  for (const chunk of chunks) {
    await Promise.allSettled(chunk.map(preloadImage));
  }
};

// Image format detection and optimization
export const getOptimalFormat = (src: string): 'webp' | 'jpeg' | 'png' => {
  const extension = src.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'png':
      return 'png';
    case 'webp':
      return 'webp';
    default:
      return 'jpeg';
  }
};

// Generate placeholder for lazy loading
export const generatePlaceholder = (width: number, height: number): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a subtle gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

// Cache management utilities
export class ImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private maxSize = 100;
  
  set(key: string, image: HTMLImageElement): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, image);
  }
  
  get(key: string): HTMLImageElement | undefined {
    return this.cache.get(key);
  }
  
  has(key: string): boolean {
    return this.cache.has(key);
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  size(): number {
    return this.cache.size;
  }
}

// Global image cache instance
export const imageCache = new ImageCache();

// Performance monitoring
export const imageLoadMetrics = {
  totalImages: 0,
  loadedImages: 0,
  failedImages: 0,
  averageLoadTime: 0,
  loadTimes: [] as number[],
  
  startLoad(): number {
    return performance.now();
  },
  
  endLoad(startTime: number, success: boolean = true): void {
    const loadTime = performance.now() - startTime;
    this.loadTimes.push(loadTime);
    this.totalImages++;
    
    if (success) {
      this.loadedImages++;
    } else {
      this.failedImages++;
    }
    
    this.averageLoadTime = this.loadTimes.reduce((a, b) => a + b, 0) / this.loadTimes.length;
  },
  
  getStats() {
    return {
      totalImages: this.totalImages,
      loadedImages: this.loadedImages,
      failedImages: this.failedImages,
      averageLoadTime: this.averageLoadTime,
      successRate: (this.loadedImages / this.totalImages) * 100,
    };
  },
  
  reset(): void {
    this.totalImages = 0;
    this.loadedImages = 0;
    this.failedImages = 0;
    this.averageLoadTime = 0;
    this.loadTimes = [];
  },
};
