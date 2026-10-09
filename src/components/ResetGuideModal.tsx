import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Download,
  ShieldCheck,
  Feather,
  Heart,
  ArrowRight,
  Check,
  Printer,
  ChevronLeft,
  ChevronRight,
  Lock,
  Unlock,
  User,
  Mail,
  AlertCircle,
  Sparkles,
  Wind,
  CheckCircle2,
  ExternalLink,
  Copy,
  Clock,
} from 'lucide-react';
import { addSubscriber } from '../lib/storage';
import { validateName, validateEmail } from '../lib/validation';

interface ResetGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriberEmail?: string;
  subscriberName?: string;
}

export const ResetGuideModal: React.FC<ResetGuideModalProps> = ({
  isOpen,
  onClose,
  subscriberEmail = '',
  subscriberName = '',
}) => {
  // Gating state: require name & genuine email before unlocking
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [name, setName] = useState(subscriberName);
  const [email, setEmail] = useState(subscriberEmail);
  const [formError, setFormError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Interactive exercises state inside the guide
  const [iceTimer, setIceTimer] = useState<number | null>(null);
  const [safetyProof1, setSafetyProof1] = useState('The lock on my front door');
  const [safetyProof2, setSafetyProof2] = useState('My favorite soft blanket');
  const [safetyProof3, setSafetyProof3] = useState('The silence in my home');
  const [teaChoice, setTeaChoice] = useState('');
  const [teaFeeling, setTeaFeeling] = useState<string | null>(null);
  const [ahaReflection, setAhaReflection] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    // Check if user already unlocked in previous session or via Hero form
    const unlockedLocal = localStorage.getItem('herhorizon_guide_unlocked') === 'true';
    if (unlockedLocal || subscriberEmail) {
      setIsUnlocked(true);
      if (subscriberEmail) setEmail(subscriberEmail);
      if (subscriberName) setName(subscriberName);
    }
  }, [subscriberEmail, subscriberName, isOpen]);

  // Ice Trick 90-second timer countdown
  useEffect(() => {
    if (iceTimer === null || iceTimer <= 0) return;
    const interval = setInterval(() => {
      setIceTimer((prev) => (prev && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [iceTimer]);

  if (!isOpen) return null;

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const nameCheck = validateName(name);
    if (!nameCheck.isValid) {
      setFormError(nameCheck.error || 'Please enter your first name.');
      return;
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setFormError(emailCheck.error || 'Please enter a valid personal email (like Gmail, Outlook, Yahoo, or iCloud).');
      return;
    }

    // Save to subscriber storage
    addSubscriber(name, email, '72-Hour Reset (Modal Gated)');
    localStorage.setItem('herhorizon_guide_unlocked', 'true');
    setIsUnlocked(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('REBUILD50');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const totalPages = 16;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border border-[#E8DCD5] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative text-[#2D2A26]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DCD5] flex items-center justify-between bg-[#FAF6F2]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#E2B072]/20 text-[#BD7469] flex items-center justify-center border border-[#E2B072]/40">
              <Feather className="w-5 h-5 text-[#BD7469]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4A373] block">
                {isUnlocked ? `72-HOUR RESET & 2 A.M. ANSWER GUIDE • PAGE ${currentPage} OF ${totalPages}` : 'FREE RESOURCE REGISTRATION'}
              </span>
              <h3 className="font-serif italic font-bold text-base sm:text-lg text-[#2D2A26]">
                The 72-Hour Reset &amp; 2 A.M. Answer Guide <span className="font-sans font-normal text-xs text-[#8C7A74] hidden md:inline">• 3 Days + Midnight Protocol</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="https://herhorizon.gumroad.com/l/72-hour-reset"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs text-[#BD7469] hover:text-[#A8584D] bg-[#FAF3ED] border border-[#E8DCD5] px-3 py-1.5 rounded-full font-medium transition-colors"
              title="Download the free 72-hour reset guide"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Free 72-Hour Reset</span>
            </a>

            {isUnlocked && (
              <span className="hidden sm:inline-flex items-center space-x-1 text-[11px] text-[#5C6E59] bg-[#8A9A86]/15 border border-[#8A9A86]/30 px-3 py-1 rounded-full font-medium">
                <Unlock className="w-3 h-3 text-[#5C6E59]" />
                <span>Verified: {name || email}</span>
              </span>
            )}

            <button
              onClick={onClose}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#8C7A74] hover:text-[#2D2A26] rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          
          {/* STATE 1: GATED LOCK SCREEN (Requires Name & Genuine Email) */}
          {!isUnlocked ? (
            <div className="max-w-lg mx-auto py-6 sm:py-12 text-center space-y-5 sm:space-y-6 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#FAF3ED] border-2 border-[#E8DCD5] mx-auto flex items-center justify-center text-[#BD7469] shadow-sm">
                <Lock className="w-8 h-8 text-[#BD7469]" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#D4A373]">
                  COMPLIMENTARY ACCESS PRIVILEGE
                </span>
                <h3 className="font-serif italic font-bold text-xl sm:text-3xl text-[#2D2A26]">
                  Where should we send your Reset &amp; 2 A.M. Answer Guide?
                </h3>
                <p className="text-xs sm:text-sm text-[#736E67] max-w-md mx-auto leading-relaxed">
                  To prevent unauthorized automated scrapers and ensure secure delivery of Sara’s raw field notes, enter your name and personal email. You will get immediate access to both the 72-Hour Reset and the 2 A.M. Answer Protocol.
                </p>
              </div>

              <form onSubmit={handleUnlockSubmit} className="space-y-3.5 text-left bg-[#FAF6F2] p-5 sm:p-7 rounded-3xl border border-[#EDE2DA]">
                <div>
                  <label className="block text-xs font-semibold text-[#4A423D] mb-1">
                    First Name <span className="text-[#BD7469]">*</span>
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
                      placeholder="e.g. Elena"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#DDD8CF] rounded-xl text-base sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#E2B072] min-h-[46px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A423D] mb-1">
                    Email Address <span className="text-[#BD7469]">*</span>
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
                      placeholder="e.g. elena@gmail.com"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-[#DDD8CF] rounded-xl text-base sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#E2B072] min-h-[46px]"
                    />
                  </div>
                  <p className="text-[11px] text-[#8C7A74] mt-1">
                    Enter your genuine inbox (Gmail, Outlook, Yahoo, iCloud, Proton, etc.).
                  </p>
                </div>

                {formError && (
                  <div className="flex items-start space-x-2 text-xs text-[#C05746] bg-[#C05746]/10 p-3 rounded-xl border border-[#C05746]/20">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#BD7469] hover:bg-[#A8584D] active:bg-[#96473D] text-white font-medium text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-full shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2 min-h-[46px] active:scale-[0.98]"
                >
                  <Unlock className="w-4 h-4 text-white shrink-0" />
                  <span>UNLOCK &amp; READ THE 72-HOUR RESET &amp; 2 A.M. GUIDE</span>
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-[#8C7A74] pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8A9A86]" />
                  <span>100% Private • Trauma-Informed • No Spam Guarantee</span>
                </div>

                <div className="pt-3 border-t border-[#E8DCD5] text-center">
                  <span className="text-xs text-[#736E67]">Prefer direct download? </span>
                  <a
                    href="https://herhorizon.gumroad.com/l/72-hour-reset"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#BD7469] hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Get Free 72-Hour Reset Guide</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </form>
            </div>
          ) : (
            /* STATE 2: FULL UNLOCKED 16-PAGE INTERACTIVE GUIDE */
            <div className="space-y-8 animate-in fade-in">
              
              {/* Page Navigator Tabs / Pills */}
              <div className="flex items-center justify-between border-b border-[#EDE2DA] pb-3 text-xs">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-[#EDE2DA] disabled:opacity-30 hover:bg-[#FAF6F2] transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-serif italic font-semibold text-sm text-[#BD7469]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-[#EDE2DA] disabled:opacity-30 hover:bg-[#FAF6F2] transition-colors"
                    title="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="hidden sm:flex items-center space-x-1.5 lg:space-x-2 text-[11px] text-[#8C7A74] flex-wrap">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`px-2 py-1 rounded ${currentPage === 1 ? 'bg-[#FAF3ED] text-[#BD7469] font-bold' : 'hover:underline'}`}
                  >
                    Cover
                  </button>
                  <button
                    onClick={() => setCurrentPage(3)}
                    className={`px-2 py-1 rounded ${currentPage === 3 ? 'bg-[#FAF3ED] text-[#BD7469] font-bold' : 'hover:underline'}`}
                  >
                    Story
                  </button>
                  <button
                    onClick={() => setCurrentPage(5)}
                    className={`px-2 py-1 rounded ${currentPage === 5 ? 'bg-[#FAF3ED] text-[#BD7469] font-bold' : 'hover:underline'}`}
                  >
                    Day 1 (Ice)
                  </button>
                  <button
                    onClick={() => setCurrentPage(6)}
                    className={`px-2 py-1 rounded ${currentPage === 6 ? 'bg-[#FAF3ED] text-[#BD7469] font-bold' : 'hover:underline'}`}
                  >
                    Day 2 (Safety)
                  </button>
                  <button
                    onClick={() => setCurrentPage(7)}
                    className={`px-2 py-1 rounded ${currentPage === 7 ? 'bg-[#FAF3ED] text-[#BD7469] font-bold' : 'hover:underline'}`}
                  >
                    Day 3 (Tea)
                  </button>
                  <button
                    onClick={() => setCurrentPage(8)}
                    className={`px-2 py-1 rounded ${currentPage === 8 ? 'bg-[#FAF3ED] text-[#BD7469] font-bold' : 'hover:underline'}`}
                  >
                    2 A.M. Answer
                  </button>
                  <button
                    onClick={() => setCurrentPage(12)}
                    className={`px-2 py-1 rounded ${currentPage === 12 ? 'bg-[#FAF3ED] text-[#BD7469] font-bold' : 'hover:underline'}`}
                  >
                    Code REBUILD50
                  </button>
                </div>
              </div>

              {/* RENDER BY CURRENT PAGE */}
              {currentPage === 1 && (
                /* PAGE 1: COVER */
                <div className="bg-gradient-to-br from-[#FAF6F2] via-[#F5EBE1] to-[#EBDCCF] border border-[#DFCFC1] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-white/80 border border-[#E8DCD5] mx-auto flex items-center justify-center text-[#BD7469] shadow-xs">
                    <Feather className="w-8 h-8 text-[#BD7469]" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#BD7469] font-bold block">
                    herhorizon • RISE &amp; HEAL
                  </span>
                  <h1 className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl text-[#3D3532] leading-tight max-w-xl mx-auto">
                    &ldquo;The 72 Hour Reset &amp; 2 A.M. Answer Guide&rdquo;
                  </h1>
                  <p className="font-sans text-sm sm:text-base text-[#BD7469] font-medium max-w-md mx-auto">
                    3 Days to Stop the Self-Betrayal + The Emergency Midnight Protocol.
                  </p>
                  <div className="p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-[#EDE2DA] max-w-md mx-auto">
                    <p className="font-serif italic text-xs sm:text-sm text-[#5C524F]">
                      &ldquo;You don’t need to fix your entire life today. You just need to find enough quiet to take the next breath.&rdquo;
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-center space-x-3 text-xs">
                    <a
                      href="https://herhorizon.gumroad.com/l/72-hour-reset"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[#BD7469] hover:underline font-semibold"
                    >
                      <span>Direct Free 72-Hour Reset &amp; 2 A.M. Guide Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="text-[11px] text-[#8C7A74] font-mono block pt-2">
                    www.herhorizon.store
                  </span>
                </div>
              )}

              {currentPage === 2 && (
                /* PAGE 2: COPYRIGHT & DISCLAIMER */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <h3 className="font-serif italic font-bold text-2xl text-[#BD7469]">
                    A Personal Note from Sara
                  </h3>
                  <div className="p-5 bg-[#FAF6F2] rounded-2xl border border-[#EDE2DA] text-sm text-[#5C524F] leading-relaxed">
                    This system is born from my own journey. A few months ago, I was exactly where you are now—navigating the hollow feeling of identity collapse and trying to remember who I was. The tools and prompts in this guide are part of the documentation of my own recovery. I am sharing them with you because they were the only things that actually worked when I felt like a stranger in my own life.
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#3D3532] pt-2">
                    Medical &amp; Professional Disclaimer
                  </h4>
                  <p className="text-xs text-[#736E67] leading-relaxed">
                    I am not a therapist, psychologist, or medical professional. The information provided in this HerHorizon guide is based on my lived experience and personal research into identity reconstruction after toxic relationship dynamics. This guide is intended for educational and self-reflective purposes only. If you are in immediate danger or a crisis, please contact your local emergency services immediately.
                  </p>
                </div>
              )}

              {currentPage === 3 && (
                /* PAGE 3: THE STORY BEHIND THESE NOTES */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4A373]">
                    ORIGIN STORY
                  </span>
                  <h2 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#3D3532] uppercase">
                    THE STORY BEHIND THESE NOTES
                  </h2>
                  <div className="space-y-4 text-sm sm:text-base text-[#5C524F] leading-relaxed">
                    <p>
                      A few months ago, I walked away from a five-year relationship that slowly erased me. I spent those years molding myself around someone else’s moods until I didn’t recognize the woman in the mirror.
                    </p>
                    <p>
                      When I finally left, I was in a state of total exhaustion. I tried the generic advice, but I realized that none of it addressed the core issue: <strong>The constant self-betrayal of staying.</strong>
                    </p>
                    <p>
                      I started documenting every step I took to stop the mental loops and find my way back to my own intuition. I told a few women on Reddit that I was &ldquo;cleaning these notes up&rdquo; to share them.
                    </p>
                    <p className="font-serif italic text-lg text-[#BD7469] font-medium pt-2">
                      &ldquo;This isn't a textbook. These are my raw field notes on how to stop the fire so you can start to rebuild. You aren't broken—you are just recovering.&rdquo;
                    </p>
                    <p className="font-bold text-[#3D3532]">
                      Let’s spend the next 72 hours getting you back.
                    </p>
                  </div>
                </div>
              )}

              {currentPage === 4 && (
                /* PAGE 4: WHY IS THE HEADACHE SO LOUD? */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <h2 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#3D3532] uppercase">
                    WHY IS THE HEADACHE SO LOUD?
                  </h2>
                  <p className="text-sm text-[#BD7469] font-medium leading-relaxed">
                    If you feel hollow, anxious, and unable to make even a tiny decision, it is because you are experiencing <strong>Identity Collapse</strong>.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-[#EDE2DA] space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#BD7469] block">
                        The Symptom (The Headache):
                      </span>
                      <ul className="text-xs sm:text-sm text-[#5C524F] space-y-1.5 list-disc list-inside">
                        <li>Your mind won’t stop replaying the fights at 2:00 a.m.</li>
                        <li>You feel like you need &ldquo;permission&rdquo; to be happy.</li>
                        <li>You are grieving a version of him that never really existed.</li>
                      </ul>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#EDE2DA] space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373] block">
                        The Cause:
                      </span>
                      <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed">
                        For years, you had to suppress your own voice to keep the peace. You were trained to trust his reality over your own. Now that he is gone, your &ldquo;Internal Compass&rdquo; is spinning because it doesn’t know who is in charge yet.
                      </p>
                    </div>

                    <div className="bg-[#FAF3ED] p-5 rounded-2xl border border-[#E8DCD5] space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#BD7469] block">
                        The Aspirin:
                      </span>
                      <p className="text-xs sm:text-sm text-[#3D3532]">
                        In these next 3 days, we aren't going to tackle the last five years. We are only going to tackle today:
                      </p>
                      <ul className="text-xs sm:text-sm text-[#5C524F] space-y-1 list-disc list-inside">
                        <li>Silence the mental noise.</li>
                        <li>Check in with your body’s safety.</li>
                        <li>Claim one small choice as your own.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 5 && (
                /* PAGE 5: DAY 1: THE INTERRUPT & ICE TRICK */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="inline-block bg-[#FAF3ED] border border-[#E8DCD5] px-3.5 py-1 rounded-full text-[11px] font-bold text-[#BD7469] uppercase tracking-widest">
                    DAY 1: THE INTERRUPT
                  </div>
                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#3D3532]">
                    &ldquo;My mind is my home. I am no longer hosting a ghost.&rdquo;
                  </h3>

                  <div className="bg-white p-6 rounded-3xl border border-[#EDE2DA] space-y-4 shadow-sm">
                    <h4 className="font-serif italic font-bold text-lg text-[#BD7469]">
                      The Quick Win Exercise: The 90-Second Reset
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed">
                      The next time a painful memory starts to loop, do not try to &ldquo;solve&rdquo; it. Use the 90-Second Reset:
                    </p>

                    <div className="space-y-3 text-xs sm:text-sm text-[#3D3532]">
                      <div className="p-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2DA]">
                        <strong>1. Acknowledge:</strong> Say out loud: <em>&ldquo;I am replaying a memory. I am safe in this room right now.&rdquo;</em>
                      </div>
                      <div className="p-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2DA]">
                        <strong>2. Exhale:</strong> Take a deep breath in for 4 seconds, and exhale for 8 seconds.
                      </div>
                      <div className="p-3 bg-[#FAF6F2] rounded-xl border border-[#EDE2DA]">
                        <strong>3. Shock (The Ice Trick):</strong> Splash cold water on your face or hold an ice cube. The physical cold forces your brain to leave the past and enter the Now.
                      </div>
                    </div>

                    {/* Interactive 90-Second Timer Widget */}
                    <div className="p-4 bg-[#FAF3ED] rounded-2xl border border-[#E8DCD5] text-center space-y-2">
                      <span className="text-[11px] font-bold text-[#D4A373] uppercase tracking-wider block">
                        Interactive 90-Second Ice Reset Timer
                      </span>
                      <div className="text-3xl font-serif font-bold text-[#BD7469]">
                        {iceTimer !== null ? `${Math.floor(iceTimer / 60)}:${(iceTimer % 60).toString().padStart(2, '0')}` : '1:30'}
                      </div>
                      <button
                        onClick={() => setIceTimer(90)}
                        className="bg-[#BD7469] hover:bg-[#A8584D] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                      >
                        {iceTimer !== null && iceTimer > 0 ? 'Restart 90s Timer' : 'Start 90s Reset'}
                      </button>
                    </div>

                    <div className="border-t border-[#EDE2DA] pt-4">
                      <span className="text-xs font-bold text-[#BD7469] block mb-1">Sara’s Note:</span>
                      <p className="text-xs text-[#736E67] italic leading-relaxed">
                        &ldquo;The first time I used the 'Ice Trick,' I felt a sudden gap of silence in my head. It lasted for only five minutes, but it was the first five minutes of peace I’d had in months. You are proving to your brain that YOU are the one who decides what we focus on today.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 6 && (
                /* PAGE 6: DAY 2: THE SAFETY SCAN */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="inline-block bg-[#FAF3ED] border border-[#E8DCD5] px-3.5 py-1 rounded-full text-[11px] font-bold text-[#BD7469] uppercase tracking-widest">
                    DAY 2: THE SAFETY SCAN
                  </div>
                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#3D3532]">
                    &ldquo;Your body has been holding the stress that your mind was too overwhelmed to process. Today, we give it permission to stand down.&rdquo;
                  </h3>

                  <div className="bg-white p-6 rounded-3xl border border-[#EDE2DA] space-y-4 shadow-sm">
                    <h4 className="font-serif italic font-bold text-lg text-[#BD7469]">
                      The Aspirin Exercise: Name 3 Pieces of Evidence of Safety
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C524F]">
                      Look around your room right now and name 3 things that confirm danger is in the past:
                    </p>

                    <div className="space-y-2.5">
                      <div>
                        <label className="text-[11px] font-semibold text-[#8C7A74] block">Evidence #1:</label>
                        <input
                          type="text"
                          value={safetyProof1}
                          onChange={(e) => setSafetyProof1(e.target.value)}
                          className="w-full px-3.5 py-2 bg-[#FAF6F2] border border-[#DDD8CF] rounded-xl text-xs text-[#2D2A26]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#8C7A74] block">Evidence #2:</label>
                        <input
                          type="text"
                          value={safetyProof2}
                          onChange={(e) => setSafetyProof2(e.target.value)}
                          className="w-full px-3.5 py-2 bg-[#FAF6F2] border border-[#DDD8CF] rounded-xl text-xs text-[#2D2A26]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#8C7A74] block">Evidence #3:</label>
                        <input
                          type="text"
                          value={safetyProof3}
                          onChange={(e) => setSafetyProof3(e.target.value)}
                          className="w-full px-3.5 py-2 bg-[#FAF6F2] border border-[#DDD8CF] rounded-xl text-xs text-[#2D2A26]"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAF3ED] rounded-2xl border border-[#E8DCD5] space-y-2">
                      <span className="text-xs font-bold text-[#BD7469] block">The Body Check-In:</span>
                      <p className="text-xs sm:text-sm text-[#3D3532] italic">
                        Close your eyes. Place one hand on your heart. Say: <em>&ldquo;I am here. I am safe. I am in my own time now.&rdquo;</em> Notice if your heart rate slows down by even 1%.
                      </p>
                    </div>

                    <div className="border-t border-[#EDE2DA] pt-4">
                      <span className="text-xs font-bold text-[#BD7469] block mb-1">Sara’s Note:</span>
                      <p className="text-xs text-[#736E67] italic leading-relaxed">
                        &ldquo;For a few months, I lived with my shoulders up to my ears... Once my body believed I was safe, the 'Mental Fog' started to lift. You aren't 'anxious'; you are just a soldier who hasn't realized the war is over.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 7 && (
                /* PAGE 7: DAY 3: THE END OF THE SILENCE & THE TEA TEST */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="inline-block bg-[#FAF3ED] border border-[#E8DCD5] px-3.5 py-1 rounded-full text-[11px] font-bold text-[#BD7469] uppercase tracking-widest">
                    DAY 3: THE END OF THE SILENCE
                  </div>
                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#3D3532]">
                    &ldquo;Self-betrayal is staying when your gut says go. Rebuilding is listening when your gut says 'I want this flavor of tea.'&rdquo;
                  </h3>

                  <div className="bg-white p-6 rounded-3xl border border-[#EDE2DA] space-y-4 shadow-sm">
                    <h4 className="font-serif italic font-bold text-lg text-[#BD7469]">
                      The Aspirin Exercise: The Tea Test
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed">
                      Today, make one decision purely for your own pleasure that has no consequences for anyone else (e.g. the song in your car, the tea you brew, which side of the bed you sleep on).
                    </p>

                    <div>
                      <label className="text-[11px] font-semibold text-[#8C7A74] block mb-1">
                        My Small Sovereign Choice today was:
                      </label>
                      <input
                        type="text"
                        value={teaChoice}
                        onChange={(e) => setTeaChoice(e.target.value)}
                        placeholder="e.g. Drinking peppermint tea slowly on the balcony"
                        className="w-full px-3.5 py-2.5 bg-[#FAF6F2] border border-[#DDD8CF] rounded-xl text-xs sm:text-sm text-[#2D2A26]"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-[#4A423D] block">
                        How did it feel to choose without asking for a second opinion?
                      </span>
                      {[
                        'I felt a tiny spark of power.',
                        'I felt a flash of guilt (this is a sign of healing!).',
                        'I felt peaceful.',
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTeaFeeling(item)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center space-x-2 transition-all ${
                            teaFeeling === item
                              ? 'bg-[#FAF3ED] border-[#BD7469] text-[#BD7469] font-medium'
                              : 'bg-white border-[#EDE2DA] text-[#5C524F] hover:bg-[#FAF6F2]'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${teaFeeling === item ? 'bg-[#BD7469] text-white border-[#BD7469]' : 'border-[#DDD8CF]'}`}>
                            {teaFeeling === item ? '✓' : ''}
                          </span>
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-[#EDE2DA] pt-4">
                      <span className="text-xs font-bold text-[#BD7469] block mb-1">Sara’s Note:</span>
                      <p className="text-xs text-[#736E67] italic leading-relaxed">
                        &ldquo;The first Saturday after I left, I bought a bunch of yellow flowers. My ex hated yellow. I felt like I was breaking a law. That $10 bouquet was the first time I chose my own preference over his ghost. Rebuilding your identity doesn't start with a 'new life.' It starts with a 'new flavor.'&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 8 && (
                /* PAGE 8: THE 2 A.M. ANSWER GUIDE (EMERGENCY MIDNIGHT PROTOCOL) */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="inline-block bg-[#2D2A26] text-[#E2B072] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest">
                      🌙 EMERGENCY MIDNIGHT PROTOCOL
                    </span>
                    <a
                      href="https://herhorizon.gumroad.com/l/72-hour-reset"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#BD7469] hover:underline font-semibold flex items-center space-x-1"
                    >
                      <span>Download Free PDF Guide</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div>
                    <h2 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#3D3532] uppercase">
                      THE 2 A.M. ANSWER GUIDE
                    </h2>
                    <p className="font-serif italic text-base text-[#BD7469] mt-1">
                      &ldquo;When you wake up in the middle of the night and your chest is pounding, don’t reach for your phone. Reach for these answers.&rdquo;
                    </p>
                  </div>

                  {/* 3 Midnight Rules */}
                  <div className="bg-[#FAF6F2] p-6 rounded-3xl border border-[#EDE2DA] space-y-4 shadow-sm">
                    <h4 className="font-bold text-[#3D3532] uppercase tracking-wider text-xs flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#BD7469]" />
                      <span>THE 3 FORBIDDEN MOVES AT 2 A.M.</span>
                    </h4>
                    
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="p-3.5 bg-white rounded-2xl border border-[#EDE2DA] space-y-1">
                        <strong className="text-[#C05746] block">1. 🛑 Do NOT Send The Midnight Message</strong>
                        <p className="text-[#5C524F]">
                          Closure sought at 2:00 a.m. is not love or intuition—it is chemical dopamine withdrawal. Reaching out will reset your healing clock to Day 0.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-2xl border border-[#EDE2DA] space-y-1">
                        <strong className="text-[#C05746] block">2. 🛑 Do NOT Open Old Photo Threads or Last Seen Timestamps</strong>
                        <p className="text-[#5C524F]">
                          Checking his status in the dark triggers acute amygdala panic. Place your phone face down across the room.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-2xl border border-[#EDE2DA] space-y-1">
                        <strong className="text-[#C05746] block">3. 🛑 No Life Decisions Until Sunrise</strong>
                        <p className="text-[#5C524F]">
                          Midnight grief lies. Repeat to yourself: <em>&ldquo;I am not allowed to make any decisions about my future until 12:00 PM tomorrow.&rdquo;</em>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The 2 A.M. Emergency Answer Script */}
                  <div className="bg-gradient-to-br from-[#BD7469] to-[#9E5B51] text-white p-6 sm:p-7 rounded-3xl shadow-md space-y-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E2B072] block">
                      READ ALOUD 3 TIMES RIGHT NOW
                    </span>
                    <h4 className="font-serif italic font-semibold text-xl sm:text-2xl leading-snug">
                      The 2 A.M. Answer Script
                    </h4>

                    <div className="space-y-2.5 text-xs sm:text-sm bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/20">
                      <p className="leading-relaxed">
                        ✓ <em>&ldquo;My racing heart is the sound of my nervous system unhooking from chaos—not a sign that I made a mistake.&rdquo;</em>
                      </p>
                      <p className="leading-relaxed">
                        ✓ <em>&ldquo;I do not miss him; I miss the illusion of safety that was slowly suffocating me.&rdquo;</em>
                      </p>
                      <p className="leading-relaxed">
                        ✓ <em>&ldquo;The quiet in this bedroom is not loneliness—it is peace. Nobody will scream, criticize, or judge me tonight.&rdquo;</em>
                      </p>
                      <p className="leading-relaxed">
                        ✓ <em>&ldquo;I survived the fire. I do not need to walk back into the smoke.&rdquo;</em>
                      </p>
                    </div>
                  </div>

                  {/* The Physical 3-Step Anchor */}
                  <div className="bg-white p-6 rounded-3xl border border-[#EDE2DA] space-y-3.5 shadow-sm text-xs sm:text-sm">
                    <h4 className="font-bold text-[#3D3532] uppercase tracking-wider text-xs">
                      THE 60-SECOND SOMATIC ANCHOR
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-center">
                      <div className="p-3 bg-[#FAF6F2] rounded-2xl border border-[#EDE2DA]">
                        <span className="font-bold text-[#BD7469] block text-base mb-1">01</span>
                        <strong className="block text-[#3D3532] text-xs">Cold Glass of Water</strong>
                        <p className="text-[11px] text-[#736E67] mt-0.5">Drink it slowly to shock the vagus nerve back to calm.</p>
                      </div>
                      <div className="p-3 bg-[#FAF6F2] rounded-2xl border border-[#EDE2DA]">
                        <span className="font-bold text-[#BD7469] block text-base mb-1">02</span>
                        <strong className="block text-[#3D3532] text-xs">Hand Over Sternum</strong>
                        <p className="text-[11px] text-[#736E67] mt-0.5">Feel your own warmth. You are safe in your own body.</p>
                      </div>
                      <div className="p-3 bg-[#FAF6F2] rounded-2xl border border-[#EDE2DA]">
                        <span className="font-bold text-[#BD7469] block text-base mb-1">03</span>
                        <strong className="block text-[#3D3532] text-xs">4-7-8 Breathing</strong>
                        <p className="text-[11px] text-[#736E67] mt-0.5">Inhale 4s, hold 7s, long slow exhale 8s.</p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#EDE2DA]">
                      <span className="text-[11px] text-[#8C7A74]">
                        Part of your complimentary free reset bundle
                      </span>
                      <a
                        href="https://herhorizon.gumroad.com/l/72-hour-reset"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs text-[#BD7469] font-bold hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Get Official Printable Lockscreen Card</span>
                      </a>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => setCurrentPage(9)}
                      className="inline-flex items-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
                    >
                      <span>Continue: The Rebuild Begins</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentPage === 9 && (
                /* PAGE 9: THE RESET IS DONE, THE REBUILD BEGINS */
                <div className="space-y-6 max-w-2xl mx-auto text-center">
                  <span className="text-[11px] font-bold text-[#D4A373] uppercase tracking-widest block">
                    THE TRANSITION POINT
                  </span>
                  <h2 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#3D3532] uppercase">
                    THE RESET IS DONE. <br />
                    THE REBUILD BEGINS.
                  </h2>
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE2DA] text-left space-y-4 shadow-sm text-sm text-[#5C524F] leading-relaxed">
                    <p>
                      You’ve spent 72 hours stopping the fire. In three days, you have proven that you can:
                    </p>
                    <ul className="space-y-2 pl-4 list-disc text-[#3D3532]">
                      <li>Interrupt the mental loops.</li>
                      <li>Find safety in your own body.</li>
                      <li>Make a choice for yourself.</li>
                      <li>Navigate midnight panic with the 2 A.M. Answer Protocol.</li>
                    </ul>
                    <p className="pt-2 font-serif italic text-base text-[#BD7469]">
                      &ldquo;Stopping the fire is not the same as rebuilding the house. These 3 days were the 'Aspirin' for your headache. But to truly reclaim the woman you were before the erosion started—the one who is confident, whole, and certain of her worth—you need a Roadmap.&rdquo;
                    </p>
                    <p className="font-semibold text-[#2D2A26]">
                      You’ve stabilized. Now, it is time to reconstruct.
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentPage(10)}
                    className="inline-flex items-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
                  >
                    <span>View The Full Rebuild System™</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {(currentPage === 10 || currentPage === 11) && (
                /* PAGES 10 & 11: THE REBUILD SYSTEM 30-DAY PACK */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="text-center space-y-2">
                    <span className="text-[11px] font-bold text-[#BD7469] uppercase tracking-widest">
                      THE COMPLETE SYSTEM
                    </span>
                    <h2 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#3D3532] uppercase">
                      THE REBUILD SYSTEM™
                    </h2>
                    <p className="text-xs sm:text-sm text-[#8C7A74]">
                      The 30-Day Identity Restoration Pack (168 Pages)
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-[#EDE2DA] space-y-4 shadow-sm text-xs sm:text-sm text-[#5C524F]">
                    <p className="font-serif italic text-base text-[#BD7469]">
                      &ldquo;I took the rest of my field notes—the ones I used to find my joy, my boundaries, and my self-trust—and turned them into a complete system. This is the 168-page 'Surgery' to fix identity collapse once and for all.&rdquo;
                    </p>

                    <h4 className="font-bold text-[#3D3532] uppercase tracking-wider text-xs pt-2">
                      WHAT’S INSIDE YOUR PACK:
                    </h4>
                    <ol className="space-y-2 list-decimal list-inside text-[#3D3532]">
                      <li><strong>The Identity Rebuild Roadmap:</strong> Your 30-day daily spine.</li>
                      <li><strong>The Self-Trust Reset Guide:</strong> Your practical intuition compass.</li>
                      <li><strong>The Mental Loop Journal:</strong> Your emergency brake for panic.</li>
                      <li><strong>The Trauma Bond Detox:</strong> Your 7-day chemical release.</li>
                      <li><strong>The Boundary Scripts Library:</strong> Your copy-paste shield.</li>
                    </ol>

                    <h4 className="font-bold text-[#D4A373] uppercase tracking-wider text-xs pt-2">
                      PLUS 3 EXCLUSIVE BONUSES:
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-[#5C524F]">
                      <li>1. The First Date Decoder</li>
                      <li>2. The Home Reclamation Blueprint</li>
                      <li>3. The Solo Saturday Joy Bank</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setCurrentPage(12)}
                      className="inline-flex items-center space-x-2 bg-[#E2B072] hover:bg-[#D4A373] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors"
                    >
                      <span>Claim Your 50% Launch Coupon (REBUILD50)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentPage === 12 && (
                /* PAGE 12: A GIFT FOR YOUR REBUILD - CODE REBUILD50 */
                <div className="space-y-6 max-w-2xl mx-auto text-center">
                  <div className="inline-block bg-[#FAF3ED] border border-[#E8DCD5] px-3.5 py-1 rounded-full text-[11px] font-bold text-[#BD7469] uppercase tracking-widest">
                    EXCLUSIVE LAUNCH OFFER
                  </div>
                  <h2 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#3D3532] uppercase">
                    A GIFT FOR YOUR REBUILD
                  </h2>
                  <p className="font-serif italic text-base text-[#BD7469] max-w-md mx-auto">
                    &ldquo;The reset was the first step. The system is the rest of the journey. I want to make sure you have the map you need.&rdquo;
                  </p>

                  {/* Voucher Card with Code REBUILD50 */}
                  <div className="bg-[#FAF6F2] border-2 border-dashed border-[#BD7469] rounded-3xl p-6 sm:p-8 max-w-md mx-auto space-y-4 shadow-md">
                    <span className="text-[11px] font-bold tracking-widest text-[#D4A373] uppercase block">
                      LIMITED TO FIRST 50 WOMEN
                    </span>
                    
                    <div className="bg-white p-4 rounded-2xl border border-[#EDE2DA] flex items-center justify-between gap-3 shadow-inner">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#8C7A74] block">DISCOUNT CODE</span>
                        <code className="text-xl sm:text-2xl font-mono font-bold text-[#BD7469] tracking-wider">
                          REBUILD50
                        </code>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="bg-[#FAF3ED] hover:bg-[#F3E7DC] text-[#BD7469] border border-[#E8DCD5] px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="text-3xl sm:text-4xl font-serif font-bold text-[#3D3532]">
                      $13 <span className="line-through text-lg font-normal text-[#8C7A74] font-sans">$27</span>
                      <span className="text-sm font-sans font-normal text-[#8C7A74] block">50% Off Lifetime Access to Full 168-Page System</span>
                    </div>

                    <a
                      href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>CLAIM 50% DISCOUNT ($13) &amp; START THE ROADMAP</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {currentPage === 13 && (
                /* PAGE 13: THE "AHA" MOMENT WORKSHEET */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <h2 className="font-serif italic font-bold text-3xl text-[#3D3532] uppercase">
                    THE &ldquo;AHA&rdquo; MOMENT
                  </h2>
                  <p className="font-serif italic text-base text-[#BD7469]">
                    &ldquo;The person you were on Friday didn’t know the person you would become by Sunday.&rdquo;
                  </p>
                  <div className="bg-white p-6 rounded-3xl border border-[#EDE2DA] space-y-4 shadow-sm text-xs sm:text-sm">
                    <p className="text-[#5C524F]">
                      You’ve completed your reset. Write down one sentence about what you’ve learned about your ability to choose yourself in the last 72 hours:
                    </p>
                    <textarea
                      rows={4}
                      value={ahaReflection}
                      onChange={(e) => setAhaReflection(e.target.value)}
                      placeholder="e.g. I learned that I can find 10 minutes of peace even when the noise is loud..."
                      className="w-full p-4 bg-[#FAF6F2] border border-[#DDD8CF] rounded-2xl text-xs sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-1 focus:ring-[#E2B072]"
                    />
                  </div>
                </div>
              )}

              {currentPage === 14 && (
                /* PAGE 14: YOU ARE NOT WALKING ALONE (Testimonials) */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <h2 className="font-serif italic font-bold text-3xl text-[#3D3532] uppercase">
                    YOU ARE NOT WALKING ALONE.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C524F]">
                    One of the loudest lies of identity collapse is that you are &ldquo;uniquely broken.&rdquo; You aren’t. There are thousands of women walking this exact stone path:
                  </p>

                  <div className="space-y-3.5">
                    <div className="bg-white p-5 rounded-2xl border border-[#EDE2DA] space-y-1">
                      <div className="flex text-[#E2B072] text-xs">★★★★★</div>
                      <p className="text-xs sm:text-sm text-[#3D3532] italic">
                        &ldquo;I was so used to walking on eggshells that I didn't know how to stop. Sara's system helped me realize I was a survivor, not a failure. For the first time in 3 years, I recognize the woman in the mirror.&rdquo;
                      </p>
                      <span className="text-[11px] font-bold text-[#BD7469] block">— Maya</span>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-[#EDE2DA] space-y-1">
                      <div className="flex text-[#E2B072] text-xs">★★★★★</div>
                      <p className="text-xs sm:text-sm text-[#3D3532] italic">
                        &ldquo;I thought I missed him. The 'Trauma Bond' explanation changed everything. I realized I was just in withdrawal. That realization gave me my power back.&rdquo;
                      </p>
                      <span className="text-[11px] font-bold text-[#BD7469] block">— Sarah J.</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF3ED] rounded-2xl border border-[#E8DCD5]">
                    <span className="text-xs font-bold text-[#BD7469] block mb-1">Sara’s Note:</span>
                    <p className="text-xs text-[#736E67] italic leading-relaxed">
                      &ldquo;I used to read Reddit threads at 3 a.m. just to feel less crazy. I wanted to build a brand that felt like a hand reaching out in the dark. These women are proof that the system works. You are the next success story.&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {currentPage === 15 && (
                /* PAGE 15: MY PROMISE TO YOU & THE 7-DAY GUARANTEE */
                <div className="space-y-6 max-w-2xl mx-auto text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#D4A373] to-[#F3D5A5] mx-auto p-1 shadow-lg flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-white flex flex-col items-center justify-center text-center p-1">
                      <span className="text-[9px] font-bold uppercase text-[#3D3532]">100%</span>
                      <span className="bg-[#B3261E] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">GUARANTEE</span>
                    </div>
                  </div>

                  <h2 className="font-serif italic font-bold text-3xl text-[#3D3532] uppercase">
                    MY PROMISE TO YOU
                  </h2>
                  <p className="font-serif italic text-base text-[#BD7469]">
                    The 7-Day Clarity Guarantee
                  </p>

                  <div className="bg-white p-6 rounded-3xl border border-[#EDE2DA] text-left space-y-3 shadow-sm text-xs sm:text-sm text-[#5C524F] leading-relaxed">
                    <p>
                      I know you might be afraid to invest in yourself. You’ve been betrayed before, and your trust is fragile. I want to make this choice the easiest one you make today:
                    </p>
                    <p className="font-semibold text-[#3D3532]">
                      Use The Rebuild System™ for 7 days. If you don't experience at least one moment of mental clarity—where the loops quiet and you feel a flicker of your real self returning—email me for a full refund. No questions asked. No explanations needed.
                    </p>
                    <p className="font-serif italic text-[#BD7469]">
                      &ldquo;I am committed to your peace of mind, not your money. You are safe here.&rdquo;
                    </p>
                  </div>

                  <a
                    href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full shadow-md"
                  >
                    <span>GET THE REBUILD SYSTEM ($13 • CODE: REBUILD50)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {currentPage === 16 && (
                /* PAGE 16: LET'S STAY CONNECTED */
                <div className="space-y-6 max-w-2xl mx-auto">
                  <h2 className="font-serif italic font-bold text-3xl text-[#3D3532] uppercase text-center">
                    LET’S STAY CONNECTED
                  </h2>
                  <p className="font-serif italic text-base text-[#BD7469] text-center">
                    &ldquo;Healing is a journey we don’t have to walk in total isolation. I am still here with you.&rdquo;
                  </p>

                  <div className="bg-white p-6 rounded-3xl border border-[#EDE2DA] space-y-4 shadow-sm text-xs sm:text-sm text-[#5C524F]">
                    <div>
                      <strong className="block text-[#3D3532] text-sm mb-1">Have a question or need support?</strong>
                      <p className="text-xs text-[#736E67]">
                        If you have a technical issue with your files, a question about the prompts, or just need to reach out, please email me at:
                      </p>
                      <a href="mailto:hello@herhorizon.store" className="text-[#BD7469] font-medium underline mt-1 inline-block">
                        hello@herhorizon.store
                      </a>
                    </div>

                    <div className="border-t border-[#EDE2DA] pt-3">
                      <strong className="block text-[#3D3532] text-sm mb-1">Tell me your story:</strong>
                      <p className="text-xs text-[#736E67]">
                        I built this system because I was a survivor who documented her own path back to herself. If one of these tools gave you an &ldquo;Aha!&rdquo; moment or helped you breathe today, I would love to hear about it. Your wins (no matter how small) are what this brand is built on.
                      </p>
                    </div>

                    <div className="border-t border-[#EDE2DA] pt-3 space-y-1 text-xs">
                      <strong className="block text-[#3D3532] text-sm mb-1">Join the Community:</strong>
                      <p className="text-[#736E67]">Instagram: <span className="font-medium text-[#BD7469]">@HerHorizon.Heal</span></p>
                      <p className="text-[#736E67]">Threads: <span className="font-medium text-[#BD7469]">@HerHorizon.Heal</span></p>
                      <p className="text-[#736E67]">Website: <span className="font-medium text-[#BD7469]">www.herhorizon.store</span></p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        {isUnlocked && (
          <div className="p-4 sm:p-5 bg-[#FAF6F2] border-t border-[#E8DCD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <a
              href="https://herhorizon.gumroad.com/l/72-hour-reset"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-[#5C6E59] hover:text-[#4A5A48] font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get The Free 72-Hour Reset &amp; 2 A.M. Answer Guide</span>
            </a>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <a
                href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] text-white px-5 py-2.5 rounded-full font-semibold shadow-sm transition-colors text-xs"
              >
                <span>Claim 50% Off ($13 Today)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
