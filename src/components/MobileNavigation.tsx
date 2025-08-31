'use client'
import React, { useState, useEffect } from 'react';

interface NavigationItem {
  id: string;
  title: string;
  label: string;
}

interface MobileNavigationProps {
  sections: NavigationItem[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  sections,
  isOpen,
  onClose,
  onNavigate,
  activeSection
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Add a small delay for smooth animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for animation to complete before enabling scroll
      setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 300);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSectionClick = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-rose-50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Toluwapops</h2>
                <p className="text-xs text-gray-500">Final Year Gallery</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full text-left px-4 py-4 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 shadow-sm border border-pink-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activeSection === section.id ? 'bg-pink-500' : 'bg-gray-300'
                      }`} />
                      <span className="font-medium">{section.label}</span>
                    </div>
                    {activeSection === section.id && (
                      <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-5">{section.title}</p>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">T</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Toluwapops</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">Memories that last forever</p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                <span>• Tap image to preview</span>
                <span>• Swipe to navigate</span>
                <span>• Tap X to close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
