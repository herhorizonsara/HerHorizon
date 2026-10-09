import React from 'react';
import { CanvaImagePlaceholder } from '../CanvaImagePlaceholder';
import { BookOpen } from 'lucide-react';

export const Step4Roadmap: React.FC = () => {
  return (
    <section id="step-4" className="py-14 sm:py-20 md:py-28 bg-[#FAF6F2] border-t border-[#EFE5DC] text-[#2D2A26] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Core Module: The Identity Rebuild Roadmap (Unified with Step 5 & Step 6) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center mb-12 sm:mb-16">
          {/* Left: iPad Mockup */}
          <div className="md:col-span-6 flex justify-center">
            <div className="w-full max-w-[240px] xs:max-w-[270px] sm:max-w-sm">
              <CanvaImagePlaceholder
                step={4}
                filename="cover-roadmap.png"
                fallbackFilenames={['step4-roadmap-mockup.png', 'cover-roadmap.jpg']}
                alt="The Identity Rebuild Roadmap Book Cover"
                aspectRatio="aspect-[1/1.41]"
                objectFit="contain"
                description="iPad mockup showing uncropped book cover: 'The Identity Rebuild Roadmap - 30-Day Guided Journey'."
                fallbackGraphic={
                  <div className="w-full aspect-[1/1.41] bg-gradient-to-br from-[#FAF6F2] to-[#ECE0D4] border border-[#E2D5CC] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-luxe">
                    <div className="w-full h-full rounded-xl sm:rounded-2xl bg-[#2D2A26] p-2 flex flex-col justify-between text-white">
                      <div className="bg-[#FAF6F2] text-[#2D2A26] h-full rounded-xl p-3.5 sm:p-4 flex flex-col justify-between text-center">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#BD7469] font-bold">herhorizon</span>
                          <h4 className="font-serif italic text-base sm:text-lg font-bold text-[#D4A373] mt-2">
                            &ldquo;The Identity Rebuild Roadmap&rdquo;
                          </h4>
                        </div>
                        <div className="p-2 bg-white rounded-lg text-xs text-[#5C524F]">
                          A 30-day guided journal that walks her through the 5 healing stages.
                        </div>
                        <span className="text-[8px] text-[#8C7A74]">www.herhorizon.store</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          {/* Right: Copy & Bullets */}
          <div className="md:col-span-6 space-y-4 sm:space-y-5 text-left">
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] block">
              PILLAR 01 • THE CORE FOUNDATION
            </span>

            <h3 className="font-serif italic font-bold text-2xl xs:text-3xl lg:text-4xl text-[#D4A373] leading-tight uppercase">
              THE IDENTITY <br />
              REBUILD ROADMAP
            </h3>

            {/* Bullets with matching design */}
            <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base text-[#BD7469]">
              <div className="flex items-start space-x-3 bg-white/95 p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">77 Pages | 30-Day Step-by-Step System</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    Your daily psychological spine to transition from frantic survival back to sovereign selfhood.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/95 p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">The 5 Sequential Healing Stages</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    From Stage 01 (De-escalation &amp; Awareness) through Stage 05 (Unshakeable Identity Anchoring).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/95 p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">Just 10 Minutes a Day</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    Zero academic fluff. Bite-sized somatic prompts designed for a nervous system running on 2% battery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Interior Pages */}
        <div className="pt-8 sm:pt-10 border-t border-[#EDE2DA] max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#BD7469] mb-5 sm:mb-6">
            <BookOpen className="w-4 h-4 text-[#E2B072]" />
            <span>Interior Guided System (Sample Pages)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-left">
            <div className="bg-white/95 p-4 rounded-2xl border border-[#E8DCD5] shadow-xs hover:-translate-y-0.5 transition-transform flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#BD7469] block mb-1">Page 03</span>
                <h5 className="font-serif italic text-sm font-bold text-[#2D2A26] leading-tight">The 5 Stage Blueprint</h5>
                <p className="text-xs text-[#736E67] mt-1.5 leading-relaxed">Stage 01 Awareness • 02 Detachment • 03 Forgiveness • 04 Self-Trust • 05 Identity</p>
              </div>
            </div>

            <div className="bg-white/95 p-4 rounded-2xl border border-[#E8DCD5] shadow-xs hover:-translate-y-0.5 transition-transform flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#BD7469] block mb-1">Page 05</span>
                <h5 className="font-serif italic text-sm font-bold text-[#2D2A26] leading-tight">How to Use This Roadmap</h5>
                <p className="text-xs text-[#736E67] mt-1.5 leading-relaxed">&ldquo;This isn't a test you have to pass. It is a space for you to return to.&rdquo; (10 min/day)</p>
              </div>
            </div>

            <div className="bg-white/95 p-4 rounded-2xl border border-[#E8DCD5] shadow-xs hover:-translate-y-0.5 transition-transform flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#BD7469] block mb-1">Page 07</span>
                <h5 className="font-serif italic text-sm font-bold text-[#2D2A26] leading-tight">The Progress Tracker</h5>
                <p className="text-xs text-[#736E67] mt-1.5 leading-relaxed">Your 30-Day Checkpoint Calendar to visualize daily sovereign steps.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


