import React from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Send,
  Clapperboard,
  TrendingUp,
  Code,
  Compass,
  Palmtree,
  Cpu,
  Layers,
  Award,
} from 'lucide-react';

interface DivisionDetailPageProps {
  divisionId: string;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceName?: string) => void;
}

export const DivisionDetailPage: React.FC<DivisionDetailPageProps> = ({
  divisionId,
  onNavigate,
  onOpenLeadModal,
}) => {
  const { divisions, services, projects } = useCms();
  const division = divisions.find((d) => d.id === divisionId) || divisions[0];

  const getDivisionIcon = (id: string) => {
    switch (id) {
      case 'media-production':
        return <Clapperboard className="w-8 h-8 text-blue-500" />;
      case 'digital-marketing':
        return <TrendingUp className="w-8 h-8 text-sky-500" />;
      case 'web-technologies':
        return <Code className="w-8 h-8 text-indigo-500" />;
      case 'consultancy':
        return <Compass className="w-8 h-8 text-emerald-500" />;
      case 'serenity-tours':
        return <Palmtree className="w-8 h-8 text-teal-500" />;
      case 'swanique-ai':
        return <Cpu className="w-8 h-8 text-purple-500" />;
      default:
        return <Sparkles className="w-8 h-8 text-blue-500" />;
    }
  };

  const relatedServices = services.filter((s) => {
    if (division.id === 'media-production') return s.category === 'Media';
    if (division.id === 'digital-marketing') return s.category === 'Marketing';
    if (division.id === 'web-technologies') return s.category === 'Technology';
    if (division.id === 'consultancy') return s.category === 'Consulting';
    return true;
  });

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="division-detail-view">
      <JsonLd
        type="Service"
        data={{
          name: division.name,
          description: division.description,
          provider: {
            '@type': 'Organization',
            name: 'Swanaya Media Enterprises',
          },
        }}
      />

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/divisions')}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Divisions</span>
      </button>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700/80">
              {getDivisionIcon(division.id)}
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                SWANAYA ENTERPRISE DIVISION
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {division.name}
              </h1>
            </div>
          </div>

          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {division.tagline}
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {division.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenLeadModal(division.name)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Engage {division.shortName}</span>
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Schedule Consultation
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <img
              src={division.heroImage}
              alt={division.name}
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 bg-slate-950 text-xs text-slate-300 font-mono flex items-center justify-between">
              <span>{division.name} Hub</span>
              <span className="text-blue-400">Direct Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Areas & Capabilities Grid */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            OPERATIONAL DOMAINS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Specialized Capabilities & Deliverables
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {division.focusAreas.map((focus, i) => (
            <div
              key={focus}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                0{i + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {focus}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Executed under strict enterprise-grade quality control, certified audio-visual formats, or modern scalable software engineering guidelines.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Division Key Highlights */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Why Partner With {division.name}?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {division.highlights.map((item) => (
            <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Services in this Division */}
      {relatedServices.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              SERVICES DIRECTORY
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Related Services Provided by {division.shortName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => onNavigate(`/services/${srv.slug}`)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {srv.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {srv.shortDescription}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>View Deliverables & SLA</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
