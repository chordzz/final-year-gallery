'use client'
import React from 'react';

export type DoodleType = 
  | 'circle' 
  | 'square' 
  | 'triangle' 
  | 'star' 
  | 'heart' 
  | 'diamond'
  | 'flower'
  | 'rose'
  | 'butterfly'
  | 'cloud'
  | 'moon'
  | 'sun'
  | 'sparkle'
  | 'music-note'
  | 'envelope'
  | 'gift'
  | 'cupcake'
  | 'balloon'
  | 'crown'
  | 'arrow'
  | 'leaf'
  | 'feather'
  | 'wave'
  | 'zigzag'
  | 'dots';

interface DoodleProps {
  type: DoodleType;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Doodle: React.FC<DoodleProps> = ({ 
  type, 
  size = 24, 
  color = '#ff6b9d', 
  className = '',
  style = {}
}) => {
  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    color: color,
    ...style
  };

  const renderDoodle = () => {
    switch (type) {
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      
      case 'flower':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18ZM2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12ZM20 12C20 10.9 20.9 10 22 10C23.1 10 24 10.9 24 12C24 13.1 23.1 14 22 14C20.9 14 20 13.1 20 12ZM12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"/>
          </svg>
        );
      
      case 'rose':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18ZM2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12ZM20 12C20 10.9 20.9 10 22 10C23.1 10 24 10.9 24 12C24 13.1 23.1 14 22 14C20.9 14 20 13.1 20 12ZM12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"/>
            <path d="M12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8Z" fill="#ff1493"/>
          </svg>
        );
      
      case 'butterfly':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18ZM2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12ZM20 12C20 10.9 20.9 10 22 10C23.1 10 24 10.9 24 12C24 13.1 23.1 14 22 14C20.9 14 20 13.1 20 12Z"/>
            <path d="M12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8Z" fill="#ff69b4"/>
          </svg>
        );
      
      case 'cloud':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
          </svg>
        );
      
      case 'moon':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 3c.46 0 .93.04 1.4.14 2.65.43 4.47 2.71 4.47 5.36 0 2.65-1.82 4.93-4.47 5.36-.47.1-.94.14-1.4.14-4.41 0-8-3.59-8-8s3.59-8 8-8z"/>
          </svg>
        );
      
      case 'sun':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        );
      
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      
      case 'music-note':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        );
      
      case 'envelope':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        );
      
      case 'gift':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
          </svg>
        );
      
      case 'cupcake':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18ZM2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12ZM20 12C20 10.9 20.9 10 22 10C23.1 10 24 10.9 24 12C24 13.1 23.1 14 22 14C20.9 14 20 13.1 20 12Z"/>
            <circle cx="12" cy="12" r="3" fill="#ff69b4"/>
          </svg>
        );
      
      case 'balloon':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18ZM2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12ZM20 12C20 10.9 20.9 10 22 10C23.1 10 24 10.9 24 12C24 13.1 23.1 14 22 14C20.9 14 20 13.1 20 12Z"/>
            <path d="M12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8Z" fill="#ff1493"/>
          </svg>
        );
      
      case 'crown':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 8l3 4h2l-4 6-4-6h2l3-4z"/>
          </svg>
        );
      
      case 'arrow':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
          </svg>
        );
      
      case 'leaf':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A5.17 5.17 0 0 0 8 20C19 20 22 3 22 3S21 5 17 8z"/>
          </svg>
        );
      
      case 'feather':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
            <line x1="16" y1="8" x2="2" y2="22"/>
            <line x1="17.5" y1="15" x2="9" y2="15"/>
          </svg>
        );
      
      case 'wave':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M2 12c2-8 10-8 10 0s8 8 10 0"/>
          </svg>
        );
      
      case 'zigzag':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M6 6l6 6-6 6"/>
            <path d="M12 6l6 6-6 6"/>
          </svg>
        );
      
      case 'dots':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <circle cx="6" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="18" cy="12" r="2"/>
          </svg>
        );
      
      case 'star':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      
      case 'diamond':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 2L2 12l10 10 10-10L12 2z"/>
          </svg>
        );
      
      case 'triangle':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <path d="M12 2L2 20h20L12 2z"/>
          </svg>
        );
      
      case 'square':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          </svg>
        );
      
      case 'circle':
      default:
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={baseStyle}>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
    }
  };

  return renderDoodle();
};

export default Doodle;