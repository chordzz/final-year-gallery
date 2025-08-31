// Mobile device detection and optimization utilities

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  hasHapticFeedback: boolean;
  hasReducedMotion: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

// Type definitions for better type safety
interface NavigatorConnection {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
}

interface ExtendedNavigator extends Navigator {
  connection?: NavigatorConnection;
}

// Detect if device supports touch
export const hasTouchSupport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Detect if device supports haptic feedback
export const hasHapticFeedback = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return 'vibrate' in navigator;
};

// Detect if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Detect connection speed
export const getConnectionSpeed = (): 'slow' | 'fast' | 'unknown' => {
  if (typeof navigator === 'undefined') return 'unknown';
  
  const connection = (navigator as ExtendedNavigator).connection;
  if (!connection) return 'unknown';
  
  const effectiveType = connection.effectiveType;
  if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
    return 'slow';
  }
  
  return 'fast';
};

// Get device pixel ratio
export const getPixelRatio = (): number => {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
};

// Detect screen dimensions
export const getScreenDimensions = () => {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  return {
    width: window.screen.width,
    height: window.screen.height
  };
};

// Detect device type
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Get comprehensive device capabilities
export const getDeviceCapabilities = (): DeviceCapabilities => {
  const screen = getScreenDimensions();
  const deviceType = getDeviceType();
  
  return {
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    hasTouch: hasTouchSupport(),
    hasHapticFeedback: hasHapticFeedback(),
    hasReducedMotion: prefersReducedMotion(),
    screenWidth: screen.width,
    screenHeight: screen.height,
    pixelRatio: getPixelRatio(),
    connectionSpeed: getConnectionSpeed()
  };
};

// Optimize image quality based on device capabilities
export const getOptimalImageQuality = (capabilities: DeviceCapabilities): number => {
  if (capabilities.connectionSpeed === 'slow') {
    return capabilities.pixelRatio > 2 ? 70 : 80;
  }
  
  if (capabilities.pixelRatio > 2) {
    return 85;
  }
  
  return 90;
};

// Get optimal image size based on device
export const getOptimalImageSize = (capabilities: DeviceCapabilities): number => {
  if (capabilities.isMobile) {
    return Math.min(capabilities.screenWidth, 800);
  }
  
  if (capabilities.isTablet) {
    return Math.min(capabilities.screenWidth, 1200);
  }
  
  return 1600;
};

// Check if device supports WebP
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Check if device supports AVIF
export const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 1);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

// Get optimal image format based on device support
export const getOptimalImageFormat = async (): Promise<'avif' | 'webp' | 'jpeg'> => {
  if (await supportsAVIF()) return 'avif';
  if (await supportsWebP()) return 'webp';
  return 'jpeg';
};

// Mobile-specific touch event handlers
export const createTouchHandlers = (options: {
  onTap?: () => void;
  onLongPress?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  minSwipeDistance?: number;
  longPressDelay?: number;
}) => {
  const {
    onTap,
    onLongPress,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    minSwipeDistance = 50,
    longPressDelay = 500
  } = options;

  let touchStart: { x: number; y: number; time: number } | null = null;
  let longPressTimer: NodeJS.Timeout | null = null;
  let hasMoved = false;

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    hasMoved = false;

    // Start long press timer
    longPressTimer = setTimeout(() => {
      if (!hasMoved && onLongPress) {
        onLongPress();
      }
    }, longPressDelay);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStart.x);
    const deltaY = Math.abs(touch.clientY - touchStart.y);
    
    if (deltaX > 10 || deltaY > 10) {
      hasMoved = true;
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    // Clear long press timer
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const deltaTime = Date.now() - touchStart.time;

    // Check if it's a swipe
    if (deltaTime < 300 && Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    } else if (!hasMoved && onTap) {
      // It's a tap
      onTap();
    }

    touchStart = null;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
};

// Haptic feedback utility
export const triggerHapticFeedback = (pattern: number | number[] = 10) => {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
  
  try {
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
  }
};

// Mobile-specific scroll utilities
export const smoothScrollTo = (element: HTMLElement, offset: number = 0) => {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

// Debounce utility for mobile performance
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for mobile performance
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
