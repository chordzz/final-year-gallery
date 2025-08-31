'use client'
import React from 'react';
import Doodle, { DoodleType } from './Doodle';

const DoodleBackground: React.FC = () => {
  const romanticDoodles: Array<{
    type: DoodleType;
    position: { top?: string; right?: string; bottom?: string; left?: string };
    size: number;
    color: string;
    delay: string;
  }> = [
    // Hearts in various positions
    { type: 'heart', position: { top: '10%', left: '5%' }, size: 32, color: '#ff6b9d', delay: '0.5s' },
    { type: 'heart', position: { top: '15%', right: '8%' }, size: 24, color: '#ff8fab', delay: '1s' },
    { type: 'heart', position: { bottom: '20%', left: '12%' }, size: 28, color: '#ff6b9d', delay: '1.5s' },
    { type: 'heart', position: { bottom: '15%', right: '15%' }, size: 20, color: '#ff8fab', delay: '2s' },
    
    // Flowers and roses
    { type: 'flower', position: { top: '25%', left: '20%' }, size: 36, color: '#ff69b4', delay: '0.8s' },
    { type: 'rose', position: { top: '35%', right: '25%' }, size: 40, color: '#ff1493', delay: '1.2s' },
    { type: 'flower', position: { bottom: '30%', left: '8%' }, size: 32, color: '#ff69b4', delay: '1.8s' },
    
    // Butterflies
    { type: 'butterfly', position: { top: '45%', left: '15%' }, size: 28, color: '#ff8fab', delay: '1.3s' },
    { type: 'butterfly', position: { bottom: '40%', right: '10%' }, size: 24, color: '#ff6b9d', delay: '2.2s' },
    
    // Stars and sparkles
    { type: 'star', position: { top: '5%', left: '30%' }, size: 20, color: '#ffd700', delay: '0.3s' },
    { type: 'sparkle', position: { top: '8%', right: '35%' }, size: 16, color: '#ffd700', delay: '0.7s' },
    { type: 'star', position: { bottom: '10%', left: '40%' }, size: 18, color: '#ffd700', delay: '1.9s' },
    { type: 'sparkle', position: { bottom: '8%', right: '30%' }, size: 14, color: '#ffd700', delay: '2.5s' },
    
    // Clouds and moons
    { type: 'cloud', position: { top: '60%', left: '5%' }, size: 44, color: '#e8f4fd', delay: '1.1s' },
    { type: 'moon', position: { top: '70%', right: '8%' }, size: 32, color: '#f0f8ff', delay: '1.6s' },
    
    // Music notes and envelopes
    { type: 'music-note', position: { top: '20%', left: '45%' }, size: 24, color: '#ff6b9d', delay: '0.9s' },
    { type: 'envelope', position: { bottom: '25%', right: '45%' }, size: 28, color: '#ff8fab', delay: '2.1s' },
    
    // Gifts and balloons
    { type: 'gift', position: { top: '50%', left: '35%' }, size: 36, color: '#ff69b4', delay: '1.4s' },
    { type: 'balloon', position: { bottom: '35%', left: '25%' }, size: 32, color: '#ff8fab', delay: '1.7s' },
    
    // Crowns and arrows
    { type: 'crown', position: { top: '30%', right: '5%' }, size: 24, color: '#ffd700', delay: '0.6s' },
    { type: 'arrow', position: { bottom: '50%', right: '20%' }, size: 20, color: '#ff6b9d', delay: '2.3s' },
    
    // Leaves and feathers
    { type: 'leaf', position: { top: '75%', left: '25%' }, size: 28, color: '#90ee90', delay: '1.0s' },
    { type: 'feather', position: { bottom: '60%', right: '35%' }, size: 24, color: '#f0f8ff', delay: '2.4s' },
    
    // Decorative elements
    { type: 'wave', position: { top: '40%', left: '50%' }, size: 32, color: '#ff6b9d', delay: '0.4s' },
    { type: 'zigzag', position: { bottom: '45%', left: '60%' }, size: 28, color: '#ff8fab', delay: '1.8s' },
    { type: 'dots', position: { top: '65%', right: '15%' }, size: 20, color: '#ff69b4', delay: '2.0s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {romanticDoodles.map((doodle, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            ...doodle.position,
            animationDelay: doodle.delay,
            animationDuration: '6s',
            opacity: 0.15,
            filter: 'blur(0.3px)',
          }}
        >
          <Doodle
            type={doodle.type}
            size={doodle.size}
            color={doodle.color}
            className="transition-all duration-1000 hover:scale-110"
          />
        </div>
      ))}
      
      {/* Additional floating hearts for extra romance */}
      <div className="absolute top-1/4 left-1/3 animate-float" style={{ animationDelay: '0.2s', animationDuration: '8s', opacity: 0.1 }}>
        <Doodle type="heart" size={16} color="#ff6b9d" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 animate-float" style={{ animationDelay: '1.8s', animationDuration: '7s', opacity: 0.12 }}>
        <Doodle type="heart" size={12} color="#ff8fab" />
      </div>
      <div className="absolute top-1/2 left-1/6 animate-float" style={{ animationDelay: '3.1s', animationDuration: '9s', opacity: 0.08 }}>
        <Doodle type="heart" size={20} color="#ff69b4" />
      </div>
    </div>
  );
};

export default DoodleBackground;