import React, { useState } from 'react';
import {
  Link2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Bookmark,
  Youtube,
  Instagram,
  BookOpen,
  Search,
  Mail,
  Zap,
  Plus,
  Trash2,
  PauseCircle,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  Compass,
} from 'lucide-react';
import {
  getCampaignLinks,
  saveCampaignLink,
  updateCampaignStatus,
  deleteCampaignLink,
  CampaignLinkItem,
} from '../../lib/storage';

interface CampaignLinkGeneratorProps {
  onNotifyToast: (msg: string) => void;
}

interface SourceOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  defaultCampaign: string;
  hint: string;
}

const TRAFFIC_SOURCES: SourceOption[] = [
  {
    id: 'pinterest',
    label: 'Pinterest',
    icon: <Bookmark className="w-4 h-4 text-[#C86D51]" />,
    defaultCampaign: 'solo_saturday',
    hint: 'Ideal for infographics, trauma recovery pins, and quote tiles.',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: <Youtube className="w-4 h-4 text-[#BD7469]" />,
    defaultCampaign: 'vsl_description',
    hint: 'Use in video descriptions, pinned comments, and cards.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <Instagram className="w-4 h-4 text-[#D4A373]" />,
    defaultCampaign: 'bio_roadmap',
    hint: 'Great for link-in-bio, story swipe stickers, and DM replies.',
  },
  {
    id: 'medium',
    label: 'Medium / Substack',
    icon: <BookOpen className="w-4 h-4 text-[#5C524F]" />,
    defaultCampaign: 'vagus_reset_article',
    hint: 'Embedded in long-form essays and psychological case studies.',
  },
  {
    id: 'search',
    label: 'Search (Google SEO / Ads)',
    icon: <Search className="w-4 h-4 text-[#8A9A86]" />,
    defaultCampaign: 'identity_collapse_kw',
    hint: 'For targeted organic keywords, guest features, or Google Ads.',
  },
  {
    id: 'newsletter',
    label: 'Email Newsletter',
    icon: <Mail className="w-4 h-4 text-[#71826B]" />,
    defaultCampaign: 'sunday_soul_notes',
    hint: 'For broadcasts, broadcast sequence letters, or partner swaps.',
  },
];

