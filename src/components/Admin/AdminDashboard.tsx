import React, { useState, useEffect } from 'react';
import {
  Users,
  Download,
  Plus,
  LogOut,
  ArrowLeft,
  Feather,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Link2,
  BookOpen,
  BarChart3,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { Subscriber } from '../../types';
import {
  getSubscribers,
  addSubscriber,
  deleteSubscriber,
  resetSubscribers,
  exportToCSV,
  setAdminAuthenticated,
} from '../../lib/storage';
import { AnalyticsOverview } from './AnalyticsOverview';
import { CampaignLinkGenerator } from './CampaignLinkGenerator';
import { AdminBlogManager } from './AdminBlogManager';
import { AdminInstructionsTab } from './AdminInstructionsTab';
import { EmailPreviewModal } from './EmailPreviewModal';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onViewLiveArticle?: (slug: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  onViewLiveArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'links' | 'blog' | 'instructions'>('analytics');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    setSubscribers(getSubscribers());
  };

  useEffect(() => {
    loadData();
    const handleStorage = () => loadData();
    window.addEventListener('herhorizon_storage_updated', handleStorage);
    window.addEventListener('hh_analytics_updated', handleStorage);
    return () => {
      window.removeEventListener('herhorizon_storage_updated', handleStorage);
      window.removeEventListener('hh_analytics_updated', handleStorage);
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    const result = addSubscriber(newName || 'Subscriber', newEmail, 'Manual Admin Entry', {
      source: 'direct',
      campaign: 'admin_manual',
      timeOnPageSeconds: 120,
      timeOnPageFormatted: '2m 00s',
      vslWatched: true,
      gumroadClicked: false,
    });
    if (result.isNew) {
      triggerToast(`Subscribed ${newEmail} successfully!`);
    } else {
      triggerToast(`${newEmail} is already registered.`);
    }
    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
    loadData();
  };

  const handleDelete = (id: string, email: string) => {
    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      deleteSubscriber(id);
      triggerToast(`Removed ${email}`);
      loadData();
    }
  };

  const handleExportCSV = () => {
    exportToCSV(subscribers);
    triggerToast(`Exported ${subscribers.length} leads with tracking history to CSV`);
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    onBackToSite();
  };

  const handleSendTestEmail = (email: string) => {
    triggerToast(`Fulfillment guide dispatched to ${email}`);
    setSelectedSubscriber(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2A26] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#2D2A26] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-medium animate-in slide-in-from-top-4 border border-[#443F3A]">
          <CheckCircle2 className="w-4 h-4 text-[#8A9A86]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation */}
      <header className="bg-white border-b border-[#E8E3DA] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center space-x-1.5 text-xs text-[#736E67] hover:text-[#2D2A26] px-3.5 py-1.5 rounded-full border border-[#DDD8CF] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Landing Page</span>
              <span className="sm:hidden">Site</span>
            </button>

            <div className="flex items-center space-x-2.5 border-l border-[#EAE5DC] pl-4">
              <div className="w-8 h-8 rounded-full bg-[#BD7469]/15 text-[#BD7469] flex items-center justify-center border border-[#BD7469]/30">
                <Feather className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-serif text-base font-semibold text-[#2D2A26] leading-none">
                  HerHorizon
                </h1>
                <span className="text-[10px] uppercase tracking-widest text-[#8A9A86] font-semibold">
                  Analytics &amp; Data Center
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex flex-col text-right pr-2 border-r border-[#EAE5DC]">
              <span className="text-xs font-semibold text-[#2D2A26]">Sara Mitchell</span>
              <span className="text-[10px] text-[#7A746C]">herhorizonsara@gmail.com</span>
            </div>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 bg-[#8A9A86] hover:bg-[#778873] text-white px-3.5 py-2 rounded-xl text-xs font-medium shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-[#7A746C] hover:text-[#BD7469] rounded-lg hover:bg-[#FAF9F6] transition-colors text-xs cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Header Navigation Tabs Strip */}
      <div className="bg-[#FAF9F6] border-b border-[#EAE5DC] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            {/* Tab 1: Analytics & Leads */}
            <button
              onClick={() => setActiveTab('analytics')}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#DDD8CF]'
                  : 'text-[#736E67] hover:text-[#2D2A26] hover:bg-white/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#BD7469]" />
              <span>Analytics &amp; Leads</span>
              <span className="ml-1 text-[10px] bg-[#BD7469]/15 text-[#BD7469] px-2 py-0.5 rounded-full font-bold">
                {subscribers.length}
              </span>
            </button>

            {/* Tab 2: Campaign Links Generator */}
            <button
              onClick={() => setActiveTab('links')}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'links'
                  ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#DDD8CF]'
                  : 'text-[#736E67] hover:text-[#2D2A26] hover:bg-white/60'
              }`}
            >
              <Link2 className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>Campaign Links</span>
              <span className="ml-1 text-[10px] bg-[#C86D51]/15 text-[#C86D51] px-2 py-0.5 rounded-full font-semibold">
                Builder
              </span>
            </button>

            {/* Tab 3: Blog & Journal Articles */}
            <button
              onClick={() => setActiveTab('blog')}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'blog'
                  ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#DDD8CF]'
                  : 'text-[#736E67] hover:text-[#2D2A26] hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8A9A86]" />
              <span>Sunday Soul Notes</span>
              <span className="ml-1 text-[10px] bg-[#8A9A86]/15 text-[#5B6D57] px-2 py-0.5 rounded-full">
                Journal
              </span>
            </button>

            {/* Tab 4: Instructions & Help Guide */}
            <button
              onClick={() => setActiveTab('instructions')}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'instructions'
                  ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#DDD8CF]'
                  : 'text-[#736E67] hover:text-[#2D2A26] hover:bg-white/60'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#E2B072]" />
              <span>Instructions &amp; Help</span>
              <span className="ml-1 text-[10px] bg-[#E2B072]/20 text-[#C59B63] px-2 py-0.5 rounded-full font-semibold">
                Guide
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs text-[#8C7A74]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Built-in Silent Attribution Engine • Active</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'analytics' && (
          <AnalyticsOverview
            subscribers={subscribers}
            onDeleteSubscriber={handleDelete}
            onSendTestEmail={(email) => {
              const sub = subscribers.find((s) => s.email === email);
              if (sub) setSelectedSubscriber(sub);
              else handleSendTestEmail(email);
            }}
            onOpenAddModal={() => setShowAddModal(true)}
            onNotifyToast={triggerToast}
          />
        )}

        {activeTab === 'links' && (
          <CampaignLinkGenerator onNotifyToast={triggerToast} />
        )}

        {activeTab === 'blog' && (
          <AdminBlogManager
            onViewLiveArticle={onViewLiveArticle || (() => {})}
            triggerToast={triggerToast}
          />
        )}

        {activeTab === 'instructions' && (
          <AdminInstructionsTab />
        )}
      </main>

      {/* Manual Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#E8E3DA] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl">
            <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-2">
              Add Lead Manually
            </h3>
            <p className="text-xs text-[#736E67] mb-6">
              Enter an email address to capture into the 72-Hour Reset subscriber database.
            </p>

            <form onSubmit={handleAddManual} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#524D46] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD8CF] rounded-xl text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#BD7469]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#524D46] uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[#BD7469]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="subscriber@gmail.com"
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD8CF] rounded-xl text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#BD7469]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#EAE5DC]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-full text-xs font-medium text-[#736E67] hover:bg-[#EAE5DC] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#BD7469] hover:bg-[#A8584D] text-white rounded-full text-xs font-medium shadow-2xs transition-colors cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Automated Email Preview Modal */}
      <EmailPreviewModal
        subscriber={selectedSubscriber}
        isOpen={Boolean(selectedSubscriber)}
        onClose={() => setSelectedSubscriber(null)}
        onSendTestEmail={handleSendTestEmail}
      />
    </div>
  );
};
