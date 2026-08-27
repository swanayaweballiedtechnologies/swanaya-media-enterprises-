import React from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import { FAQSection } from '../components/common/FAQSection';
import { TestimonialsSection } from '../components/common/TestimonialsSection';
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  Sparkles,
  HelpCircle,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceName?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const { services, projects, faqs } = useCms();
  const service = services.find((s) => s.slug === slug) || services[0];

  const relatedProjects = projects.filter(
    (p) => p.category.toLowerCase().includes(service.category.toLowerCase()) || service.name.toLowerCase().includes(p.category.toLowerCase())
  );

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="service-detail-view">
      <JsonLd
        type="Service"
        data={{
          name: service.name,
          description: service.shortDescription,
          provider: {
            '@type': 'Organization',
            name: 'Swanaya Media Enterprises',
          },
          areaServed: 'Worldwide',
        }}
      />

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/services')}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Services</span>
      </button>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
            <span>{service.category} Category</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {service.name}
          </h1>

          {/* AEO Direct Answer Box */}
          <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Overview & Definition</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {service.aeoDirectAnswer}
            </p>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {service.fullDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenLeadModal(service.name)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Request Service Proposal</span>
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Ask Questions
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <img
              src={service.coverImage}
              alt={service.name}
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 bg-slate-950 text-xs text-slate-300 font-mono flex items-center justify-between">
              <span>{service.name}</span>
              <span className="text-emerald-400">● SLA Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deliverables & Expected Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            WHAT YOU RECEIVE
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Core Service Deliverables
          </h3>
          <ul className="space-y-3 pt-2">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            BUSINESS IMPACT
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Measurable Expected Benefits
          </h3>
          <ul className="space-y-3 pt-2">
            {service.benefits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Process Flow Timeline */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            EXECUTION METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Swanaya Delivers This Solution
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.processSteps.map((step, idx) => (
            <div
              key={step}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                STEP 0{idx + 1}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {step}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Structured execution with client check-ins and verified sign-offs at each milestone.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies Linkage */}
      {relatedProjects.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              RELEVANT WORK
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Case Studies Featuring This Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigate(`/projects/${proj.slug}`)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Client: {proj.client} • {proj.category}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Client Endorsements & Social Proof */}
      <div className="pt-12 border-t border-slate-200 dark:border-slate-800" id="service-detail-testimonials">
        <TestimonialsSection
          title={`Verified Endorsements for ${service.name}`}
          subtitle={`Discover how our specialized expertise in ${service.category} and strategic execution transformed commercial results for client leaders.`}
          badgeText="SOCIAL PROOF & CASE TESTIMONIALS"
          categoryFilter={service.category}
          showFilters={false}
          showStats={false}
          onOpenLeadModal={onOpenLeadModal}
        />
      </div>

      {/* Service-Specific FAQ Component */}
      <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
        <FAQSection
          serviceSlug={service.slug}
          initialCategory={service.category}
          title={`${service.name} FAQ & Technical Guide`}
          subtitle={`Frequently asked questions and execution details specifically for ${service.name}.`}
          badgeText={`${service.category.toUpperCase()} FAQ & AEO`}
          onOpenLeadModal={onOpenLeadModal}
        />
      </div>

      {/* Final Call to Action */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white border border-blue-800/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
            START YOUR ENGAGEMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to deploy {service.name} with Swanaya?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Book a discovery consultation with our directors to review your brief, objectives, timelines, and commercial roadmap.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenLeadModal(service.name)}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Initiate Project Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
};
