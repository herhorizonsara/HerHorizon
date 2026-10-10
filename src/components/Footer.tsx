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

            {/* Official Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/herhorizon.heal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#BD7469] text-white flex items-center justify-center transition-colors"
                title="Instagram @herhorizon.heal"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://www.pinterest.com/herhorizonsara/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C86D51] text-white flex items-center justify-center transition-colors"
                title="Pinterest @herhorizonsara"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.493-.695-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.221 7.462-1.214 0-2.355-.63-2.744-1.379l-.749 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.548.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@HerHorizonHeal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#BD7469] text-white flex items-center justify-center transition-colors"
                title="YouTube @HerHorizonHeal"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <div className="text-[11px] text-[#7A746C] space-y-1 pt-1">
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
