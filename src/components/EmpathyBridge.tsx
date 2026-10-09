import React, { useState } from 'react';
import { Eye, Wind, Sparkles, HeartHandshake, Compass, AlertCircle, Quote } from 'lucide-react';

export const EmpathyBridge: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hypervigilance' | 'hollow' | 'sovereignty'>('hypervigilance');

  return (
    <section
      id="empathy-bridge"
      className="relative py-24 md:py-32 bg-[#EDF1EC] text-[#2D2A26] border-y border-[#DCE4DB] overflow-hidden"
    >
      {/* Subtle organic light reflections */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-[#FAF9F6]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-[#8A9A86]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/70 border border-[#8A9A86]/40 px-3.5 py-1 rounded-full text-xs font-semibold text-[#5C6E59] mb-4 uppercase tracking-widest">
            <span>The Empathy Bridge</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#2D2A26] mb-6">
            72 hours puts out the fire. But how do you rebuild the house?
          </h2>

          <div className="w-16 h-0.5 bg-[#C05746]/60 mx-auto mb-6" />

          <p className="font-sans text-base sm:text-lg text-[#5A6458] font-light leading-relaxed">
            The acute crisis passes. The door closes. The room is quiet at last. But as the adrenaline drains, a terrifying realization settles into your bones:
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          
          {/* Left Column: Image Placeholder with High-End Aesthetic Styling */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Frame */}
              <div className="absolute -inset-3 rounded-3xl border border-[#8A9A86]/40 -rotate-1 pointer-events-none" />
              
              {/* Image Frame with Editorial Placeholder & Rich Aesthetic Graphic */}
              <div className="relative rounded-2xl overflow-hidden bg-[#FAF9F6] border border-[#DCE4DB] shadow-luxe-lg">
                
                {/* Visual Representation of [Placeholder: Aesthetic image of woman looking out window] */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-t from-[#2D2A26]/80 via-[#2D2A26]/20 to-transparent flex flex-col justify-between p-6">
                  
                  {/* Photo Component with Natural Editorial Tone */}
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80"
                    alt="Thoughtful woman looking out a warm sunlit window at dawn"
                    className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[0.85] contrast-[0.95] opacity-90 transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Soft Linen & Light Overlay Tint */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/20 via-transparent to-[#221F1D]/80" />
                  
                  {/* Top Badge: Placeholder Identifier */}
                  <div className="relative z-10 self-start">
                    <span className="bg-[#FAF9F6]/90 backdrop-blur-md text-[#2D2A26] border border-white/60 text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-full shadow-sm">
                      [Placeholder: Aesthetic image of woman looking out window]
                    </span>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="relative z-10 text-white space-y-1.5">
                    <p className="font-serif italic text-lg leading-snug text-white/95">
                      &ldquo;I forgot what kind of music I liked. I forgot how to order food without calculating someone else’s reaction.&rdquo;
                    </p>
                    <span className="text-[11px] text-[#E3A88D] uppercase tracking-widest font-semibold block">
                      — Field Notes, Day 4
                    </span>
                  </div>
                </div>

                {/* Micro Caption */}
                <div className="p-4 bg-[#FAF9F6] border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#6B7569]">
                  <span className="font-serif italic">Morning stillness. Finding first footing.</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#C05746] font-medium">Safe Sanctuary</span>
                </div>
              </div>

              {/* Floating Floating Somatic Badge */}
              <div className="absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-md border border-[#8A9A86]/40 px-4 py-2.5 rounded-2xl shadow-luxe flex items-center space-x-2.5 max-w-[220px]">
                <div className="w-7 h-7 rounded-full bg-[#C05746]/15 flex items-center justify-center text-[#C05746] shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight text-[#2D2A26]">
                  <strong className="block text-[#C05746]">Somatic Memory</strong>
                  Your nervous system is simply seeking safe harbor.
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: The "Identity Collapse" Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2A26] font-normal leading-snug">
                Surviving a toxic dynamic doesn’t just break your heart. <br />
                <span className="italic text-[#C05746]">It causes an Identity Collapse.</span>
              </h3>
              
              <p className="font-sans text-sm sm:text-base text-[#4E584C] leading-relaxed">
                When you live under the constant weather of someone else’s volatility, you perform a quiet, unconscious survival tactic: you swallow your desires, silence your intuition, and shape-shift your personality just to keep the peace.
              </p>

              <p className="font-sans text-sm sm:text-base text-[#4E584C] leading-relaxed">
                When you finally exit, the danger is gone—but so is the person you used to be. You look in the mirror and ask: <em>&ldquo;Who is under all this exhaustion?&rdquo;</em>
              </p>
            </div>

            {/* The 3 Core Manifestations of Identity Collapse */}
            <div className="space-y-3 pt-2">
              <div className="bg-white/80 border border-[#D5DFD4] rounded-2xl p-4 transition-all hover:bg-white hover:border-[#8A9A86]">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#E3A88D]/20 text-[#C05746] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm sm:text-base text-[#2D2A26]">
                      The Ghost Identity (Chronic Hypervigilance)
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C665A] mt-1 leading-relaxed">
                      You are constantly scanning the room, analyzing footsteps, text tones, and micro-expressions, even when you are completely alone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 border border-[#D5DFD4] rounded-2xl p-4 transition-all hover:bg-white hover:border-[#8A9A86]">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#8A9A86]/20 text-[#5C6E59] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm sm:text-base text-[#2D2A26]">
                      Eroded Self-Trust &amp; Intuition Doubts
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C665A] mt-1 leading-relaxed">
                      You second-guess the smallest everyday choices: what to wear, whether you were &ldquo;overreacting,&rdquo; or whether your feelings are even valid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 border border-[#D5DFD4] rounded-2xl p-4 transition-all hover:bg-white hover:border-[#8A9A86]">
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#C05746]/15 text-[#C05746] flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm sm:text-base text-[#2D2A26]">
                      The Midnight Rumination Loop
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C665A] mt-1 leading-relaxed">
                      Replaying past conversations, crafting imaginary defenses, and holding exhausting mental court trials when your body desperately needs rest.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Somatic Anchor Callout */}
            <div className="p-5 rounded-2xl bg-[#E2E8E1] border border-[#CAD5C9] text-xs sm:text-sm text-[#3E4A3C] flex items-center space-x-3.5">
              <Quote className="w-8 h-8 text-[#C05746] shrink-0 opacity-70" />
              <p className="italic font-serif leading-relaxed">
                &ldquo;You did not lose yourself permanently. You simply hid in the cellar until it was safe to resurface. The door is unlocked now.&rdquo;
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
