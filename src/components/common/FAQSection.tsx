import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { JsonLd } from './JsonLd';
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  PhoneCall,
  Send,
  Building2,
  TrendingUp,
  Compass,
  Code,
  Clapperboard,
  Palmtree,
  Filter,
} from 'lucide-react';

export interface FAQSectionProps {
  initialCategory?: string;
  serviceSlug?: string;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  showSearch?: boolean;
  showCategories?: boolean;
  showSupportCard?: boolean;
  limit?: number;
  onOpenLeadModal?: (serviceName?: string) => void;
  className?: string;
  id?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  initialCategory = 'All',
  serviceSlug,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about our digital media, marketing campaigns, business consultancy, and technology deliverables.',
  badgeText = 'KNOWLEDGE BASE & AEO DIRECTORY',
  showSearch = true,
  showCategories = true,
  showSupportCard = true,
  limit,
  onOpenLeadModal,
  className = '',
  id = 'faq-section',
}) => {
  const { faqs, siteSettings } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIds, setOpenFaqIds] = useState<Set<string>>(() => {
    // Default open first FAQ item if available
    const initialSet = new Set<string>();
    const published = faqs.filter((f) => f.published);
    if (published.length > 0) {
      initialSet.add(published[0].id);
    }
    return initialSet;
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Available categories based on existing published FAQs
  const availableCategories = useMemo(() => {
    const published = faqs.filter((f) => f.published);
    const cats = Array.from(new Set(published.map((f) => f.category))).filter(Boolean);
    return ['All', ...cats];
  }, [faqs]);

  // Filtered FAQs based on category, serviceSlug, and searchQuery
  const filteredFaqs = useMemo(() => {
    let list = faqs.filter((f) => f.published);

    if (serviceSlug) {
      // Prioritize service specific FAQs or match service slug or match category
      const specific = list.filter((f) => f.relatedServiceSlug === serviceSlug);
      if (specific.length >= 3) {
        list = specific;
      }
    }

    if (selectedCategory !== 'All') {
      list = list.filter(
        (f) => f.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }

    if (limit && limit > 0) {
      list = list.slice(0, limit);
    }

    return list;
  }, [faqs, serviceSlug, selectedCategory, searchQuery, limit]);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopyAnswer = (faq: { id: string; question: string; answer: string }) => {
    const textToCopy = `Q: ${faq.question}\n\nA: ${faq.answer}\n\n— Swanaya Media Enterprises`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(faq.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'marketing':
        return <TrendingUp className="w-3.5 h-3.5 text-blue-500" />;
      case 'consulting':
      case 'business':
        return <Compass className="w-3.5 h-3.5 text-emerald-500" />;
      case 'media production':
      case 'media':
        return <Clapperboard className="w-3.5 h-3.5 text-sky-500" />;
      case 'technology':
      case 'web':
        return <Code className="w-3.5 h-3.5 text-indigo-500" />;
      case 'travel':
      case 'tourism':
        return <Palmtree className="w-3.5 h-3.5 text-teal-500" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  // Structured schema for AEO & Google FAQPage
  const faqSchemaData = useMemo(() => {
    return {
      mainEntity: filteredFaqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    };
  }, [filteredFaqs]);

  const founderWa = (siteSettings.founderPhone || '8289900297').replace(/[^0-9]/g, '');
  const marketingWa = (siteSettings.marketingPhone || '7012945221').replace(/[^0-9]/g, '');

  return (
    <section className={`space-y-10 ${className}`} id={id}>
      {/* AEO Json-LD FAQPage Schema */}
      <JsonLd type="FAQPage" data={faqSchemaData} />

      {/* Header Block */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        {badgeText && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>{badgeText}</span>
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Interactive Controls: Search & Category Filter */}
      {(showSearch || showCategories) && (
        <div className="max-w-4xl mx-auto space-y-4">
          {showSearch && (
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by keywords (e.g., ad budget, consulting retainer, turnaround time, tech stack)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                id="faq-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {showCategories && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {availableCategories.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500/60'
                    }`}
                  >
                    {cat !== 'All' && getCategoryIcon(cat)}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* FAQ Accordion List */}
      <div className="max-w-4xl mx-auto space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No matching questions found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              We couldn't find an answer matching &ldquo;{searchQuery}&rdquo;. Feel free to reach out directly to our team on WhatsApp or send a message.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Reset Filters
              </button>
              <a
                href={`https://wa.me/${marketingWa}?text=${encodeURIComponent(`Hello, I have a question about Swanaya: ${searchQuery}`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIds.has(faq.id);
            const isMarketing = faq.category.toLowerCase().includes('marketing');
            const targetWa = isMarketing ? marketingWa : founderWa;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-slate-900 border-blue-500/60 dark:border-blue-500/50 shadow-md ring-1 ring-blue-500/20'
                    : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1.5 flex-1 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {getCategoryIcon(faq.category)}
                        <span>{faq.category}</span>
                      </span>
                      {faq.relatedServiceSlug && (
                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                          #{faq.relatedServiceSlug}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 mt-0.5 ${
                      isOpen
                        ? 'bg-blue-600 text-white rotate-180 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 mt-1">
                    <p className="pt-4 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>

                    {/* Action Bar on Expanded Answer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${targetWa}?text=${encodeURIComponent(`Hello, I was reading your FAQ about "${faq.question}" and would like more details.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 font-bold transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Clarify on WhatsApp</span>
                        </a>

                        {onOpenLeadModal && (
                          <button
                            onClick={() => onOpenLeadModal(faq.relatedServiceSlug || faq.category)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold transition-colors"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Request Quote</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleCopyAnswer(faq)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors ml-auto"
                        title="Copy question and answer"
                      >
                        {copiedId === faq.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Answer</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Direct Support Banner */}
      {showSupportCard && (
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Support & Inquiry Channels</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              Have a specific project requirement or custom RFP?
            </h3>
            <p className="text-xs text-slate-400 max-w-lg">
              Our leadership and marketing directors review project inquiries within 24 hours. Contact our desks directly for immediate response.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            <a
              href={`https://wa.me/${founderWa}?text=${encodeURIComponent('Hello Aadithyan, I have an inquiry regarding Swanaya Media Enterprises.')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Founder Desk</span>
            </a>
            <a
              href={`https://wa.me/${marketingWa}?text=${encodeURIComponent('Hello Afsal, I would like to discuss a marketing campaign brief.')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Marketing Lead</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
