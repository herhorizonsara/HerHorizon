import React, { useState } from 'react';
import { Eye, BookOpen, Layers, CheckCircle2, ChevronRight, Shield } from 'lucide-react';

export const PagesPreview: React.FC = () => {
  const [activePageIndex, setActivePageIndex] = useState(0);

  const pages = [
    {
      pageNumber: 'Page 08',
      title: 'The Nervous System De-Escalation Map',
      tagline: 'Somatic Somatic Protocol',
      accentColor: '#8A9A86',
      content: (
        <div className="space-y-3 text-left text-xs sm:text-[13px] text-[#3E3A36]">
          <p className="font-serif italic text-sm text-[#2D2A26] border-l-2 border-[#8A9A86] pl-2.5">
            &ldquo;When their tone drops, your chest tightens before your mind can even register the word.&rdquo;
          </p>
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6E59] block">
              Step 1: The Physiological Sigh
            </span>
            <p className="text-[11px] text-[#615B54] leading-relaxed">
              Two quick deep inhales through the nose, followed by one long, slow, audibly unhurried exhale through the mouth. Repeat 3 times to signal your vagus nerve that the room is physically safe.
            </p>
          </div>
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE5DC] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6E59] block">
              Step 2: Fact-Anchor Grounding
            </span>
            <p className="text-[11px] text-[#615B54] leading-relaxed">
              Name 3 objects in the room you bought yourself. You are the architect of this physical space.
            </p>
          </div>
        </div>
      ),
    },
    {
      pageNumber: 'Page 23',
      title: 'The 2 A.M. Ghost Court Dissolution',
      tagline: 'Cognitive Rumination Tool',
      accentColor: '#C05746',
      content: (
        <div className="space-y-3 text-left text-xs sm:text-[13px] text-[#3E3A36]">
          <p className="font-serif italic text-sm text-[#2D2A26] border-l-2 border-[#C05746] pl-2.5">
            &ldquo;You are laying in bed, litigating an argument from six months ago with a person who has already moved on.&rdquo;
          </p>
          <div className="p-3 bg-[#FAF4EF] rounded-xl border border-[#EFE3DB] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C05746] block">
              The Reality Check
            </span>
            <p className="text-[11px] text-[#615B54] leading-relaxed">
              Winning this argument in your head will not change their empathy capacity. Their inability to understand your pain was never due to a lack of evidence.
            </p>
          </div>
          <div className="p-3 bg-[#FAF4EF] rounded-xl border border-[#EFE3DB] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C05746] block">
              The Written Dismissal
            </span>
            <p className="text-[11px] text-[#615B54] leading-relaxed">
              Write this down on paper: <em>&ldquo;Case dismissed with prejudice. Court is permanently adjourned.&rdquo;</em>
            </p>
          </div>
        </div>
      ),
    },
    {
      pageNumber: 'Page 37',
      title: 'Unbreakable Scripts for Hovering & Guilt',
      tagline: '25 Boundary Scripts',
      accentColor: '#E3A88D',
      content: (
        <div className="space-y-3 text-left text-xs sm:text-[13px] text-[#3E3A36]">
          <p className="font-serif italic text-sm text-[#2D2A26] border-l-2 border-[#E3A88D] pl-2.5">
            &ldquo;When they send a midnight text pretending nothing ever happened.&rdquo;
          </p>
          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#EAE5DC] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E654E] block">
              The Breadcrumb Response
            </span>
            <div className="p-2 bg-white rounded border border-[#EDE8DF] font-mono text-[11px] text-[#2D2A26]">
              &ldquo;I received your message. I am keeping my focus on my own healing and will not be discussing this.&rdquo;
            </div>
          </div>
          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#EAE5DC] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E654E] block">
              The Third-Party Flying Monkey Script
            </span>
            <div className="p-2 bg-white rounded border border-[#EDE8DF] font-mono text-[11px] text-[#2D2A26]">
              &ldquo;I know you mean well, but my relationship decisions are private. Let’s change the subject.&rdquo;
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative my-14 max-w-4xl mx-auto">
      {/* Editorial Marker for the Placeholder Requirement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 px-2">
        <span className="text-[11px] uppercase font-bold tracking-widest text-[#5C6E59] bg-[#8A9A86]/15 border border-[#8A9A86]/40 px-3 py-1 rounded-full self-start">
          [Placeholder: 3 overlapping pages showing inside the guide]
        </span>
        <span className="text-xs text-[#7A756F]">
          Click any page spread below to bring it forward &amp; inspect
        </span>
      </div>

      {/* 3 Overlapping Pages Display */}
      <div className="relative py-8 px-2">
        
        {/* Desktop / Tablet Overlapping Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {pages.map((page, index) => {
            const isSelected = activePageIndex === index;
            
            return (
              <div
                key={index}
                onClick={() => setActivePageIndex(index)}
                className={`cursor-pointer transition-all duration-300 rounded-2xl bg-white border p-5 sm:p-6 shadow-luxe flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'border-[#C05746] ring-2 ring-[#C05746]/20 transform -translate-y-2 shadow-luxe-lg'
                    : 'border-[#E6E1D8] opacity-80 hover:opacity-100 hover:-translate-y-1'
                }`}
                style={{
                  minHeight: '380px',
                }}
              >
                {/* Top Corner Foil Ribbon */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20"
                  style={{
                    background: `radial-gradient(circle at top right, ${page.accentColor}, transparent 70%)`,
                  }}
                />

                {/* Header */}
                <div className="pb-4 border-b border-[#F0ECE4]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9A86]">
                      {page.tagline}
                    </span>
                    <span className="font-mono text-[11px] text-[#7A756F] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#EDE8DF]">
                      {page.pageNumber}
                    </span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-semibold text-[#2D2A26] mt-2 leading-snug">
                    {page.title}
                  </h4>
                </div>

                {/* Page Excerpt Body */}
                <div className="my-4 flex-1">
                  {page.content}
                </div>

                {/* Footer status */}
                <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between text-[11px] text-[#7A756F]">
                  <span className="flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A86]" />
                    <span>Included in System</span>
                  </span>
                  <span className="font-serif italic text-[#C05746] font-medium">
                    {isSelected ? 'Active Preview' : 'Click to Read'}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

      </div>

      {/* Reassurance Footer */}
      <div className="text-center pt-2">
        <p className="text-xs text-[#7A756F]">
          ✦ All 90+ pages feature guided fillable prompts, somatic checklists, and printable emergency cards.
        </p>
      </div>
    </div>
  );
};
