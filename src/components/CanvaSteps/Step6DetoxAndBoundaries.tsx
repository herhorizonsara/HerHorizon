import React from 'react';
import { CanvaImagePlaceholder } from '../CanvaImagePlaceholder';
import { ShieldCheck, MessageSquareText } from 'lucide-react';

export const Step6DetoxAndBoundaries: React.FC = () => {
  return (
    <section id="step-6" className="py-14 sm:py-20 md:py-28 bg-[#FAF6F2] border-t border-[#EFE5DC] text-[#2D2A26] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Top Module: Trauma Bond Detox Guide */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center mb-14 sm:mb-20 pb-12 sm:pb-16 border-b border-[#F0ECE4]">
          {/* Left: iPad Mockup */}
          <div className="md:col-span-6 flex justify-center">
            <div className="w-full max-w-[240px] xs:max-w-[270px] sm:max-w-sm">
              <CanvaImagePlaceholder
                step="6A"
                filename="cover-traumabond.png"
                fallbackFilenames={['step6a-traumabond-mockup.png', 'cover-traumabond.jpg']}
                alt="Trauma Bond Detox Guide Book Cover"
                aspectRatio="aspect-[1/1.41]"
                objectFit="contain"
                description="iPad mockup showing hand raised toward sunset/ocean glow: 'Breaking the Addiction. Reclaiming Your Heart.'"
                fallbackGraphic={
                  <div className="w-full aspect-[1/1.41] bg-gradient-to-br from-[#FAF6F2] to-[#ECE0D4] border border-[#E2D5CC] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-luxe">
                    <div className="w-full h-full rounded-xl sm:rounded-2xl bg-[#2D2A26] p-2 flex flex-col justify-between text-white">
                      <div className="bg-[#FAF6F2] text-[#2D2A26] h-full rounded-xl p-3.5 sm:p-4 flex flex-col justify-between text-center">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#BD7469] font-bold">herhorizon</span>
                          <h4 className="font-serif italic text-base sm:text-lg font-bold text-[#D4A373] mt-2">
                            &ldquo;The Trauma Bond Detox Guide&rdquo;
                          </h4>
                        </div>
                        <div className="p-2 bg-white rounded-lg text-xs text-[#5C524F]">
                          Breaking the Addiction. Reclaiming Your Heart.
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
              PILLAR 04 • BIOCHEMICAL DETOX
            </span>

            <h3 className="font-serif italic font-bold text-2xl xs:text-3xl lg:text-4xl text-[#D4A373] leading-tight uppercase">
              TRAUMA BOND <br />
              DETOX GUIDE
            </h3>

            <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base text-[#BD7469]">
              <div className="flex items-start space-x-3 bg-white/95 p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">24 Pages | 7-Day Somatic Detox Ritual</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    Break the neurochemical addiction caused by intermittent love-bombing, silence, and unpredictable reconciliation cycles.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/95 p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">The &ldquo;Euphoric Recall&rdquo; Neutralizer</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    Your brain romantically edits out the disrespect. Use this cognitive filter when sudden waves of longing threaten your resolve.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/95 p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">The Urge-Surfing Somatic Protocol</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    The exact physical 3-step ritual for the 10-minute window when your fingers ache to text him or check his social profiles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Module: Boundary Scripts Library */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Left: Copy & Bullets */}
          <div className="md:col-span-6 space-y-4 sm:space-y-5 order-2 md:order-1 text-left">
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] block">
              PILLAR 05 • THE VOCAL SHIELD
            </span>

            <h3 className="font-serif italic font-bold text-2xl xs:text-3xl lg:text-4xl text-[#D4A373] leading-tight uppercase">
              BOUNDARY <br />
              SCRIPTS LIBRARY
            </h3>

            <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base text-[#BD7469]">
              <div className="flex items-start space-x-3 bg-white/95 p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">20 Pages | 25 Word-for-Word Templates</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    No more throat-tightening freeze responses. Copy and paste calm, unshakeable boundary scripts for text and in-person moments.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/95 p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">Guilt-Trip &amp; Hovering Deflectors</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    What to reply when he texts &ldquo;I thought we were mature adults&rdquo; or &ldquo;After all I gave you.&rdquo; Zero emotional bait.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white/95 p-3.5 sm:p-4 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
                <div>
                  <strong className="font-semibold text-[#2D2A26] block text-xs sm:text-sm">Co-Parenting &amp; Family Inquiries Vault</strong>
                  <p className="text-xs sm:text-sm text-[#5C524F] mt-0.5">
                    Strictly functional, court-safe scripts for mutual friends, in-laws, shared assets, and child logistics. Clean, polite, impenetrable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: iPad Mockup */}
          <div className="md:col-span-6 order-1 md:order-2 flex justify-center">
            <div className="w-full max-w-[240px] xs:max-w-[270px] sm:max-w-sm">
              <CanvaImagePlaceholder
                step="6B"
                filename="cover-boundaryscripts.png"
                fallbackFilenames={['step6b-boundaryscripts-mockup.png', 'cover-boundaryscripts.jpg']}
                alt="Boundary Scripts Library Book Cover"
                aspectRatio="aspect-[1/1.41]"
                objectFit="contain"
                description="iPad mockup showing flying bird: '25 Ready-to-Use Phrases for Reclaiming Your Space'."
                fallbackGraphic={
                  <div className="w-full aspect-[1/1.41] bg-gradient-to-br from-[#FAF6F2] to-[#ECE0D4] border border-[#E2D5CC] rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-luxe">
                    <div className="w-full h-full rounded-xl sm:rounded-2xl bg-[#2D2A26] p-2 flex flex-col justify-between text-white">
                      <div className="bg-[#FAF6F2] text-[#2D2A26] h-full rounded-xl p-3.5 sm:p-4 flex flex-col justify-between text-center">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#BD7469] font-bold">herhorizon</span>
                          <h4 className="font-serif italic text-base sm:text-lg font-bold text-[#D4A373] mt-2">
                            &ldquo;The Boundary Scripts Library&rdquo;
                          </h4>
                        </div>
                        <div className="p-2 bg-white rounded-lg text-xs text-[#5C524F]">
                          25 Ready-to-Use Phrases for Reclaiming Your Space
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
