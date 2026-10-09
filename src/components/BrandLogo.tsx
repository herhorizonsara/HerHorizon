import React, { useState } from 'react';
import { Feather } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  iconSize?: string;
  showText?: boolean;
  textClass?: string;
  subtextClass?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  theme = 'light',
  iconSize = 'h-8 sm:h-9 w-auto',
  showText = true,
  textClass,
  subtextClass,
}) => {
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Logo filenames to check
  const candidateList = React.useMemo(() => {
    const list: string[] = [];
    const names = theme === 'dark' 
      ? ['logo-white.png', 'logo-white.svg', 'logo.png', 'logo.svg', 'logo-light.png', 'logo.jpg']
      : ['logo.png', 'logo.svg', 'logo-dark.png', 'logo-dark.svg', 'logo.jpg'];
    
    names.forEach((n) => {
      list.push(`/${n}`);
      list.push(`/images/${n}`);
    });
    return Array.from(new Set(list));
  }, [theme]);

  const currentSrc = candidateIdx < candidateList.length ? candidateList[candidateIdx] : null;
  const defaultTextClass = theme === 'dark' ? 'text-white' : 'text-[#2D2A26]';
  const defaultSubtextClass = theme === 'dark' ? 'text-[#D4A373]' : 'text-[#D4A373]';

  return (
    <div className={`flex items-center space-x-2.5 text-left ${className}`}>
      {currentSrc && !hasError ? (
        <img
          src={currentSrc}
          alt="HerHorizon"
          onError={() => {
            if (candidateIdx + 1 < candidateList.length) {
              setCandidateIdx((p) => p + 1);
            } else {
              setHasError(true);
            }
          }}
          className={`${iconSize} object-contain transition-transform duration-300 hover:scale-105 shrink-0`}
        />
      ) : (
        <div
          className={`w-8 h-8 rounded-full ${
            theme === 'dark'
              ? 'bg-[#E3A88D]/20 border border-[#E3A88D]/40 text-[#E3A88D]'
              : 'bg-[#E2B072]/20 border border-[#E2B072]/50 text-[#BD7469]'
          } flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0`}
        >
          <Feather className="w-4 h-4" />
        </div>
      )}

      {showText && (
        <div className="leading-none">
          <span
            className={`font-serif block uppercase leading-tight ${
              textClass || `text-base tracking-[0.12em] font-semibold ${defaultTextClass}`
            }`}
          >
            HerHorizon
          </span>
          <span
            className={`block uppercase font-semibold mt-0.5 ${
              subtextClass || `text-[8px] tracking-[0.16em] ${defaultSubtextClass}`
            }`}
          >
            RISE &amp; HEAL
          </span>
        </div>
      )}
    </div>
  );
};

