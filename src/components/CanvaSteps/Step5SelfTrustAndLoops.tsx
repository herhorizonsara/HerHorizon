import React from 'react';
import { CanvaImagePlaceholder } from '../CanvaImagePlaceholder';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const Step5SelfTrustAndLoops: React.FC = () => {
  return (
    <section id="step-5" className="py-14 sm:py-20 md:py-28 bg-[#FFFDF9] border-t border-[#EFE5DC] text-[#2D2A26] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Top Module: The Self-Trust Reset Guide */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center mb-14 sm:mb-20 pb-12 sm:pb-16 border-b border-[#F0ECE4]">
          {/* Left: iPad Mockup */}
          <div className="md:col-span-6 flex justify-center">
            <div className="w-full max-w-[240px] xs:max-w-[270px] sm:max-w-sm">
              <CanvaImagePlaceholder
                step="5A"
                filename="cover-selftrust.png"
                fallbackFilenames={['step5a-selftrust-mockup.png', 'cover-selftrust.jpg']}
                alt="The Self-Trust Reset Guide Book Cover"
                aspectRatio="aspect-[1/1.41]"
                objectFit="contain"
                description="iPad mockup showing woman with hand on chest in linen shirt: '7 Days to Rebuild Your Intuition'."
                fallbackGraphic={
                  <div className="w-full aspect-[1/1.41] bg-gradient-to-br from-[#FAF6F2] to-[#ECE0D4] border border-[#E2D5CC] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-luxe">
                    <div className="w-full h-full rounded-xl sm:rounded-2xl bg-[#2D2A26] p-2 flex flex-col justify-between text-white">
                      <div className="bg-[#FAF6F2] text-[#2D2A26] h-full rounded-xl p-3.5 sm:p-4 flex flex-col justify-between text-center">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#BD7469] font-bold">herhorizon</span>
                          <h4 className="font-serif italic text-base sm:text-lg font-bold text-[#D4A373] mt-2">
                            &ldquo;The Self Trust Reset Guide&rdquo;
                          </h4>
                        </div>
                        <div className="p-2 bg-white rounded-lg text-xs text-[#5C524F]">
                          7 Days to Rebuild Your Intuition
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
              PILLAR 02 • THE INTERNAL COMPASS
            </span>

            <h3 className="font-serif italic font-bold text-2xl xs:text-3xl lg:text-4xl text-[#D4A373] leading-tight uppercase">
              THE SELF-TRUST <br />
              RESET GUIDE
            </h3>

            <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base text-[#BD7469]">
              <div className="flex items-start space-x-3 bg-[#FAF6F2] p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">25 Pages | 7-Day Intuition Workout</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    Reconnect the severed wires between your gut instinct and your conscious mind after months or years of gaslighting.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-[#FAF6F2] p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">Trauma Panic vs. Intuition Diagnostic</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    The 60-second test to know whether that sinking feeling is an old hypervigilant alarm or your genuine inner compass.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-[#FAF6F2] p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">The Consensus Trap Protocol</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    A clinical framework to stop compulsively surveying friends before making a decision. Own your choices with quiet conviction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Module: Mental Loop Release Journal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Left: Copy & Bullets */}
          <div className="md:col-span-6 space-y-4 sm:space-y-5 order-2 md:order-1 text-left">
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] block">
              PILLAR 03 • 2 A.M. COGNITIVE RELIEF
            </span>

            <h3 className="font-serif italic font-bold text-2xl xs:text-3xl lg:text-4xl text-[#D4A373] leading-tight uppercase">
              MENTAL LOOP <br />
              RELEASE JOURNAL
            </h3>

            <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base text-[#BD7469]">
              <div className="flex items-start space-x-3 bg-[#FAF6F2] p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">22 Pages | 10 Somatic Interrupters</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    Targeted cognitive interrupters designed specifically for the middle of the night when rumination feels impossible to turn off.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-[#FAF6F2] p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">The Phantom Courtroom Eviction</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    Dismiss the imaginary jury in your head. Learn the exact reframe to stop defending your sanity to an empty room.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-[#FAF6F2] p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">The 2 A.M. High-Contrast Anchor Card</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    A dark-mode printable/phone card designed for insomniac hours to ground your vagus nerve and pull you back into sleep in under 3 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: iPad Mockup */}
          <div className="md:col-span-6 order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-[240px] xs:max-w-[270px] sm:max-w-sm">
              <CanvaImagePlaceholder
                step="5B"
                filename="cover-mentalloop.png"
                fallbackFilenames={['step5b-mentalloop-mockup.png', 'cover-mentalloop.jpg']}
                alt="The Mental Loop Release Journal Book Cover"
                aspectRatio="aspect-[1/1.41]"
                objectFit="contain"
                description="iPad mockup showing cozy bedroom candle setting: 'Interrupt. Ground. Re-anchor.'"
                fallbackGraphic={
                  <div className="w-full aspect-[1/1.41] bg-gradient-to-br from-[#FAF6F2] to-[#ECE0D4] border border-[#E2D5CC] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-luxe">
                    <div className="w-full h-full rounded-xl sm:rounded-2xl bg-[#2D2A26] p-2 flex flex-col justify-between text-white">
                      <div className="bg-[#FAF6F2] text-[#2D2A26] h-full rounded-xl p-3.5 sm:p-4 flex flex-col justify-between text-center">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#BD7469] font-bold">herhorizon</span>
                          <h4 className="font-serif italic text-base sm:text-lg font-bold text-[#D4A373] mt-2">
                            &ldquo;The Mental Loop Release Journal&rdquo;
                          </h4>
                        </div>
                        <div className="p-2 bg-white rounded-lg text-xs text-[#5C524F]">
                          Interrupt. Ground. Re-anchor.
                        </div>
                        <span className="text-[8px] text-[#8C7A74]">www.herhorizon.store</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
