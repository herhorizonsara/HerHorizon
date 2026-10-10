import React from 'react';
import { Clock, ArrowRight, BookOpen, Feather, Sparkles } from 'lucide-react';

interface JournalSectionProps {
  onSelectPost: (slug: string) => void;
  onOpenBlog: () => void;
}

interface EditorialCardData {
  slug: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  tagline: string;
}

const EDITORIAL_POSTS: EditorialCardData[] = [
  {
    slug: 'why-healthy-love-feels-boring',
    category: 'Nervous System & Attachment',
    readTime: '5 min read',
    date: 'Sunday Soul Notes • Issue 14',
    title: 'Why Healthy Love Feels Boring',
    tagline: 'The Neurochemistry of the Dopamine Crash',
    excerpt:
      'When your nervous system has been conditioned on adrenaline spikes and unpredictable volatility, emotional consistency feels like withdrawal. Here is why peace initially feels flat—and how to recalibrate your dopamine baseline for safe intimacy.',
    image: '/cover-selftrust.webp',
    imageAlt: 'HerHorizon Journal: Why Healthy Love Feels Boring and Nervous System Recalibration',
  },
  {
    slug: '90-second-vagus-nerve-reset',
    category: 'Somatic Protocols',
    readTime: '4 min read',
    date: 'Sunday Soul Notes • Field Protocol',
    title: 'The 90-Second Vagus Nerve Reset',
    tagline: 'Halting Acute 2 A.M. Trauma Loops',
    excerpt:
      'You cannot whisper positive affirmations to a brainstem that believes it is under active predator attack. Discover the temperature-based mammalian dive reflex technique that halts acute adrenaline spikes and closes the midnight courtroom in under two minutes.',
    image: '/cover-free-anchor-card.webp',
    imageAlt: 'HerHorizon Journal: The 90-Second Vagus Nerve Reset Somatic Anchor',
  },
  {
    slug: 'are-you-a-people-pleaser-or-just-fawning',
    category: 'Clinical Trauma Defense',
    readTime: '6 min read',
    date: 'Sunday Soul Notes • Issue 12',
    title: 'Are You A People Pleaser or Just Fawning?',
    tagline: 'The Unrecognized Fourth Survival Defense',
    excerpt:
      'People-pleasing is often treated as a character flaw or politeness. Fawning is an autonomic survival adaptation designed to disarm relational danger before it strikes. How to recognize the difference in your body and begin setting boundaries without existential panic.',
    image: '/cover-traumabond.webp',
    imageAlt: 'HerHorizon Journal: Fawning Trauma Response and Somatic Boundary Reconstruction',
  },
];

export const LatestFromJournalSection: React.FC<JournalSectionProps> = ({
  onSelectPost,
  onOpenBlog,
}) => {
  return (
    <section
      id="latest-from-journal"
      aria-labelledby="journal-heading"
      className="py-16 sm:py-24 md:py-28 bg-[#FAF6F2] border-t border-[#EFE5DC] text-[#2D2A26] relative overflow-hidden"
    >
      {/* Subtle organic ambient highlights in luxe-zen sage and terracotta */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#82927C]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#BD7469]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/90 border border-[#82927C]/30 text-[#4E6649] px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-4 shadow-2xs">
            <Feather className="w-3.5 h-3.5 text-[#6D7D67]" />
            <span>Sunday Soul Notes • Editorial Field Notes</span>
          </div>

          <h2
            id="journal-heading"
            className="font-serif italic font-normal text-3xl xs:text-4xl sm:text-5xl text-[#2D2A26] tracking-tight leading-[1.2] mb-4"
          >
            Latest from the Journal
          </h2>

          <p className="font-sans text-sm sm:text-base md:text-lg text-[#6B5E59] font-normal leading-relaxed max-w-2xl mx-auto">
            Trauma-informed perspectives, somatic nervous system protocols, and clinical reframes to stop the 2 a.m. mental loops and rebuild self-trust after emotional abuse.
          </p>
        </header>

        {/* 3-Column Magazine Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {EDITORIAL_POSTS.map((post) => (
            <article
              key={post.slug}
              onClick={() => onSelectPost(post.slug)}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E8DCD5] hover:border-[#BD7469]/50 shadow-sm hover:shadow-luxe-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
            >
              {/* Magazine Cover Thumbnail */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-[#F5EBE1] border-b border-[#EFE5DC]">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Sage Green Category Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center bg-[#FFFDF9]/95 backdrop-blur-xs border border-[#82927C]/30 text-[#4E6649] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-2xs">
                    {post.category}
                  </span>
                </div>

                {/* Reading Time Pill */}
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="inline-flex items-center space-x-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3 text-[#E2B072]" />
                    <span>{post.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Editorial Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="text-[11px] font-medium tracking-wide uppercase text-[#8C7A74]">
                    {post.date}
                  </div>

                  <h3 className="font-serif italic text-xl sm:text-2xl text-[#2D2A26] font-semibold leading-snug group-hover:text-[#BD7469] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs font-semibold text-[#8C7A74] tracking-wide uppercase">
                    {post.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#5C524F] leading-relaxed line-clamp-3 font-normal">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Footer: Author + Subtle Read More CTA */}
                <div className="pt-4 border-t border-[#F0E6DE] flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#E2B072] shrink-0 bg-[#FAF6F2]">
                      <img
                        src="/author-portrait.png"
                        alt="Sara Mitchell"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <span className="text-[11px] text-[#736E67] font-medium">Sara Mitchell</span>
                  </div>

                  {/* Subtle "Read More" button */}
                  <span className="inline-flex items-center space-x-1 text-xs font-semibold text-[#BD7469] group-hover:text-[#A8584D] transition-colors">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Section Footer: Editorial Navigation Link */}
        <div className="mt-12 sm:mt-16 text-center pt-8 border-t border-[#E8DCD5]/70 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-xs sm:text-sm text-[#736E67] font-normal">
            Deepen your practice with clinical essays, boundary scripts, and grounding transcripts.
          </p>

          <button
            onClick={onOpenBlog}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-[#BD7469] hover:text-[#A8584D] bg-white border border-[#D8A79F] hover:border-[#BD7469] px-5 py-2.5 rounded-full transition-all shadow-2xs hover:shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-[#BD7469]" />
            <span>Browse All Journal Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
