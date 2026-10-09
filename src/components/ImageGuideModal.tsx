import React, { useState } from 'react';
import { X, Copy, Check, Image as ImageIcon, HelpCircle, Folder, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

interface ImageGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageGuideModal: React.FC<ImageGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const assets = [
    // Category 1: Brand & Trust Badges
    {
      category: 'Brand & Trust Badges',
      badge: 'Brand Logo',
      name: 'HerHorizon Header & Footer Logo',
      filename: 'logo.png',
      fallback: 'logo.svg, logo-white.png',
      ratio: 'Approx 400 × 100 px (Transparent PNG or SVG)',
      description: 'Brand mark used in top navigation and footer. Falls back to elegant gold feather typography if absent.',
    },
    {
      category: 'Brand & Trust Badges',
      badge: 'Step 10 Guarantee',
      name: '100% Money-Back Guarantee Seal',
      filename: 'guarantee-badge.png',
      fallback: 'step10-guarantee-seal.png, guarantee.png',
      ratio: '1:1 Square (~600 × 600 px)',
      description: 'Gold circular seal badge with ribbon affirming the 7-day no-risk peace of mind promise.',
    },
    {
      category: 'Brand & Trust Badges',
      badge: 'Payment Trust',
      name: 'Secure Payment Badges Strip',
      filename: 'payment-trust-badges.png',
      fallback: 'payment-badges.png, secure-checkout.png',
      ratio: 'Approx 800 × 120 px (Horizontal Strip)',
      description: 'Visa, Mastercard, AMEX, PayPal, Apple Pay & 256-Bit SSL Encryption strip displayed under the checkout button.',
    },
    {
      category: 'Brand & Trust Badges',
      badge: 'Founder Portrait',
      name: 'Sara Mitchell (Founder Portrait)',
      filename: 'author-portrait.png',
      fallback: 'sara-mitchell.png, author.jpg',
      ratio: '1:1 Square (~600 × 600 px)',
      description: 'Portrait photo of Sara Mitchell displayed on the personal Step 9 Homecoming letter card.',
    },

    // Category 2: 8 Book & Guide Covers (Already added!)
    {
      category: 'Book Covers (3535 × 5000 px)',
      badge: 'Core 01',
      name: 'The Identity Rebuild Roadmap (Centerpiece)',
      filename: 'cover-roadmap.png',
      fallback: 'cover-roadmap.jpg',
      ratio: '3535 × 5000 px (A4 portrait ratio)',
      description: 'Centerpiece 30-day interactive guide cover shown in Hero fan and Step 4.',
    },
    {
      category: 'Book Covers (3535 × 5000 px)',
      badge: 'Core 02',
      name: 'Self-Trust Reset',
      filename: 'cover-selftrust.png',
      fallback: 'cover-selftrust.jpg',
      ratio: '3535 × 5000 px (A4 portrait ratio)',
      description: '7-Day Intuition Workout guide cover shown in Hero and Step 5.',
    },
    {
      category: 'Book Covers (3535 × 5000 px)',
      badge: 'Core 03',
      name: 'Mental Loop Release',
      filename: 'cover-mentalloop.png',
      fallback: 'cover-mentalloop.jpg',
      ratio: '3535 × 5000 px (A4 portrait ratio)',
      description: '10 Interrupt Prompts / 3 A.M. Protocol guide cover shown in Hero and Step 5.',
    },
    {
      category: 'Book Covers (3535 × 5000 px)',
      badge: 'Core 04',
      name: 'Boundary Scripts',
      filename: 'cover-boundaryscripts.png',
      fallback: 'cover-boundaryscripts.jpg',
      ratio: '3535 × 5000 px (A4 portrait ratio)',
      description: '25 Ready-to-use phrases guide cover shown in Hero and Step 6.',
    },
    {
      category: 'Book Covers (3535 × 5000 px)',
      badge: 'Core 05',
      name: 'Trauma Bond Detox',
      filename: 'cover-traumabond.png',
      fallback: 'cover-traumabond.jpg',
      ratio: '3535 × 5000 px (A4 portrait ratio)',
      description: '7-Day Ritual guide cover shown in Hero and Step 6.',
    },
    {
      category: 'Book Covers (3535 × 5000 px)',
      badge: 'Bonus 01',
      name: 'First Date Red Flag Decoder',
      filename: 'cover-bonus-redflags.png',
      fallback: 'cover-bonus-redflags.jpg',
      ratio: '3535 × 5000 px (A4 portrait ratio)',
      description: 'Bonus 1 guide cover featured in Step 7 iPad showcase.',
    },
    {
      category: 'Book Covers (3535 × 5000 px)',
      badge: 'Bonus 02',
      name: 'Home Reclamation Blueprint',
      filename: 'cover-bonus-homereclaim.png',
      fallback: 'cover-bonus-homereclaim.jpg',
      ratio: '3535 × 5000 px (A4 portrait ratio)',
      description: 'Bonus 2 guide cover featured in Step 7 iPad showcase.',
    },
    {
      category: 'Book Covers (3535 × 5000 px)',
      badge: 'Bonus 03',
      name: 'Solo Saturday Joy Bank',
      filename: 'cover-bonus-joybank.png',
      fallback: 'cover-bonus-joybank.jpg',
      ratio: '3535 × 5000 px (A4 portrait ratio)',
      description: 'Bonus 3 guide cover featured in Step 7 iPad showcase.',
    },

    // Category 3: Editorial Atmosphere Photos
    {
      category: 'Editorial Atmosphere Photos',
      badge: 'Step 02',
      name: 'Hollow Freedom Twilight Balcony',
      filename: 'step2-freedom-hollow.png',
      fallback: 'step2-freedom-hollow.jpg',
      ratio: '16:10 (~1920 × 1200 px)',
      description: 'Silhouette of thoughtful woman on terrace under dusk sky holding light bulb cord.',
    },
    {
      category: 'Editorial Atmosphere Photos',
      badge: 'Step 03',
      name: 'Dawn Window & Stillness',
      filename: 'step3-morning-window.png',
      fallback: 'step3-morning-window.jpg',
      ratio: '16:10 (~1920 × 1200 px)',
      description: 'Warm architectural window with morning sunrise sky, ceramic cup and delicate feather on counter.',
    },
    {
      category: 'Editorial Atmosphere Photos',
      badge: 'Step 01 Mockup',
      name: 'Hero 5-Tablet Composite Pack (Optional)',
      filename: 'step1-hero-mockup.png',
      fallback: 'step1-hero-mockup.jpg',
      ratio: '16:11 or 16:9',
      description: 'Optional single-image composite of the 5 tablets if you prefer one graphic instead of individual covers.',
    },

    // Category 4: Complimentary Free Guide (/free-guide)
    {
      category: 'Free Guide Assets (/free-guide)',
      badge: 'Part 01 (Vertical)',
      name: 'The 72-Hour Nervous System Reset Guide',
      filename: 'cover-free-reset-guide.png',
      fallback: 'cover-free-reset-guide.svg, cover-free-reset-guide.jpg',
      ratio: '3535 × 5000 px (Portrait, A4 ratio 1:1.414)',
      description: 'Part 1 vertical PDF guide cover displayed on /free-guide page and inside reader modal.',
    },
    {
      category: 'Free Guide Assets (/free-guide)',
      badge: 'Part 02 (Horizontal)',
      name: 'The 2 A.M. Emergency Anchor Card (Horizontal Card)',
      filename: 'cover-free-anchor-card.png',
      fallback: 'cover-free-anchor-card.svg, cover-free-anchor-card.jpg',
      ratio: '1920 × 1080 px (16:9 Landscape / Horizontal)',
      description: 'Part 2 horizontal landscape bedside anchor card for night waking loops and phone lockscreen.',
    },
    {
      category: 'Free Guide Assets (/free-guide)',
      badge: 'Dual Mockup',
      name: 'Free Guide 2-Product Bundle Mockup (Optional)',
      filename: 'free-guide-dual-mockup.png',
      fallback: 'free-guide-dual-mockup.jpg',
      ratio: '1920 × 1080 px (16:9 Landscape Composite)',
      description: 'Optional composite mockup showing both the portrait reset guide and horizontal anchor card together.',
    },
  ];

  const handleCopy = (filename: string, idx: number) => {
    navigator.clipboard.writeText(filename);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#E8DCD5] overflow-hidden text-[#2D2A26]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#FAF6F2] to-[#F5ECE4] border-b border-[#E8DCD5] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E2B072]/20 border border-[#E2B072]/40 flex items-center justify-center text-[#BD7469]">
              <ImageIcon className="w-5 h-5 text-[#BD7469]" />
            </div>
            <div>
              <h3 className="font-serif italic font-bold text-xl text-[#3D3532]">
                Canva Image Assets Guide (Steps 1 to 10)
              </h3>
              <p className="text-xs text-[#8C7A74]">
                How to add your Canva exported images to the public folder
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8C7A74] hover:text-[#2D2A26] rounded-full hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
            {/* Instructions Box */}
            <div className="bg-white p-5 rounded-2xl border border-[#EDE2DA] shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-[#D4A373] text-xs font-bold uppercase tracking-wider">
                <Folder className="w-4 h-4 text-[#BD7469]" />
                <span>Book Covers: Sizing, Canva &amp; Pexels</span>
              </div>
              <ul className="text-xs sm:text-sm text-[#5C524F] space-y-2 list-disc list-inside leading-relaxed">
                <li>
                  <strong>Is it on Pexels?</strong> No — Pexels only provides <em>stock photos</em> (e.g. moody dusk skies, coffee cups, serene women). Book covers with titles and text are created in <strong>Canva</strong>. You can grab free aesthetic background photos from Pexels, then add your titles in Canva!
                </li>
                <li>
                  <strong>Recommended Cover Size:</strong> In Canva, choose <strong>eBook Cover</strong> (1410 × 2250 px) or <strong>A4 Document</strong> (2480 × 3508 px / ratio ~1:1.5).
                </li>
                <li>
                  <strong>Single Inside Covers vs Full Pack:</strong> You do <em>not</em> need to build complex 3D perspective packs! Just export each flat 2D book cover page and name it as listed below.
                </li>
              </ul>
            </div>

          {/* Table of Assets */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#BD7469]">
              Asset Name &amp; Filename Directory:
            </h4>

            <div className="space-y-2.5">
              {assets.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-[#EDE2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#D4A373] transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#BD7469] text-white text-[9px] font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <span className="font-serif italic font-semibold text-sm text-[#2D2A26]">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#8C7A74] bg-[#FAF6F2] px-2 py-0.5 rounded border border-[#EDE2DA]">
                        {item.ratio}
                      </span>
                    </div>
                    <p className="text-xs text-[#736E67] line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <code className="text-xs font-mono bg-[#FAF6F2] text-[#BD7469] px-3 py-1.5 rounded-lg border border-[#E8DCD5]">
                      {item.filename}
                    </code>
                    <button
                      onClick={() => handleCopy(item.filename, idx)}
                      className="p-2 text-[#8C7A74] hover:text-[#BD7469] bg-[#FAF6F2] hover:bg-[#F3E7DC] rounded-lg transition-colors border border-[#E8DCD5]"
                      title="Copy filename"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF6F2] border-t border-[#E8DCD5] flex items-center justify-between">
          <span className="text-xs text-[#8C7A74]">
            Images automatically render once placed in <code className="font-mono">/public/images/</code>
          </span>
          <button
            onClick={onClose}
            className="bg-[#BD7469] hover:bg-[#A8584D] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Got it, thanks!
          </button>
        </div>

      </div>
    </div>
  );
};
