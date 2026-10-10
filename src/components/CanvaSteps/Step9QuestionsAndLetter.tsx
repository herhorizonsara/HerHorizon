import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Sparkles,
  Feather,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Brain,
  Compass,
  ArrowRight
} from 'lucide-react';
import { applyHomeFaqSchema } from '../../lib/seoHelper';

interface FAQItem {
  id: string;
  category: 'clinical' | 'roadmap';
  badge: string;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  keyTakeaway: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: 'identity-collapse',
    category: 'clinical',
    badge: 'Clinical Concept',
    question: 'What is identity collapse?',
    shortAnswer:
      'A somatic and psychological state where prolonged appeasement and emotional abuse erode your internal self-concept, leaving you questioning your instincts and core identity.',
    fullAnswer:
      'Identity collapse is a clinical and somatic state where prolonged emotional invalidation, chronic appeasement, or narcissistic abuse systematically erodes your internal self-concept. In high-conflict or toxic dynamics, you are conditioned to subordinate your instincts, preferences, and feelings to survive or prevent conflict. Over time, the neural pathways governing self-trust go dormant. When the dynamic finally ends, you aren\'t just heartbroken—you feel completely unmoored, asking: "Who was I before this?", "What do I even like?", and "Why can\'t I make simple decisions?" The HerHorizon roadmap treats this not as a character flaw, but as an autonomic trauma adaptation that requires systematic somatic re-inhabitation and identity reconstruction.',
    keyTakeaway: 'Identity collapse is a biological survival adaptation, not a lack of willpower. Rebuilding requires body-first self-trust rather than cognitive analysis.',
  },
  {
    id: 'stop-overthinking',
    category: 'clinical',
    badge: 'High-Volume Query',
    question: 'How do I stop overthinking after a toxic relationship?',
    shortAnswer:
      'Overthinking and 2 A.M. mental loops are nervous system hypervigilance, not intellectual obsession. You need physiological circuit breakers rather than more thinking.',
    fullAnswer:
      'Overthinking—especially 2 A.M. mental loops and the "phantom courtroom" where you compulsively argue with them in your head—is not an intellectual obsession; it is nervous system hypervigilance. When you experience chronic gaslighting and unpredictable hostility, your brain perceives unacknowledged truth as mortal danger. It attempts to litigate safety into existence by reliving conversations. Because the threat is stored in your autonomic nervous system (vagus nerve), you cannot "think" your way out of thinking. You need physiological circuit breakers: temperature resets (mammalian dive reflex), sensory grounding to break adrenaline spikes, and micro-boundary protocols that signal to your body: "The danger has passed; you are in a safe room now."',
    keyTakeaway: 'You cannot solve a nervous system emergency with intellectual debate. Somatic temperature and grounding resets break the loop in under 90 seconds.',
  },
  {
    id: 'fawn-response',
    category: 'clinical',
    badge: 'Trauma Biology',
    question: 'What is the Fawn response?',
    shortAnswer:
      'The fourth autonomic survival strategy alongside Fight, Flight, and Freeze. It is instinctive appeasement designed to neutralize relational danger before it strikes.',
    fullAnswer:
      'Coined by trauma therapist Pete Walker, the Fawn response is the fourth autonomic survival strategy alongside Fight, Flight, and Freeze. When fight or flight is unsafe (such as when confronting a volatile or retaliatory partner), your nervous system instinctively learns to appease, anticipate their moods, over-apologize, and merge with their desires to preempt conflict. It is commonly mislabeled as "being too nice" or "people-pleasing," but fawning is a primal survival mechanism designed to neutralize relational threat. Recovery requires uncoupling safety from appeasement, teaching your somatic system that holding a boundary and risking someone\'s temporary disappointment will not lead to your annihilation.',
    keyTakeaway: 'People-pleasing is often survival fawning. Recovery means teaching your body that boundaries are survivable and safe.',
  },
  {
    id: 'exhaustion-time',
    category: 'roadmap',
    badge: 'System Practicality',
    question: 'I’m exhausted. Will this take hours?',
    shortAnswer:
      'No. The system is designed for 10 minutes a day during the messy middle. It is engineered to give you energy, not drain it.',
    fullAnswer:
      'No. Sara Mitchell specifically designed this system for women navigating the "messy middle" of profound burnout and nervous system fatigue. You only need 10 to 12 minutes a day. The protocols are structured in micro-rituals—such as the 90-Second Vagus Brake and the 3-Minute Evening Anchor—built to replenish your nervous system rather than burden you with homework.',
    keyTakeaway: 'Micro-dosed daily protocols (10 min/day) respect your current cognitive bandwidth while producing lasting nervous system regulation.',
  },
  {
    id: 'not-just-a-journal',
    category: 'roadmap',
    badge: 'Methodology',
    question: 'Is this just another journal?',
    shortAnswer:
      'No. It is a guided reconstruction system combining somatic bodily tools, psychological reframes, and word-for-word boundary scripts.',
    fullAnswer:
      'No. Blank journals often backfire for trauma recovery because they trap you in cognitive rumination. HerHorizon is a guided reconstruction system combining polyvagal somatic tools, cognitive trauma reframes, and word-for-word boundary scripts for real-world confrontations. It tells you exactly what to do when your body enters panic or obsessive loops.',
    keyTakeaway: 'Structured somatic roadmaps outperform blank journaling by breaking ruminative cycles instead of reinforcing them.',
  },
  {
    id: 'still-in-relationship',
    category: 'roadmap',
    badge: 'Safe Pacing',
    question: 'What if I’m still in the relationship?',
    shortAnswer:
      'That is completely okay. The system builds your internal foundation of self-trust so you have the clarity and somatic stability to make your own safe choices.',
    fullAnswer:
      'That is completely okay. Healing does not require an immediate, dramatic exit. The Identity Rebuild System™ helps you quietly build internal self-trust, regulate your adrenaline spikes, and disengage from conversational bait while you are still navigating the situation. It gives you the quiet internal strength and clarity needed to protect your peace and make choices on your own timeline.',
    keyTakeaway: 'You do not have to be "out" to start healing. Internal sovereignty begins inside your own nervous system first.',
  },
];

