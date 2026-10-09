import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I receive the files after ordering?',
      answer:
        'Immediately after your order, you receive instant access via secure download links sent directly to your email, along with immediate access on the thank-you screen. You can download and save the PDF workbooks, GoodNotes files, and printable cards to all your devices with zero waiting.',
    },
    {
      question: 'Can I use this if I am still in the process of leaving or recently broke up?',
      answer:
        'Yes. The system is specifically engineered to be safe, discrete, and trauma-informed. The exercises meet you exactly where your nervous system is, without overwhelming homework or demanding confrontation.',
    },
    {
      question: 'What devices are supported? Can I print it out?',
      answer:
        'The Identity Rebuild System™ is 100% formatted for all major tablets (iPad with Apple Pencil, GoodNotes, Notability, Samsung Notes), smartphones, laptops, and e-readers. We also include a clean, printer-friendly high-contrast A4/US Letter version if you prefer writing by hand with physical pen and paper.',
    },
    {
      question: 'How does the 7-Day Peace of Mind Guarantee work?',
      answer:
        'We believe in gentle, risk-free healing. If you work through the first few days of the roadmap and feel it does not bring calm and clarity to your mind, simply email our private support inbox within 7 days for a 100% quiet refund. No friction, no awkward questions.',
    },
    {
      question: 'Is my transaction private and discreet?',
      answer:
        'Completely. We use 256-bit bank-level SSL encryption. Your billing statement will appear discreetly as “HERHORIZON STORE”, and your email is never shared, marketed to third parties, or published anywhere.',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-[#8A9A86]/15 text-[#5C6E59] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Gentle Questions &amp; Answers</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2A26] font-normal">
            Everything you need to feel at ease
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E8E3DA] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-[#2D2A26]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF9F6] border border-[#DDD8CF] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#8A9A86]/10 text-[#5C6E59]' : 'text-[#8C867E]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-[#5C564F] leading-relaxed border-t border-[#F0ECE4] mt-1 font-light">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
