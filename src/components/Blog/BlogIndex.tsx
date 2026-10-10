import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
  ExternalLink,
  Feather,
  CheckCircle2,
  Lock,
  Mail
} from 'lucide-react';
import { BlogPost } from '../../types';
import { getBlogPosts, BLOG_CATEGORIES } from '../../lib/blogStorage';
import { applyBlogIndexSeo } from '../../lib/seoHelper';
import { addSubscriber } from '../../lib/storage';
import { validateEmail } from '../../lib/validation';

interface BlogIndexProps {
  onBackToSite: () => void;
  onSelectPost: (slug: string) => void;
  onNavigateToFreeGuide: () => void;
}

export const BlogIndex: React.FC<BlogIndexProps> = ({
  onBackToSite,
  onSelectPost,
  onNavigateToFreeGuide,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const loadPosts = () => {
    // Only published posts for the public blog view
    const all = getBlogPosts(false);
    setPosts(all);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadPosts();
    applyBlogIndexSeo();

    const handleUpdate = () => loadPosts();
    window.addEventListener('herhorizon_blog_updated', handleUpdate);
    return () => window.removeEventListener('herhorizon_blog_updated', handleUpdate);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    const emailCheck = validateEmail(newsletterEmail);
    if (!emailCheck.isValid) {
      setNewsletterError(emailCheck.error || 'Please enter a valid personal email.');
      return;
    }
    addSubscriber(newsletterEmail, 'The Rebuild Journal Newsletter');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.subtitle.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id || searchQuery || selectedCategory !== 'All');

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D2A26] font-sans antialiased flex flex-col selection:bg-[#E2B072]/30 selection:text-[#2D2A26]">
      {/* Top Bar */}
      <header className="border-b border-[#EFE5DC] bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center space-x-2 text-xs font-medium text-[#736E67] hover:text-[#BD7469] transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Return to HerHorizon Main System</span>
            <span className="sm:hidden">Main Site</span>
          </button>

          <span className="font-serif italic font-bold text-base sm:text-lg text-[#BD7469] tracking-wider uppercase">
            herhorizon
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateToFreeGuide}
              className="text-xs bg-[#FAF2EB] hover:bg-[#F2E5D8] text-[#BD7469] border border-[#E8DCD5] px-3.5 py-1.5 rounded-full font-semibold transition-colors cursor-pointer"
            >
              Free Reset Guide 🕊️
            </button>
          </div>
        </div>
      </header>

      {/* Hero Journal Banner */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FAF7F2] via-[#FFFDF9] to-[#FFFDF9] border-b border-[#F0E6DD] text-center relative overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E2B072]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#BD7469] bg-[#FAF2EB] border border-[#E8DCD5] px-3.5 py-1.5 rounded-full mb-4 shadow-2xs">
            <Feather className="w-3.5 h-3.5 text-[#E2B072]" />
            <span>Trauma-Informed Recovery Journal</span>
          </div>

          <h1 className="font-serif italic text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] text-[#2D2A26] mb-4 sm:mb-6">
            The Rebuild Journal
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-[#736E67] leading-relaxed max-w-2xl mx-auto mb-8 font-light">
            Field notes for the woman whose body is still bracing for impact. Somatic grounding protocols, vagus nerve science, and quiet guidance to dismantle trauma bonds and return to your own authority.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative mb-6">
            <Search className="w-4 h-4 text-[#8C7A74] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles (e.g., phantom courtroom, vagus nerve)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DECAC0] rounded-full text-xs sm:text-sm text-[#2D2A26] placeholder-[#A0938D] focus:outline-none focus:ring-2 focus:ring-[#E2B072] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C7A74] hover:text-[#2D2A26]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                  selectedCategory === cat
                    ? 'bg-[#BD7469] text-white shadow-xs'
                    : 'bg-white hover:bg-[#FAF4EB] text-[#736E67] border border-[#E8DCD5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Journal Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Featured Story Hero Card (Only shown when not searching and on 'All' category) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <div className="mb-14 bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5ECE3] border-2 border-[#E2B072]/60 rounded-3xl p-6 sm:p-9 shadow-luxe-lg hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image side */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#241C18] border border-[#E2D5CC] shadow-md group">
                  <img
                    src={featuredPost.coverImage || '/cover-free-anchor-card.webp'}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="absolute top-3 left-3 bg-[#2D2A26]/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Featured Reading
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-7 flex flex-col text-left justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-[#8C7A74] mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#BD7469] bg-[#FAF2EB] border border-[#E8DCD5] px-2.5 py-0.5 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#E2B072]" />
                      <span>{featuredPost.readingTimeMinutes} min read</span>
                    </span>
                  </div>

                  <h2
                    onClick={() => onSelectPost(featuredPost.slug)}
                    className="font-serif italic font-normal text-2xl sm:text-3xl lg:text-4xl text-[#2D2A26] hover:text-[#BD7469] transition-colors cursor-pointer leading-[1.2] mb-3"
                  >
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#736E67] leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DCD5] flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 text-xs text-[#8C7A74]">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E2B072] shadow-2xs shrink-0 bg-[#FAF4EB]">
                      <img
                        src="/author-portrait.png"
                        alt={featuredPost.author.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <span>
                      By <strong className="text-[#2D2A26]">{featuredPost.author.name}</strong> •{' '}
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectPost(featuredPost.slug)}
                    className="inline-flex items-center space-x-2 bg-[#BD7469] hover:bg-[#9E4D43] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EFE5DC]">
          <h3 className="font-serif italic text-xl sm:text-2xl text-[#2D2A26]">
            {searchQuery
              ? `Search Results for "${searchQuery}" (${filteredPosts.length})`
              : selectedCategory === 'All'
              ? 'Recent Field Notes & Protocols'
              : `${selectedCategory} Articles (${filteredPosts.length})`}
          </h3>

          <span className="text-xs text-[#8C7A74]">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} available
          </span>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="bg-white border border-[#E8DCD5] rounded-3xl p-12 text-center max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-[#FAF2EB] text-[#BD7469] flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-[#2D2A26] font-bold mb-1">
              No articles found
            </h4>
            <p className="text-xs text-[#736E67] mb-4">
              We couldn't find any articles matching "{searchQuery}". Try selecting another category or resetting the search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs bg-[#BD7469] text-white px-4 py-2 rounded-full font-semibold"
            >
              View All Articles
            </button>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {(searchQuery || selectedCategory !== 'All' ? filteredPosts : regularPosts).map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post.slug)}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8DCD5] overflow-hidden hover:border-[#E2B072] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer text-left"
            >
              {/* Card Cover Thumbnail */}
              {post.coverImage && (
                <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F2] relative">
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt || post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#BD7469] bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#E8DCD5]">
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-[#8C7A74] mb-2.5">
                    <Clock className="w-3 h-3 text-[#E2B072]" />
                    <span>{post.readingTimeMinutes} min read</span>
                    <span>•</span>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <h4 className="font-serif italic font-normal text-lg sm:text-xl text-[#2D2A26] group-hover:text-[#BD7469] transition-colors leading-snug mb-2.5">
                    {post.title}
                  </h4>

                  <p className="text-xs text-[#736E67] leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0ECE4] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-[#8C7A74] font-medium text-[11px]">
                    <div className="w-5 h-5 rounded-full overflow-hidden border border-[#E2B072]/60 shadow-2xs shrink-0 bg-[#FAF4EB]">
                      <img
                        src="/author-portrait.png"
                        alt={post.author.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <span>By {post.author.name}</span>
                  </div>
                  <span className="text-[#BD7469] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Journal In-Page Newsletter Box */}
        <section className="bg-gradient-to-br from-[#FAF8F5] via-[#F5ECE3] to-[#ECE0D6] border-2 border-[#E2B072]/50 rounded-3xl p-6 sm:p-10 text-center shadow-luxe max-w-3xl mx-auto my-12">
          <div className="w-12 h-12 rounded-full bg-white border border-[#E8DCD5] mx-auto flex items-center justify-center text-[#BD7469] mb-3 shadow-2xs">
            <Mail className="w-6 h-6" />
          </div>

          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#BD7469] block mb-1">
            Sunday Quiet Dispatches
          </span>

          <h3 className="font-serif italic text-2xl sm:text-3xl text-[#2D2A26] mb-3">
            Somatic grounding delivered to your inbox.
          </h3>

          <p className="text-xs sm:text-sm text-[#736E67] max-w-lg mx-auto mb-6 leading-relaxed">
            Every Sunday morning, we send one short, deeply practical trauma-informed reflection to reset your nervous system for the week ahead. Zero marketing noise.
          </p>

          {newsletterSuccess ? (
            <div className="bg-white/90 border border-[#E8DCD5] p-4 rounded-2xl max-w-md mx-auto text-xs text-[#4A7C59] flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A7C59]" />
              <span>You are subscribed. Check your inbox this Sunday morning.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#DECAC0] bg-white text-xs sm:text-sm text-[#2D2A26] placeholder-[#8C7A74] focus:outline-none focus:ring-2 focus:ring-[#E2B072]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#2D2A26] hover:bg-[#443E3A] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  Join Quiet Letters
                </button>
              </div>
              {newsletterError && (
                <p className="text-xs text-[#BD7469] mt-2 text-left font-medium">
                  {newsletterError}
                </p>
              )}
              <span className="text-[10px] text-[#8C7A74] block mt-2.5">
                100% Confidential • Instant Unsubscribe Anytime
              </span>
            </form>
          )}
        </section>
      </main>

      {/* Footer Return */}
      <footer className="border-t border-[#EFE5DC] bg-white py-8 text-center text-xs text-[#8C7A74]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToSite}
            className="text-[#736E67] hover:text-[#BD7469] font-medium transition-colors cursor-pointer"
          >
            ← Return to HerHorizon Main System
          </button>

          <span className="text-[11px] text-[#A89891]">
            © {new Date().getFullYear()} HerHorizon • Trauma-Informed Relationship Recovery
          </span>

          <button
            onClick={onNavigateToFreeGuide}
            className="text-[#BD7469] hover:underline font-semibold cursor-pointer"
          >
            Claim Free 72-Hour Reset
          </button>
        </div>
      </footer>
    </div>
  );
};
