import React from 'react';
import { CanvaImagePlaceholder } from '../CanvaImagePlaceholder';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Check, Lock } from 'lucide-react';

export const Step10OfferAndGuarantee: React.FC = () => {
  return (
    <section id="step-10" className="py-14 sm:py-24 md:py-32 bg-[#FAF6F2] border-t border-[#EFE5DC] text-[#2D2A26] relative overflow-hidden">
      
      {/* Decorative ambient warmth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E2B072]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#BD7469]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10">
        
        {/* Canva Headline: "A Complete Restoration System for just $27 (Or $13 Today)" */}
        <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] block mb-2">
          SPECIAL 50% OFF SISTERHOOD ACCESS
        </span>

        <h2 className="font-serif italic font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#D4A373] leading-tight mb-4 sm:mb-6 max-w-3xl mx-auto px-1">
          A Complete Restoration System <br className="hidden sm:inline" />
          <span className="text-[#C59B63]">$27 Value — Just $13 Today.</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#736E67] max-w-xl mx-auto mb-8 sm:mb-12 font-light">
          Less than the cost of a single therapy copay or a takeout lunch. Instant, lifetime access to all 168 pages, 5 core modules, and 3 protective bonuses.
        </p>

        {/* Value Breakdown & Price Polygon Layout */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center bg-white border-2 border-[#E8DCD5] rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-luxe-lg mb-10 sm:mb-16">
          
          {/* Left Column: Line Items */}
          <div className="md:col-span-7 text-left space-y-3.5 text-sm sm:text-base text-[#BD7469]">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0" />
              <p className="font-medium text-[#3D3532]">
                Pillar 01: The 30-Day Identity Roadmap <span className="text-[#BD7469] font-normal">(Value: $37)</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0" />
              <p className="font-medium text-[#3D3532]">
                Pillar 02: The Self-Trust Reset Guide <span className="text-[#BD7469] font-normal">(Value: $25)</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0" />
              <p className="font-medium text-[#3D3532]">
                Pillar 03: Mental Loop Release Journal <span className="text-[#BD7469] font-normal">(Value: $22)</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0" />
              <p className="font-medium text-[#3D3532]">
                Pillar 04: Trauma Bond 7-Day Detox <span className="text-[#BD7469] font-normal">(Value: $24)</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0" />
              <p className="font-medium text-[#3D3532]">
                Pillar 05: 25 Boundary Scripts Library <span className="text-[#BD7469] font-normal">(Value: $20)</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0" />
              <p className="font-medium text-[#3D3532]">
                3 Protective Bonuses (Red Flags, Home, Joy) <span className="text-[#BD7469] font-normal">(Value: $51)</span>
              </p>
            </div>

            {/* Total Value, Regular Price & Today Price */}
            <div className="pt-5 sm:pt-6 border-t border-[#F0ECE4] space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#8C7A74]">
                <span>Total Combined Value:</span>
                <span className="line-through font-serif">$179.00</span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base font-semibold text-[#5C524F]">
                <span>Standard System Price:</span>
                <span className="line-through font-serif text-[#BD7469]">$27.00</span>
              </div>
              <div className="font-serif italic text-xl xs:text-2xl sm:text-3xl font-bold text-[#D4A373] flex items-center justify-between pt-1 border-t border-dashed border-[#E8DCD5]">
                <span>Your Price Today (Coupon Applied):</span>
                <span className="text-2xl xs:text-3xl sm:text-4xl text-[#BD7469] font-sans font-bold">$13</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Canva Polygon Price Badge */}
          <div className="md:col-span-5 flex justify-center py-2 sm:py-0">
            <div className="relative w-44 xs:w-48 sm:w-56 h-34 xs:h-36 sm:h-44 flex items-center justify-center">
              {/* Gold Outline skew backdrop */}
              <div className="absolute inset-0 border-2 border-[#E2B072] rounded-2xl rotate-3" />
              
              {/* Dusty Rose / Terracotta Polygon Flag */}
              <div className="relative z-10 w-full h-full bg-[#BD7469] text-white rounded-2xl -rotate-2 flex flex-col items-center justify-center shadow-lg p-3 sm:p-4">
                <span className="text-xs sm:text-sm text-white/80 line-through font-light">
                  $27 Regular
                </span>
                <span className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                  $13
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#FAF6F2] mt-1 bg-white/20 px-2 py-0.5 rounded">
                  50% Off Lifetime Access
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Canva 100% Guarantee Badge & Seal */}
        <div className="max-w-2xl mx-auto my-8 sm:my-12 flex flex-col items-center">
          
          {/* Golden Seal Graphic / Image */}
          <div className="w-32 h-32 sm:w-36 sm:h-36 relative mb-5 sm:mb-6">
            <CanvaImagePlaceholder
              step={10}
              filename="guarantee-badge.png"
              fallbackFilenames={['step10-guarantee-seal.png', 'guarantee.png', 'guarantee-seal.png', 'step10-guarantee.png']}
              alt="100% Money Back Guarantee Seal"
              aspectRatio="aspect-square"
              className="w-32 h-32 sm:w-36 sm:h-36 mx-auto"
              description="Golden 100% Guarantee Seal Badge with Ribbon (public/guarantee-badge.png or public/images/guarantee-badge.png)"
              fallbackGraphic={
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#D4A373] via-[#F3D5A5] to-[#C59B63] p-1.5 shadow-2xl flex items-center justify-center relative transform hover:rotate-3 transition-transform">
                  {/* Outer notched star circle */}
                  <div className="w-full h-full rounded-full border-4 border-dashed border-white/70 flex flex-col items-center justify-center text-center p-2 bg-gradient-to-b from-[#FFF9F2] to-[#F1E0CE] text-[#2D2A26]">
                    <span className="text-[10px] font-bold text-[#BD7469] tracking-widest uppercase">100%</span>
                    {/* Ribbon bar across */}
                    <div className="w-[115%] bg-[#BD7469] text-white font-bold text-[10px] tracking-widest py-1 uppercase shadow-md my-0.5 transform -rotate-2">
                      GUARANTEE
                    </div>
                    <span className="text-[8px] font-bold text-[#8C7A74] tracking-wider uppercase">PEACE OF MIND</span>
                  </div>
                </div>
              }
            />
          </div>

          {/* Canva Headline: "MY PROMISE TO YOU:" */}
          <h3 className="font-serif italic font-bold text-xl sm:text-2xl md:text-3xl text-[#D4A373] tracking-wide uppercase mb-3 sm:mb-4">
            MY PROMISE TO YOU:
          </h3>

          {/* Canva Promise Copy */}
          <p className="font-sans text-xs xs:text-sm sm:text-base text-[#BD7469] leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 font-medium px-2">
            If you don’t feel a flicker of your real self returning within 7 days, email me for a full refund. No questions asked. I am committed to your peace of mind, not your money.
          </p>

          {/* Canva Button: "I'M READY TO COME HOME" (Dusty Rose Pill Button) */}
          <div className="w-full max-w-md mx-auto space-y-3.5 px-1">
            <a
              href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] active:bg-[#96473D] text-white font-medium text-xs xs:text-sm sm:text-base tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer uppercase font-sans min-h-[48px]"
            >
              <span>I&rsquo;M READY TO COME HOME — $13 (50% OFF)</span>
              <ArrowRight className="w-4 h-4 text-white shrink-0" />
            </a>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] sm:text-xs text-[#8C7A74] pt-1">
              <Lock className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
              <span>Code: REBUILD50 for 50% Off ($13 Final) • SSL Checkout</span>
            </div>

            {/* Payment & Security Trust Badges Strip */}
            <div className="pt-2">
              <CanvaImagePlaceholder
                step={10}
                filename="payment-trust-badges.png"
                fallbackFilenames={['payment-badges.png', 'secure-checkout.png', 'trust-badges.png']}
                alt="Safe & Secure Payment Methods: Visa, Mastercard, AMEX, PayPal, Apple Pay, SSL Encrypted"
                aspectRatio="aspect-[6/1]"
                className="max-w-xs mx-auto"
                description="Payment trust badges image strip (public/payment-trust-badges.png)"
                fallbackGraphic={
                  <div className="flex items-center justify-center flex-wrap gap-2 py-1 px-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2DA] text-[10px] text-[#7A746C]">
                    <span className="font-bold px-1.5 py-0.5 bg-white rounded border border-[#E0D5CC] text-[#1A1F71]">VISA</span>
                    <span className="font-bold px-1.5 py-0.5 bg-white rounded border border-[#E0D5CC] text-[#EB001B]">MC</span>
                    <span className="font-bold px-1.5 py-0.5 bg-white rounded border border-[#E0D5CC] text-[#006FCF]">AMEX</span>
                    <span className="font-bold px-1.5 py-0.5 bg-white rounded border border-[#E0D5CC] text-[#003087]">PayPal</span>
                    <span className="font-bold px-1.5 py-0.5 bg-white rounded border border-[#E0D5CC] text-[#000000]">Apple Pay</span>
                    <span className="flex items-center space-x-1 font-semibold text-[#4A7C59]">
                      <Lock className="w-2.5 h-2.5" />
                      <span>256-Bit SSL</span>
                    </span>
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
