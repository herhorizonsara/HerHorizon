import React from 'react';
import {
  BookOpen,
  HelpCircle,
  Link2,
  TrendingUp,
  Image as ImageIcon,
  Globe,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Compass,
  FileText,
} from 'lucide-react';

export const AdminInstructionsTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans max-w-5xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] border border-[#E8DCD5] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E2B072]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#BD7469] bg-[#FAF6F2] border border-[#E8DCD5] px-3 py-1 rounded-full">
            <HelpCircle className="w-3.5 h-3.5 text-[#BD7469]" />
            <span>Admin Control &amp; Mastery Guide</span>
          </div>
          <h2 className="font-serif italic font-normal text-2xl sm:text-3xl text-[#2D2A26]">
            Welcome to Your HerHorizon Command Center
          </h2>
          <p className="text-xs sm:text-sm text-[#8C7A74] leading-relaxed">
            This instructional handbook covers how to manage your analytics, generate tracked campaign links, publish Medium-style journal articles, and host free images without local server storage limits.
          </p>
        </div>
      </div>

      {/* Grid of Instructions Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* 1. ANALYTICS & METRICS */}
        <div className="bg-[#FFFDF9] border border-[#E8DCD5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-[#F0ECE4] pb-3">
            <div className="w-9 h-9 rounded-2xl bg-[#BD7469]/15 text-[#BD7469] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#BD7469]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-lg text-[#2D2A26]">
                1. Analyzing Numbers &amp; Leads
              </h3>
              <span className="text-[11px] text-[#8C7A74]">CRM &amp; Traffic Attribution</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#5C524F] leading-relaxed">
            <p>
              The <strong className="text-[#2D2A26]">Analytics &amp; Leads</strong> tab automatically tracks every visitor's journey in real-time.
            </p>
            <ul className="space-y-2 pl-4 list-disc text-xs text-[#736E67]">
              <li><strong>Total Visitors &amp; CTR:</strong> Measures how many people arrived on your site and clicked through to Gumroad.</li>
              <li><strong>Traffic Sources:</strong> Automatically categorizes leads by Pinterest, YouTube, Instagram, Medium, or Google Search.</li>
              <li><strong>Time on Page:</strong> Shows exactly how long each sister spent absorbing your somatic guides.</li>
              <li><strong>Admin Exclusion:</strong> Your active admin browser sessions are automatically excluded so testing doesn't skew your real metrics.</li>
            </ul>
          </div>
        </div>

        {/* 2. CAMPAIGN LINKS GENERATOR */}
        <div className="bg-[#FFFDF9] border border-[#E8DCD5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-[#F0ECE4] pb-3">
            <div className="w-9 h-9 rounded-2xl bg-[#C86D51]/15 text-[#C86D51] flex items-center justify-center">
              <Link2 className="w-4 h-4 text-[#C86D51]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-lg text-[#2D2A26]">
                2. Campaign Links &amp; Attribution
              </h3>
              <span className="text-[11px] text-[#8C7A74]">Tracking Partners &amp; Socials</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#5C524F] leading-relaxed">
            <p>
              Use the <strong className="text-[#2D2A26]">Campaign Links</strong> tab to create custom trackable URLs:
            </p>
            <ul className="space-y-2 pl-4 list-disc text-xs text-[#736E67]">
              <li><strong>Generate:</strong> Select a source (e.g., Pinterest), type a campaign name (e.g., <code>solo_saturday</code>), and click generate.</li>
              <li><strong>Pause &amp; Resume:</strong> Temporarily stop tracking or disable a link without deleting its history.</li>
              <li><strong>Archive:</strong> Archive any campaign link to deactivate it instantly.</li>
            </ul>
          </div>
        </div>

        {/* 3. SUNDAY SOUL NOTES (JOURNAL) */}
        <div className="bg-[#FFFDF9] border border-[#E8DCD5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-[#F0ECE4] pb-3">
            <div className="w-9 h-9 rounded-2xl bg-[#8A9A86]/15 text-[#8A9A86] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#8A9A86]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-lg text-[#2D2A26]">
                3. Sunday Soul Notes (Journal)
              </h3>
              <span className="text-[11px] text-[#8C7A74]">Medium-Style Article Editor</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#5C524F] leading-relaxed">
            <p>
              The <strong className="text-[#2D2A26]">Blog &amp; SEO Articles</strong> tab opens a distraction-free writing studio:
            </p>
            <ul className="space-y-2 pl-4 list-disc text-xs text-[#736E67]">
              <li><strong>Block Formatting:</strong> Add paragraphs, H2/H3 headings, pull quotes, somatic callouts, and dividers.</li>
              <li><strong>SEO Customization:</strong> Set custom meta titles, descriptions, and focus keywords for Google Search ranking.</li>
              <li><strong>Live Preview:</strong> Instantly view how your article looks before publishing.</li>
            </ul>
          </div>
        </div>

        {/* 4. FREE IMAGE HOSTING & PASTE LINKS */}
        <div className="bg-[#FFFDF9] border border-[#E8DCD5] rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-[#F0ECE4] pb-3">
            <div className="w-9 h-9 rounded-2xl bg-[#D4A373]/20 text-[#C59B63] flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-[#C59B63]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-lg text-[#2D2A26]">
                4. Hosting Images for Articles
              </h3>
              <span className="text-[11px] text-[#8C7A74]">Free Image Hosting Solutions</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#5C524F] leading-relaxed">
            <p>
              Since your website doesn't require backend server storage uploads, you can host your images for free on trusted platforms and paste the direct image link into the editor:
            </p>
            <div className="space-y-2 pt-1">
              <div className="p-2.5 bg-[#FAF6F2] rounded-xl border border-[#E8DCD5]">
                <strong className="text-[#2D2A26] block text-xs">1. Imgur (imgur.com/upload)</strong>
                <span className="text-[11px] text-[#8C7A74]">Drag and drop your image, right-click, and select "Copy image address". Paste it right into the article image block.</span>
              </div>
              <div className="p-2.5 bg-[#FAF6F2] rounded-xl border border-[#E8DCD5]">
                <strong className="text-[#2D2A26] block text-xs">2. Postimages (postimages.org)</strong>
                <span className="text-[11px] text-[#8C7A74]">Free, no-account-required image hosting. Gives you a direct "Hotlink for forums" or image URL instantly.</span>
              </div>
              <div className="p-2.5 bg-[#FAF6F2] rounded-xl border border-[#E8DCD5]">
                <strong className="text-[#2D2A26] block text-xs">3. Built-in Preset Library</strong>
                <span className="text-[11px] text-[#8C7A74]">You can also choose from HerHorizon's built-in professional mockup graphics and author portraits with 1 click.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Summary Footer Box */}
      <div className="bg-[#FAF6F2] border border-[#E8DCD5] rounded-3xl p-6 sm:p-8 text-center space-y-3">
        <h4 className="font-serif italic text-lg text-[#2D2A26]">
          Need any further customizations?
        </h4>
        <p className="text-xs text-[#736E67] max-w-md mx-auto">
          All data is securely synchronized across your browser session. Use the Export CSV button anytime to back up your captured leads.
        </p>
      </div>

    </div>
  );
};
