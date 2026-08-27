import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { Testimonial } from '../../types';
import { JsonLd } from './JsonLd';
import {
  Star,
  CheckCircle2,
  Quote,
  ArrowRight,
  Sparkles,
  Compass,
  TrendingUp,
  Code,
  Clapperboard,
  Award,
  Building2,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  categoryFilter?: string;
  relatedServiceSlug?: string;
  showFilters?: boolean;
  showStats?: boolean;
  limit?: number;
  onOpenLeadModal?: (serviceName?: string) => void;
  className?: string;
}

const CATEGORY_TABS = [
  { id: 'ALL', label: 'All Client Reviews', icon: Award },
  { id: 'Consulting', label: 'Strategic Consulting', icon: Compass },
  { id: 'Branding', label: 'Brand Strategy & Design', icon: Sparkles },
  { id: 'Marketing', label: 'Performance Marketing', icon: TrendingUp },
  { id: 'Technology', label: 'Web Engineering', icon: Code },
  { id: 'Media', label: 'Cinematic Media', icon: Clapperboard },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = 'Validated Client Results & Trust',
  subtitle = 'Discover how Swanaya’s strategic consulting, branding systems, performance marketing, and web technologies drive measurable enterprise value.',
  badgeText = 'CLIENT ENDORSEMENTS & SOCIAL PROOF',
  categoryFilter,
  relatedServiceSlug,
  showFilters = true,
  showStats = true,
  limit,
  onOpenLeadModal,
  className = '',
}) => {
  const { testimonials, navigateTo } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>(categoryFilter || 'ALL');

  // Filter published testimonials
  const filteredTestimonials = useMemo(() => {
    let list = testimonials.filter((t) => t.published !== false);

    // If a specific category is forced via prop
    if (categoryFilter && categoryFilter !== 'ALL') {
      list = list.filter((t) => {
        if (t.category?.toLowerCase() === categoryFilter.toLowerCase()) return true;
        if (t.company.toLowerCase().includes(categoryFilter.toLowerCase())) return true;
        return false;
      });
      return limit ? list.slice(0, limit) : list;
    }

    // If an interactive category tab is chosen
    if (activeCategory !== 'ALL') {
      list = list.filter((t) => {
        if (!t.category) return true;
        return t.category.toLowerCase() === activeCategory.toLowerCase();
      });
    }

    // Sort featured first
    list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

    return limit ? list.slice(0, limit) : list;
  }, [testimonials, activeCategory, categoryFilter, limit]);

  // Aggregate JSON-LD Review & Rating schema
  const schemaData = useMemo(() => {
    return {
      name: 'Swanaya Media Enterprises Client Testimonials & Consulting Reviews',
      itemReviewed: {
        '@type': 'Organization',
        name: 'Swanaya Media Enterprises',
        url: 'https://swanayamedia.com',
        telephone: '+91 97782 52936',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kozhikode',
          addressRegion: 'Kerala',
          addressCountry: 'IN',
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.96',
        reviewCount: testimonials.length.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      review: filteredTestimonials.slice(0, 5).map((t) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: t.clientName,
          jobTitle: t.designation,
          worksFor: {
            '@type': 'Organization',
            name: t.company,
          },
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: t.rating.toString(),
          bestRating: '5',
        },
        reviewBody: t.quote,
      })),
    };
  }, [testimonials, filteredTestimonials]);

  const handleProjectClick = (projectSlug?: string) => {
    if (projectSlug) {
      navigateTo(`/projects/${projectSlug}`);
    } else {
      navigateTo('/projects');
    }
  };

  return (
    <div className={`space-y-10 ${className}`} id="testimonials-component-root">
      {/* JSON-LD Review Schema */}
      <JsonLd type="Review" data={schemaData} />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/60 dark:border-blue-800/60 text-[11px] font-mono font-bold tracking-wider text-blue-700 dark:text-blue-300 uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{badgeText}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Trust & Social Proof Highlights Bar */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
              4.96/5.0
            </div>
            <div className="flex justify-center items-center gap-1 text-amber-400 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Verified Client Rating
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              ₹45Cr+
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Revenue Generated
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              For Our Client Partners
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              120+
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Brands Transformed
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              India & GCC Markets
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">
              99.2%
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Retainer Retention
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Long-Term Relationships
            </p>
          </div>
        </div>
      )}

      {/* Category Tabs (if enabled and no single filter forced) */}
      {showFilters && !categoryFilter && (
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pt-2" id="testimonials-category-tabs">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="testimonials-cards-grid">
        {filteredTestimonials.map((test) => (
          <div
            key={test.id}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Header: Rating & Category Tag */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {test.metricHighlight && (
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {test.metricHighlight}
                  </span>
                )}
              </div>

              {/* Quote text with quote icon */}
              <div className="relative">
                <Quote className="w-6 h-6 text-blue-500/15 dark:text-blue-400/10 absolute -top-2 -left-1 pointer-events-none" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed pt-2 pl-3 border-l-2 border-blue-500/30">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Footer: Client Info & Optional Case Study link */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={test.photo}
                    alt={test.clientName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5" title="Verified Client">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {test.clientName}
                    </h4>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                    {test.designation}
                  </p>
                  <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 truncate flex items-center gap-1">
                    <Building2 className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{test.company}</span>
                  </p>
                </div>
              </div>

              {test.projectSlug && (
                <button
                  onClick={() => handleProjectClick(test.projectSlug)}
                  className="w-full mt-2 py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 transition-colors flex items-center justify-between"
                >
                  <span>Read Client Case Study</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Consultation & Engagement Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Transform Your Brand & Enterprise?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Partner with Swanaya’s Strategic Consultants & Creators
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Book a 30-minute growth roadmap audit or discuss an integrated branding, video production, or marketing retainer.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
          <button
            onClick={() => onOpenLeadModal ? onOpenLeadModal('Strategic Consulting & Branding') : navigateTo('/contact')}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
            id="testimonials-consultation-cta-btn"
          >
            <span>START A CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateTo('/projects')}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors"
          >
            View Portfolio & Case Studies
          </button>
        </div>
      </div>
    </div>
  );
};

export const Testimonials = TestimonialsSection;
