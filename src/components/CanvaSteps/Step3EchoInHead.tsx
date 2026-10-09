import React from 'react';
import { CanvaImagePlaceholder } from '../CanvaImagePlaceholder';
import { ArrowRight, Compass, Shield, Heart, Sparkles } from 'lucide-react';

interface Step3EchoInHeadProps {
  onScrollToCheckout: () => void;
}

export const Step3EchoInHead: React.FC<Step3EchoInHeadProps> = ({ onScrollToCheckout }) => {
  return (
    <section id="step-3" className="py-14 sm:py-20 md:py-28 bg-[#FFFDF9] border-t border-[#EFE5DC] text-[#2D2A26] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
         
        {/* Top Aesthetic Image: Morning window with coffee cup and feather on marble table */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <CanvaImagePlaceholder
            step={3}
            filename="step3-morning-window-1.png"
            fallbackFilenames={['step3-morning-window.png', 'step3-morning-window.jpg', 'step3.png', 'step3.jpg']}
            fallbackImageUrl="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1600&q=80"
            alt="Warm sunlit morning window with ceramic coffee cup and white feather on marble counter"
            aspectRatio="aspect-[16/10]"
            objectFit="cover"
            description="Warm architectural window with morning sunrise sky, ceramic cup and white feather resting on counter."
            fallbackGraphic={
              <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxe-lg bg-gradient-to-br from-[#FAF5EE] via-[#F3E8DB] to-[#E8D9C9] p-5 sm:p-8 flex flex-col justify-between text-[#2D2A26] border border-[#DFCFC1]">
                {/* Morning sunrise calmness */}
                <div className="flex items-center justify-between text-xs text-[#BD7469]">
                  <span className="font-serif italic font-medium tracking-wide">Dawn Awakening</span>
                  <span className="bg-white/80 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8C7A74] border border-[#DFCFC1]">
                    Gentle Stillness
                  </span>
                </div>

                <div className="flex items-center justify-center my-3 sm:my-4">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/70 border border-[#E2B072]/50 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 text-[#D4A373]" />
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#3D3532] max-w-md mx-auto">
                    &ldquo;A morning where you breathe without calculating someone else’s temper.&rdquo;
                  </p>
                </div>
              </div>
            }
          />
        </div>

        {/* Canva Headline: "Imagine waking up without his 'echo' in your head." */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] block mb-2">
            THE TURNING POINT • DAY 30 HORIZON
          </span>

          <h2 className="font-serif italic text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#D4A373] mb-4 sm:mb-6 px-1">
            &ldquo;Imagine waking up without <br className="hidden sm:inline" />
            his <span className="text-[#C59B63]">&lsquo;echo&rsquo;</span> in your head.&rdquo;
          </h2>

          <p className="text-xs sm:text-sm text-[#736E67] leading-relaxed max-w-lg mx-auto mb-6 sm:mb-8 font-light">
            Picture waking up at 7:00 a.m. and your very first thought belongs solely to you. No heart palpitations, no forensic mental reviews, no anticipatory dread.
          </p>

          {/* Canva Bullets with Dusty Rose Dots */}
          <div className="space-y-3.5 sm:space-y-4 text-left max-w-xl mx-auto text-sm sm:text-base text-[#BD7469]">
            <div className="flex items-start space-x-3.5 bg-[#FAF6F2] p-4 sm:p-4.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
              <div>
                <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm mb-0.5">The Quiet Mind:</strong>
                <span className="text-[#5C524F] text-xs sm:text-sm">The phantom courtroom has gone dark. You fall asleep without rehearsing defenses or dissecting double meanings.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 bg-[#FAF6F2] p-4 sm:p-4.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
              <div>
                <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm mb-0.5">The Steady Gut:</strong>
                <span className="text-[#5C524F] text-xs sm:text-sm">You make everyday decisions—and profound life choices—without polling five people to validate your intuition.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 bg-[#FAF6F2] p-4 sm:p-4.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
              <div>
                <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm mb-0.5">The Shield of Non-Engagement:</strong>
                <span className="text-[#5C524F] text-xs sm:text-sm">You deliver a calm, neutral, one-sentence boundary without your heart racing in your throat or over-explaining.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 bg-[#FAF6F2] p-4 sm:p-4.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
              <div>
                <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm mb-0.5">The Sacred Homecoming:</strong>
                <span className="text-[#5C524F] text-xs sm:text-sm">You walk into your quiet home and feel sanctuary instead of emptiness. You fall in love with your own life again.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Canva Button: High Converting CTA */}
        <div className="text-center mt-8 sm:mt-10 px-1">
          <button
            onClick={onScrollToCheckout}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#E2B072] hover:bg-[#D4A373] active:bg-[#C59B63] text-white font-semibold text-xs xs:text-sm sm:text-base tracking-wide px-8 sm:px-12 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer uppercase font-sans min-h-[50px]"
          >
            <span>GET THE SYSTEM — $13 TODAY</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
          <p className="text-[11px] text-[#8C7A74] mt-2">
            Instant Digital Download • 30-Day Money-Back Peace Guarantee
          </p>
        </div>

      </div>
    </section>
  );
};
