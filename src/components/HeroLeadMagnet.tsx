import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Heart, Sparkles, BookOpen, Compass, ArrowRight, Download, FileText } from 'lucide-react';
import { addSubscriber } from '../lib/storage';

interface HeroLeadMagnetProps {
  onGuideClaimed?: (email: string) => void;
  onOpenResetGuideModal: () => void;
}

export const HeroLeadMagnet: React.FC<HeroLeadMagnetProps> = ({
  onGuideClaimed,
  onOpenResetGuideModal,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid, gentle email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = addSubscriber(email, '72-Hour Reset (Hero Lead Magnet)');
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onGuideClaimed) {
        onGuideClaimed(email);
      }
    }, 600);
  };

  return (
    <section
      id="lead-magnet"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-peach-glow"
    >
      {/* Decorative Organic Blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#E3A88D]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-[-10%] w-[380px] h-[380px] bg-[#8A9A86]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        {/* Editorial Pill Sub-badge */}
        <div className="inline-flex items-center space-x-2 bg-[#FAF9F6] border border-[#E3A88D]/40 px-4 py-1.5 rounded-full text-xs font-medium text-[#C05746] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#E3A88D]" />
          <span className="tracking-wide uppercase text-[11px]">Free Trauma-Informed Resource</span>
        </div>

        {/* Section 1 Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.18] text-[#2D2A26] mb-6 max-w-3xl mx-auto">
          I spent years disappearing into someone else’s moods.
        </h1>

        {/* Section 1 Sub-headline */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[#635E59] font-light leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12">
          I was physically free, but emotionally hollow. I’ve cleaned up my raw field notes to help you find your way back to yourself.
        </p>

        {/* Feature Box: FREE 72-Hour Reset Guide & 2 A.M. Emergency Anchor Card */}
        <div className="bg-[#FAF9F6] border border-[#EAE5DC] rounded-3xl p-6 sm:p-9 md:p-10 shadow-luxe max-w-2xl mx-auto text-left relative overflow-hidden transition-all duration-300 hover:border-[#E3A88D]/60">
          {/* Subtle decorative background watermarks */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-[#E3A88D]/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0ECE4]">
            <div>
              <span className="text-[11px] font-semibold tracking-widest text-[#8A9A86] uppercase block">
                COMPLIMENTARY DIGITAL DOWNLOAD
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#2D2A26] mt-1">
                FREE 72-Hour Reset Guide &amp; 2 A.M. Answer Guide
              </h2>
            </div>
            <div className="shrink-0 flex items-center space-x-1.5 self-start sm:self-center bg-[#8A9A86]/15 text-[#5C6E59] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#8A9A86]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Instant Access</span>
            </div>
          </div>

          {/* Value bullet points inside feature box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-6 text-xs sm:text-sm text-[#524E48]">
            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-[#8A9A86]/20 text-[#5C6E59] flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <strong className="font-medium text-[#2D2A26]">Hour-by-Hour Regulative Protocol</strong>
                <p className="text-xs text-[#7A756F]">Calm racing cortisol in 72 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-[#8A9A86]/20 text-[#5C6E59] flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <strong className="font-medium text-[#2D2A26]">The 2 A.M. Answer Protocol</strong>
                <p className="text-xs text-[#7A756F]">Emergency answers &amp; phone lockscreen card</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-[#8A9A86]/20 text-[#5C6E59] flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <strong className="font-medium text-[#2D2A26]">Mood Separation Exercise</strong>
                <p className="text-xs text-[#7A756F]">Untangle their storm from your soul</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-[#8A9A86]/20 text-[#5C6E59] flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <strong className="font-medium text-[#2D2A26]">100% Free &amp; Private</strong>
                <p className="text-xs text-[#7A756F]">Zero spam, 1-click quiet unsubscribe</p>
              </div>
            </div>
          </div>

          {/* Form / Success State */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9E988F]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter your private email address..."
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#DDD8CF] rounded-full text-sm text-[#2D2A26] placeholder-[#9E988F] focus:outline-none focus:ring-2 focus:ring-[#8A9A86] focus:border-transparent transition-all shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#8A9A86] hover:bg-[#778873] active:bg-[#687864] text-white font-medium text-xs sm:text-sm tracking-wide px-7 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center space-x-2 shrink-0 cursor-pointer transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending reset...</span>
                    </span>
                  ) : (
                    <span>SEND ME THE FREE RESET 🕊️</span>
                  )}
                </button>
              </div>

              {errorMessage && (
                <p className="text-xs text-[#C05746] font-medium pl-3">{errorMessage}</p>
              )}

              <p className="text-[11px] text-[#8C867E] text-center sm:text-left pl-2 flex items-center space-x-1.5">
                <span>🔒 Your privacy is sacred. We never share, sell, or disclose your information.</span>
              </p>
            </form>
          ) : (
            <div className="bg-[#EDF1EC] border border-[#8A9A86]/40 rounded-2xl p-5 sm:p-6 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#5C6E59] mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#2D2A26]">
                  Sent to your inbox!
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6E59] mt-1 max-w-md mx-auto">
                  We sent your copy to <span className="font-semibold text-[#2D2A26]">{email}</span>. You can also view and read the entire guide right now:
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <a
                  href="https://herhorizon.gumroad.com/l/72-hour-reset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-colors"
                >
                  <span>Get The Free 72-Hour Reset &amp; 2 A.M. Answer Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onOpenResetGuideModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-[#2D2A26] border border-[#DDD8CF] px-4 py-2.5 rounded-full text-xs font-medium hover:bg-[#FAF9F6] transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read in Interactive Reader</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reassurance Subtext */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#7A756F]">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8A9A86]" />
            <span>48 women grounded</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E3A88D]" />
            <span>Trauma-informed somatic design</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C05746]" />
            <span>Instant PDF &amp; Wallet card</span>
          </span>
        </div>
      </div>
    </section>
  );
};
