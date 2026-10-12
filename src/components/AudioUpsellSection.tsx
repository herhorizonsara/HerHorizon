import React from 'react';
import { Headphones, Sparkles, Volume2, ArrowRight, ShieldCheck, Check, ExternalLink } from 'lucide-react';

interface AudioUpsellSectionProps {
  onScrollToCheckout: () => void;
}

export const AudioUpsellSection: React.FC<AudioUpsellSectionProps> = ({ onScrollToCheckout }) => {
  const audioBooks = [
    { num: '01', title: 'The Identity Rebuild Roadmap (Audio Edition)', duration: '2.5 Hours • Unabridged' },
    { num: '02', title: 'The Self-Trust Reset Guide (Audio Edition)', duration: '1.2 Hours • Guided Intuition' },
    { num: '03', title: 'Mental Loop Release Journal (Audio Edition)', duration: '1.5 Hours • Insomnia & 2 AM Relief' },
    { num: '04', title: 'Trauma Bond Detox Guide (Audio Edition)', duration: '1.8 Hours • Somatic Urge-Surfing' },
    { num: '05', title: 'Boundary Scripts Library (Audio Edition)', duration: '1.4 Hours • Spoken Word Practice' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6F2] border-t border-b border-[#EFE5DC] text-[#2D2A26] relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#BD7469]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-[#E2B072]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] bg-white border border-[#E8DCD5] px-3.5 py-1.5 rounded-full mb-4 shadow-2xs">
            <Headphones className="w-3.5 h-3.5 text-[#BD7469]" />
            <span>Optional VIP Upgrade • Complete Audio Library</span>
          </div>

          <h2 className="font-serif italic font-normal text-2xl xs:text-3xl sm:text-4xl md:text-[42px] text-[#D4A373] leading-tight mb-4">
            Listen On-The-Go: The 5-Part <br className="hidden sm:inline" />
            <span className="text-[#C59B63]">Somatic Audio Companion Pack</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#736E67] font-light leading-relaxed max-w-xl mx-auto">
            Prefer to listen while walking, driving, or winding down in bed? Absorb all 5 core guides through immersive, professionally narrated audio sessions designed specifically for nervous system regulation.
          </p>
        </div>

        {/* Visual Audio Pack Template Box */}
        <div className="bg-white border-2 border-[#E8DCD5] rounded-3xl p-6 sm:p-10 shadow-luxe-lg mb-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Code-Based Audio Bundle Graphic Template */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#2D2A26] to-[#1C1A18] text-[#FAF9F6] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#BD7469]/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E2B072] bg-white/10 px-2.5 py-1 rounded-full">
                  VIP AUDIO BUNDLE
                </span>
                <Volume2 className="w-5 h-5 text-[#BD7469] animate-pulse" />
              </div>

              <div>
                <h3 className="font-serif italic text-xl text-[#FAF9F6] font-normal">
                  HerHorizon Audio Suite
                </h3>
                <p className="text-[11px] text-[#A8A199] mt-1">
                  5 Unabridged Companion Ebooks • 8+ Hours of Therapeutic Narration
                </p>
              </div>

              {/* Stacked Audio Disc Visualizer Template */}
              <div className="space-y-2 pt-2">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#BD7469] w-3/4 animate-pulse" />
                  <div className="h-full bg-[#E2B072] w-1/4" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#A8A199]">
                  <span>Stereo Mastered</span>
                  <span>MP3 + Streaming Access</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[#A8A199]">Instant Digital Delivery</span>
              <span className="font-bold text-[#E2B072]">Only $7 (50% Off Bundle)</span>
            </div>
          </div>

          {/* Right: The 5 Audio Ebooks List */}
          <div className="md:col-span-7 space-y-3">
            <h4 className="font-serif italic text-base sm:text-lg font-semibold text-[#2D2A26] mb-3">
              Included in the Audio Companion Suite:
            </h4>

            <div className="space-y-2.5">
              {audioBooks.map((book) => (
                <div key={book.num} className="flex items-start space-x-3 bg-[#FAF6F2] p-3 rounded-2xl border border-[#EDE2DA]">
                  <div className="w-6 h-6 rounded-full bg-[#BD7469]/15 text-[#BD7469] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {book.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm text-[#2D2A26] truncate">
                      {book.title}
                    </p>
                    <span className="text-[11px] text-[#8C7A74] block">
                      {book.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-[#5C524F] flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#8A9A86] shrink-0" />
              <span>Listen seamlessly on your phone, tablet, or laptop anytime.</span>
            </div>
          </div>

        </div>

        {/* Upsell Callout & Direct Audio Purchase Option */}
        <div className="bg-white border-2 border-dashed border-[#E2B072] rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-sm">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#BD7469] bg-[#FAF6F2] px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B072]" />
            <span>Special Pricing Options</span>
          </div>

          <h3 className="font-serif italic text-lg sm:text-2xl text-[#2D2A26]">
            Accelerate Your Healing While Driving or Resting
          </h3>

          <p className="text-xs sm:text-sm text-[#736E67] max-w-xl mx-auto leading-relaxed">
            Get the complete Audio Suite for just <strong className="text-[#BD7469] font-bold">$7</strong> (50% off) when added to your main program order at checkout, or purchase the standalone audio edition directly below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onScrollToCheckout}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] active:bg-[#96473D] text-white text-xs sm:text-sm font-semibold tracking-wider px-6 sm:px-7 py-3.5 rounded-full transition-all shadow-md active:scale-[0.98] cursor-pointer uppercase font-sans"
            >
              <span>Claim System + Audio ($7 Add-on)</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <a
              href="https://www.herhorizon.store/l/audio-rebuild"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#FAF6F2] hover:bg-[#F3ECE4] text-[#2D2A26] border border-[#E8DCD5] text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full transition-all cursor-pointer"
            >
              <span>Buy Audio Only ($14 Standalone)</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8C7A74]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
