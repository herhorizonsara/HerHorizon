import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Check, Heart, Lock, ArrowRight, Clock, Gift, FileText, Smartphone } from 'lucide-react';

export const PricingCta: React.FC = () => {
  // Simulated countdown for the 50% discount voucher
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="special-offer"
      className="py-24 md:py-32 bg-[#C05746] text-white relative overflow-hidden"
    >
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
        
        {/* Rebuild Reward Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/15 border border-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white mb-6 uppercase tracking-widest shadow-sm">
          <Gift className="w-3.5 h-3.5 text-[#E3A88D]" />
          <span>Exclusive Sanctuary Offer</span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white mb-6 max-w-2xl mx-auto">
          Because you took the first step today, claim your Rebuild Reward.
        </h2>

        <p className="font-sans text-base sm:text-lg text-white/90 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          You don’t have to navigate identity recovery alone. Take the full system with you today at half the standard investment.
        </p>

        {/* Pricing Box / Offer Card */}
        <div className="bg-[#FAF9F6] text-[#2D2A26] rounded-3xl p-7 sm:p-10 md:p-12 shadow-2xl max-w-xl mx-auto text-center border border-white/40 relative">
          
          {/* Top Pill / Discount Flag */}
          <div className="inline-block bg-[#8A9A86] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-6 shadow-sm">
            50% OFF EARLY-ADOPTER SPECIAL
          </div>

          {/* Pricing Display */}
          <div className="flex items-center justify-center space-x-4 mb-3">
            <span className="text-xl sm:text-2xl text-[#948D85] line-through font-light">
              $27.00 Regular
            </span>
            <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D2A26] tracking-tight">
              $13
            </span>
            <span className="text-xs font-bold uppercase text-[#C05746] bg-[#C05746]/10 px-2.5 py-1 rounded-md">
              50% Off Today
            </span>
          </div>

          <p className="text-xs text-[#7A746C] font-light mb-8">
            One-time purchase • Instant lifetime digital access • Use code: REBUILD50
          </p>

          {/* Value Inclusions inside card */}
          <div className="bg-[#F5F2EC] rounded-2xl p-4 sm:p-5 mb-8 text-left space-y-2.5 text-xs sm:text-sm text-[#4A453F] border border-[#EAE5DC]">
            <div className="flex items-center space-x-2.5">
              <Check className="w-4 h-4 text-[#8A9A86] shrink-0 font-bold" />
              <span><strong>The 30-Day Guided Roadmap</strong> (PDF + GoodNotes)</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Check className="w-4 h-4 text-[#8A9A86] shrink-0 font-bold" />
              <span><strong>The Self-Trust Reset Guide</strong> &amp; Diagnostic Tree</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Check className="w-4 h-4 text-[#8A9A86] shrink-0 font-bold" />
              <span><strong>The Mental Loop Release Journal</strong> (Somatic Sleep Tool)</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Check className="w-4 h-4 text-[#8A9A86] shrink-0 font-bold" />
              <span><strong>The 25 Boundary Scripts Library</strong> (Copy &amp; Paste)</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Check className="w-4 h-4 text-[#8A9A86] shrink-0 font-bold" />
              <span><strong>BONUS:</strong> 2 A.M. Printable Emergency Wallet Card</span>
            </div>
          </div>

          {/* Primary CTA Button: Cream text on dark charcoal background, rounded */}
          <div className="space-y-4">
            <a
              href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-3 bg-[#2D2A26] hover:bg-black active:bg-[#1A1816] text-[#FAF9F6] font-medium text-sm sm:text-base py-4 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>CLAIM MY 50% DISCOUNT ($13) &amp; START THE ROADMAP</span>
              <ArrowRight className="w-4 h-4 text-[#E3A88D]" />
            </a>

            {/* Guarantee text below button */}
            <div className="pt-2 flex items-center justify-center space-x-2 text-xs text-[#524E48]">
              <ShieldCheck className="w-4 h-4 text-[#8A9A86] shrink-0" />
              <span className="font-medium text-[#2D2A26]">
                7-Day Peace of Mind Guarantee.
              </span>
            </div>
            <p className="text-[11px] text-[#7A746C] max-w-sm mx-auto font-light leading-relaxed">
              If this system does not give your nervous system immediate breathing room, simply send a quiet email for a 100% courteous refund. No questions asked.
            </p>
          </div>

          {/* Countdown timer ticker */}
          <div className="mt-7 pt-5 border-t border-[#EAE5DC] flex items-center justify-center space-x-2 text-[11px] text-[#8C867E]">
            <Clock className="w-3.5 h-3.5 text-[#C05746]" />
            <span>
              Special voucher active for:{' '}
              <strong className="text-[#2D2A26] font-mono">
                {String(timeLeft.hours).padStart(2, '0')}h :{' '}
                {String(timeLeft.minutes).padStart(2, '0')}m :{' '}
                {String(timeLeft.seconds).padStart(2, '0')}s
              </strong>
            </span>
          </div>

        </div>

        {/* Security & Format Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-white/80">
          <div className="flex items-center space-x-1.5">
            <Lock className="w-4 h-4 text-white/90" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Smartphone className="w-4 h-4 text-white/90" />
            <span>Works on Phone, iPad &amp; Laptop</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <FileText className="w-4 h-4 text-white/90" />
            <span>Printable A4 / Letter Formats</span>
          </div>
        </div>

      </div>
    </section>
  );
};
