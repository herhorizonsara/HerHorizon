import React, { useState } from 'react';
import { CanvaImagePlaceholder } from '../CanvaImagePlaceholder';
import { ArrowRight, Sparkles, Feather, ShieldCheck, Mail, CheckCircle2, User, AlertCircle, ExternalLink } from 'lucide-react';
import { addSubscriber } from '../../lib/storage';
import { validateName, validateEmail } from '../../lib/validation';

interface Step1HeroProps {
  onScrollToCheckout: () => void;
  onOpenResetGuideModal: (name?: string, email?: string) => void;
}

interface MiniCoverTabletProps {
  title: string;
  subtitle: string;
  coverNames: string[];
  containerClass: string;
  isCenter?: boolean;
}

const MiniCoverTablet: React.FC<MiniCoverTabletProps> = ({
  title,
  subtitle,
  coverNames,
  containerClass,
  isCenter = false,
}) => {
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [hasError, setHasError] = useState(false);

  const candidateList = React.useMemo(() => {
    const list: string[] = [];
    coverNames.forEach((n) => {
      list.push(`/images/${n}`);
      list.push(`/${n}`);
      if (n.endsWith('.png')) {
        const jpg = n.replace('.png', '.jpg');
        list.push(`/images/${jpg}`);
        list.push(`/${jpg}`);
      } else if (n.endsWith('.jpg')) {
        const png = n.replace('.jpg', '.png');
        list.push(`/images/${png}`);
        list.push(`/${png}`);
      }
    });
    return Array.from(new Set(list));
  }, [coverNames]);

  const currentSrc = candidateIdx < candidateList.length ? candidateList[candidateIdx] : null;

  return (
    <div className={`aspect-[1/1.41] shrink-0 overflow-hidden transition-transform duration-300 ${containerClass}`}>
      {currentSrc && !hasError ? (
        <img
          src={currentSrc}
          alt={title}
          onError={() => {
            if (candidateIdx + 1 < candidateList.length) {
              setCandidateIdx((p) => p + 1);
            } else {
              setHasError(true);
            }
          }}
          className="w-full h-full object-cover object-center rounded-[5px] sm:rounded-lg"
          loading="lazy"
        />
      ) : isCenter ? (
        <div className="bg-gradient-to-b from-[#FAF6F2] to-[#F1E5DA] text-[#2D2A26] h-full rounded-[5px] sm:rounded-lg p-2 sm:p-3 flex flex-col justify-between text-center border border-[#DECAC0]">
          <div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#BD7469] font-bold block">herhorizon</span>
            <h4 className="font-serif italic text-[11px] sm:text-sm font-bold text-[#D4A373] mt-1 leading-tight">
              &ldquo;{title}&rdquo;
            </h4>
          </div>
          <div className="p-1 bg-white/80 rounded border border-[#E8DCD5] text-[7px] sm:text-[8px] text-[#5C524F]">
            {subtitle}
          </div>
          <span className="text-[6px] sm:text-[7px] text-[#8C7A74]">www.herhorizon.store</span>
        </div>
      ) : (
        <div className="bg-[#FAF6F2] text-[#2D2A26] h-full rounded-[5px] sm:rounded-lg p-1.5 flex flex-col justify-between text-center border border-[#DECAC0]">
          <span className="font-serif italic text-[#BD7469] text-[8px] sm:text-[10px] leading-tight font-medium">{title}</span>
          <span className="text-[6px] sm:text-[7px] text-[#736E67]">{subtitle}</span>
        </div>
      )}
    </div>
  );
};

