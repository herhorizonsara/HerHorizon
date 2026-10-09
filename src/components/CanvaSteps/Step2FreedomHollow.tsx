import React from 'react';
import { CanvaImagePlaceholder } from '../CanvaImagePlaceholder';
import { Quote } from 'lucide-react';

export const Step2FreedomHollow: React.FC = () => {
  return (
    <section id="step-2" className="py-14 sm:py-20 md:py-28 bg-[#FAF6F2] border-t border-[#EFE5DC] text-[#2D2A26] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Top Aesthetic Image: Woman looking out window/terrace holding light string */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <CanvaImagePlaceholder
            step={2}
            filename="step2-freedom-hollow-1.png"
            fallbackFilenames={['step2-freedom-hollow.png', 'step2-freedom-hollow.jpg', 'step2.png', 'step2.jpg']}
            fallbackImageUrl="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=80"
            alt="Woman looking out at dusk on quiet balcony terrace holding light"
            aspectRatio="aspect-[16/10]"
            objectFit="cover"
            description="Silhouette of thoughtful woman on terrace under dusk sky holding light bulb cord."
            fallbackGraphic={
              <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxe-lg bg-gradient-to-b from-[#2E2926] via-[#3D3531] to-[#25221F] p-5 sm:p-8 flex flex-col justify-between text-white border border-[#4A423D]">
                {/* Twilight sky & warm terrace ambience */}
                <div className="flex items-center justify-between text-xs text-[#E2B072]/80">
                  <span className="font-serif italic tracking-wider">Twilight Field Notes</span>
                  <span className="bg-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-widest text-[#E8DCD5]">Quiet Sanctuary</span>
                </div>

                <div className="flex items-center justify-center my-3 sm:my-4">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#E2B072]/20 flex items-center justify-center border border-[#E2B072]/40 shadow-inner">
                    <Quote className="w-7 h-7 sm:w-10 sm:h-10 text-[#E2B072] opacity-80" />
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#F7EDE2] max-w-md mx-auto">
                    &ldquo;Standing in the quiet room... wondering who you are under all the silence.&rdquo;
                  </p>
                </div>
              </div>
            }
          />
        </div>

        {/* Canva Headline: "Freedom shouldn't feel this hollow." */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] block mb-2">
            STAGE 01 • THE SILENT VOID
          </span>

          <h2 className="font-serif italic text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#D4A373] mb-4 sm:mb-6 px-1">
            &ldquo;Freedom shouldn’t feel <br className="hidden sm:inline" />
            <span className="text-[#C59B63]">this hollow.&rdquo;</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#736E67] leading-relaxed max-w-lg mx-auto mb-6 sm:mb-8 font-light">
            Everyone told you that walking away was the finish line. Nobody warned you about the disorienting, chemical withdrawal that sets in when the chaos stops.
          </p>

          {/* Canva Bullets with Dusty Rose Dots */}
          <div className="space-y-3.5 sm:space-y-4 text-left max-w-xl mx-auto text-sm sm:text-base text-[#BD7469]">
            <div className="flex items-start space-x-3.5 bg-white/95 p-4 sm:p-4.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
              <div>
                <strong className="text-[#2D2A26] block font-semibold text-xs sm:text-sm mb-0.5">The Decision Paralysis:</strong>
                <p className="leading-relaxed text-[#5C524F] text-xs sm:text-sm">
                  &ldquo;You stand in front of the fridge for 10 minutes because you spent so many years adapting to his appetite, you don’t even know what you like anymore.&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 bg-white/95 p-4 sm:p-4.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
              <div>
                <strong className="text-[#2D2A26] block font-semibold text-xs sm:text-sm mb-0.5">The 2 A.M. Phantom Interrogation:</strong>
                <p className="leading-relaxed text-[#5C524F] text-xs sm:text-sm">
                  &ldquo;You replay fights in bed, drafting closing arguments to a jury that isn&rsquo;t there, searching for rational logic inside irrational chaos.&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 bg-white/95 p-4 sm:p-4.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
              <div>
                <strong className="text-[#2D2A26] block font-semibold text-xs sm:text-sm mb-0.5">The Unearned Guilt:</strong>
                <p className="leading-relaxed text-[#5C524F] text-xs sm:text-sm">
                  &ldquo;You feel like a bad person simply for resting, having an opinion, or setting a boundary without apologizing three times.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Canva Highlight Quote & Reframe Card */}
        <div className="max-w-2xl mx-auto mt-6 sm:mt-12 p-6 sm:p-9 rounded-2xl sm:rounded-3xl bg-white border border-[#E8DCD5] shadow-luxe text-center relative">
          <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#E2B072] mx-auto mb-2.5 sm:mb-3 opacity-70" />
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#D4A373] leading-relaxed mb-3">
            &ldquo;This is not a lack of willpower. This is Identity Collapse. You didn’t just lose him—you lost the lead character of your own life.&rdquo;
          </p>
          <div className="pt-3 border-t border-[#F0ECE4] text-[11px] sm:text-xs text-[#8C7A74] max-w-md mx-auto">
            The trauma bond floods the nervous system with intermittent spikes of dopamine and cortisol. Your mind is not broken—your body is undergoing biological withdrawal.
          </div>
        </div>

      </div>
    </section>
  );
};
