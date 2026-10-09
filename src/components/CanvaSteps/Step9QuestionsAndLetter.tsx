import React, { useState } from 'react';
import { HelpCircle, Heart, Quote, Feather } from 'lucide-react';

export const Step9QuestionsAndLetter: React.FC = () => {
  const [authorImgError, setAuthorImgError] = useState(false);
  const authorImgSrcs = ['/author-portrait.png', '/images/author-portrait.png', '/sara-mitchell.png', '/images/sara-mitchell.png', '/author.png', '/author.jpg'];
  const [authorImgIdx, setAuthorImgIdx] = useState(0);

  const faqs = [
    {
      label: 'QUESTION 01',
      question: '"I’m exhausted. Will this take hours?"',
      answer:
        'No. I designed this for women in the "messy middle." You only need 10 minutes a day. It’s built to give you energy, not take it.',
    },
    {
      label: 'QUESTION 02',
      question: '"Is this just another journal?"',
      answer:
        'No. It is a guided reconstruction system. It combines somatic (body) tools, psychological reframes, and actual scripts for real-life conversations.',
    },
    {
      label: 'QUESTION 03',
      question: '"What if I’m still in the relationship?"',
      answer:
        'That is okay. This system helps you build the internal foundation of self-trust so you can find the clarity and strength you need for your safety.',
    },
  ];

  return (
    <section id="step-9" className="py-14 sm:py-20 md:py-28 bg-[#FFFDF9] border-t border-[#EFE5DC] text-[#2D2A26] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Canva Headline: "YOU HAVE QUESTIONS. I HAVE ANSWERS." */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif italic font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#D4A373] tracking-wide leading-tight uppercase px-1">
            YOU HAVE QUESTIONS. <br />
            I HAVE ANSWERS.
          </h2>
        </div>

        {/* Canva 3 FAQ Cards */}
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 mb-14 sm:mb-20">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-[#D8A79F] rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row"
            >
              {/* Left Vertical Orange/Tan Tab */}
              <div className="bg-[#E5975A] text-white font-bold text-[10px] sm:text-[11px] tracking-wider uppercase px-4 py-2 sm:py-6 flex items-center justify-center shrink-0 sm:[writing-mode:vertical-rl] sm:rotate-180">
                <span>{faq.label}</span>
              </div>

              {/* Right Content */}
              <div className="p-4 sm:p-6 space-y-2 flex-1 text-left">
                <h4 className="font-serif italic font-semibold text-base sm:text-lg text-[#BD7469]">
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-[#BD7469] leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Canva Headline: "IT IS TIME TO COME HOME TO YOURSELF." */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h3 className="font-serif italic font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#D4A373] tracking-wide leading-tight uppercase px-1">
            IT IS TIME TO COME <br />
            HOME TO YOURSELF.
          </h3>
        </div>

        {/* Canva Quote Card with Author Portrait */}
        <div className="max-w-2xl mx-auto p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#BD7469] border-3 sm:border-4 border-[#E2B072] text-white text-center shadow-luxe-lg relative overflow-hidden">
          
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
                  <span className="text-[8px] font-bold tracking-wider uppercase text-[#8C7A74] mt-0.5">Sara M.</span>
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