export const Step1Hero: React.FC<Step1HeroProps> = ({
  onScrollToCheckout,
  onOpenResetGuideModal,
}) => {
  const [showLeadBox, setShowLeadBox] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [heroLogoCandidateIdx, setHeroLogoCandidateIdx] = useState(0);
  const [heroLogoError, setHeroLogoError] = useState(false);
  const heroLogoCandidates = ['/logo.png', '/images/logo.png', '/logo.svg', '/images/logo.svg', '/logo.jpg'];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const nameCheck = validateName(name);
    if (!nameCheck.isValid) {
      setFormError(nameCheck.error || 'Please enter your first name.');
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setFormError(emailCheck.error || 'Please enter a valid personal email (like Gmail or Outlook).');
      return;
    }

    addSubscriber(name, email, '72-Hour Reset (Hero)');
    setSubmitted(true);
    // Direct link is shown inline without triggering any pop-up modal
  };

  return (
    <section id="step-1" className="relative pt-32 pb-14 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 bg-[#FFFDF9] text-[#2D2A26] overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#E2B072]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-0 w-[400px] h-[400px] bg-[#BD7469]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
        
        {/* Brand Logo from Canva (Emblem + HerHorizon typography) */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center justify-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mb-3.5 sm:mb-4 relative flex items-center justify-center">
            {!heroLogoError && heroLogoCandidateIdx < heroLogoCandidates.length ? (
              <img
                src={heroLogoCandidates[heroLogoCandidateIdx]}
                alt="HerHorizon Emblem"
                onError={() => {
                  if (heroLogoCandidateIdx + 1 < heroLogoCandidates.length) {
                    setHeroLogoCandidateIdx((prev) => prev + 1);
                  } else {
                    setHeroLogoError(true);
                  }
                }}
                className="w-full h-full object-contain filter drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            ) : (
              /* Stylized Sun Rays & Lotus Icon Fallback (Sized up) */
              <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 text-[#BD7469]">
                {/* Sun rays */}
                <path d="M50 12 L50 20 M32 18 L37 25 M68 18 L63 25 M20 32 L27 37 M80 32 L73 37" stroke="#E2B072" strokeWidth="3" strokeLinecap="round" />
                {/* Head */}
                <circle cx="50" cy="38" r="8" fill="#BD7469" />
                {/* Body */}
                <path d="M36 65 C36 48 64 48 64 65 Z" fill="#BD7469" />
                {/* Heart in chest */}
                <path d="M50 56 C48 52 43 52 43 56 C43 60 50 64 50 64 C50 64 57 60 57 56 C57 52 52 52 50 56 Z" fill="#FAF6F2" />
                {/* Leaves */}
                <path d="M30 62 C22 62 24 50 34 54 C34 60 30 62 30 62 Z" fill="#D4A373" />
                <path d="M70 62 C78 62 76 50 66 54 C66 60 70 62 70 62 Z" fill="#D4A373" />
              </svg>
            )}
          </div>
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.14em] font-medium text-[#BD7469] uppercase">
            herhorizon
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] text-[#D4A373] uppercase font-semibold mt-0.5">
            RISE &amp; HEAL
          </span>
        </div>

        {/* Hero Headline & Sub-headline with High-Converting Copy */}
        <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] bg-[#FAF6F2] border border-[#E8DCD5] px-3.5 py-1.5 rounded-full mb-4 sm:mb-6 shadow-2xs">
          <span>🌿 30-Day Trauma-Informed Restoration System</span>
        </div>

        <h1 className="font-serif italic text-[28px] xs:text-[34px] sm:text-5xl md:text-6xl lg:text-[62px] font-normal leading-[1.2] sm:leading-[1.18] text-[#D4A373] mb-4 sm:mb-6 max-w-3xl mx-auto px-2">
          Reclaim the woman you lost <br className="hidden sm:inline" />
          <span className="text-[#C59B63]">trying to keep him.</span>
        </h1>

        <p className="font-sans text-[14px] xs:text-base sm:text-lg md:text-xl text-[#BD7469] font-normal leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
          A 168-page trauma-informed system to stop the 2 a.m. mental loops, break the biological grip of the trauma bond, and bring you home to yourself in 30 days.
        </p>

        {/* Micro-Trust & Social Proof Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-[#5C524F] mb-6 sm:mb-8">
          <div className="flex items-center space-x-1">
            <span className="text-[#E2B072] text-sm">★★★★★</span>
            <span className="font-medium text-[#2D2A26]">4.9/5 Rating</span>
            <span className="text-[#8C7A74]">(48 Women Reclaimed)</span>
          </div>
          <span className="text-[#D4C5BC] hidden sm:inline">•</span>
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4A7C59]" />
            <span>7-Day 100% Peace of Mind Guarantee</span>
          </div>
          <span className="text-[#D4C5BC] hidden sm:inline">•</span>
          <div className="flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Instant PDF &amp; Device Access</span>
          </div>
        </div>

        {/* Hero Mockup: 5-Tablet Digital Showcase (Zero Text Cut-off, Full Visual Clarity) */}
        <div className="my-6 sm:my-8 max-w-3xl sm:max-w-4xl mx-auto px-1">
          <div className="relative rounded-2xl sm:rounded-3xl shadow-luxe-lg border border-[#E8DCD5] bg-gradient-to-b from-[#FAF8F5] via-[#F6EFE8] to-[#EFE4DC] p-3 sm:p-5">
            
            {/* Top Showcase Banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 sm:px-3 pb-3 border-b border-[#E8DCD5]/70 mb-3">
              <div className="flex items-center space-x-2">
                <span className="font-serif italic text-sm sm:text-base text-[#BD7469] font-semibold">
                  The Complete 5-Module Restoration Bundle
                </span>
                <span className="hidden sm:inline text-xs text-[#8C7A74]">•</span>
                <span className="hidden sm:inline text-xs text-[#5C524F]">Lifetime Access</span>
              </div>
              <span className="bg-white/95 text-[#BD7469] px-3 py-1 rounded-full border border-[#DECAC0] font-semibold text-xs shadow-2xs">
                168 Total Pages • Immediate PDF Access
              </span>
            </div>

            {/* 5-Tablet Fan Layout with Pristine High-Res Covers */}
            <div className="py-4 sm:py-6 px-1 flex items-end justify-center -space-x-4 xs:-space-x-5 sm:-space-x-6 md:-space-x-8 select-none">
              
              {/* Tablet 1 (Far Left): Boundary Scripts */}
              <div className="w-[18%] max-w-[130px] sm:max-w-[155px] aspect-[3535/5000] rounded-lg sm:rounded-xl overflow-hidden bg-white p-1 border border-[#DECAC0] shadow-md -rotate-12 translate-y-3 z-0 hover:z-30 hover:scale-110 hover:-translate-y-2 transition-all duration-300 group cursor-pointer" title="Boundary Scripts Library (20 Pages)">
                <picture>
                  <source type="image/webp" srcSet="/cover-boundaryscripts.webp, /images/cover-boundaryscripts.webp" />
                  <img
                    src="/cover-boundaryscripts.webp"
                    alt="Boundary Scripts Library Cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedImages) {
                        target.dataset.triedImages = 'true';
                        target.src = '/cover-boundaryscripts.png';
                      }
                    }}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg select-none"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>

              {/* Tablet 2 (Mid Left): Mental Loop Release */}
              <div className="w-[21%] max-w-[145px] sm:max-w-[175px] aspect-[3535/5000] rounded-lg sm:rounded-xl overflow-hidden bg-white p-1 border border-[#DECAC0] shadow-lg -rotate-6 translate-y-1 z-10 hover:z-30 hover:scale-110 hover:-translate-y-2 transition-all duration-300 group cursor-pointer" title="Mental Loop Release Journal (22 Pages)">
                <picture>
                  <source type="image/webp" srcSet="/cover-mentalloop.webp, /images/cover-mentalloop.webp" />
                  <img
                    src="/cover-mentalloop.webp"
                    alt="Mental Loop Release Journal Cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedImages) {
                        target.dataset.triedImages = 'true';
                        target.src = '/cover-mentalloop.png';
                      }
                    }}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg select-none"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>

              {/* Tablet 3 (Centerpiece Hero): The Identity Rebuild Roadmap */}
              <div className="w-[27%] max-w-[180px] sm:max-w-[220px] aspect-[3535/5000] rounded-xl sm:rounded-2xl overflow-hidden bg-white p-1.5 sm:p-2 border-2 sm:border-3 border-[#E2B072] shadow-2xl z-20 hover:scale-105 transition-all duration-300 group cursor-pointer" title="The Identity Rebuild Roadmap (77 Pages)">
                <picture>
                  <source type="image/webp" srcSet="/cover-roadmap.webp, /images/cover-roadmap.webp" />
                  <img
                    src="/cover-roadmap.webp"
                    alt="The Identity Rebuild Roadmap Cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedImages) {
                        target.dataset.triedImages = 'true';
                        target.src = '/cover-roadmap.png';
                      }
                    }}
                    className="w-full h-full object-cover rounded-lg sm:rounded-xl select-none"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
                <div className="absolute top-2 left-2 bg-[#E2B072] text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                  Core Guide
                </div>
              </div>

              {/* Tablet 4 (Mid Right): Self-Trust Reset */}
              <div className="w-[21%] max-w-[145px] sm:max-w-[175px] aspect-[3535/5000] rounded-lg sm:rounded-xl overflow-hidden bg-white p-1 border border-[#DECAC0] shadow-lg rotate-6 translate-y-1 z-10 hover:z-30 hover:scale-110 hover:-translate-y-2 transition-all duration-300 group cursor-pointer" title="The Self-Trust Reset Guide (25 Pages)">
                <picture>
                  <source type="image/webp" srcSet="/cover-selftrust.webp, /images/cover-selftrust.webp" />
                  <img
                    src="/cover-selftrust.webp"
                    alt="The Self-Trust Reset Guide Cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedImages) {
                        target.dataset.triedImages = 'true';
                        target.src = '/cover-selftrust.png';
                      }
                    }}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg select-none"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>

              {/* Tablet 5 (Far Right): Trauma Bond Detox */}
              <div className="w-[18%] max-w-[130px] sm:max-w-[155px] aspect-[3535/5000] rounded-lg sm:rounded-xl overflow-hidden bg-white p-1 border border-[#DECAC0] shadow-md rotate-12 translate-y-3 z-0 hover:z-30 hover:scale-110 hover:-translate-y-2 transition-all duration-300 group cursor-pointer" title="Trauma Bond Detox Guide (24 Pages)">
                <picture>
                  <source type="image/webp" srcSet="/cover-traumabond.webp, /images/cover-traumabond.webp" />
                  <img
                    src="/cover-traumabond.webp"
                    alt="Trauma Bond Detox Guide Cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedImages) {
                        target.dataset.triedImages = 'true';
                        target.src = '/cover-traumabond.png';
                      }
                    }}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg select-none"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>

            </div>

            {/* 5 Module Quick Breakdown Strip */}
            <div className="mt-3 pt-3 border-t border-[#E8DCD5]/70 grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 text-left">
              <div className="p-2 bg-white/90 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="text-[9px] uppercase tracking-wider text-[#BD7469] font-bold block">Pillar 01</span>
                <p className="text-xs font-semibold text-[#2D2A26] truncate">Rebuild Roadmap</p>
                <span className="text-[10px] text-[#8C7A74]">77 Pgs • 30 Days</span>
              </div>
              <div className="p-2 bg-white/90 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="text-[9px] uppercase tracking-wider text-[#BD7469] font-bold block">Pillar 02</span>
                <p className="text-xs font-semibold text-[#2D2A26] truncate">Self-Trust Reset</p>
                <span className="text-[10px] text-[#8C7A74]">25 Pgs • Intuition</span>
              </div>
              <div className="p-2 bg-white/90 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="text-[9px] uppercase tracking-wider text-[#BD7469] font-bold block">Pillar 03</span>
                <p className="text-xs font-semibold text-[#2D2A26] truncate">Mental Loops</p>
                <span className="text-[10px] text-[#8C7A74]">22 Pgs • 2 A.M. Protocol</span>
              </div>
              <div className="p-2 bg-white/90 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="text-[9px] uppercase tracking-wider text-[#BD7469] font-bold block">Pillar 04</span>
                <p className="text-xs font-semibold text-[#2D2A26] truncate">Trauma Bond</p>
                <span className="text-[10px] text-[#8C7A74]">24 Pgs • Chemical Detox</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-2 bg-white/90 rounded-xl border border-[#EDE2DA] shadow-2xs">
                <span className="text-[9px] uppercase tracking-wider text-[#BD7469] font-bold block">Pillar 05</span>
                <p className="text-xs font-semibold text-[#2D2A26] truncate">Boundary Vault</p>
                <span className="text-[10px] text-[#8C7A74]">20 Pgs • 25 Scripts</span>
              </div>
            </div>

          </div>
        </div>

        {/* Canva Button & High-Converting CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-1 max-w-xl mx-auto">
          <a
            href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] active:bg-[#96473D] text-white font-semibold text-xs xs:text-sm sm:text-base tracking-wide px-8 sm:px-10 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer uppercase font-sans min-h-[50px]"
          >
            <span>GET THE SYSTEM — $13 TODAY (50% OFF)</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>

          <button
            onClick={() => setShowLeadBox(!showLeadBox)}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 text-xs font-semibold text-[#5C524F] hover:text-[#BD7469] active:bg-[#EFE5DC] bg-[#FAF6F2] hover:bg-[#F4ECE4] border border-[#E8DCD5] px-5 sm:px-6 py-4 rounded-full transition-all active:scale-[0.98] min-h-[50px] text-center"
          >
            <span>Or Claim Free 72-Hour Reset Guide 🕊️</span>
          </button>
        </div>

        <p className="text-[11px] sm:text-xs text-[#8C7A74] mt-2.5">
          🔒 100% Confidential • Immediate Digital Access • Code <strong className="text-[#BD7469]">REBUILD50</strong> Applied ($27 → $13)
        </p>

        {/* Optional Collapsible Free Lead Magnet Box */}
        {showLeadBox && (
          <div className="mt-5 sm:mt-8 bg-white border border-[#E8DCD5] rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-xl mx-auto text-left shadow-luxe animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F0ECE4]">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#D4A373] uppercase tracking-wider">
                COMPLIMENTARY DIGITAL DOWNLOAD
              </span>
              <a
                href="https://herhorizon.gumroad.com/l/72-hour-reset"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] sm:text-[11px] text-[#BD7469] hover:text-[#A8584D] font-semibold flex items-center space-x-1 p-1 -m-1"
                title="Get the free 72-hour reset guide"
              >
                <span>Direct Free Access</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3 className="font-serif text-sm xs:text-base sm:text-lg font-semibold text-[#2D2A26] mt-2.5 mb-1">
              FREE 72-Hour Reset Guide &amp; 2 A.M. Answer Guide
            </h3>
            <p className="text-xs text-[#736E67] mb-3.5 leading-relaxed">
              I spent years disappearing into someone else's moods. Download the raw field notes to calm the storm, including the 72-Hour regulation protocol and the 2 A.M. Emergency Answer Guide.
            </p>

            {!submitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                      placeholder="Your First Name"
                      className="w-full pl-10 pr-3.5 py-3 bg-[#FAF9F6] border border-[#DDD8CF] rounded-full text-base sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-1 focus:ring-[#E2B072] min-h-[46px]"
                    />
                  </div>

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
                      placeholder="Email (Gmail, Outlook, etc.)"
                      className="w-full pl-10 pr-3.5 py-3 bg-[#FAF9F6] border border-[#DDD8CF] rounded-full text-base sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-1 focus:ring-[#E2B072] min-h-[46px]"
                    />
                  </div>
                </div>

                {formError && (
                  <div className="flex items-center space-x-1.5 text-xs text-[#C05746] bg-[#C05746]/10 px-3 py-2 rounded-xl border border-[#C05746]/20">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-1 gap-2.5">
                  <span className="text-[10px] text-[#8C7A74] text-center sm:text-left">
                    🔒 Private &amp; Spam-Free • Instant Delivery
                  </span>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#8A9A86] hover:bg-[#778873] active:bg-[#6c7d68] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-colors shadow-xs cursor-pointer text-center min-h-[46px] active:scale-[0.98]"
                    >
                      Unlock Free Reset &amp; 2 A.M. Guide 🕊️
                    </button>
                    <a
                      href="https://herhorizon.gumroad.com/l/72-hour-reset"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#BD7469] hover:underline font-semibold text-center py-2 sm:py-0"
                    >
                      Direct link to free reset ↗
                    </a>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-[#FAF6F2] border-2 border-[#8A9A86]/40 p-4 sm:p-7 rounded-2xl sm:rounded-3xl text-left space-y-3.5 animate-in fade-in duration-300">
                <div className="flex items-start space-x-3 text-[#5C6E59]">
                  <div className="w-8 h-8 rounded-full bg-[#8A9A86]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-[#5C6E59]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-semibold text-[#2D2A26]">
                      Thank you, {name || 'lovely'}! Your access is ready 🕊️
                    </h4>
                    <p className="text-xs text-[#736E67] mt-1 leading-relaxed">
                      Your complimentary copy has been unlocked. Click below to get your free 72-hour reset guide and the 2 A.M. emergency answer guide:
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="https://herhorizon.gumroad.com/l/72-hour-reset"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] active:bg-[#97463C] text-white text-xs sm:text-sm font-semibold px-5 py-3.5 sm:py-4 rounded-full shadow-md hover:shadow-lg active:scale-[0.98] transition-all text-center min-h-[48px]"
                  >
                    <span>Get The Free 72-Hour Reset &amp; 2 A.M. Answer Guide</span>
                    <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
