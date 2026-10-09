import React, { useState } from 'react';

export type CoverType =
  | 'roadmap'
  | 'selftrust'
  | 'mentalloop'
  | 'boundaryscripts'
  | 'traumabond'
  | 'bonus-redflags'
  | 'bonus-homereclaim'
  | 'bonus-joybank';

interface BookCoverGraphicProps {
  type: CoverType;
  className?: string;
  compact?: boolean;
}

const coverImages: Record<CoverType, string> = {
  roadmap: '/images/cover-roadmap.png',
  mentalloop: '/images/cover-mentalloop.png',
  selftrust: '/images/cover-selftrust.png',
  boundaryscripts: '/images/cover-boundaryscripts.png',
  traumabond: '/images/cover-traumabond.png',
  'bonus-redflags': '/images/cover-bonus-redflags.png',
  'bonus-homereclaim': '/images/cover-bonus-homereclaim.png',
  'bonus-joybank': '/images/cover-bonus-joybank.png',
};

const coverTitles: Record<CoverType, { title: string; subtitle: string; bg: string; text: string }> = {
  roadmap: {
    title: 'The Identity Rebuild Roadmap',
    subtitle: '30-Day Guided Journey Through the 5 Stages',
    bg: 'bg-[#FAF7F2]',
    text: 'text-[#2D2825]',
  },
  mentalloop: {
    title: 'Mental Loop Release Journal',
    subtitle: 'The 3 A.M. Protocol • 10 Interrupt Prompts',
    bg: 'bg-[#1F1B19]',
    text: 'text-[#F5EDE4]',
  },
  selftrust: {
    title: 'The Self-Trust Reset Guide',
    subtitle: '7 Days to Rebuild Your Internal Compass',
    bg: 'bg-[#FAF6F1]',
    text: 'text-[#332C28]',
  },
  boundaryscripts: {
    title: 'Boundary Scripts Library',
    subtitle: '25 Ready-to-Use Phrases to Reclaim Space',
    bg: 'bg-[#F2F5F0]',
    text: 'text-[#253023]',
  },
  traumabond: {
    title: 'Trauma Bond Detox Guide',
    subtitle: 'Breaking the Addiction • 7-Day Somatic Ritual',
    bg: 'bg-[#FBF5EE]',
    text: 'text-[#382E2B]',
  },
  'bonus-redflags': {
    title: 'First Date Red Flag Decoder',
    subtitle: '15 Subtle Questions & Micro-Tells',
    bg: 'bg-[#1C1917]',
    text: 'text-[#F5ECE2]',
  },
  'bonus-homereclaim': {
    title: 'Home Reclamation Blueprint',
    subtitle: 'Cleansing Memories from Your Space',
    bg: 'bg-[#FAF5EE]',
    text: 'text-[#332925]',
  },
  'bonus-joybank': {
    title: 'Solo Saturday Joy Bank',
    subtitle: '50 Non-Alcoholic Ways to Date Yourself',
    bg: 'bg-[#FAF7F2]',
    text: 'text-[#332A22]',
  },
};

export const BookCoverGraphic: React.FC<BookCoverGraphicProps> = ({
  type,
  className = '',
}) => {
  const [loadError, setLoadError] = useState(false);
  const info = coverTitles[type] || coverTitles.roadmap;
  const imgSrc = coverImages[type] || coverImages.roadmap;

  if (!loadError) {
    const webpSrc = imgSrc.replace(/\.png$/i, '.webp');
    return (
      <div className={`relative w-full h-full aspect-[3535/5000] rounded-xl overflow-hidden shadow-md ${className}`}>
        <picture>
          <source type="image/webp" srcSet={webpSrc} />
          <img
            src={imgSrc}
            alt={info.title}
            onError={() => setLoadError(true)}
            className="w-full h-full object-cover select-none"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    );
  }

  // Graceful fallback with clean serif typography (no cartoonish clip-art)
  return (
    <div
      className={`w-full h-full aspect-[3535/5000] rounded-xl p-4 flex flex-col justify-between text-center relative overflow-hidden shadow-md border border-[#E2D4C7] select-none ${info.bg} ${info.text} ${className}`}
    >
      <div className="absolute inset-2 border border-[#E2B072]/40 rounded-lg pointer-events-none" />
      <div className="relative z-10 pt-2">
        <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#BD7469] block">
          HERHORIZON™
        </span>
        <span className="text-[7px] tracking-[0.25em] uppercase text-[#D4A373] font-medium block">
          RESTORATION SYSTEM
        </span>
      </div>
      <div className="relative z-10 my-auto py-2">
        <h3 className="font-serif italic font-bold text-base md:text-lg leading-tight px-1">
          {info.title}
        </h3>
        <p className="text-[8px] font-medium mt-1 leading-tight opacity-75">
          {info.subtitle}
        </p>
      </div>
      <div className="relative z-10 pb-2 text-[7px] tracking-wider font-mono opacity-60">
        www.herhorizon.store
      </div>
    </div>
  );
};
