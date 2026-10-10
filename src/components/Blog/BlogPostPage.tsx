import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Heart,
  Bookmark,
  Check,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Download,
  MessageCircle,
  Copy
} from 'lucide-react';
import { BlogPost } from '../../types';
import { getBlogPostBySlug, getBlogPosts, togglePostLike, incrementPostViews } from '../../lib/blogStorage';
import { applyBlogPostSeo, resetHomeSeo } from '../../lib/seoHelper';
import { BlogArticleRenderer } from './BlogArticleRenderer';

interface BlogPostPageProps {
  slug: string;
  onBackToBlog: () => void;
  onSelectPost: (slug: string) => void;
  onNavigateToFreeGuide: () => void;
  onNavigateToSystem: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  slug,
  onBackToBlog,
  onSelectPost,
  onNavigateToFreeGuide,
  onNavigateToSystem,
}) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const found = getBlogPostBySlug(slug);
    if (found) {
      setPost(found);
      setLikes(found.likes || 0);
      applyBlogPostSeo(found);
      incrementPostViews(found.id);
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setReadProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-2xl text-[#2D2A26] mb-3">Article Not Found</h1>
        <p className="text-sm text-[#736E67] max-w-md mb-6">
          This article might have been relocated or updated. Return to our journal library to continue reading.
        </p>
        <button
          onClick={onBackToBlog}
          className="inline-flex items-center space-x-2 bg-[#BD7469] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#9E4D43] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal Library</span>
        </button>
      </div>
    );
  }

  const allPosts = getBlogPosts(false);
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  const handleShareX = () => {
    const text = encodeURIComponent(`"${post.title}" via HerHorizon:`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`I found this healing article helpful: "${post.title}" - ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleLike = () => {
    if (hasLiked) return;
    const newCount = togglePostLike(post.id);
    setLikes(newCount);
    setHasLiked(true);
  };

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    setReflectionSubmitted(true);
    setReflectionText('');
  };

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D2A26] font-sans antialiased flex flex-col selection:bg-[#E2B072]/30 selection:text-[#2D2A26]">
      {/* Top Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#EFE5DC]">
        <div
          className="h-full bg-gradient-to-r from-[#BD7469] to-[#E2B072] transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      <header className="border-b border-[#EFE5DC] bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToBlog}
            className="inline-flex items-center space-x-2 text-xs font-medium text-[#736E67] hover:text-[#BD7469] transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">The Rebuild Journal</span>
            <span className="sm:hidden">All Posts</span>
          </button>

          <span className="font-serif italic font-bold text-sm sm:text-base text-[#BD7469] tracking-wider uppercase">
            herhorizon
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center space-x-1 text-xs text-[#736E67] hover:text-[#2D2A26] bg-[#FAF6F2] border border-[#E8DCD5] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              title="Copy share link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#4A7C59]" />
                  <span className="text-[#4A7C59] font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
            <button
              onClick={onNavigateToFreeGuide}
              className="text-xs bg-[#BD7469] hover:bg-[#9E4D43] text-white px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer"
            >
              Free Reset
            </button>
          </div>
        </div>
      </header>

      {/* Main Reading Container */}
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#8C7A74] mb-6">
          <button onClick={onBackToBlog} className="hover:text-[#BD7469] transition-colors cursor-pointer">
            Journal
          </button>
          <ChevronRight className="w-3 h-3 text-[#DECAC0]" />
          <span className="text-[#BD7469] font-medium">{post.category}</span>
        </nav>

        {/* Category Pill */}
        <div className="mb-4">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#BD7469] bg-[#FAF2EB] border border-[#E8DCD5] px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Article Headline */}
        <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.2] text-[#2D2A26] mb-4">
          {post.title}
        </h1>

        {/* Subtitle / Excerpt */}
        {post.subtitle && (
          <p className="font-serif text-lg sm:text-xl text-[#736E67] leading-relaxed mb-8 font-light italic">
            {post.subtitle}
          </p>
        )}

        {/* Author Byline & Read Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#EFE5DC] mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E2B072] shadow-xs bg-[#FAF6F2] shrink-0">
              <img
                src={post.author.avatar || '/author-portrait.png'}
                alt={post.author.name || 'Sara Mitchell'}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('images')) {
                    target.src = '/images/author-portrait.png';
                  }
                }}
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#2D2A26]">
                {post.author.name || 'Sara Mitchell'}
              </div>
              <div className="text-xs text-[#8C7A74]">
                {post.author.role || 'Founder & Trauma-Informed Guide'}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-[#8C7A74]">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#BD7469]" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E2B072]" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DCD5] shadow-lg bg-[#FAF7F2]">
            <picture>
              <img
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                className="w-full h-auto max-h-[520px] object-cover"
                loading="eager"
              />
            </picture>
            {post.coverImageAlt && (
              <p className="text-center text-xs text-[#8C7A74] py-2 bg-white/80 border-t border-[#EFE5DC] italic font-light">
                {post.coverImageAlt}
              </p>
            )}
          </div>
        )}

        {/* Full Article Content */}
        <div className="pb-12 border-b border-[#EFE5DC]">
          <BlogArticleRenderer
            content={post.content}
            onNavigateToFreeGuide={onNavigateToFreeGuide}
            onNavigateToSystem={onNavigateToSystem}
          />
        </div>

        {/* Reader Resonance Bar */}
        <div className="py-8 border-b border-[#EFE5DC] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleLike}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                hasLiked
                  ? 'bg-[#BD7469] text-white shadow-sm'
                  : 'bg-[#FAF6F2] hover:bg-[#F4EDE5] text-[#736E67] border border-[#E8DCD5]'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : ''}`} />
              <span>Resonated ({likes})</span>
            </button>

            <span className="text-xs text-[#8C7A74] italic">
              {hasLiked ? 'Thank you for your quiet resonance.' : 'Did this validate your experience?'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShareX}
              className="text-xs bg-[#FAF6F2] hover:bg-[#F4EDE5] text-[#736E67] border border-[#E8DCD5] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              Share on X
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="text-xs bg-[#FAF6F2] hover:bg-[#F4EDE5] text-[#736E67] border border-[#E8DCD5] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="text-xs bg-[#FAF6F2] hover:bg-[#F4EDE5] text-[#736E67] border border-[#E8DCD5] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              {copiedLink ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Direct In-Article Callout Card: Free 72-Hour Reset */}
        <section className="my-10 bg-gradient-to-br from-[#FAF8F5] via-[#F5ECE3] to-[#EFE1D5] border-2 border-[#E2B072]/60 rounded-3xl p-6 sm:p-8 text-left shadow-luxe-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#BD7469]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#BD7469] mb-3">
            <Sparkles className="w-4 h-4 text-[#E2B072]" />
            <span>Complimentary Pocket Companion</span>
          </div>

          <h3 className="font-serif italic text-2xl sm:text-3xl text-[#2D2A26] font-normal leading-snug mb-3">
            Halt the 2 A.M. mental loops tonight.
          </h3>

          <p className="text-sm text-[#736E67] leading-relaxed mb-6 max-w-xl">
            Download the free <strong>72-Hour Nervous System Reset Guide</strong> and high-contrast <strong>2 A.M. Emergency Anchor Card</strong> to dismiss phantom courtroom debates in under 90 seconds.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToFreeGuide}
              className="inline-flex items-center space-x-2 bg-[#BD7469] hover:bg-[#9E4D43] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Claim Free 72-Hour Reset (Zero Cost)</span>
            </button>

            <button
              onClick={onNavigateToSystem}
              className="text-xs text-[#736E67] hover:text-[#BD7469] font-medium underline underline-offset-4 transition-colors cursor-pointer py-1"
            >
              Explore Complete 30-Day System ($13)
            </button>
          </div>
        </section>

        {/* Reader Reflection Note Form */}
        <div className="my-10 bg-white border border-[#E8DCD5] rounded-2xl p-6 sm:p-8 text-left shadow-xs">
          <div className="flex items-center space-x-2 mb-2">
            <MessageCircle className="w-4 h-4 text-[#BD7469]" />
            <h4 className="font-serif italic text-lg text-[#2D2A26] font-bold">
              Quiet Reader Reflections
            </h4>
          </div>
          <p className="text-xs text-[#8C7A74] mb-4">
            Share a reflection or somatic realization from this article. All notes remain private and grounded.
          </p>

          {reflectionSubmitted ? (
            <div className="p-4 bg-[#FAF6F2] border border-[#E8DCD5] rounded-xl text-xs text-[#4A7C59] flex items-center space-x-2">
              <Check className="w-4 h-4" />
              <span>Your reflection has been quietly received. May tonight bring your nervous system deep peace.</span>
            </div>
          ) : (
            <form onSubmit={handleReflectionSubmit} className="space-y-3">
              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="What shifted in your body while reading this article?..."
                rows={3}
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#DECAC0] bg-[#FFFDF9] focus:outline-none focus:ring-2 focus:ring-[#E2B072] text-[#2D2A26] resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!reflectionText.trim()}
                  className="bg-[#2D2A26] hover:bg-[#443E3A] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Leave Quiet Reflection
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Author Persona Trust Card: "It Is Time To Come Home To Yourself" */}
        <section className="my-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#BD7469] to-[#A3594F] border-2 border-[#E2B072] text-white text-left shadow-luxe-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Sara's Portrait Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-[#E2B072] shadow-md bg-[#FAF6F2] shrink-0">
              <img
                src="/author-portrait.png"
                alt="Sara Mitchell - Founder of HerHorizon"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('images')) {
                    target.src = '/images/author-portrait.png';
                  }
                }}
              />
            </div>

            <div className="space-y-2 flex-1 text-center sm:text-left">
              <div className="inline-block text-[10px] tracking-widest uppercase font-bold text-[#E2B072] bg-black/20 px-2.5 py-0.5 rounded-full">
                FOUNDER &amp; TRAUMA-INFORMED GUIDE
              </div>
              <h4 className="font-serif italic font-bold text-xl sm:text-2xl text-white">
                Sara Mitchell
              </h4>
              <p className="font-sans text-xs sm:text-sm text-white/95 leading-relaxed">
                You have spent years being a support character in someone else’s chaos. Today, you get to be the lead character in your own life again. I created HerHorizon for women in the messy middle who are ready to dismiss the phantom courtroom and safely come home to themselves.
              </p>
              <div className="pt-2 font-serif italic text-sm text-[#FFE8D1]">
                &ldquo;Stop being a guest in your own life. Let&rsquo;s get you back.&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles Strip */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#EFE5DC]">
            <h3 className="font-serif italic text-xl text-[#2D2A26] mb-6">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectPost(rel.slug)}
                  className="bg-white border border-[#E8DCD5] rounded-2xl p-5 hover:border-[#E2B072] hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#BD7469] bg-[#FAF2EB] px-2.5 py-0.5 rounded-full inline-block mb-2.5">
                      {rel.category}
                    </span>
                    <h4 className="font-serif italic font-bold text-base text-[#2D2A26] group-hover:text-[#BD7469] transition-colors leading-snug mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#736E67] line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F2ECE4] flex items-center justify-between text-[11px] text-[#8C7A74]">
                    <span>{rel.readingTimeMinutes} min read</span>
                    <span className="text-[#BD7469] font-medium flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Story</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer Return */}
      <footer className="border-t border-[#EFE5DC] bg-[#FAF8F5] py-8 text-center text-xs text-[#8C7A74]">
        <button
          onClick={onBackToBlog}
          className="text-[#BD7469] hover:underline font-medium cursor-pointer"
        >
          ← Return to The Rebuild Journal Index
        </button>
      </footer>
    </div>
  );
};
