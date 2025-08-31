'use client'
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface MusicPlayerProps {
  audioSrcs: string[];
  className?: string;
  onMusicStarted?: () => void;
}

export interface MusicPlayerRef {
  startMusic: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerRef, MusicPlayerProps>(({ audioSrcs, className = '', onMusicStarted }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize with a random song
  useEffect(() => {
    if (audioSrcs.length > 0) {
      const randomIndex = Math.floor(Math.random() * audioSrcs.length);
      setCurrentSongIndex(randomIndex);
    }
  }, [audioSrcs.length]);

  const startMusic = () => {
    const audio = audioRef.current;
    if (audio && !isPlaying) {
      // Set the current song source and ensure it's loaded
      audio.src = audioSrcs[currentSongIndex];
      audio.load();
      
      // Wait for the audio to be ready before playing
      const playAudio = () => {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          onMusicStarted?.();
        }).catch((error) => {
          // If autoplay fails, we'll wait for the next user interaction
        });
      };

      // If audio is already loaded, play immediately
      if (audio.readyState >= 2) {
        playAudio();
      } else {
        // Wait for audio to load
        audio.addEventListener('canplaythrough', playAudio, { once: true });
      }
    }
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % audioSrcs.length;
    
    const audio = audioRef.current;
    if (audio) {
      // Store the current playing state
      const wasPlaying = isPlaying;
      
      // Update the song index
      setCurrentSongIndex(nextIndex);
      
      // Set the new source and load it
      audio.src = audioSrcs[nextIndex];
      audio.load();
      
      // If it was playing before, start the new song
      if (wasPlaying) {
        const playAudio = () => {
          audio.play().then(() => {
          }).catch((error) => {
            setIsPlaying(false);
          });
        };

        if (audio.readyState >= 2) {
          playAudio();
        } else {
          audio.addEventListener('canplaythrough', playAudio, { once: true });
        }
      }
    }
  };

  const shufflePlaylist = () => {
    if (audioSrcs.length > 1) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * audioSrcs.length);
      } while (newIndex === currentSongIndex && audioSrcs.length > 1);
      
      const audio = audioRef.current;
      if (audio) {
        // Store the current playing state
        const wasPlaying = isPlaying;
        
        // Update the song index
        setCurrentSongIndex(newIndex);
        
        // Set the new source and load it
        audio.src = audioSrcs[newIndex];
        audio.load();
        
        // If it was playing before, start the new song
        if (wasPlaying) {
          const playAudio = () => {
            audio.play().then(() => {
            }).catch((error) => {
              setIsPlaying(false);
            });
          };

          if (audio.readyState >= 2) {
            playAudio();
          } else {
            audio.addEventListener('canplaythrough', playAudio, { once: true });
          }
        }
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = volume;

    // Auto-play when component mounts (with user interaction)
    const handleUserInteraction = (event: Event) => {
      // Only trigger auto-play if clicking outside the music player
      const target = event.target as Element;
      if (target.closest('.music-player-container')) {
        return; // Don't auto-play if clicking on music player
      }
      
      if (!hasInteracted && !isPlaying) {
        startMusic();
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    // Audio event handlers
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      // When song ends, play the next song
      playNextSong();
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isPlaying, hasInteracted]); // Removed currentSongIndex and audioSrcs.length from dependencies

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  // Update audio source when currentSongIndex changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioSrcs.length > 0) {
      audio.src = audioSrcs[currentSongIndex];
      audio.load();
    }
  }, [currentSongIndex, audioSrcs]);

  // Expose startMusic function to parent component
  useImperativeHandle(ref, () => ({
    startMusic
  }));

  // Handle clicking outside to close controls
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showControls && !target.closest('.music-player-container')) {
        setShowControls(false);
      }
    };

    if (showControls) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showControls]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSrcs[currentSongIndex]} />
      
      {/* Music Player Controls */}
      <div className={`fixed bottom-6 right-6 z-50 music-player-container ${className}`}>
        {/* Main Control Button */}
        <div className="relative">
          <button
            onClick={() => setShowControls(!showControls)}
            className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110 group"
          >
            <div className="relative">
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            {/* Music Note Animation */}
            <div className="absolute -top-1 -right-1 text-pink-200 text-xs animate-bounce">
              ♪
            </div>
          </button>
        </div>

        {/* Expanded Controls */}
        {showControls && (
          <div className="absolute bottom-16 right-0 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-pink-200/50 min-w-[200px] animate-romantic-fade-in">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-full mb-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white py-2 px-4 rounded-lg hover:from-pink-500 hover:to-rose-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {isPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Play</span>
                </>
              )}
            </button>

            {/* Shuffle Button */}
            {audioSrcs.length > 1 && (
              <button
                onClick={shufflePlaylist}
                className="w-full mb-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-500 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Shuffle</span>
              </button>
            )}

            {/* Volume Control */}
            <div className="space-y-2">
              <label className="text-xs text-gray-600 font-medium flex items-center space-x-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.793a1 1 0 011.414.07zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Volume</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Song Info */}
            <div className="mt-3 pt-3 border-t border-pink-200/50">
              <p className="text-xs text-gray-600 font-handwriting text-center">
                💕 Love Song {currentSongIndex + 1} of {audioSrcs.length} 💕
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

export default MusicPlayer;
