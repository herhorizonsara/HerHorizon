import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Step1Hero } from './components/CanvaSteps/Step1Hero';
import { Step2FreedomHollow } from './components/CanvaSteps/Step2FreedomHollow';
import { Step3EchoInHead } from './components/CanvaSteps/Step3EchoInHead';
import { Step4Roadmap } from './components/CanvaSteps/Step4Roadmap';
import { Step5SelfTrustAndLoops } from './components/CanvaSteps/Step5SelfTrustAndLoops';
import { Step6DetoxAndBoundaries } from './components/CanvaSteps/Step6DetoxAndBoundaries';
import { Step7Bonuses } from './components/CanvaSteps/Step7Bonuses';
import { Step8Timeline } from './components/CanvaSteps/Step8Timeline';
import { Step9QuestionsAndLetter } from './components/CanvaSteps/Step9QuestionsAndLetter';
import { Step10OfferAndGuarantee } from './components/CanvaSteps/Step10OfferAndGuarantee';
import { GroundingTool } from './components/GroundingTool';
import { Testimonials } from './components/Testimonials';
import { LatestFromJournalSection } from './components/Journal/LatestFromJournalSection';
import { Footer } from './components/Footer';
import { ResetGuideModal } from './components/ResetGuideModal';
import { ImageGuideModal } from './components/ImageGuideModal';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AdminLogin } from './components/Admin/AdminLogin';
import { FreeGuidePage } from './components/FreeGuide/FreeGuidePage';
import { BlogIndex } from './components/Blog/BlogIndex';
import { BlogPostPage } from './components/Blog/BlogPostPage';
import { resetHomeSeo } from './lib/seoHelper';
import { isAdminAuthenticated } from './lib/storage';
import { initTracking, trackGumroadClick } from './lib/tracking';
import { Sparkles, ArrowRight, ShieldCheck, Feather, Heart, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isFreeGuideView, setIsFreeGuideView] = useState(false);
  const [isBlogIndexView, setIsBlogIndexView] = useState(false);
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [imageGuideOpen, setImageGuideOpen] = useState(false);
  const [lastClaimedName, setLastClaimedName] = useState('');
  const [lastClaimedEmail, setLastClaimedEmail] = useState('');
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    initTracking();
    setIsAuthenticated(isAdminAuthenticated());

    // Check if URL has /admin, /free-guide, /blog or /blog/:slug path
    const checkRoute = () => {
      const path = window.location.pathname;
      const lower = path.toLowerCase();
      if (lower === '/admin' || lower.startsWith('/admin/')) {
        setIsAdminView(true);
        setIsFreeGuideView(false);
        setIsBlogIndexView(false);
        setCurrentBlogSlug(null);
      } else if (lower === '/free-guide' || lower.startsWith('/free-guide/')) {
        setIsFreeGuideView(true);
        setIsAdminView(false);
        setIsBlogIndexView(false);
        setCurrentBlogSlug(null);
      } else if (lower.startsWith('/blog/')) {
        const slug = path.split('/')[2];
        if (slug) {
          setCurrentBlogSlug(slug);
          setIsBlogIndexView(false);
          setIsAdminView(false);
          setIsFreeGuideView(false);
        } else {
          setIsBlogIndexView(true);
          setCurrentBlogSlug(null);
          setIsAdminView(false);
          setIsFreeGuideView(false);
        }
      } else if (lower === '/blog' || lower === '/blog/') {
        setIsBlogIndexView(true);
        setCurrentBlogSlug(null);
        setIsAdminView(false);
        setIsFreeGuideView(false);
      } else {
        setIsAdminView(false);
        setIsFreeGuideView(false);
        setIsBlogIndexView(false);
        setCurrentBlogSlug(null);
        resetHomeSeo();
      }
    };
    checkRoute();
    window.addEventListener('popstate', checkRoute);

    // Sticky bar scroll listener
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackToSite = () => {
    setIsAdminView(false);
    setIsFreeGuideView(false);
    setIsBlogIndexView(false);
    setCurrentBlogSlug(null);
    resetHomeSeo();
    const path = window.location.pathname.toLowerCase();
    if (path !== '/' && path !== '') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleOpenBlog = () => {
    setIsBlogIndexView(true);
    setCurrentBlogSlug(null);
    setIsAdminView(false);
    setIsFreeGuideView(false);
    window.history.pushState({}, '', '/blog');
  };

  const handleOpenBlogPost = (slug: string) => {
    setCurrentBlogSlug(slug);
    setIsBlogIndexView(false);
    setIsAdminView(false);
    setIsFreeGuideView(false);
    window.history.pushState({}, '', `/blog/${slug}`);
  };

  const handleOpenFreeGuide = () => {
    setIsFreeGuideView(true);
    setIsAdminView(false);
    setIsBlogIndexView(false);
    setCurrentBlogSlug(null);
    window.history.pushState({}, '', '/free-guide');
  };

  const scrollToCheckout = () => {
    const el = document.getElementById('step-10');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If viewing specific single blog post
  if (currentBlogSlug) {
    return (
      <BlogPostPage
        slug={currentBlogSlug}
        onBackToBlog={handleOpenBlog}
        onSelectPost={handleOpenBlogPost}
        onNavigateToFreeGuide={handleOpenFreeGuide}
        onNavigateToSystem={() => {
          handleBackToSite();
          setTimeout(scrollToCheckout, 100);
        }}
      />
    );
  }

  // If on /blog listing page
  if (isBlogIndexView) {
    return (
      <BlogIndex
        onBackToSite={handleBackToSite}
        onSelectPost={handleOpenBlogPost}
        onNavigateToFreeGuide={handleOpenFreeGuide}
      />
    );
  }

  // If on /free-guide dedicated page
  if (isFreeGuideView) {
    return <FreeGuidePage onBackToSite={handleBackToSite} />;
  }

  // If in admin mode
  if (isAdminView) {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAuthenticated(true)}
          onBackToSite={handleBackToSite}
        />
      );
    }
    return (
      <AdminDashboard
        onBackToSite={handleBackToSite}
        onViewLiveArticle={handleOpenBlogPost}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D2A26] font-sans antialiased flex flex-col selection:bg-[#E2B072]/30 selection:text-[#2D2A26]">
      
      {/* Navigation with integrated top announcement bar */}
      <Navbar
        onOpenImageGuide={() => setImageGuideOpen(true)}
        onOpenBlog={handleOpenBlog}
        onOpenAdmin={() => {
          setIsAdminView(true);
          window.history.pushState({}, '', '/admin');
        }}
      />

      {/* PAGE 1: THE FRONT-END LANDING PAGE (User Facing - 10 Canva Steps in Sequence) */}
      <main className="flex-1 pb-20 sm:pb-12">
        
        {/* Step 1: The Hero & Restoration System */}
        <Step1Hero
          onScrollToCheckout={scrollToCheckout}
          onOpenResetGuideModal={(name, email) => {
            if (name) setLastClaimedName(name);
            if (email) setLastClaimedEmail(email);
            setResetModalOpen(true);
          }}
        />

        {/* Step 2: The Hollow Freedom & Identity Collapse */}
        <Step2FreedomHollow />

        {/* Step 3: The Awakening Vision */}
        <Step3EchoInHead onScrollToCheckout={scrollToCheckout} />

        {/* Interactive Somatic Grounding Sanctuary Tool */}
        <section className="py-12 px-5 bg-[#FAF6F2] border-t border-[#EFE5DC]">
          <div className="max-w-4xl mx-auto">
            <GroundingTool />
          </div>
        </section>

        {/* Step 4: The Core System Roadmap (77 Pages | 30-Day Journey) */}
        <Step4Roadmap />

        {/* Step 5: Pillars 02 & 03 — Self-Trust Reset & Mental Loop Release */}
        <Step5SelfTrustAndLoops />

        {/* Step 6: Pillars 04 & 05 — Trauma Bond Detox & Boundary Scripts */}
        <Step6DetoxAndBoundaries />

        {/* Step 7: 3 Exclusive Bonuses */}
        <Step7Bonuses onScrollToCheckout={scrollToCheckout} />

        {/* Step 8: The 30-Day Homecoming Timeline */}
        <Step8Timeline onScrollToCheckout={scrollToCheckout} />

        {/* Authentic Field Notes & Real Stories */}
        <Testimonials />

        {/* The Sunday Soul Notes: Latest from the Journal (3-Column Editorial Magazine Grid) */}
        <LatestFromJournalSection
          onSelectPost={handleOpenBlogPost}
          onOpenBlog={handleOpenBlog}
        />

        {/* Step 9: FAQ (Accordion Style with Clinical Search Queries) & The Homecoming Invitation */}
        <Step9QuestionsAndLetter />

        {/* Step 10: The Offer, Value Breakdown & 100% Guarantee */}
        <Step10OfferAndGuarantee />

      </main>

      {/* Footer */}
      <Footer
        onOpenBlog={handleOpenBlog}
        onOpenAdmin={() => {
          setIsAdminView(true);
          window.history.pushState({}, '', '/admin');
        }}
      />

      {/* Interactive 72-Hour Reset Guide & Anchor Card Modal */}
      <ResetGuideModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        subscriberName={lastClaimedName}
        subscriberEmail={lastClaimedEmail}
      />

      {/* Canva Image Assets Directory & Instructions Modal */}
      <ImageGuideModal
        isOpen={imageGuideOpen}
        onClose={() => setImageGuideOpen(false)}
      />

      {/* Mobile / Desktop Sticky High-Converting Bottom Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#E8DCD5] pt-2 sm:pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] px-3 sm:px-4 shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-2.5">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-[#2D2A26]">
              <span className="font-serif font-bold text-[#BD7469]">HerHorizon™</span>
              <span className="text-[#8C7A74]">•</span>
              <span className="text-[#5C524F]">Identity Restoration System</span>
              <span className="line-through text-[#8C7A74] text-[11px]">$27</span>
              <span className="font-bold text-[#BD7469]">$13 Today (50% Off)</span>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
              <button
                onClick={() => {
                  const el = document.getElementById('step-1');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[11px] sm:text-xs text-[#8C7A74] hover:text-[#BD7469] active:text-[#BD7469] font-medium px-2.5 py-2.5 shrink-0 rounded-lg hover:bg-[#FAF6F2] transition-colors active:scale-95"
              >
                Free Reset 🕊️
              </button>

              <a
                href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGumroadClick()}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 bg-[#BD7469] hover:bg-[#A8584D] active:bg-[#97463C] text-white text-[11px] xs:text-xs font-semibold px-3.5 sm:px-5 py-2.5 rounded-full shadow-md transition-all shrink-0 active:scale-[0.98] min-h-[44px] btn-shimmer-container animate-breathe group"
              >
                <span className="btn-shimmer-sweep" />
                <span>Get System — $13 (50% Off)</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
