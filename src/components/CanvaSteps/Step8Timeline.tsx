import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Step8TimelineProps {
  onScrollToCheckout: () => void;
}

export const Step8Timeline: React.FC<Step8TimelineProps> = ({ onScrollToCheckout }) => {
  const steps = [
    {
      label: 'BY DAY 3:',
      color: 'bg-[#E5975A]',
      cardBg: 'bg-[#FAF1E9] border-[#ECD8C7]',
      textColor: 'text-[#4A3E38]',
      description:
        'The mental loops begin to quiet. You use the "Ice Trick" and the 2 a.m. Card to stop the initial fire of panic.',
    },
    {
      label: 'BY WEEK 1:',
      color: 'bg-[#E39E92]',
      cardBg: 'bg-[#FAF0ED] border-[#ECCDC6]',
      textColor: 'text-[#4A3E38]',
      description:
        'The "Decision Fog" lifts. You start making small choices for yourself—like making your tea exactly how you like it.',
    },
    {
      label: 'BY WEEK 3:',
      color: 'bg-[#BD7469]',
      cardBg: 'bg-[#F9EDEA] border-[#E5C4BE]',
      textColor: 'text-[#4A3E38]',
      description:
        'The biochemical "pull" of the trauma bond starts to cool. You see him for the "Source" he was, not the "Soulmate" you wanted.',
    },
    {
      label: 'BY DAY 30:',
      color: 'bg-[#C59B63]',
      cardBg: 'bg-[#F9F4EB] border-[#EADFCB]',
      textColor: 'text-[#4A3E38]',
      description:
        'You stop being a guest in your own life. You recognize the woman in the mirror. You are finally home.',
    },
  ];

  return (
    <section id="step-8" className="py-14 sm:py-20 md:py-28 bg-[#FAF6F2] border-t border-[#EFE5DC] text-[#2D2A26] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Bonus Bullets from Canva 8.jpg top */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-16 space-y-2.5 text-sm sm:text-base text-[#BD7469]">
          <div className="flex items-start space-x-3 bg-white/90 p-3.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
            <p>
              <strong className="text-[#3D3532]">Bonus 1:</strong> The &ldquo;First Date&rdquo; Red Flag Decoder (Safe connections).
            </p>
          </div>

          <div className="flex items-start space-x-3 bg-white/90 p-3.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
            <p>
              <strong className="text-[#3D3532]">Bonus 2:</strong> The Home Reclamation Blueprint (Reclaiming your space).
            </p>
          </div>

          <div className="flex items-start space-x-3 bg-white/90 p-3.5 rounded-xl sm:rounded-2xl border border-[#EDE2DA] shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BD7469] shrink-0 mt-1.5" />
            <p>
              <strong className="text-[#3D3532]">Bonus 3:</strong> The &ldquo;Solo Saturday&rdquo; Joy Bank (50 ways to date yourself).
            </p>
          </div>
        </div>

        {/* Canva Headline: "What happens when you follow this path?" */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="font-serif italic text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-[#D4A373] px-1">
            What happens when you <br className="hidden sm:inline" />
            <span className="text-[#C59B63]">follow this path?</span>
          </h2>
        </div>

        {/* The 4-Stage Horizontal Timeline Graphic from Canva */}
        <div className="relative my-6 sm:my-10">
          
          {/* Horizontal Connecting Line (visible on desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-1 bg-[#E8A598]/60 z-0" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {steps.map((st, idx) => (
              <div key={idx} className="flex flex-col text-left sm:text-center bg-white sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none border sm:border-0 border-[#EDE2DA] shadow-xs sm:shadow-none">
                
                {/* Milestone Pill Label */}
                <div
                  className={`w-fit sm:w-full py-1.5 sm:py-2 px-3 rounded-lg text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-xs mb-2.5 sm:mb-3 ${st.color}`}
                >
                  {st.label}
                </div>

                {/* Pin Point Node on Line */}
                <div className="hidden md:flex w-5 h-5 rounded-full bg-white border-4 border-[#E8A598] mb-4 shadow-xs mx-auto" />

                {/* Milestone Detail Card */}
                <div
                  className={`w-full p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm leading-relaxed shadow-xs flex-1 flex items-center justify-center ${st.cardBg} ${st.textColor}`}
                >
                  <p>{st.description}</p>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Canva Button: "GET THE SYSTEM NOW" (Warm Honey Gold) */}
        <div className="text-center mt-10 sm:mt-14 px-1">
          <button
            onClick={onScrollToCheckout}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#E2B072] hover:bg-[#D4A373] active:bg-[#C59B63] text-white font-medium text-xs xs:text-sm sm:text-base tracking-wide px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer uppercase font-sans min-h-[48px] btn-shimmer-container animate-breathe-subtle group"
          >
            <span className="btn-shimmer-sweep" />
            <span>GET THE SYSTEM NOW</span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
