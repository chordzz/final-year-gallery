'use client'
import React, { useEffect, useState } from 'react';

interface ImagePreloaderProps {
  images: string[];
  priority?: boolean;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  onLoaderFinished?: () => void;
  className?: string;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  images,
  priority = false,
  onComplete,
  onProgress,
  onLoaderFinished,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const preloadCriticalImages = async () => {
      try {
        // Preload images in batches
        const batchSize = priority ? 3 : 2;
        const totalBatches = Math.ceil(images.length / batchSize);
        
        for (let i = 0; i < totalBatches && isMounted; i++) {
          const startIndex = i * batchSize;
          const endIndex = Math.min(startIndex + batchSize, images.length);
          const batch = images.slice(startIndex, endIndex);
          
          await Promise.allSettled(
            batch.map(async (src) => {
              try {
                await new Promise<void>((resolve, reject) => {
                  const img = new Image();
                  img.onload = () => {
                    if (isMounted) {
                      setLoadedCount(prev => prev + 1);
                    }
                    resolve();
                  };
                  img.onerror = () => {
                    reject(new Error(`Failed to preload: ${src}`));
                  };
                  img.src = src;
                });
              } catch (error) {
                console.warn(`Failed to preload image: ${src}`, error);
              }
            })
          );
          
          if (isMounted) {
            // Update progress
            const newProgress = ((i + 1) / totalBatches) * 100;
            setProgress(newProgress);
            onProgress?.(newProgress);
          }
        }
        
        if (isMounted) {
          onComplete?.();
          setIsComplete(true);
          
          // Start countdown
          let remaining = 5;
          const countdownInterval = setInterval(() => {
            remaining--;
            if (isMounted) {
              setCountdown(remaining);
            }
            if (remaining <= 0) {
              clearInterval(countdownInterval);
              if (isMounted) {
                setIsLoading(false);
                onLoaderFinished?.(); // Notify that loader is completely finished
              }
            }
          }, 1000);
        }
      } catch (error) {
        console.error('Error during image preloading:', error);
      }
    };

    preloadCriticalImages();

    return () => {
      isMounted = false;
    };
  }, [images, priority, onComplete, onProgress]);

  // Don't show anything if not loading or if no images
  if (!isLoading || images.length === 0) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 backdrop-blur-sm flex items-center justify-center ${className}`}>
      {/* Romantic Background Doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Hearts */}
        <div className="absolute top-10 left-10 text-pink-300 text-2xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>💕</div>
        <div className="absolute top-20 right-20 text-rose-300 text-xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>💖</div>
        <div className="absolute bottom-20 left-20 text-purple-300 text-3xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.2s' }}>💝</div>
        <div className="absolute bottom-10 right-10 text-pink-400 text-xl animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}>💗</div>
        
        {/* Floating Flowers */}
        <div className="absolute top-1/4 left-1/4 text-pink-200 text-lg animate-pulse" style={{ animationDelay: '0.3s' }}>🌸</div>
        <div className="absolute top-1/3 right-1/3 text-rose-200 text-xl animate-pulse" style={{ animationDelay: '0.8s' }}>🌹</div>
        <div className="absolute bottom-1/3 left-1/3 text-purple-200 text-lg animate-pulse" style={{ animationDelay: '1.2s' }}>🌺</div>
        
        {/* Sparkles */}
        <div className="absolute top-1/2 left-1/6 text-yellow-300 text-sm animate-spin" style={{ animationDelay: '0.2s', animationDuration: '3s' }}>✨</div>
        <div className="absolute top-1/3 right-1/6 text-pink-300 text-xs animate-spin" style={{ animationDelay: '0.7s', animationDuration: '2.5s' }}>⭐</div>
        <div className="absolute bottom-1/4 right-1/4 text-purple-300 text-sm animate-spin" style={{ animationDelay: '1.1s', animationDuration: '3.2s' }}>💫</div>
      </div>

      <div className="text-center relative z-10">
        {/* Main Loading Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-pink-200/50 max-w-md mx-auto">
          {/* Romantic Loading Spinner */}
          <div className="mb-6">
            <div className="relative w-20 h-20 mx-auto">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-pink-200 rounded-full animate-pulse"></div>
              {/* Inner Spinning Ring */}
              <div className="absolute inset-2 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
              {/* Center Heart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl animate-heartbeat">💖</div>
              </div>
            </div>
          </div>
          
          {/* Loading Text */}
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 font-handwriting">
            {isComplete 
              ? 'Your Gallery is Ready! 💕' 
              : (priority ? 'Loading Your Memories... 💕' : 'Preparing Your Gallery... 💕')
            }
          </h3>
          
          {/* Romantic Progress Bar */}
          <div className="w-64 sm:w-72 bg-pink-100 rounded-full h-3 mb-3 mx-auto border border-pink-200">
            <div 
              className="bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: isComplete ? '100%' : `${progress}%` }}
            />
          </div>
          
          {/* Progress Text */}
          <p className="text-sm sm:text-base text-gray-600 font-body">
            {isComplete 
              ? `${images.length} of ${images.length} memories loaded (100%)`
              : `${loadedCount} of ${images.length} memories loaded (${progress.toFixed(0)}%)`
            }
          </p>
          
          {/* Romantic Decorative Elements */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
          </div>
        </div>
        
        {/* Bottom Message */}
        <p className="text-pink-600 text-sm mt-4 font-handwriting animate-pulse">
          {isComplete 
            ? `Entering your gallery in ${countdown} seconds... ✨`
            : 'Preparing something special for you... ✨'
          }
        </p>
      </div>
    </div>
  );
};

export default ImagePreloader;
