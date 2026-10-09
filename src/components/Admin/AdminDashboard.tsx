import React, { useState, useEffect } from 'react';
import {
  Users,
  Download,
  Search,
  Plus,
  Trash2,
  Mail,
  Send,
  ExternalLink,
  LogOut,
  ArrowLeft,
  Feather,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Eye,
  Filter
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
import { EmailPreviewModal } from './EmailPreviewModal';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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
    return () => window.removeEventListener('herhorizon_storage_updated', handleStorage);
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
    const result = addSubscriber(newName || 'Subscriber', newEmail, 'Manual Admin Entry');
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
    triggerToast(`Exported ${subscribers.length} subscribers to CSV`);
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    onBackToSite();
  };

  const handleClearAllData = () => {
    if (subscribers.length === 0) return;
    if (window.confirm('Clear all captured subscribers? This will empty the database.')) {
      resetSubscribers();
      triggerToast('Subscribers database emptied');
      loadData();
    }
  };

  const handleSendTestEmail = (email: string) => {
    triggerToast(`Fulfillment email dispatched to ${email}`);
    setSelectedSubscriber(null);
  };

  // Filtered subscribers
  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Metrics
  const totalSubscribers = subscribers.length;
  const todayCount = subscribers.filter((s) => {
    const d = new Date(s.createdAt);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;
  const leadMagnetPercentage = totalSubscribers > 0 ? 100 : 0;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2A26] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#2D2A26] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-medium animate-in slide-in-from-top-4">
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
              className="inline-flex items-center space-x-1.5 text-xs text-[#736E67] hover:text-[#2D2A26] px-3 py-1.5 rounded-full border border-[#DDD8CF] hover:bg-[#FAF9F6] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Landing Page</span>
            </button>

            <div className="flex items-center space-x-2 border-l border-[#EAE5DC] pl-4">
              <div className="w-7 h-7 rounded-full bg-[#E3A88D]/20 text-[#C05746] flex items-center justify-center">
                <Feather className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-serif text-base font-semibold text-[#2D2A26] leading-none">
                  HerHorizon Admin Panel
                </h1>
                <span className="text-[10px] uppercase tracking-widest text-[#8A9A86] font-medium">
                  Lead &amp; CRM Console
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex flex-col text-right pr-2 border-r border-[#EAE5DC]">
              <span className="text-xs font-semibold text-[#2D2A26]">Administrator</span>
              <span className="text-[10px] text-[#7A746C]">herhorizonsara@gmail.com</span>
            </div>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 bg-[#8A9A86] hover:bg-[#778873] text-white px-3.5 py-2 rounded-xl text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-[#7A746C] hover:text-[#C05746] rounded-lg hover:bg-[#FAF9F6] transition-colors text-xs"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric Cards Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total Subscribers (Mandated Metric) */}
          <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-luxe flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A86] block">
                Total Subscribers
              </span>
              <div className="font-serif text-3xl font-bold text-[#2D2A26] mt-1">
                {totalSubscribers}
              </div>
              <span className="text-[11px] text-[#7A746C] mt-0.5 block">
                Captured across all funnels
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#8A9A86]/15 text-[#5C6E59] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Today's New Leads */}
          <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-luxe flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C05746] block">
                Today's Captures
              </span>
              <div className="font-serif text-3xl font-bold text-[#2D2A26] mt-1">
                {todayCount}
              </div>
              <span className="text-[11px] text-[#7A746C] mt-0.5 block">
                Real-time active submissions
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#C05746]/15 text-[#C05746] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Free Lead Magnet Source */}
          <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-luxe flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E3A88D] block">
                72-Hour Reset Leads
              </span>
              <div className="font-serif text-3xl font-bold text-[#2D2A26] mt-1">
                100%
              </div>
              <span className="text-[11px] text-[#7A746C] mt-0.5 block">
                Primary organic acquisition
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E3A88D]/20 text-[#B85834] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: System Offer URL */}
          <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 shadow-luxe flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#736E67] block">
                Store Destination
              </span>
              <div className="text-xs font-semibold text-[#2D2A26] mt-1 truncate">
                herhorizon.store
              </div>
              <span className="text-[10px] text-[#8C867E]">
                Rebuild System ($13.50)
              </span>
            </div>
            <div className="pt-2 flex items-center space-x-2 text-[11px] text-[#C05746]">
              <a
                href="https://www.herhorizon.store/l/rebuild-system/REBUILD50"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center space-x-1 font-medium"
              >
                <span>Live Offer Link (REBUILD50)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Data Table Container */}
        <div className="bg-white border border-[#EAE5DC] rounded-3xl shadow-luxe overflow-hidden">
          
          {/* Table Header & Controls Bar */}
          <div className="p-5 sm:p-6 border-b border-[#EAE5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#2D2A26]">
                Captured Subscriber Database
              </h2>
              <p className="text-xs text-[#7A746C] mt-0.5">
                Manage, search, and export email addresses collected via the 72-Hour Reset Lead Magnet.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#9E988F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search emails or ID..."
                  className="pl-9 pr-3 py-2 bg-[#FAF9F6] border border-[#DDD8CF] rounded-xl text-xs text-[#2D2A26] placeholder-[#9E988F] focus:outline-none focus:ring-1 focus:ring-[#8A9A86] w-48 sm:w-60"
                />
              </div>

              {/* Add Manual Lead */}
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center space-x-1.5 bg-[#2D2A26] hover:bg-black text-white px-3.5 py-2 rounded-xl text-xs font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Email</span>
              </button>

              {/* Clear Data */}
              {subscribers.length > 0 && (
                <button
                  onClick={handleClearAllData}
                  className="p-2 text-red-500 hover:text-red-700 border border-[#DDD8CF] rounded-xl text-xs hover:bg-red-50 transition-colors"
                  title="Clear all subscriber records"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Table View: ID, Email Address, Date Subscribed, Source */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#EAE5DC] text-left text-xs">
              <thead className="bg-[#FAF9F6] text-[#736E67] uppercase font-semibold tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-3.5">ID</th>
                  <th scope="col" className="px-6 py-3.5">Name &amp; Email Address</th>
                  <th scope="col" className="px-6 py-3.5">Date Subscribed</th>
                  <th scope="col" className="px-6 py-3.5">Source (72-Hour Reset)</th>
                  <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#F0ECE4] text-[#3E3A36]">
                {filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="max-w-sm mx-auto space-y-2">
                        <div className="w-12 h-12 rounded-full bg-[#8A9A86]/15 text-[#5C6E59] flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h4 className="font-serif text-base font-semibold text-[#2D2A26]">
                          {subscribers.length === 0 ? 'No subscribers yet' : 'No matching results'}
                        </h4>
                        <p className="text-xs text-[#7A746C]">
                          {subscribers.length === 0
                            ? 'Your database is fresh and clean. When readers claim the Free 72-Hour Reset & 2 A.M. Answer Guide, their details will appear here automatically in real time.'
                            : `No subscribers found matching "${searchTerm}".`}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((sub) => {
                    const dateFormatted = new Date(sub.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <tr key={sub.id} className="hover:bg-[#FAF9F6]/80 transition-colors">
                        {/* ID */}
                        <td className="px-6 py-4 font-mono font-medium text-[#736E67]">
                          {sub.id}
                        </td>

                        {/* Name & Email Address */}
                        <td className="px-6 py-4">
                          <div>
                            <span className="font-semibold text-[#2D2A26] text-sm block">
                              {sub.name || 'Anonymous Reader'}
                            </span>
                            <span className="text-xs text-[#736E67]">
                              {sub.email}
                            </span>
                          </div>
                        </td>

                        {/* Date Subscribed */}
                        <td className="px-6 py-4 text-[#635E59]">
                          {dateFormatted}
                        </td>

                        {/* Source (72-Hour Reset) */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center space-x-1 bg-[#8A9A86]/15 text-[#5C6E59] px-2.5 py-1 rounded-full font-medium text-[11px] border border-[#8A9A86]/30">
                            <span>{sub.source || '72-Hour Reset'}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right space-x-2">
                          {/* Preview Email Template */}
                          <button
                            onClick={() => setSelectedSubscriber(sub)}
                            className="p-1.5 text-[#5C6E59] hover:text-[#2D2A26] bg-[#8A9A86]/10 hover:bg-[#8A9A86]/20 rounded-lg transition-colors inline-flex items-center space-x-1"
                            title="Preview fulfillment email"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="text-[11px] hidden md:inline">Inspect</span>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(sub.id, sub.email)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="p-4 bg-[#FAF9F6] border-t border-[#EAE5DC] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A746C] gap-2">
            <span>
              Showing <strong>{filteredSubscribers.length}</strong> of <strong>{subscribers.length}</strong> total email records
            </span>
            <span className="font-serif italic">
              All leads stored locally and synchronized in real time.
            </span>
          </div>

        </div>

      </main>

      {/* Manual Add Subscriber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#E8E3DA] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl">
            <h3 className="font-serif text-xl font-semibold text-[#2D2A26] mb-2">
              Add Subscriber Manually
            </h3>
            <p className="text-xs text-[#736E67] mb-6">
              Enter an email address to capture into the 72-Hour Reset audience list.
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
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD8CF] rounded-xl text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
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
                  className="w-full px-4 py-2.5 bg-white border border-[#DDD8CF] rounded-xl text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#EAE5DC]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-full text-xs font-medium text-[#736E67] hover:bg-[#EAE5DC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#8A9A86] hover:bg-[#778873] text-white rounded-full text-xs font-medium shadow-sm transition-colors"
                >
                  Save Subscriber
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
