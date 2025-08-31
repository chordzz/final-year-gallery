'use client'
import React, { useState, useEffect } from 'react';

interface MusicPromptProps {
  onStartMusic: () => void;
  onSkip: () => void;
  loaderComplete?: boolean;
}

const MusicPrompt: React.FC<MusicPromptProps> = ({ onStartMusic, onSkip, loaderComplete = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show prompt only after loader is complete
    if (loaderComplete) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // Small delay after loader finishes

      return () => clearTimeout(timer);
    }
  }, [loaderComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-romantic-fade-in">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-pink-200/50 max-w-md mx-auto mx-4 text-center relative w-[80vw]">
        {/* Romantic Background Doodles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
          <div className="absolute top-4 left-4 text-pink-300 text-lg animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>💕</div>
          <div className="absolute top-6 right-6 text-rose-300 text-xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>💖</div>
          <div className="absolute bottom-6 left-6 text-purple-300 text-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.2s' }}>💝</div>
          <div className="absolute bottom-4 right-4 text-pink-400 text-xl animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}>💗</div>
        </div>

        <div className="relative z-10">
          {/* Music Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <div className="text-3xl">🎵</div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 font-handwriting">
            Set the Mood 💕
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 font-body leading-relaxed">
            Enhance your gallery experience with beautiful background music. 
            Let the melodies accompany your journey through these precious memories. ✨
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onStartMusic}
              className="w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white py-3 px-6 rounded-xl hover:from-pink-500 hover:to-rose-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-xl">🎵</span>
              <span className="font-semibold">Start Music</span>
            </button>

            <button
              onClick={onSkip}
              className="w-full bg-gray-100 text-gray-600 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
            >
              Continue Without Music
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
          </div>

          {/* Bottom Message */}
          <p className="text-xs text-gray-500 mt-4 font-handwriting">
            You can always control music from the player below 💫
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicPrompt;
