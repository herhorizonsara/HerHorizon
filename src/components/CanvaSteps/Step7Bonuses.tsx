import React, { useState } from 'react';
import { Gift, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Step7BonusesProps {
  onScrollToCheckout: () => void;
}

interface BonusTabletProps {
  bonusNumber: number;
  badgeBg: string;
  title: string;
  subtitle: string;
  coverNames: string[];
  containerClass: string;
  isCenter?: boolean;
}

const BonusTablet: React.FC<BonusTabletProps> = ({
  bonusNumber,
  badgeBg,
  title,
  subtitle,
  coverNames,
  containerClass,
  isCenter = false,
}) => {
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [hasError, setHasError] = useState(false);

  const candidateList = React.useMemo(() => {
    const list: string[] = [];
    coverNames.forEach((n) => {
      list.push(`/${n}`);
      list.push(`/images/${n}`);
      if (n.endsWith('.png')) {
        const jpg = n.replace('.png', '.jpg');
        list.push(`/${jpg}`);
        list.push(`/images/${jpg}`);
      } else if (n.endsWith('.jpg')) {
        const png = n.replace('.jpg', '.png');
        list.push(`/${png}`);
        list.push(`/images/${png}`);
      }
    });
    return Array.from(new Set(list));
  }, [coverNames]);

  const currentSrc = candidateIdx < candidateList.length ? candidateList[candidateIdx] : null;

  return (
    <div className={`aspect-[1/1.41] shrink-0 overflow-hidden transition-transform duration-300 ${containerClass}`}>
      {currentSrc && !hasError ? (
        <img
          src={currentSrc}
          alt={title}
          onError={() => {
            if (candidateIdx + 1 < candidateList.length) {
              setCandidateIdx((p) => p + 1);
            } else {
              setHasError(true);
            }
          }}
          className="w-full h-full object-cover object-center rounded-[6px] sm:rounded-xl"
          loading="lazy"
        />
      ) : (
        <div className={`w-full h-full p-2.5 sm:p-3.5 flex flex-col justify-between text-center rounded-[6px] sm:rounded-xl ${isCenter ? 'bg-gradient-to-b from-[#FAF6F2] to-[#ECE0D4]' : 'bg-[#FAF6F2]'}`}>
          <span className={`text-[8px] sm:text-[10px] ${badgeBg} text-white px-2 py-0.5 rounded-full font-bold uppercase self-center shadow-xs`}>
            Bonus {bonusNumber}
          </span>
          <div>
            <h4 className="font-serif italic text-[11px] sm:text-sm font-bold text-[#D4A373] leading-tight">
              {title}
            </h4>
            <p className="text-[7px] sm:text-[9px] text-[#5C524F] mt-1 italic">
              &ldquo;{subtitle}&rdquo;
            </p>
          </div>
          <span className="text-[6px] sm:text-[7px] text-[#8C7A74]">www.herhorizon.store</span>
        </div>
      )}
    </div>
  );
};

interface BonusThumbProps {
  coverNames: string[];
  alt: string;
  bonusNumber: number;
}

const BonusThumb: React.FC<BonusThumbProps> = ({ coverNames, alt, bonusNumber }) => {
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [hasError, setHasError] = useState(false);

  const candidateList = React.useMemo(() => {
    const list: string[] = [];
    coverNames.forEach((n) => {
      list.push(`/${n}`);
      list.push(`/images/${n}`);
      if (n.endsWith('.png')) {
        list.push(`/${n.replace('.png', '.jpg')}`);
        list.push(`/images/${n.replace('.png', '.jpg')}`);
      }
    });
    return Array.from(new Set(list));
  }, [coverNames]);

  const currentSrc = candidateIdx < candidateList.length ? candidateList[candidateIdx] : null;

  return (
    <div className="w-14 xs:w-16 sm:w-18 aspect-[1/1.41] rounded-lg overflow-hidden shrink-0 border border-[#E8DCD5] shadow-xs bg-[#FAF6F2]">
      {currentSrc && !hasError ? (
        <img
          src={currentSrc}
          alt={alt}
          onError={() => {
            if (candidateIdx + 1 < candidateList.length) setCandidateIdx((p) => p + 1);
            else setHasError(true);
          }}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-[#FAF6F2] p-1 flex flex-col justify-between items-center text-center">
          <span className="text-[8px] font-bold text-[#BD7469]">B{bonusNumber}</span>
          <span className="text-[6px] text-[#8C7A74]">Bonus</span>
        </div>
      )}
    </div>
  );
};

export const Step7Bonuses: React.FC<Step7BonusesProps> = ({ onScrollToCheckout }) => {
  return (
    <section id="step-7" className="py-14 sm:py-20 md:py-28 bg-[#FFFDF9] border-t border-[#EFE5DC] text-[#2D2A26] relative text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Canva Top Button: "GET THE SYSTEM NOW" (Trauma-Informed Somatic Breathe & Shimmer) */}
        <div className="mb-6 sm:mb-10 px-1">
          <button
            onClick={onScrollToCheckout}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#E2B072] hover:bg-[#D4A373] active:bg-[#C59B63] text-white font-medium text-xs xs:text-sm sm:text-base tracking-wide px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer uppercase font-sans min-h-[48px] btn-shimmer-container animate-breathe group"
          >
            <span className="btn-shimmer-sweep" />
            <span>GET THE SYSTEM NOW</span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Canva Gift Badge / Sticker */}
        <div className="inline-flex items-center space-x-3 bg-[#FAF3ED] border border-[#E8DCD5] px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl mb-5 sm:mb-6 shadow-sm">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#BD7469] text-white flex items-center justify-center shadow-xs">
            <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="text-left">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#E2B072] block">GIFTS INCLUDED</span>
            <span className="font-serif italic font-bold text-xs sm:text-base text-[#BD7469] uppercase">EXTRA BONUS</span>
          </div>
        </div>

        {/* Canva Headline */}
        <h2 className="font-serif italic text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#D4A373] mb-6 sm:mb-10 max-w-2xl mx-auto px-1">
          Plus, 3 Exclusive Bonuses <br className="hidden sm:inline" />
          <span className="text-[#C59B63]">to protect your future.</span>
        </h2>

        {/* Visual: Pristine 3-Tablet Interactive Showcase (Zero Text Cut-off, Full Legibility) */}
        <div className="max-w-2xl sm:max-w-3xl mx-auto my-6 sm:my-8 px-1">
          <div className="w-full bg-gradient-to-b from-[#FAF8F5] via-[#F4EDE6] to-[#ECE1D8] border border-[#E2D5CC] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-luxe-lg relative overflow-hidden">
            
            {/* Top Badge Overlay */}
            <div className="flex items-center justify-between text-xs text-[#8C7A74] mb-4 sm:mb-6 px-1 border-b border-[#E2D5CC]/70 pb-3">
              <span className="font-serif italic text-sm text-[#BD7469] font-medium">
                All 3 Future-Shield Protective Bonuses Included
              </span>
              <span className="bg-white/95 px-3 py-1 rounded-full border border-[#DECAC0] font-semibold text-[#BD7469] text-xs shadow-2xs">
                $51 Combined Value • Included Free Today
              </span>
            </div>

            {/* 3-Tablet Layout with Generous Spacing and Zero Overlapping Text */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 py-2 sm:py-4">
              
              {/* Tablet 1: First Date Red Flag Decoder */}
              <div className="w-full max-w-[210px] sm:w-1/3 flex flex-col items-center group">
                <div className="relative w-full aspect-[3535/5000] rounded-xl sm:rounded-2xl overflow-hidden bg-white p-1 sm:p-1.5 border border-[#DECAC0] shadow-md group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300">
                  <picture>
                    <source type="image/webp" srcSet="/cover-bonus-redflags.webp, /images/cover-bonus-redflags.webp" />
                    <img
                      src="/cover-bonus-redflags.webp"
                      alt="First Date Red Flag Decoder Cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedImages) {
                          target.dataset.triedImages = 'true';
                          target.src = '/cover-bonus-redflags.png';
                        }
                      }}
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl select-none"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute top-2 left-2 bg-[#BD7469] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                    Bonus 01
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <h4 className="font-serif italic text-xs sm:text-sm font-bold text-[#2D2A26]">Red Flag Decoder</h4>
                  <span className="text-[11px] text-[#8C7A74]">14 Pages • Dating Filter</span>
                </div>
              </div>

              {/* Tablet 2: Home Reclamation Blueprint (Centerpiece) */}
              <div className="w-full max-w-[225px] sm:w-[36%] flex flex-col items-center group -translate-y-0 sm:-translate-y-2">
                <div className="relative w-full aspect-[3535/5000] rounded-xl sm:rounded-2xl overflow-hidden bg-white p-1.5 sm:p-2 border-2 border-[#E2B072] shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300">
                  <picture>
                    <source type="image/webp" srcSet="/cover-bonus-homereclaim.webp, /images/cover-bonus-homereclaim.webp" />
                    <img
                      src="/cover-bonus-homereclaim.webp"
                      alt="Home Reclamation Blueprint Cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedImages) {
                          target.dataset.triedImages = 'true';
                          target.src = '/cover-bonus-homereclaim.png';
                        }
                      }}
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl select-none"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute top-2.5 left-2.5 bg-[#E2B072] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs">
                    Bonus 02 • Core
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <h4 className="font-serif italic text-xs sm:text-sm font-bold text-[#BD7469]">Home Reclamation</h4>
                  <span className="text-[11px] text-[#8C7A74]">12 Pages • Space Cleansing</span>
                </div>
              </div>

              {/* Tablet 3: Solo Saturday Joy Bank */}
              <div className="w-full max-w-[210px] sm:w-1/3 flex flex-col items-center group">
                <div className="relative w-full aspect-[3535/5000] rounded-xl sm:rounded-2xl overflow-hidden bg-white p-1 sm:p-1.5 border border-[#DECAC0] shadow-md group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300">
                  <picture>
                    <source type="image/webp" srcSet="/cover-bonus-joybank.webp, /images/cover-bonus-joybank.webp" />
                    <img
                      src="/cover-bonus-joybank.webp"
                      alt="Solo Saturday Joy Bank Cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedImages) {
                          target.dataset.triedImages = 'true';
                          target.src = '/cover-bonus-joybank.png';
                        }
                      }}
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl select-none"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute top-2 left-2 bg-[#BD7469] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                    Bonus 03
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <h4 className="font-serif italic text-xs sm:text-sm font-bold text-[#2D2A26]">Solo Saturday Joy</h4>
                  <span className="text-[11px] text-[#8C7A74]">18 Pages • 50 Self-Dates</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Detailed Bonus Breakdown Cards with Cover Thumbnails */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-left max-w-4xl mx-auto">
          
          {/* Bonus 1 Card */}
          <div className="bg-white/95 border border-[#EDE2DA] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex items-start gap-3.5 mb-3">
              <BonusThumb
                coverNames={['cover-bonus-redflags.png', 'cover-bonus-redflags.jpg']}
                alt="First Date Red Flag Decoder Cover"
                bonusNumber={1}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FAF3ED] text-[#BD7469] border border-[#E8DCD5]">
                    Bonus 01
                  </span>
                  <span className="text-xs text-[#8C7A74] line-through">$27 Value</span>
                </div>
                <h4 className="font-serif italic text-base sm:text-lg font-bold text-[#BD7469] leading-tight">
                  First Date Red Flag Decoder
                </h4>
                <p className="text-xs text-[#5C524F] leading-relaxed mt-1">
                  Early-warning filter to spot covert manipulation and love-bombing on date 1.
                </p>
              </div>
            </div>
            <div className="text-[11px] text-[#8C7A74] border-t border-[#F0ECE4] pt-2.5 flex items-center space-x-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E2B072] shrink-0" />
              <span>14 Pages • Checklist &amp; Intuitive Filter</span>
            </div>
          </div>

          {/* Bonus 2 Card */}
          <div className="bg-white/95 border border-[#EDE2DA] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex items-start gap-3.5 mb-3">
              <BonusThumb
                coverNames={['cover-bonus-homereclaim.png', 'cover-bonus-homereclaim.jpg']}
                alt="Home Reclamation Blueprint Cover"
                bonusNumber={2}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FAF3ED] text-[#BD7469] border border-[#E8DCD5]">
                    Bonus 02
                  </span>
                  <span className="text-xs text-[#8C7A74] line-through">$25 Value</span>
                </div>
                <h4 className="font-serif italic text-base sm:text-lg font-bold text-[#BD7469] leading-tight">
                  Home Reclamation Blueprint
                </h4>
                <p className="text-xs text-[#5C524F] leading-relaxed mt-1">
                  Step-by-step sensory guide to cleanse his ghost from your bedroom and spaces.
                </p>
              </div>
            </div>
            <div className="text-[11px] text-[#8C7A74] border-t border-[#F0ECE4] pt-2.5 flex items-center space-x-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E2B072] shrink-0" />
              <span>12 Pages • Energetic Cleansing Protocol</span>
            </div>
          </div>

          {/* Bonus 3 Card */}
          <div className="bg-white/95 border border-[#EDE2DA] rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="flex items-start gap-3.5 mb-3">
              <BonusThumb
                coverNames={['cover-bonus-joybank.png', 'cover-bonus-joybank.jpg']}
                alt="Solo Saturday Joy Bank Cover"
                bonusNumber={3}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FAF3ED] text-[#BD7469] border border-[#E8DCD5]">
                    Bonus 03
                  </span>
                  <span className="text-xs text-[#8C7A74] line-through">$27 Value</span>
                </div>
                <h4 className="font-serif italic text-base sm:text-lg font-bold text-[#BD7469] leading-tight">
                  Solo Saturday Joy Bank
                </h4>
                <p className="text-xs text-[#5C524F] leading-relaxed mt-1">
                  50 curated sensory rituals and self-dates to fall back in love with solitude.
                </p>
              </div>
            </div>
            <div className="text-[11px] text-[#8C7A74] border-t border-[#F0ECE4] pt-2.5 flex items-center space-x-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E2B072] shrink-0" />
              <span>18 Pages • 50 Low-Cost Self-Dates</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


