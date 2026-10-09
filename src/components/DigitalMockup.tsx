import React, { useState } from 'react';
import { Tablet, Sparkles, BookOpen, Check, Shield, Layers, Eye, ArrowRight } from 'lucide-react';

export const DigitalMockup: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'roadmap' | 'selftrust' | 'journal' | 'scripts'>('roadmap');

  const screens = {
    roadmap: {
      title: 'Phase 2: The Mood Disentanglement Formula',
      day: 'Day 12 of 30',
      subtitle: 'Somatic grounding & cognitive boundary construction',
      tag: 'Interactive Daily Framework',
      quote: '“Their emotional storm is the weather outside. You are the climate inside your own house.”',
      prompts: [
        'Identify the exact somatic trigger in your chest or jaw right now.',
        'Name 3 facts that exist independently of how the other person feels today.',
        'Your Micro-Action: 15 minutes of uninterrupted self-directed quiet.',
      ],
    },
    selftrust: {
      title: 'Intuition vs. Trauma Response Diagnostic',
      day: 'Module 02',
      subtitle: 'Re-learning the internal compass after gaslighting',
      tag: 'Diagnostic Decision Tree',
      quote: '“Trauma screams with urgent panic. Intuition whispers with quiet, undeniable clarity.”',
      prompts: [
        'The Urgency Check: Is there an immediate physical fire, or an old panic echo?',
        'The Guilt Filter: Am I feeling bad because I harmed someone, or because I set a limit?',
        'The Sovereign Affirmation: My peace does not require their consensus.',
      ],
    },
    journal: {
      title: 'The 3 A.M. Mental Trial Eviction Protocol',
      day: 'Somatic Release',
      subtitle: 'Stopping the compulsive looping defenses in your mind',
      tag: 'Mental Loop Release',
      quote: '“You do not owe a phantom jury an opening argument. The trial has been dismissed.”',
      prompts: [
        'Write out the looping accusation word-for-word.',
        'Cross out the phantom judge: Who are you trying to convince right now?',
        'The Closing Statement: “I no longer participate in this mental interrogation.”',
      ],
    },
    scripts: {
      title: 'Script #07: The Peaceful Non-Engagement',
      day: 'Boundary Vault',
      subtitle: 'Word-for-word templates for guilt-trips and hovering',
      tag: '25 Word-for-Word Scripts',
      quote: '“‘I hear that you feel that way. I am not available to discuss this further tonight.’”',
      prompts: [
        'When they text: “After all I did for you…” → Respond: “Thank you for sharing your view. My decision stands.”',
        'When they demand immediate closure → Respond: “I need space to process this privately.”',
        'Tone rule: Flat, calm, zero emotional hooks to grab onto.',
      ],
    },
  };

  const current = screens[activeScreen];

  return (
    <div className="relative my-10 max-w-4xl mx-auto">
      {/* Editorial Marker for the Placeholder Requirement */}
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-[11px] uppercase font-bold tracking-widest text-[#C05746] bg-[#E3A88D]/15 border border-[#E3A88D]/40 px-3 py-1 rounded-full">
          [Placeholder: High-End iPad/Workbook Digital Mockup]
        </span>
        <span className="text-xs text-[#8C867E] hidden sm:inline">
          ✦ Compatible with iPad, GoodNotes, Notability &amp; Printable PDF
        </span>
      </div>

      {/* Luxury Device & Workbook Presentation */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#2E2B27] via-[#221F1D] to-[#191716] p-4 sm:p-7 md:p-9 shadow-luxe-lg text-white border border-[#48423B]">
        
        {/* iPad Top Bezel & Camera */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 px-2">
          <div className="flex items-center space-x-2 text-[11px] text-white/50">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span>HerHorizon OS 4.2 • Digital Workbook Edition</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-white/30 border border-white/40" />
          <div className="text-[11px] text-[#E3A88D] font-mono">100% RECLAIMED</div>
        </div>

        {/* Device Screen Area */}
        <div className="mt-4 rounded-2xl bg-[#FAF9F6] text-[#2D2A26] p-5 sm:p-8 shadow-inner relative overflow-hidden min-h-[380px] flex flex-col justify-between">
          
          {/* Subtle Workbook Header within Mockup */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#EAE5DC]">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-sm font-bold tracking-widest text-[#C05746] uppercase">
                HERHORIZON™
              </span>
              <span className="text-xs text-[#8A9A86]">•</span>
              <span className="text-xs text-[#736E67] font-medium">{current.tag}</span>
            </div>
            <span className="text-[11px] bg-[#E2E8E1] text-[#4F604C] px-2.5 py-0.5 rounded-full font-semibold">
              {current.day}
            </span>
          </div>

          {/* Screen Content Body */}
          <div className="py-4 space-y-4">
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#2D2A26]">
                {current.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#736E67] mt-0.5 font-light">
                {current.subtitle}
              </p>
            </div>

            {/* Somatic Quote Box in Workbook */}
            <div className="p-3.5 bg-[#FAF3EC] border-l-2 border-[#C05746] rounded-r-xl text-xs sm:text-sm font-serif italic text-[#4D453E]">
              {current.quote}
            </div>

            {/* Guided Practice Lines */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A9A86] block">
                Guided Somatic Exercise
              </span>
              {current.prompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#3E3A36] bg-white/90 p-2.5 rounded-lg border border-[#EDE8DF]"
                >
                  <span className="w-4 h-4 rounded-full bg-[#8A9A86]/20 text-[#5C6E59] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{prompt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Page Navigation Tabs inside iPad */}
          <div className="pt-4 border-t border-[#EAE5DC] flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
              <button
                onClick={() => setActiveScreen('roadmap')}
                className={`px-3 py-1.5 rounded-full transition-all text-[11px] font-medium ${
                  activeScreen === 'roadmap'
                    ? 'bg-[#C05746] text-white shadow-sm'
                    : 'bg-[#EDE8DF] text-[#635E59] hover:bg-[#E2DDD3]'
                }`}
              >
                1. 30-Day Roadmap
              </button>
              <button
                onClick={() => setActiveScreen('selftrust')}
                className={`px-3 py-1.5 rounded-full transition-all text-[11px] font-medium ${
                  activeScreen === 'selftrust'
                    ? 'bg-[#C05746] text-white shadow-sm'
                    : 'bg-[#EDE8DF] text-[#635E59] hover:bg-[#E2DDD3]'
                }`}
              >
                2. Self-Trust Reset
              </button>
              <button
                onClick={() => setActiveScreen('journal')}
                className={`px-3 py-1.5 rounded-full transition-all text-[11px] font-medium ${
                  activeScreen === 'journal'
                    ? 'bg-[#C05746] text-white shadow-sm'
                    : 'bg-[#EDE8DF] text-[#635E59] hover:bg-[#E2DDD3]'
                }`}
              >
                3. Mental Loop Journal
              </button>
              <button
                onClick={() => setActiveScreen('scripts')}
                className={`px-3 py-1.5 rounded-full transition-all text-[11px] font-medium ${
                  activeScreen === 'scripts'
                    ? 'bg-[#C05746] text-white shadow-sm'
                    : 'bg-[#EDE8DF] text-[#635E59] hover:bg-[#E2DDD3]'
                }`}
              >
                4. Boundary Scripts
              </button>
            </div>

            <span className="text-[11px] text-[#8C867E] italic">
              Tap tabs to preview exercises
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
