'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  loading?: boolean;
  threshold?: number;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 100,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // Handle loading more content
  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Error loading more content:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, onLoadMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          handleLoadMore();
        }
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0.1
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, threshold, handleLoadMore]);

  return (
    <div className={className}>
      {children}
      
      {/* Loading indicator */}
      {hasMore && (
        <div
          ref={loadingRef}
          className="flex items-center justify-center py-8"
        >
          {isLoading || loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-600 text-sm">Loading more...</span>
            </div>
          ) : (
            <div className="h-6" /> // Invisible element for intersection observer
          )}
        </div>
      )}

      {/* End of content indicator */}
      {!hasMore && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm">You've reached the end</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
