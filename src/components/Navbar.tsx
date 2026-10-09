import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, Feather, ArrowUpRight, Menu, X, Image as ImageIcon } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenAdmin?: () => void;
  onOpenImageGuide?: () => void;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Banner Notice - Cleanly attached at the very top */}
      <div className="bg-[#2D2A26] text-[#FAF9F6] text-[10.5px] sm:text-xs py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex items-center justify-center space-x-1.5 sm:space-x-2 border-b border-[#3E3A36]">
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E2B072] shrink-0" />
        <span className="hidden sm:inline">Complimentary 72-Hour Reset &amp; 2 A.M. Answer Guide • $13 Launch Special (50% Off Code: REBUILD50)</span>
        <span className="sm:hidden">Free 72h Reset Guide • $13 Launch Special (50% Off: REBUILD50)</span>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E4DC] py-3 shadow-sm'
            : 'bg-[#FAF9F6]/90 backdrop-blur-sm border-b border-[#EDE8E0] py-3.5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex items-center focus:outline-none shrink-0 mr-4 lg:mr-8"
          >
            <BrandLogo
              theme="light"
              iconSize="h-7 sm:h-8 w-auto"
              textClass="text-[13px] sm:text-sm tracking-[0.10em] font-semibold text-[#2D2A26]"
              subtextClass="text-[7.5px] sm:text-[8px] tracking-[0.14em] text-[#D4A373]"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-6 text-xs tracking-wider uppercase text-[#635E59] font-medium">
            <button
              onClick={() => scrollTo('step-1')}
              className="hover:text-[#BD7469] transition-colors cursor-pointer"
            >
              The System
            </button>
            <button
              onClick={() => scrollTo('step-4')}
              className="hover:text-[#BD7469] transition-colors cursor-pointer"
            >
              Roadmap
            </button>
            <button
              onClick={() => scrollTo('step-7')}
              className="hover:text-[#BD7469] transition-colors cursor-pointer"
            >
              Bonuses
            </button>
            <button
              onClick={() => scrollTo('step-8')}
              className="hover:text-[#BD7469] transition-colors cursor-pointer"
            >
              Timeline
            </button>
            <a
              href="/free-guide"
              className="hover:text-[#BD7469] transition-colors cursor-pointer text-[#736E67] font-medium"
            >
              Free Reset 🕊️
            </a>
            <button
              onClick={() => scrollTo('step-10')}
              className="hover:text-[#BD7469] transition-colors cursor-pointer text-[#BD7469] font-bold"
            >
              $13 Today (Offer)
            </button>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-[#BD7469] hover:bg-[#A8584D] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <span>Get System ($13 with 50% Off)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#2D2A26] hover:text-[#BD7469] active:text-[#BD7469] rounded-lg active:bg-[#FAF3ED] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-[#E8E4DC] px-5 py-4 space-y-1 shadow-2xl animate-in slide-in-from-top-2 max-h-[calc(100vh-100px)] overflow-y-auto">
          <button
            onClick={() => scrollTo('step-1')}
            className="block w-full text-left text-xs uppercase tracking-wider text-[#2D2A26] py-3.5 px-2 border-b border-[#F0EBE1] font-medium active:bg-[#F2ECE3] rounded-lg transition-colors"
          >
            Step 01: The Hero &amp; System
          </button>
          <button
            onClick={() => scrollTo('step-4')}
            className="block w-full text-left text-xs uppercase tracking-wider text-[#2D2A26] py-3.5 px-2 border-b border-[#F0EBE1] font-medium active:bg-[#F2ECE3] rounded-lg transition-colors"
          >
            Step 04: The 30-Day Roadmap
          </button>
          <button
            onClick={() => scrollTo('step-7')}
            className="block w-full text-left text-xs uppercase tracking-wider text-[#2D2A26] py-3.5 px-2 border-b border-[#F0EBE1] font-medium active:bg-[#F2ECE3] rounded-lg transition-colors"
          >
            Step 07: 3 Exclusive Bonuses
          </button>
          <button
            onClick={() => scrollTo('step-8')}
            className="block w-full text-left text-xs uppercase tracking-wider text-[#2D2A26] py-3.5 px-2 border-b border-[#F0EBE1] font-medium active:bg-[#F2ECE3] rounded-lg transition-colors"
          >
            Step 08: 30-Day Timeline
          </button>
          <button
            onClick={() => scrollTo('step-10')}
            className="block w-full text-left text-xs uppercase tracking-wider text-[#BD7469] font-bold py-3.5 px-2 active:bg-[#F2ECE3] rounded-lg transition-colors"
          >
            Step 10: Special Offer ($13 Today)
          </button>
          <div className="pt-3 pb-1 flex flex-col gap-2.5">
            <a
              href="/free-guide"
              className="block w-full text-center bg-[#FAF6F2] border border-[#E8DCD5] text-[#BD7469] py-3.5 rounded-full font-medium text-xs hover:bg-[#F3EBE3] active:bg-[#EBE2DA] transition-colors min-h-[46px] flex items-center justify-center"
            >
              🕊️ Free 72-Hour Reset &amp; 2 A.M. Answer Guide
            </a>
            <a
              href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#BD7469] text-white py-3.5 rounded-full font-medium text-xs shadow-md hover:bg-[#A8584D] active:bg-[#97463C] transition-colors min-h-[46px] flex items-center justify-center"
            >
              Get The Identity Restoration System ($13 with 50% Off)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
