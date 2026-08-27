import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import { FAQSection } from '../components/common/FAQSection';
import { TestimonialsSection } from '../components/common/TestimonialsSection';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Clapperboard,
  TrendingUp,
  Code,
  Compass,
  Palmtree,
  Cpu,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const { services } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Media', 'Marketing', 'Technology', 'Branding', 'Consulting', 'Travel'];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="services-index-page">
      <JsonLd
        type="WebSite"
        data={{
          name: 'Swanaya Professional Services',
          description: 'Full-spectrum media production, digital marketing, web engineering, branding, and consulting services.',
        }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SERVICES DIRECTORY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Comprehensive Media, Technology & Growth Solutions
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Engineered with Answer Engine Optimization (AEO), verified deliverables, and high-performance SLAs for progressive enterprises.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            onClick={() => onNavigate(`/services/${srv.slug}`)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={srv.coverImage}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono uppercase text-white font-bold">
                  {srv.category}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {srv.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {srv.shortDescription}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                    Key Deliverables:
                  </span>
                  <div className="space-y-1">
                    {srv.deliverables.slice(0, 3).map((d) => (
                      <div key={d} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="line-clamp-1">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 border-t border-slate-100 dark:border-slate-800/80 mt-4 pt-4">
              <span>View Service Breakdown</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Client Endorsements & Social Proof */}
      <div className="pt-12 border-t border-slate-200 dark:border-slate-800" id="services-testimonials-section">
        <TestimonialsSection
          title="Social Proof & Verified Client Endorsements"
          subtitle="See how organizations across hospitality, retail, manufacturing, tech, and D2C brands leverage Swanaya’s multidisciplinary teams."
          badgeText="VALIDATED SUCCESS STORIES"
          onOpenLeadModal={onOpenLeadModal}
        />
      </div>

      {/* Comprehensive Knowledge Base & FAQs */}
      <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
        <FAQSection
          title="Services & Engagement FAQ"
          subtitle="Explore frequently asked questions regarding our digital marketing, business consultancy, video production pipelines, and technology stacks."
          badgeText="SERVICES KNOWLEDGE BASE"
          onOpenLeadModal={onOpenLeadModal}
        />
      </div>
    </div>
  );
};
