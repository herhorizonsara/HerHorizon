import React from 'react';
import { Star, Quote, Heart, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote:
        '“For two years after leaving, I couldn’t order coffee without feeling like I was making a catastrophic mistake. The 30-Day Roadmap broke that spell in less than a week.”',
      author: 'Claire M.',
      role: 'Creative Director',
      timeframe: '6 months post-breakup',
      tag: 'Self-Trust Restored',
    },
    {
      quote:
        '“The 25 Boundary Scripts saved my sanity when my ex started texting through mutual friends. I didn’t cry, I didn’t get angry. I just sent Script #4 and closed my laptop.”',
      author: 'Julianne K.',
      role: 'Interior Designer',
      timeframe: '1 year post-divorce',
      tag: 'Unshakeable Boundaries',
    },
    {
      quote:
        '“The Mental Loop Release Journal stopped my 3 A.M. imaginary court trials. I finally sleep through the night without replaying past conversations in my head.”',
      author: 'Elena R.',
      role: 'Architect',
      timeframe: '3 months in the system',
      tag: 'Peaceful Sleep',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-[#EAE5DC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center space-x-1 text-[#C05746] mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl text-[#2D2A26] font-normal px-2">
            Voices from the Other Side of Identity Collapse
          </h3>
          <p className="text-xs sm:text-sm text-[#736E67] mt-2 font-light px-2">
            Real field notes and reflections from women reclaiming their sovereignty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8E3DA] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-luxe flex flex-col justify-between"
            >
              <div>
                <Quote className="w-7 h-7 text-[#E3A88D] mb-3 opacity-60" />
                <p className="font-serif text-sm sm:text-base text-[#3A3632] leading-relaxed italic mb-6">
                  {rev.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE4] flex items-center justify-between">
                <div>
                  <strong className="font-sans text-xs font-semibold text-[#2D2A26] block">
                    {rev.author}
                  </strong>
                  <span className="text-[11px] text-[#8C867E] block">
                    {rev.role} • {rev.timeframe}
                  </span>
                </div>
                <span className="text-[10px] bg-[#8A9A86]/15 text-[#5C6E59] font-medium px-2 py-0.5 rounded-full border border-[#8A9A86]/30">
                  {rev.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
