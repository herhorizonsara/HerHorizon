import React, { useState, useRef, useEffect } from 'react';
import { Play, Maximize, Minimize } from 'lucide-react';
import { trackVslPlay } from '../lib/tracking';

interface VSLPlayerProps {
  videoId?: string;
  className?: string;
  eyebrow?: string;
  badge?: string;
  onPlay?: () => void;
}

export const VSLPlayer: React.FC<VSLPlayerProps> = ({
  videoId = 'cHaRNVZF5Jk',
  className = '',
  eyebrow,
  badge = 'Special Video Message',
  onPlay,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback to high quality thumbnail if maxresdefault fails
  const handleImageError = () => {
    setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
  };

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handlePlay = () => {
    trackVslPlay();
    onPlay?.();
    setIsPlaying(true);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      const el = containerRef.current as any;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E8DCD5] bg-black select-none ${className}`}
    >
      {!isPlaying ? (
        /* Pure Professional Facade: ONLY the video & luxury play button (Zero YouTube titles, branding, or channel info) */
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play Video Briefing"
          className="group relative w-full h-full block text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#BD7469] focus:ring-offset-2"
        >
          {/* Clean High-Res Video Poster */}
          <img
            src={thumbnailUrl}
            alt="Video Presentation"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="eager"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 group-hover:from-black/50 group-hover:via-black/10 transition-colors duration-300" />

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer subtle breathing glow */}
            <div className="relative flex items-center justify-center">
              <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#BD7469]/30 animate-ping pointer-events-none" />
              <span className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E2B072]/20 blur-md pointer-events-none" />

              {/* Primary Luxury Play Button */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#BD7469] to-[#D4A373] text-white shadow-[0_10px_25px_rgba(189,116,105,0.45)] flex items-center justify-center transform transition-all duration-300 ease-out group-hover:scale-110 group-active:scale-95 border border-white/20">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 text-white fill-white ml-1 transition-transform duration-300 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </button>
      ) : (
        /* Active Video Player with YouTube IFrame and Fullscreen Capability */
        <div className="relative w-full h-full bg-black">
          <iframe
            className="w-full h-full absolute inset-0"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&playsinline=1&fs=1`}
            title="HerHorizon Video Briefing"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />

          {/* Protective top shield to prevent clicks on any residual external YouTube channel navigation */}
          <div 
            className="absolute top-0 inset-x-0 h-12 z-10 pointer-events-auto bg-transparent cursor-default"
            title="HerHorizon VSL"
          />

          {/* Quick Expand / Fullscreen Button on the container */}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit full screen' : 'Expand to full screen'}
            className="absolute top-3 right-3 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white backdrop-blur-md transition-all duration-200 border border-white/10 shadow-md cursor-pointer hover:scale-105"
            title={isFullscreen ? 'Exit full screen' : 'Expand full screen'}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
