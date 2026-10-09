import React from 'react';
import { Compass, Sparkles, HeartHandshake, ShieldCheck, FileCheck, Layers, BookOpen, MessageSquareText, Feather, ArrowUpRight } from 'lucide-react';
import { DigitalMockup } from './DigitalMockup';
import { PagesPreview } from './PagesPreview';

export const ProductPitch: React.FC = () => {
  const modules = [
    {
      number: '01',
      title: 'The 30-Day Guided Roadmap',
      icon: Compass,
      accent: 'border-[#8A9A86]/40 bg-[#8A9A86]/10 text-[#5C6E59]',
      description:
        'A gentle, day-by-day sequence to ground your nervous system, dismantle panic triggers, and establish sovereign routines without emotional burnout.',
      highlights: [
        'Daily 7-minute bite-sized practices',
        'Somatic check-ins for breath & jaw tension',
        'Morning and evening anchoring prompts',
      ],
    },
    {
      number: '02',
      title: 'The Self-Trust Reset Guide',
      icon: HeartHandshake,
      accent: 'border-[#C05746]/40 bg-[#C05746]/10 text-[#C05746]',
      description:
        'Learn the exact diagnostic difference between a real gut intuition and a hypervigilant trauma response so you never second-guess your reality again.',
      highlights: [
        'The Intuition Decision Tree framework',
        'Undoing the second-guessing reflex',
        'Reclaiming confidence in small decisions',
      ],
    },
    {
      number: '03',
      title: 'The Mental Loop Release Journal',
      icon: Sparkles,
      accent: 'border-[#E3A88D]/60 bg-[#E3A88D]/20 text-[#B55A38]',
      description:
        'A targeted somatic journaling system designed specifically to interrupt the 2 A.M. mental court trials, imaginary defenses, and obsessive rumination.',
      highlights: [
        'The “Case Dismissed” nightly exercise',
        'Releasing the need to convince phantom judges',
        'Guided sleep-preparation somatic scripts',
      ],
    },
    {
      number: '04',
      title: 'The 25 Boundary Scripts Library',
      icon: MessageSquareText,
      accent: 'border-[#8A9A86]/40 bg-[#8A9A86]/10 text-[#5C6E59]',
      description:
        'Word-for-word, guilt-free responses for hovering texts, family interference, flying monkeys, and emotional baiting—written to be delivered calmly.',
      highlights: [
        'Copy-and-paste text message templates',
        'In-person gray-rock calmly delivered scripts',
        'Zero justification, unshakeable boundaries',
      ],
    },
  ];

  return (
    <section
      id="product-pitch"
      className="py-24 md:py-32 bg-[#FAF9F6] text-[#2D2A26] relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-[-15%] w-[500px] h-[500px] bg-[#E3A88D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[450px] h-[450px] bg-[#8A9A86]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 bg-[#E3A88D]/15 border border-[#E3A88D]/40 px-3.5 py-1 rounded-full text-xs font-semibold text-[#C05746] mb-4 uppercase tracking-widest">
            <Feather className="w-3.5 h-3.5" />
            <span>The Complete Framework</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#2D2A26] mb-6">
            The Identity Rebuild System™
          </h2>

          <div className="w-16 h-0.5 bg-[#C05746]/60 mx-auto mb-6" />

          <p className="font-sans text-base sm:text-lg text-[#635E59] font-light leading-relaxed max-w-2xl mx-auto">
            Not toxic positivity. Not generic therapy clichés. A complete, quiet, trauma-informed digital architecture to rebuild the person who was eclipsed.
          </p>
        </div>

        {/* Large Placeholder Space: [Placeholder: High-End iPad/Workbook Digital Mockup] */}
        <DigitalMockup />

        {/* The 2x2 Grid of Core System Deliverables */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A9A86] block">
              SYSTEM ARCHITECTURE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2A26] font-normal mt-1">
              Four Core Pillars of Emotional Sovereignty
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
            {modules.map((mod, idx) => {
              const IconComp = mod.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E8E3DA] rounded-3xl p-7 sm:p-8 shadow-luxe hover:shadow-luxe-lg transition-all duration-300 flex flex-col justify-between group hover:border-[#C05746]/40"
                >
                  <div>
                    {/* Card Top */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 ${mod.accent}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="font-serif text-xl font-bold text-[#D8D2C6]">
                        {mod.number}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#2D2A26] mb-3 group-hover:text-[#C05746] transition-colors">
                      {mod.title}
                    </h4>

                    {/* Card Description */}
                    <p className="font-sans text-sm text-[#635E59] leading-relaxed mb-6 font-light">
                      {mod.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="pt-4 border-t border-[#F0ECE4] space-y-2">
                    {mod.highlights.map((item, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center space-x-2 text-xs text-[#524D47]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A9A86]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Placeholder for inner pages: [Placeholder: 3 overlapping pages showing inside the guide] */}
        <PagesPreview />

        {/* Quick CTA Bridge into Pricing Section */}
        <div className="mt-14 text-center">
          <a
            href="#special-offer"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#C05746] hover:text-[#A84838] border-b border-[#C05746]/40 pb-1 hover:border-[#C05746] transition-all"
          >
            <span>Jump to Special Early-Adopter Pricing &amp; Claim Your 50% Off</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
