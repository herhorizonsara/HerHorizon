import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Upload, Eye } from 'lucide-react';

interface CanvaImagePlaceholderProps {
  step: number | string;
  filename: string;
  fallbackFilenames?: string[];
  fallbackImageUrl?: string;
  alt: string;
  fallbackGraphic?: React.ReactNode;
  aspectRatio?: string; // e.g. "aspect-[4/3]", "aspect-[16/9]"
  className?: string;
  description?: string;
  objectFit?: 'contain' | 'cover';
}

export const CanvaImagePlaceholder: React.FC<CanvaImagePlaceholderProps> = ({
  step,
  filename,
  fallbackFilenames = [],
  fallbackImageUrl,
  alt,
  fallbackGraphic,
  aspectRatio = 'aspect-[16/10]',
  className = '',
  description,
  objectFit = 'contain',
}) => {
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);

  // Generate all potential candidates (checking both /images/ and / root public folder, plus png/jpg alternates)
  const candidateList = React.useMemo(() => {
    const rawList = [filename, ...fallbackFilenames];
    const expanded: string[] = [];
    rawList.forEach((name) => {
      expanded.push(`/${name}`);
      expanded.push(`/images/${name}`);
      if (name.endsWith('.png')) {
        const jpg = name.replace('.png', '.jpg');
        const jpeg = name.replace('.png', '.jpeg');
        expanded.push(`/${jpg}`);
        expanded.push(`/images/${jpg}`);
        expanded.push(`/${jpeg}`);
        expanded.push(`/images/${jpeg}`);
      } else if (name.endsWith('.jpg')) {
        const png = name.replace('.jpg', '.png');
        expanded.push(`/${png}`);
        expanded.push(`/images/${png}`);
      }
    });
    if (fallbackImageUrl) {
      expanded.push(fallbackImageUrl);
    }
    return Array.from(new Set(expanded));
  }, [filename, fallbackFilenames, fallbackImageUrl]);

  const currentSrc = candidateIndex < candidateList.length ? candidateList[candidateIndex] : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setLocalImage(url);
    }
  };

  const handleImgError = () => {
    // Try next candidate filename
    setCandidateIndex((prev) => prev + 1);
  };

  const isExhausted = !localImage && candidateIndex >= candidateList.length;

  return (
    <div className={`relative rounded-3xl overflow-hidden group ${className}`}>
      {/* Render local uploaded image, or image from public folder, or high-fidelity fallback graphic */}
      {localImage ? (
        <div className={`w-full ${aspectRatio} overflow-hidden bg-[#FAF6F2]`}>
          <img
            src={localImage}
            alt={alt}
            className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} object-center`}
          />
        </div>
      ) : !isExhausted && currentSrc ? (
        <div className={`w-full ${aspectRatio} overflow-hidden bg-[#FAF6F2] relative shadow-md`}>
          <img
            src={currentSrc}
            alt={alt}
            onError={handleImgError}
            className={`w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} object-center transition-transform duration-500 group-hover:scale-[1.02]`}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full relative">
          {fallbackGraphic ? (
            fallbackGraphic
          ) : (
            <div
              className={`w-full ${aspectRatio} bg-gradient-to-br from-[#FAF8F5] via-[#F6EFE9] to-[#EFE4DC] border-2 border-dashed border-[#DECAC0] rounded-3xl flex flex-col items-center justify-center p-6 text-center shadow-inner`}
            >
              <div className="w-12 h-12 rounded-full bg-[#E2B072]/20 border border-[#E2B072]/40 flex items-center justify-center text-[#D4A373] mb-3">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#BD7469] block">
                Step {step} Image Asset
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[#3D3532] mt-1 mb-2 max-w-sm">
                {alt}
              </p>
              <code className="text-[11px] bg-white/90 border border-[#DECAC0] px-3 py-1 rounded-full text-[#7A6A65] font-mono shadow-xs">
                public/images/{filename}
              </code>
              {description && (
                <p className="text-xs text-[#8A7973] mt-2 max-w-md font-light">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
