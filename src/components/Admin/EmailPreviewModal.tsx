import React from 'react';
import { X, Mail, Send, CheckCircle2, Feather, FileText, ArrowRight } from 'lucide-react';
import { Subscriber } from '../../types';

interface EmailPreviewModalProps {
  subscriber: Subscriber | null;
  isOpen: boolean;
  onClose: () => void;
  onSendTestEmail: (email: string) => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  subscriber,
  isOpen,
  onClose,
  onSendTestEmail,
}) => {
  if (!isOpen || !subscriber) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] border border-[#E8E3DA] rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAE5DC] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#8A9A86]/20 text-[#5C6E59] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A9A86] block">
                Automated Lead Fulfillment Email
              </span>
              <h3 className="font-serif text-lg font-semibold text-[#2D2A26]">
                Recipient: {subscriber.email}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7A746C] hover:text-[#2D2A26] rounded-full hover:bg-[#F0ECE4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Metadata Bar */}
        <div className="bg-[#F3EFE8] px-6 py-3 border-b border-[#EAE5DC] text-xs text-[#635E59] space-y-1">
          <p><strong>From:</strong> HerHorizon Sanctuary &lt;deliveries@herhorizon.store&gt;</p>
          <p><strong>To:</strong> {subscriber.email}</p>
          <p><strong>Subject:</strong> 🕊️ Your 72-Hour Reset Guide &amp; 2 A.M. Emergency Anchor Card</p>
        </div>

        {/* Email Body Preview */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm text-[#3E3A35] bg-white">
          
          <div className="border-b border-[#EAE5DC] pb-4">
            <span className="font-serif text-lg font-bold tracking-widest text-[#C05746] uppercase">
              HERHORIZON
            </span>
          </div>

          <p>Dear Friend,</p>

          <p className="leading-relaxed">
            Thank you for reaching out for breathing room. When you have spent years disappearing into someone else’s moods, simply pausing to reclaim your own nervous system is a quiet act of immense bravery.
          </p>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E3DA] space-y-3">
            <h4 className="font-serif font-semibold text-[#2D2A26] text-sm">
              Your Complimentary Downloads:
            </h4>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#EDE8DF]">
              <div className="flex items-center space-x-2.5 text-xs text-[#2D2A26]">
                <FileText className="w-4 h-4 text-[#8A9A86]" />
                <span className="font-medium">The 72-Hour Reset Guide (PDF)</span>
              </div>
              <a
                href="https://herhorizon.gumroad.com/l/72-hour-reset"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C05746] font-semibold hover:underline"
              >
                Download →
              </a>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#EDE8DF]">
              <div className="flex items-center space-x-2.5 text-xs text-[#2D2A26]">
                <FileText className="w-4 h-4 text-[#C05746]" />
                <span className="font-medium">The 2 A.M. Emergency Answer Guide &amp; Anchor Card (Wallet &amp; Mobile)</span>
              </div>
              <a
                href="https://herhorizon.gumroad.com/l/72-hour-reset"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#C05746] font-semibold hover:underline"
              >
                Download →
              </a>
            </div>
          </div>

          <div className="p-4 bg-[#FAF3ED] rounded-xl border-l-4 border-[#C05746] text-xs leading-relaxed text-[#5C4F46]">
            <strong>Next Step:</strong> When the initial storm passes and you are ready to rebuild the foundation of who you are, claim your 50% discount on the complete <strong>Identity Rebuild System™ ($13)</strong>.
            <div className="mt-2">
              <a
                href="https://herhorizon.gumroad.com/l/rebuild-system/REBUILD50"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C05746] font-bold hover:underline inline-flex items-center space-x-1"
              >
                <span>View Full System Details</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <p className="font-serif italic text-xs text-[#736E67]">
            With quiet solidarity,<br />
            The HerHorizon Sanctuary Team
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F2EB] border-t border-[#EAE5DC] flex items-center justify-between">
          <span className="text-xs text-[#7A746C]">
            Lead ID: {subscriber.id} • Status: {subscriber.status.toUpperCase()}
          </span>
          <button
            onClick={() => onSendTestEmail(subscriber.email)}
            className="inline-flex items-center space-x-1.5 bg-[#8A9A86] hover:bg-[#778873] text-white px-4 py-2 rounded-full text-xs font-medium transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Simulate Re-Sending Email</span>
          </button>
        </div>

      </div>
    </div>
  );
};
