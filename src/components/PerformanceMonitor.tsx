'use client'
import React, { useState, useEffect } from 'react';
import { imageLoadMetrics, imageCache } from '../utils/imageOptimization';

interface PerformanceMonitorProps {
  className?: string;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState(imageLoadMetrics.getStats());
  const [cacheSize, setCacheSize] = useState(imageCache.size());

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(imageLoadMetrics.getStats());
      setCacheSize(imageCache.size());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Show monitor in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-50 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg ${className}`}>
      <div className="text-sm font-mono">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Performance Monitor</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Total Images:</span>
            <span className="text-blue-400">{stats.totalImages}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Loaded:</span>
            <span className="text-green-400">{stats.loadedImages}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Failed:</span>
            <span className="text-red-400">{stats.failedImages}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Success Rate:</span>
            <span className="text-yellow-400">{stats.successRate.toFixed(1)}%</span>
          </div>
          
          <div className="flex justify-between">
            <span>Avg Load Time:</span>
            <span className="text-purple-400">{stats.averageLoadTime.toFixed(0)}ms</span>
          </div>
          
          <div className="flex justify-between">
            <span>Cache Size:</span>
            <span className="text-cyan-400">{cacheSize}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-600">
          <button
            onClick={() => {
              imageLoadMetrics.reset();
              imageCache.clear();
              setStats(imageLoadMetrics.getStats());
              setCacheSize(imageCache.size());
            }}
            className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded transition-colors"
          >
            Reset Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