export const Step9QuestionsAndLetter: React.FC = () => {
  // First item open by default for immediate search snippet relevance & accessibility
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'identity-collapse': true,
  });
  const [filter, setFilter] = useState<'all' | 'clinical' | 'roadmap'>('all');
  const [authorImgError, setAuthorImgError] = useState(false);
  const authorImgSrcs = [
    '/author-portrait.png',
    '/images/author-portrait.png',
    '/sara-mitchell.png',
    '/images/sara-mitchell.png',
    '/author.png',
    '/author.jpg',
  ];
  const [authorImgIdx, setAuthorImgIdx] = useState(0);

  // Guarantee valid FAQPage JSON-LD schema is active in head
  useEffect(() => {
    applyHomeFaqSchema();
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = FAQ_LIST.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section
      id="step-9"
      aria-labelledby="faq-main-title"
      className="py-16 sm:py-24 md:py-32 bg-[#FFFDF9] border-t border-[#EFE5DC] text-[#2D2A26] relative overflow-hidden"
    >
      {/* Background Soft Zen Ambient Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FAF3ED] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Accordion FAQ Header */}
        <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 bg-[#FAF6F2] border border-[#D8A79F]/40 text-[#BD7469] px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#BD7469]" />
            <span>Trauma-Informed Q&amp;A • Google Search Snippets</span>
          </div>

          <h2
            id="faq-main-title"
            className="font-serif italic font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#D4A373] tracking-wide leading-tight uppercase px-1 mb-4"
          >
            YOU HAVE QUESTIONS. <br />
            I HAVE ANSWERS.
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6B5E59] leading-relaxed">
            Direct clinical answers to high-volume questions on identity collapse, somatic recovery, and reclaiming self-trust after emotional betrayal.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#BD7469] text-white shadow-xs'
                  : 'bg-white border border-[#E8DCD5] text-[#736E67] hover:border-[#BD7469] hover:text-[#BD7469]'
              }`}
            >
              All Questions ({FAQ_LIST.length})
            </button>
            <button
              onClick={() => setFilter('clinical')}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all cursor-pointer inline-flex items-center space-x-1.5 ${
                filter === 'clinical'
                  ? 'bg-[#82927C] text-white shadow-xs'
                  : 'bg-white border border-[#82927C]/40 text-[#556950] hover:bg-[#82927C]/10'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Clinical Concepts &amp; SEO Queries (3)</span>
            </button>
            <button
              onClick={() => setFilter('roadmap')}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all cursor-pointer inline-flex items-center space-x-1.5 ${
                filter === 'roadmap'
                  ? 'bg-[#D4A373] text-white shadow-xs'
                  : 'bg-white border border-[#E8DCD5] text-[#736E67] hover:border-[#D4A373] hover:text-[#B57C48]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>System &amp; Roadmap FAQ (3)</span>
            </button>
          </div>
        </header>

        {/* Accordion List Container */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16 sm:mb-24">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = !!openItems[faq.id];
            const isClinical = faq.category === 'clinical';

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-2xs ${
                  isOpen
                    ? isClinical
                      ? 'border-[#82927C] shadow-sm'
                      : 'border-[#BD7469] shadow-sm'
                    : 'border-[#E8DCD5] hover:border-[#D8A79F]'
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BD7469] focus-visible:ring-offset-2"
                >
                  <div className="space-y-1.5 flex-1 pr-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                          isClinical
                            ? 'bg-[#82927C]/15 text-[#4E6649]'
                            : 'bg-[#E5975A]/15 text-[#C46E2E]'
                        }`}
                      >
                        {faq.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-[#8C7A74]">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-serif italic font-semibold text-lg sm:text-xl text-[#2D2A26] leading-snug">
                      {faq.question}
                    </h3>

                    {!isOpen && (
                      <p className="text-xs sm:text-sm text-[#736E67] line-clamp-1 font-normal pt-0.5">
                        {faq.shortAnswer}
                      </p>
                    )}
                  </div>

                  {/* Circular Toggle Indicator */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? isClinical
                          ? 'bg-[#82927C] text-white rotate-180'
                          : 'bg-[#BD7469] text-white rotate-180'
                        : 'bg-[#FAF6F2] text-[#8C7A74] hover:bg-[#F0E8DF]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Expandable Content */}
                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    className="px-5 pb-6 sm:px-6 sm:pb-7 pt-1 border-t border-[#F5EBE1] animate-in fade-in-50 duration-200"
                  >
                    <p className="text-xs sm:text-sm md:text-[15px] text-[#4A423E] leading-relaxed font-normal mb-4">
                      {faq.fullAnswer}
                    </p>

                    {/* Somatic / Clinical Takeaway Box */}
                    <div
                      className={`p-3.5 sm:p-4 rounded-xl flex items-start space-x-3 text-xs sm:text-sm ${
                        isClinical
                          ? 'bg-[#82927C]/10 border border-[#82927C]/30 text-[#3C5238]'
                          : 'bg-[#FAF3ED] border border-[#E8DCD5] text-[#844E43]'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold uppercase tracking-wider text-[10px] block">
                          Somatic Clinical Key
                        </span>
                        <p className="leading-snug">{faq.keyTakeaway}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Canva Headline: "IT IS TIME TO COME HOME TO YOURSELF." */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h3 className="font-serif italic font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#D4A373] tracking-wide leading-tight uppercase px-1">
            IT IS TIME TO COME <br />
            HOME TO YOURSELF.
          </h3>
        </div>

        {/* Canva Quote Card with Author Portrait */}
        <div className="max-w-2xl mx-auto p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#BD7469] border-3 sm:border-4 border-[#E2B072] text-white text-center shadow-luxe-lg relative overflow-hidden">
          
          {/* Author Portrait Avatar / Photo */}
          <div className="relative z-10 flex flex-col items-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-[#E2B072] shadow-md bg-[#FAF6F2] relative">
              {!authorImgError && authorImgIdx < authorImgSrcs.length ? (
                <img
                  src={authorImgSrcs[authorImgIdx]}
                  alt="Sara Mitchell - Founder of HerHorizon"
                  onError={() => {
                    if (authorImgIdx + 1 < authorImgSrcs.length) {
                      setAuthorImgIdx((prev) => prev + 1);
                    } else {
                      setAuthorImgError(true);
                    }
                  }}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-[#FAF3ED] to-[#EFE3D8] text-[#BD7469] flex flex-col items-center justify-center p-2">
                  <Feather className="w-7 h-7 text-[#BD7469]" />
                  <span className="text-[8px] font-bold tracking-wider uppercase text-[#8C7A74] mt-0.5">
                    Sara M.
                  </span>
                </div>
              )}
            </div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#E2B072] mt-2">
              FOUNDER &amp; TRAUMA-INFORMED GUIDE
            </span>
          </div>

          <div className="relative z-10 space-y-4">
            <p className="font-sans text-sm sm:text-base md:text-lg font-medium leading-relaxed text-white/95">
              You have spent years being a support character in someone else’s chaos.
            </p>
            <p className="font-sans text-sm sm:text-base md:text-lg font-semibold leading-relaxed text-white">
              Today, you get to be the lead character in your own life again.
            </p>
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#FFFDF9] pt-1">
              &ldquo;Stop being a guest in your own life. Let&rsquo;s get you back.&rdquo;
            </p>

            <div className="pt-4 border-t border-white/20 text-xs sm:text-sm tracking-wider uppercase font-medium text-white/90">
              — Sara Mitchell / <span className="font-bold text-white">HerHorizon</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
