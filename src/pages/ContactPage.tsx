import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import { FAQSection } from '../components/common/FAQSection';
import { ElaraAgentCard, ElaraAgentButton } from '../components/common/CustomerSuccessAgent';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Building2,
  User,
  Clock,
  ShieldCheck,
  MessageSquare,
  ArrowUpRight,
  Bot,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { siteSettings, services, faqs, submitLead, trackEvent } = useCms();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: 'Cinematic Video Production & Media',
    budgetRange: '₹3,00,000 – ₹5,00,000',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setLoading(true);
    setTimeout(() => {
      const id = submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Direct Partner',
        serviceRequired: formData.serviceRequired,
        budgetRange: formData.budgetRange,
        message: formData.message,
        source: 'Contact HQ Full Page',
      });
      trackEvent('contact_submission', { leadId: id });
      setLeadId(id);
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-12 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="contact-hq-page">
      <JsonLd
        type="Organization"
        data={{
          name: siteSettings.companyName,
          email: siteSettings.primaryEmail,
          telephone: siteSettings.phone,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: siteSettings.phone,
            contactType: 'Customer Service & Project Inquiries',
            email: siteSettings.primaryEmail,
            areaServed: 'Worldwide',
          },
        }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
          <Mail className="w-3.5 h-3.5" />
          <span>CONTACT DIGITAL HQ</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Let’s Build Something Exceptional
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Reach out directly to Swanaya Media Enterprises. Our executive leadership reviews all inquiries with an average response time of under 6 hours.
        </p>
      </div>

      {/* Main Form & Contact Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Info & Location */}
        <div className="lg:col-span-5 space-y-6">
          {/* Elara AI Customer Success Agent Card */}
          <ElaraAgentCard />

          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Direct Channels</h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active</span>
              </span>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm font-mono">
              {/* Primary Email */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] text-slate-400 block font-sans">Primary Corporate Email</span>
                  <a
                    href={`mailto:${siteSettings.primaryEmail}`}
                    className="text-white hover:text-blue-300 transition-colors font-bold"
                  >
                    {siteSettings.primaryEmail}
                  </a>
                </div>
              </div>

              {/* Company WhatsApp / Phone */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 mt-0.5">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-sans font-medium">Company Official Desk</span>
                      <span className="text-white font-bold block">{siteSettings.phone}</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/918289900297?text=${encodeURIComponent('Hello Swanaya Media Enterprises, I would like to inquire about your services.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors shadow-sm"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Founder Desk */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-sans font-medium">Founder & Managing Director (Aadithyan M. Menon)</span>
                      <span className="text-white font-bold block">{siteSettings.founderPhone || '+91 82899 00297'}</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/918289900297?text=${encodeURIComponent('Hello Aadithyan, I would like to connect regarding a strategic media and brand partnership with Swanaya.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors shadow-sm"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Marketing Team Head */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-sans font-medium">Marketing Team Head (Afsal P. I.)</span>
                      <span className="text-white font-bold block">{siteSettings.marketingPhone || '+91 70129 45221'}</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/917012945221?text=${encodeURIComponent('Hello Afsal, I would like to discuss a marketing campaign and media distribution brief.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold transition-colors shadow-sm"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 pt-1">
                <div className="p-2.5 rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-sans">Corporate Base & Studios</span>
                  <span className="text-white font-bold">{siteSettings.location}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Clock className="w-4 h-4" />
                <span>Operating Hours</span>
              </div>
              <p>Monday – Saturday: 9:00 AM – 7:30 PM IST</p>
              <p className="text-[11px] text-slate-400">24/7 WhatsApp Response for Client Campaigns & Production Inquiries.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Consultation Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Proposal Request Submitted!
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-blue-600 dark:text-blue-400">{formData.name}</strong>. Your inquiry reference ID is{' '}
                  <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-xs text-blue-600 dark:text-blue-400">
                    {leadId}
                  </code>
                  . Our team will review the specifications and reach out promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      serviceRequired: 'Cinematic Video Production & Media',
                      budgetRange: '₹3,00,000 – ₹5,00,000',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="full-contact-form">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Project Request & Consultation
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aadithyan Menon"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                      id="contact-name-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. director@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                      id="contact-email-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 82899 00297"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                      id="contact-phone-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Organization / Brand
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kerala Heritage Resorts"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                      id="contact-company-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Required Service Division
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.category})
                        </option>
                      ))}
                      <option value="Integrated Multi-Division Ecosystem">Integrated Multi-Division Ecosystem</option>
                      <option value="Swanaya Serenity Tours Custom Package">Swanaya Serenity Tours (Travel)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Budget Scale
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                    >
                      <option value="Under ₹1,00,000">Under ₹1,00,000</option>
                      <option value="₹1,00,000 – ₹3,00,000">₹1,00,000 – ₹3,00,000</option>
                      <option value="₹3,00,000 – ₹5,00,000">₹3,00,000 – ₹5,00,000</option>
                      <option value="₹5,00,000 – ₹10,00,000">₹5,00,000 – ₹10,00,000</option>
                      <option value="₹10,00,000+">₹10,00,000+</option>
                      <option value="Monthly Retainer Partnership">Monthly Retainer Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Project Overview & Strategic Targets
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your brand challenges, deliverables required, target launch dates, and expectations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white resize-none"
                    id="contact-message-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  id="contact-submit-btn"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Project Request to Swanaya</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section (AEO optimized) */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800" id="contact-faq-section">
        <FAQSection
          title="Clear Answers for Prospective Clients (AEO)"
          subtitle="Answers to common questions regarding our marketing retainers, video production pipelines, web development timelines, and NDA policies."
          badgeText="FREQUENTLY ASKED QUESTIONS"
        />
      </div>
    </div>
  );
};
