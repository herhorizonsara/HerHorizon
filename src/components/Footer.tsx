import React from 'react';
import { Feather, Lock, Heart, Shield, ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenBlog?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenBlog }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#221F1D] text-[#ECE7DF] py-12 sm:py-20 border-t border-[#38332F] pb-24 sm:pb-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <BrandLogo theme="dark" />
            
            <p className="font-sans text-xs sm:text-sm text-[#A8A199] font-light max-w-sm leading-relaxed">
              A trauma-informed digital sanctuary for women reclaiming self-trust, emotional boundaries, and sovereignty after toxic relationship collapse.
            </p>

            <div className="text-[11px] text-[#7A746C] space-y-1">
              <p>✦ 100% Private, Discrete &amp; Secure Delivery</p>
              <p>✦ Designed with Somatic Grounding &amp; Vagal Regulation</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="font-serif text-sm font-medium text-white block mb-2">
              Sanctuary Links
            </span>
            <ul className="space-y-1.5 text-[#A8A199]">
              <li>
                <a
                  href="/blog"
                  onClick={(e) => {
                    if (onOpenBlog) {
                      e.preventDefault();
                      onOpenBlog();
                    }
                  }}
                  className="block py-1 hover:text-[#E3A88D] transition-colors"
                >
                  The Rebuild Journal (Articles) 📖
                </a>
              </li>
              <li>
                <a
                  href="https://herhorizon.gumroad.com/l/72-hour-reset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-1 hover:text-[#E3A88D] transition-colors"
                >
                  Free 72-Hour Reset &amp; 2 A.M. Answer Guide
                </a>
              </li>
              <li>
                <a
                  href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-1 hover:text-[#E3A88D] transition-colors"
                >
                  The Identity Rebuild System™
                </a>
              </li>
              <li>
                <a href="#step-1" className="block py-1 hover:text-[#E3A88D] transition-colors">
                  The System Overview
                </a>
              </li>
              <li>
                <a href="#step-10" className="block py-1 hover:text-[#E3A88D] transition-colors">
                  50% Off Special Offer ($13)
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Privacy */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="font-serif text-sm font-medium text-white block mb-2">
              Sovereign Sanctuary
            </span>
            <p className="text-[11px] text-[#8C867E] leading-relaxed">
              Discreet digital delivery. No billing mentions of relationship recovery on your card statement.
            </p>
            <div className="pt-1 text-[11px] text-[#A8A199] space-y-1">
              <p>Email: <a href="mailto:hello@herhorizon.store" className="text-[#E3A88D] hover:underline">hello@herhorizon.store</a></p>
              <p>256-Bit Encrypted Checkout</p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A746C]">
          <p>
            &copy; {new Date().getFullYear()} HerHorizon™ (herhorizon.store). All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-[#A8A199] hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Medical & Mental Health Disclaimer */}
        <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-[#635E59] text-center leading-relaxed">
          Disclaimer: HerHorizon educational products, roadmaps, and journals provide self-reflection, somatic regulation tools, and personal empowerment frameworks. They are not a substitute for licensed medical care, psychiatric diagnosis, or clinical psychotherapy. If you are in immediate danger, please reach out to local emergency services or a trusted domestic crisis lifeline.
        </div>

      </div>
    </footer>
  );
};
