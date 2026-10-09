import React, { useState } from 'react';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  webpSrc?: string;
  fallbackSrcs?: string[];
  alt: string;
  className?: string;
  priority?: boolean; // When true, loading="eager" & fetchPriority="high"
  aspectRatioClass?: string; // Optional wrapper aspect ratio
}

/**
 * OptimizedImage component for ultra-fast, modern image loading.
 * 
 * Features:
 * 1. Automatically uses <picture> to serve modern, ultra-lightweight WebP format (typically 80-95% smaller).
 * 2. Automatic fallback to PNG / JPG.
 * 3. Supports chained fallbacks if any path 404s.
 * 4. Defaults to native lazy loading and async decoding unless priority={true}.
 * 5. Prevents Cumulative Layout Shift (CLS).
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  fallbackSrcs = [],
  alt,
  className = '',
  priority = false,
  aspectRatioClass,
  loading,
  decoding = 'async',
  onError,
  ...rest
}) => {
  // Infer WebP source if not explicitly provided
  const primaryWebp = webpSrc || (
    src.endsWith('.png') ? src.replace(/\.png$/i, '.webp') :
    src.endsWith('.jpg') ? src.replace(/\.jpg$/i, '.webp') :
    src.endsWith('.jpeg') ? src.replace(/\.jpeg$/i, '.webp') :
    undefined
  );

  const [currentSrc, setCurrentSrc] = useState(src);
  const [currentWebp, setCurrentWebp] = useState<string | undefined>(primaryWebp);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If WebP failed or image failed, try next candidate in fallbackSrcs
    if (fallbackIndex < fallbackSrcs.length) {
      const nextFallback = fallbackSrcs[fallbackIndex];
      setFallbackIndex((prev) => prev + 1);
      setCurrentSrc(nextFallback);
      if (nextFallback.endsWith('.png') || nextFallback.endsWith('.jpg')) {
        setCurrentWebp(nextFallback.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
      } else {
        setCurrentWebp(undefined);
      }
    } else {
      // If exhausted, disable webp source and let standard onError fire
      setCurrentWebp(undefined);
      if (onError) onError(e);
    }
  };

  const imgElement = (
    <picture>
      {currentWebp && <source type="image/webp" srcSet={currentWebp} />}
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : (loading || 'lazy')}
        decoding={decoding}
        fetchPriority={priority ? 'high' : 'auto'}
        onError={handleError}
        {...rest}
      />
    </picture>
  );

  if (aspectRatioClass) {
    return <div className={`relative overflow-hidden ${aspectRatioClass}`}>{imgElement}</div>;
  }

  return imgElement;
};

export default OptimizedImage;