export const CampaignLinkGenerator: React.FC<CampaignLinkGeneratorProps> = ({
  onNotifyToast,
}) => {
  const [campaigns, setCampaigns] = useState<CampaignLinkItem[]>(() => getCampaignLinks());
  
  // New campaign creator state
  const [newName, setNewName] = useState('');
  const [selectedSource, setSelectedSource] = useState('pinterest');
  const [campaignSlug, setCampaignSlug] = useState('solo_saturday');
  const [targetPath, setTargetPath] = useState('/');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const baseUrl = 'https://healing.herhorizon.store';

  // Sanitize slug
  const cleanSlug = campaignSlug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_');

  const pathPart = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  const previewUrl = `${baseUrl}${pathPart === '/' ? '/' : pathPart}?source=${selectedSource}${cleanSlug ? `&campaign=${cleanSlug}` : ''}`;

  const loadCampaigns = () => {
    setCampaigns(getCampaignLinks());
  };

  const handleGenerateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert('Please enter a campaign name.');
      return;
    }

    saveCampaignLink({
      name: newName.trim(),
      source: selectedSource,
      campaignSlug: cleanSlug || 'custom',
      destinationPath: targetPath,
      url: previewUrl,
    });

    setNewName('');
    onNotifyToast(`Campaign "${newName}" generated successfully!`);
    loadCampaigns();
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    onNotifyToast('Campaign tracking link copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleStatusChange = (id: string, status: 'active' | 'paused' | 'archived') => {
    updateCampaignStatus(id, status);
    loadCampaigns();
    onNotifyToast(`Campaign status updated to ${status}`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete campaign "${name}"?`)) {
      deleteCampaignLink(id);
      loadCampaigns();
      onNotifyToast(`Deleted campaign "${name}"`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] border border-[#E8DCD5] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E2B072]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#BD7469] bg-[#FAF6F2] border border-[#E8DCD5] px-3 py-1 rounded-full mb-3">
            <Link2 className="w-3.5 h-3.5 text-[#BD7469]" />
            <span>Campaign Tracking URL Builder</span>
          </div>
          <h2 className="font-serif italic font-normal text-2xl sm:text-3xl text-[#2D2A26] mb-2">
            Create &amp; Manage Attributed Tracking Links
          </h2>
          <p className="text-xs sm:text-sm text-[#8C7A74] leading-relaxed">
            Generate unique attribution URLs to give to partners, influencers, or test in social bios. Pause or archive any link instantly to disable traffic tracking.
          </p>
        </div>
      </div>

      {/* Generator Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Generator Form */}
        <div className="lg:col-span-6 bg-[#FFFDF9] border border-[#E8DCD5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-4">
            <h3 className="font-serif font-medium text-lg text-[#2D2A26] flex items-center space-x-2">
              <Plus className="w-5 h-5 text-[#BD7469]" />
              <span>Generate New Campaign Link</span>
            </h3>
            <span className="text-[11px] text-[#8C7A74]">Custom attribution</span>
          </div>

          <form onSubmit={handleGenerateCampaign} className="space-y-5">
            {/* Campaign Name */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C524F]">
                Campaign / Partner Name <span className="text-[#BD7469]">*</span>
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Sarah Guest Post, Pinterest Pin #4"
                className="w-full px-4 py-3 bg-white border border-[#E8DCD5] rounded-2xl text-xs sm:text-sm text-[#2D2A26] placeholder-[#A0938D] focus:outline-none focus:ring-2 focus:ring-[#BD7469] transition-all"
              />
            </div>

            {/* Traffic Source */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C524F]">
                Traffic Source <span className="text-[#BD7469]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TRAFFIC_SOURCES.map((src) => {
                  const isSelected = selectedSource === src.id;
                  return (
                    <button
                      key={src.id}
                      type="button"
                      onClick={() => {
                        setSelectedSource(src.id);
                        if (!campaignSlug || campaignSlug === 'solo_saturday') {
                          setCampaignSlug(src.defaultCampaign);
                        }
                      }}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-2xl border text-xs font-medium transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'border-[#BD7469] bg-[#FAF6F2] text-[#BD7469] font-semibold shadow-2xs'
                          : 'border-[#E8DCD5] bg-white text-[#5C524F] hover:border-[#D4A373]'
                      }`}
                    >
                      {src.icon}
                      <span className="truncate">{src.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Campaign Slug */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C524F]">
                Campaign Slug <span className="text-[#BD7469]">*</span>
              </label>
              <input
                type="text"
                required
                value={campaignSlug}
                onChange={(e) => setCampaignSlug(e.target.value)}
                placeholder="e.g. solo_saturday, guest_sarah"
                className="w-full px-4 py-3 bg-white border border-[#E8DCD5] rounded-2xl text-xs sm:text-sm text-[#2D2A26] placeholder-[#A0938D] focus:outline-none focus:ring-2 focus:ring-[#BD7469] transition-all"
              />
            </div>

            {/* Target Path */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C524F]">
                Landing Page Destination
              </label>
              <select
                value={targetPath}
                onChange={(e) => setTargetPath(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#E8DCD5] rounded-2xl text-xs sm:text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#BD7469] transition-all cursor-pointer"
              >
                <option value="/">Main VSL &amp; Rebuild System Landing Page (/)</option>
                <option value="/journal">Sunday Soul Notes: Journal Index (/journal)</option>
                <option value="/journal/why-healthy-love-feels-boring">Article: Why Healthy Love Feels Boring</option>
                <option value="/journal/90-second-vagus-nerve-reset">Article: 90-Second Vagus Nerve Reset</option>
                <option value="/journal/are-you-a-people-pleaser-or-just-fawning">Article: Are You A People Pleaser or Just Fawning?</option>
              </select>
            </div>

            {/* Live Preview Box */}
            <div className="bg-[#FAF6F2] border border-[#E8DCD5] rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#BD7469]">
                Live URL Preview
              </span>
              <div className="p-2.5 bg-white border border-[#E8DCD5] rounded-xl font-mono text-[11px] text-[#2D2A26] break-all select-all">
                {previewUrl}
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-2 bg-[#BD7469] hover:bg-[#A8584D] active:bg-[#96473D] text-white text-xs font-medium px-6 py-3.5 rounded-full transition-all shadow-md cursor-pointer uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Campaign Link</span>
            </button>
          </form>
        </div>

        {/* Right Column: Active Generated Campaign Links Manager */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#FFFDF9] border border-[#E8DCD5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-4">
              <h3 className="font-serif font-medium text-lg text-[#2D2A26] flex items-center space-x-2">
                <Compass className="w-5 h-5 text-[#BD7469]" />
                <span>Active Campaign Links ({campaigns.length})</span>
              </h3>
              <span className="text-[11px] text-[#8C7A74]">Pause / Archive control</span>
            </div>

            <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
              {campaigns.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#8C7A74]">
                  No campaign links created yet. Use the form on the left to generate your first link.
                </div>
              ) : (
                campaigns.map((camp) => {
                  const isActive = camp.status === 'active';
                  const isPaused = camp.status === 'paused';
                  const isArchived = camp.status === 'archived';

                  return (
                    <div
                      key={camp.id}
                      className={`border rounded-2xl p-4 transition-all bg-white space-y-3 ${
                        isArchived
                          ? 'border-red-200 bg-red-50/30 opacity-75'
                          : isPaused
                          ? 'border-yellow-200 bg-yellow-50/30'
                          : 'border-[#E8DCD5] shadow-2xs hover:border-[#BD7469]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif font-semibold text-sm text-[#2D2A26] flex items-center space-x-2">
                            <span>{camp.name}</span>
                          </h4>
                          <span className="text-[10px] text-[#8C7A74] font-mono">
                            source: {camp.source} • campaign: {camp.campaignSlug}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isActive && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#8A9A86]/15 text-[#5B6D57] border border-[#8A9A86]/40">
                              Active
                            </span>
                          )}
                          {isPaused && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-100 text-yellow-800 border border-yellow-300">
                              Paused
                            </span>
                          )}
                          {isArchived && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-800 border border-red-300">
                              Archived (Disabled)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* URL Box */}
                      <div className="p-2.5 bg-[#FAF6F2] border border-[#E8DCD5] rounded-xl font-mono text-[11px] text-[#5C524F] break-all select-all">
                        {camp.url}
                      </div>

                      {/* Action Control Buttons (Copy, Pause, Archive, Delete) */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#F0ECE4] text-xs">
                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => handleCopyUrl(camp.id, camp.url)}
                            disabled={isArchived}
                            className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                              copiedId === camp.id
                                ? 'bg-[#8A9A86] text-white'
                                : isArchived
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-[#FAF6F2] hover:bg-[#F3ECE4] text-[#BD7469]'
                            }`}
                          >
                            {copiedId === camp.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Link</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          {/* Pause / Resume */}
                          {isActive ? (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(camp.id, 'paused')}
                              title="Pause tracking link"
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-800 font-medium transition-colors cursor-pointer"
                            >
                              <PauseCircle className="w-3.5 h-3.5" />
                              <span>Pause</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(camp.id, 'active')}
                              title="Resume tracking link"
                              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-800 font-medium transition-colors cursor-pointer"
                            >
                              <PlayCircle className="w-3.5 h-3.5" />
                              <span>Resume</span>
                            </button>
                          )}

                          {/* Archive */}
                          {!isArchived ? (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(camp.id, 'archived')}
                              title="Archive link (stops tracking)"
                              className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors cursor-pointer"
                            >
                              Archive
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(camp.id, 'active')}
                              title="Restore link"
                              className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-medium transition-colors cursor-pointer"
                            >
                              Restore
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(camp.id, camp.name)}
                            title="Delete campaign"
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
