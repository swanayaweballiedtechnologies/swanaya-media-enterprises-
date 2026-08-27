import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { openElaraAgent } from './CustomerSuccessAgent';
import {
  MessageSquare,
  Phone,
  X,
  ExternalLink,
  ShieldCheck,
  Send,
  Sparkles,
  User,
  Building2,
  CheckCircle2,
  Bot,
} from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const { siteSettings } = useCms();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'custom'>('all');
  const [customMsg, setCustomMsg] = useState('');

  // Primary contacts
  const companyPhone = siteSettings.phone || '+91 82899 00297';
  const companyWaClean = companyPhone.replace(/[^0-9]/g, '');
  const founderPhone = siteSettings.founderPhone || '+91 82899 00297';
  const founderWaClean = founderPhone.replace(/[^0-9]/g, '');
  const marketingPhone = siteSettings.marketingPhone || '+91 70129 45221';
  const marketingWaClean = marketingPhone.replace(/[^0-9]/g, '');

  const contacts = [
    {
      id: 'founder-desk',
      title: 'Aadithyan M. Menon',
      role: 'Founder & Managing Director',
      phone: founderPhone,
      waNumber: founderWaClean || '918289900297',
      defaultMsg: 'Hello Aadithyan, I would like to discuss a strategic media and brand partnership with Swanaya.',
      isOnline: true,
      badge: 'Founder Desk',
      icon: <User className="w-4 h-4 text-blue-400" />,
    },
    {
      id: 'marketing-desk',
      title: 'Afsal P. I.',
      role: 'Marketing Team Head',
      phone: marketingPhone,
      waNumber: marketingWaClean || '917012945221',
      defaultMsg: 'Hello Afsal, I would like to inquire regarding performance marketing and campaign production.',
      isOnline: true,
      badge: 'Marketing Lead',
      icon: <Sparkles className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'official-desk',
      title: 'Swanaya Media Official Desk',
      role: 'General Inquiries & Project Briefs',
      phone: companyPhone,
      waNumber: companyWaClean || '918289900297',
      defaultMsg: 'Hello Swanaya Media Enterprises, I would like to inquire about your services.',
      isOnline: true,
      badge: 'Official HQ',
      icon: <Building2 className="w-4 h-4 text-emerald-400" />,
    },
  ];

  const handleOpenWhatsApp = (waNumber: string, message: string) => {
    const textToEncode = customMsg.trim() || message;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(textToEncode)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end" id="whatsapp-quick-connector">
      {/* Floating Popup Window */}
      {isOpen && (
        <div className="mb-3 w-[340px] sm:w-[380px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold leading-tight">Swanaya Direct Chat</h4>
                <p className="text-xs text-emerald-100 flex items-center gap-1.5 mt-0.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Typically replies in under 15 mins</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center justify-between">
            <span>DIRECT ENTERPRISE CHANNELS</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">24/7 Monitored</span>
          </div>

          {/* Contact List */}
          <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">
            {/* Featured: Elara Customer Success Agent */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white border border-blue-500/40 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-600 border border-blue-400/40 text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Elara: Customer Success Agent</h5>
                    <p className="text-[10px] text-blue-200">AI Inquiry & Project Assist</p>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Instant AI
                </span>
              </div>
              <button
                onClick={openElaraAgent}
                className="w-full py-2 px-3 rounded-xl bg-[#0075E3] hover:bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-all"
                id="widget-elara-launch-btn"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Chat with Elara Agent</span>
              </button>
            </div>

            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 border border-slate-200/70 dark:border-slate-700/60 hover:border-emerald-400/50 dark:hover:border-emerald-600/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm mt-0.5">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                          {contact.title}
                        </h5>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/40">
                          {contact.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {contact.role}
                      </p>
                      <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                        {contact.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenWhatsApp(contact.waNumber, contact.defaultMsg)}
                    className="flex-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold font-mono tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                  </button>

                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs transition-colors"
                    title={`Direct Call ${contact.phone}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Quick Text Option */}
          <div className="p-4 bg-slate-100/70 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a custom query..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customMsg.trim()) {
                    handleOpenWhatsApp(companyWaClean || '918289900297', customMsg);
                  }
                }}
                className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleOpenWhatsApp(companyWaClean || '918289900297', customMsg || 'Hello Swanaya Media Enterprises!')}
                className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors shadow-sm"
                title="Send via WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Bar */}
      <div className="flex items-center gap-2">
        {/* Elara Customer Success Agent Trigger */}
        <button
          onClick={openElaraAgent}
          className="relative group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0075E3] hover:bg-blue-600 text-white shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform active:scale-95 focus:outline-none ring-4 ring-blue-500/20"
          aria-label="Launch Elara Customer Success Agent"
          title="Elara: Customer Success Agent"
          id="floating-elara-trigger"
        >
          <div className="relative">
            <Bot className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider pr-1">
            Elara AI
          </span>
        </button>

        {/* WhatsApp Direct Support Trigger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative group flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 transform active:scale-95 focus:outline-none ring-4 ring-emerald-500/20"
          aria-label="Open WhatsApp live support"
          id="floating-whatsapp-trigger"
        >
          <div className="relative">
            <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </span>
          </div>
          <span className="text-xs font-bold font-mono tracking-wider pr-1">
            WhatsApp Direct
          </span>
        </button>
      </div>
    </div>
  );
};
