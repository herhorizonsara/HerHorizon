import React, { useState, useEffect } from 'react';
import {
  Feather,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Download,
  Clock,
  Flame,
  CheckCircle2,
  Lock,
  ArrowLeft,
  X,
  ExternalLink,
  BookOpen,
  User,
  Mail,
  AlertCircle
} from 'lucide-react';
import { addSubscriber } from '../../lib/storage';
import { validateName, validateEmail } from '../../lib/validation';
import { ResetGuideModal } from '../ResetGuideModal';

interface FreeGuidePageProps {
  onBackToSite: () => void;
}

export const FreeGuidePage: React.FC<FreeGuidePageProps> = ({ onBackToSite }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [fullGuideModalOpen, setFullGuideModalOpen] = useState(false);

  // FOMO live countdown timer (14 minutes, 59 seconds)
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const nameCheck = validateName(name);
    if (!nameCheck.isValid) {
      setFormError(nameCheck.error || 'Please enter your first name.');
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setFormError(emailCheck.error || 'Please enter a valid personal email (Gmail, Outlook, iCloud, etc.).');
      return;
    }

    setLoading(true);

    // Save to storage
    addSubscriber(name, email, '72-Hour Reset (/free-guide)');
    localStorage.setItem('herhorizon_guide_unlocked', 'true');

    setTimeout(() => {
      setLoading(false);
      setShowPromoPopup(true);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D2A26] font-sans antialiased flex flex-col selection:bg-[#E2B072]/30 selection:text-[#2D2A26]">
      
      {/* Top Quiet Bar */}
      <header className="border-b border-[#EFE5DC] bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center space-x-1.5 text-xs text-[#736E67] hover:text-[#BD7469] font-medium transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to HerHorizon Main System</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="font-serif italic font-bold text-base sm:text-lg text-[#BD7469] tracking-wider uppercase">
              herhorizon
            </span>
          </div>

          <a
            href="https://herhorizon.gumroad.com/l/72-hour-reset"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#BD7469] hover:text-[#A8584D] font-semibold flex items-center space-x-1"
          >
            <span className="hidden sm:inline">Direct Gumroad Access</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Single-Purpose Content Area */}
      <main className="flex-1 py-10 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
        
        {/* Soft Ambient Warmth */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#E2B072]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto text-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] bg-[#FAF6F2] border border-[#E8DCD5] px-3.5 py-1.5 rounded-full mb-4 sm:mb-6 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#E2B072]" />
            <span>Complimentary Digital Download • Zero Cost</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif italic text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-normal leading-[1.2] text-[#D4A373] mb-4 sm:mb-6 px-1">
            The 72-Hour Nervous System Reset <br className="hidden sm:inline" />
            <span className="text-[#C59B63]">&amp; 2 A.M. Emergency Anchor Card</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-sm xs:text-base sm:text-lg text-[#BD7469] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 font-normal px-2">
            For the woman whose body is still bracing for an impact that already happened. Download the emergency field notes to halt acute mental loops, soothe vagus nerve panic, and dismiss the phantom courtroom tonight.
          </p>

          {/* Visual Showcase Card: Dual-Product Bundle Template Inspired by Landing Page */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12 bg-gradient-to-b from-[#FAF8F5] via-[#F4EDE6] to-[#ECE1D8] border-2 border-[#E2B072]/50 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-luxe-lg">
            
            {/* Top Showcase Eyebrow */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#E2D5CC]/80">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#BD7469] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#BD7469]">
                  2-Part Complimentary System Included
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-[#8C7A74] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#E8DCD5]">
                Zero Cost • Instant Delivery
              </span>
            </div>

            {/* The Dual Products Side-by-Side Presentation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5 items-start">
              
              {/* Product 01: 72-Hour Reset Guide (Vertical Portrait Booklet) */}
              <div className="bg-white/95 rounded-2xl p-4 border border-[#E2D5CC] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group text-left h-full">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#BD7469] bg-[#FAF4EB] border border-[#E2D5CC] px-2.5 py-0.5 rounded-full">
                    PART 01 • RESET GUIDE
                  </span>
                </div>

                {/* Cover Frame (Vertical A4 ratio) */}
                <div className="relative aspect-[3535/5000] rounded-xl overflow-hidden bg-[#FAF7F2] border-2 border-[#E2B072] shadow-inner mb-3.5 group-hover:scale-[1.01] transition-transform duration-300">
                  <picture>
                    <source type="image/webp" srcSet="/cover-free-reset-guide.webp, /images/cover-free-reset-guide.webp" />
                    <img
                      src="/cover-free-reset-guide.webp"
                      alt="Part 1: The 72-Hour Nervous System Reset Guide (Portrait)"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const step = Number(target.dataset.fallbackStep || 0);
                        const fallbacks = [
                          '/images/cover-free-reset-guide.webp',
                          '/cover-free-reset-guide.png',
                          '/images/cover-free-reset-guide.png',
                          '/images/cover-free-reset-guide-1.png',
                          '/cover-free-reset-guide-1.png',
                          '/images/cover-free-reset-guide.svg',
                        ];
                        if (step < fallbacks.length) {
                          target.dataset.fallbackStep = String(step + 1);
                          target.src = fallbacks[step];
                        }
                      }}
                      className="w-full h-full object-cover select-none"
                      loading="eager"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-[10px] text-white font-medium bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Part 01 • Reset Guide PDF
                    </span>
                  </div>
                </div>

                <h3 className="font-serif italic font-bold text-base text-[#2D2A26] leading-snug">
                  The 72-Hour Reset Guide
                </h3>
                <p className="text-xs text-[#736E67] mt-1 leading-relaxed">
                  The 90-second ice technique, 3-fact reality filter, and nervous system recalibration protocols.
                </p>
                <div className="mt-3 pt-2.5 border-t border-[#F0ECE4] flex items-center justify-between text-[11px] text-[#8C7A74]">
                  <span>Format: PDF Booklet</span>
                  <span className="font-semibold text-[#4A7C59]">Instant Download</span>
                </div>
              </div>

              {/* Product 02: 2 A.M. Emergency Anchor Card (Horizontal Bedside Card) */}
              <div className="bg-white/95 rounded-2xl p-4 border border-[#E2D5CC] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group text-left h-full">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#BD7469] bg-[#FAF4EB] border border-[#E2D5CC] px-2.5 py-0.5 rounded-full">
                    PART 02 • EMERGENCY CARD
                  </span>
                </div>

                {/* Horizontal Card Cover Frame */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#241C18] border-2 border-[#E2B072] shadow-md mb-3.5 group-hover:scale-[1.01] transition-transform duration-300">
                  <picture>
                    <source type="image/webp" srcSet="/cover-free-anchor-card.webp, /images/cover-free-anchor-card.webp" />
                    <img
                      src="/cover-free-anchor-card.webp"
                      alt="Part 2: The 2 A.M. Emergency Anchor Card (Horizontal)"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const step = Number(target.dataset.fallbackStep || 0);
                        const fallbacks = [
                          '/images/cover-free-anchor-card.webp',
                          '/cover-free-anchor-card.png',
                          '/images/cover-free-anchor-card.png',
                          '/images/cover-free-anchor-card-1.png',
                          '/cover-free-anchor-card-1.png',
                          '/images/cover-free-anchor-card.svg',
                        ];
                        if (step < fallbacks.length) {
                          target.dataset.fallbackStep = String(step + 1);
                          target.src = fallbacks[step];
                        }
                      }}
                      className="w-full h-full object-cover select-none"
                      loading="eager"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-[10px] text-white font-medium bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      Part 02 • Emergency Anchor Card
                    </span>
                  </div>
                </div>

                <h3 className="font-serif italic font-bold text-base text-[#2D2A26] leading-snug">
                  The 2 A.M. Emergency Anchor Card
                </h3>
                <p className="text-xs text-[#736E67] mt-1 leading-relaxed">
                  High-contrast horizontal bedside &amp; lockscreen card to dismiss the phantom courtroom in the middle of the night.
                </p>

                {/* Bedside Feature Callout Box */}
                <div className="mt-3 bg-[#FAF7F2] border border-[#E8DCD5] rounded-xl p-2.5 text-[11px] text-[#5C524F] space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-[#BD7469]">
                    <Sparkles className="w-3 h-3 text-[#E2B072]" />
                    <span>Bedside &amp; Lockscreen Optimized</span>
                  </div>
                  <p className="text-[#736E67] leading-relaxed">
                    Landscape orientation formatted for nighttime readability without straining light-sensitive eyes.
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#F0ECE4] flex items-center justify-between text-[11px] text-[#8C7A74]">
                  <span>Format: Digital Card</span>
                  <span className="font-semibold text-[#4A7C59]">Instant Download</span>
                </div>
              </div>

            </div>

            {/* Checklist Deliverables Strip */}
            <div className="bg-white/90 rounded-xl p-3 sm:p-4 text-left border border-[#E8DCD5] space-y-2 text-xs sm:text-sm text-[#3D3532]">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                <span><strong>Instant Digital PDF + Lockscreen Card:</strong> Ready to save on your iPhone, Android, or tablet.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                <span><strong>No Credit Card Required:</strong> 100% free immediate download delivered straight to your email.</span>
              </div>
            </div>

          </div>

          {/* High-Converting Form Card */}
          <div className="max-w-lg mx-auto bg-white border border-[#E8DCD5] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-luxe text-left">
            <div className="text-center mb-6">
              <h2 className="font-serif italic text-xl sm:text-2xl font-bold text-[#2D2A26]">
                Where should we send your free guide?
              </h2>
              <p className="text-xs text-[#736E67] mt-1">
                Enter your details below for instant, private access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5C524F] uppercase tracking-wider mb-1.5">
                  Your First Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A69790] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder="e.g. Sara"
                    className="w-full pl-10 pr-3.5 py-3.5 bg-[#FAF9F6] border border-[#DDD8CF] rounded-xl text-base sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#E2B072] min-h-[48px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524F] uppercase tracking-wider mb-1.5">
                  Your Personal Email (Gmail, Outlook, iCloud)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A69790] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-3.5 bg-[#FAF9F6] border border-[#DDD8CF] rounded-xl text-base sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#E2B072] min-h-[48px]"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] active:bg-[#96473D] text-white font-semibold text-sm sm:text-base tracking-wide px-6 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl active:scale-[0.98] cursor-pointer uppercase font-sans min-h-[50px] btn-shimmer-container animate-breathe group"
              >
                <span className="btn-shimmer-sweep" />
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>CLAIM MY FREE 72-HOUR RESET NOW 🕊️</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#F0ECE4] flex items-center justify-center space-x-2 text-[11px] text-[#8C7A74]">
              <Lock className="w-3.5 h-3.5 text-[#4A7C59]" />
              <span>100% Confidential • Zero Spam • Instant Download</span>
            </div>
          </div>

          {/* Social Proof Quote */}
          <div className="mt-8 max-w-md mx-auto text-center text-xs text-[#736E67] italic">
            &ldquo;The 2 A.M. Anchor Card stopped my spiraling on the very first night. For the first time in 8 months, I went to sleep without crying.&rdquo;
            <span className="block not-italic font-semibold text-[#2D2A26] mt-1">— Elena R., Verified Reader</span>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 border-t border-[#EFE5DC] text-center text-xs text-[#8C7A74]">
        <p>© 2026 HerHorizon. All rights reserved. • Trauma-Informed Relationship Restoration</p>
      </footer>

      {/* ========================================================================= */}
      {/* THE PROMOTION & FOMO POP-UP (TRIGGERED UPON SUBMITTING NAME & EMAIL)     */}
      {/* ========================================================================= */}
      {showPromoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FAF9F6] border-2 border-[#E2B072] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* FOMO Live Countdown Top Bar */}
            <div className="bg-gradient-to-r from-[#BD7469] to-[#9E4D41] text-white py-2.5 px-4 flex items-center justify-between text-xs sm:text-sm font-semibold shadow-inner">
              <div className="flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-[#FDE047] animate-pulse" />
                <span>Special 50% One-Time Invitation</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-black/25 px-2.5 py-0.5 rounded-full font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-[#FDE047]" />
                <span>Offer Expires: {formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPromoPopup(false)}
              className="absolute top-11 right-3 p-1.5 text-[#8C7A74] hover:text-[#2D2A26] rounded-full hover:bg-black/5 transition-colors z-20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Modal Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-left">
              
              {/* Free Guide Delivery Notice */}
              <div className="bg-[#EDF5EC] border border-[#CDE3CB] rounded-2xl p-3.5 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#3D7839] shrink-0 mt-0.5" />
                <div className="text-xs text-[#2A5227]">
                  <strong className="block font-bold">Your Free 72-Hour Reset Guide is Ready, {name}!</strong>
                  <button
                    onClick={() => {
                      setFullGuideModalOpen(true);
                      setShowPromoPopup(false);
                    }}
                    className="underline font-semibold text-[#1F411C] hover:text-black mt-0.5 cursor-pointer block"
                  >
                    Click here to open and read your free guide now →
                  </button>
                </div>
              </div>

              {/* The Bridge & Pitch */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#BD7469] block mb-1">
                  BEFORE YOU DIVE INTO THE 72-HOUR RESET:
                </span>
                <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-[#D4A373] leading-tight">
                  &ldquo;The 72-Hour Reset puts out the fire. <br />
                  <span className="text-[#C59B63]">The 30-Day System rebuilds the woman who never gets burned again.&rdquo;</span>
                </h3>
              </div>

              {/* FOMO Scarcity Pill */}
              <div className="bg-[#FAF3ED] border border-[#E8DCD5] rounded-xl p-2.5 text-xs text-[#5C524F] flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-[#BD7469] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#BD7469] animate-ping" />
                  <span>Only 5 discount copies remaining today</span>
                </span>
                <span className="text-[11px] text-[#8C7A74]">Regular $27</span>
              </div>

              {/* System Breakdown in Modal */}
              <div className="space-y-2 text-xs text-[#3D3532] bg-white p-3.5 rounded-2xl border border-[#EDE2DA]">
                <strong className="block text-[#BD7469] font-serif text-sm">
                  Complete 168-Page Identity Rebuild System™ ($179 Value):
                </strong>
                <p className="text-[#5C524F] leading-relaxed">
                  ✓ <strong>Pillar 01:</strong> The 30-Day Rebuild Roadmap (77 Pages)<br />
                  ✓ <strong>Pillar 02:</strong> The Self-Trust Reset (25 Pages)<br />
                  ✓ <strong>Pillar 03:</strong> Mental Loop Release Journal (22 Pages)<br />
                  ✓ <strong>Pillar 04:</strong> Trauma Bond 7-Day Detox (24 Pages)<br />
                  ✓ <strong>Pillar 05:</strong> 25 Boundary Scripts Library (20 Pages)<br />
                  ✓ <strong>PLUS:</strong> All 3 Protective Bonuses Included Free
                </p>
              </div>

              {/* Promo Price & High-Converting Upgrade Button */}
              <div className="space-y-2.5 pt-1 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-[#736E67]">
                  <span>Regular: <span className="line-through">$27</span></span>
                  <span className="text-base font-bold text-[#BD7469]">• Today Only: $13 (50% Off)</span>
                </div>

                <a
                  href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] active:bg-[#96473D] text-white font-bold text-sm sm:text-base tracking-wide px-6 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] uppercase font-sans min-h-[50px]"
                >
                  <span>YES! UPGRADE TO THE SYSTEM — $13 (50% OFF)</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>

                <p className="text-[11px] text-[#8C7A74]">
                  🔒 Code <strong className="text-[#BD7469]">REBUILD50</strong> pre-applied • 7-Day 100% Money-Back Guarantee
                </p>

                {/* Secondary Option: Just Free Guide */}
                <button
                  onClick={() => {
                    setFullGuideModalOpen(true);
                    setShowPromoPopup(false);
                  }}
                  className="text-xs text-[#8C7A74] hover:text-[#2D2A26] underline font-medium pt-2 cursor-pointer block mx-auto"
                >
                  No thanks, just take me to my Free 72-Hour Reset Guide →
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Reader Modal for the Free Guide */}
      <ResetGuideModal
        isOpen={fullGuideModalOpen}
        onClose={() => setFullGuideModalOpen(false)}
        subscriberName={name}
        subscriberEmail={email}
      />

    </div>
  );
};
