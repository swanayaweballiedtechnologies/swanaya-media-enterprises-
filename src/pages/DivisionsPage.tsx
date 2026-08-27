import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import {
  Clapperboard,
  TrendingUp,
  Code,
  Compass,
  Palmtree,
  Cpu,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface DivisionsPageProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceName?: string) => void;
}

export const DivisionsPage: React.FC<DivisionsPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const { divisions, services } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const getDivisionIcon = (id: string) => {
    switch (id) {
      case 'media-production':
        return <Clapperboard className="w-6 h-6 text-blue-500" />;
      case 'digital-marketing':
        return <TrendingUp className="w-6 h-6 text-sky-500" />;
      case 'web-technologies':
        return <Code className="w-6 h-6 text-indigo-500" />;
      case 'consultancy':
        return <Compass className="w-6 h-6 text-emerald-500" />;
      case 'serenity-tours':
        return <Palmtree className="w-6 h-6 text-teal-500" />;
      case 'swanique-ai':
        return <Cpu className="w-6 h-6 text-purple-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="divisions-index-page">
      <JsonLd
        type="WebSite"
        data={{
          name: 'Swanaya Business Divisions',
          description: 'Specialized business arms of Swanaya Media Enterprises across Media, Marketing, Tech, Travel, and AI.',
        }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>BUSINESS DIVISIONS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Six Unified Business Divisions
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Each division is headed by subject-matter directors and powered by dedicated infrastructure, working together as a seamless growth engine for our partners.
        </p>
      </div>

      {/* Division Cards */}
      <div className="space-y-12">
        {divisions.map((div, idx) => {
          const divisionServices = services.filter((s) => s.category.toLowerCase().includes(div.shortName.toLowerCase()) || (div.id === 'media-production' && s.category === 'Media') || (div.id === 'digital-marketing' && s.category === 'Marketing') || (div.id === 'web-technologies' && s.category === 'Technology') || (div.id === 'consultancy' && s.category === 'Consulting'));

          return (
            <div
              key={div.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              id={`division-card-${div.id}`}
            >
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700/80">
                    {getDivisionIcon(div.id)}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                      DIVISION 0{idx + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {div.name}
                    </h2>
                  </div>
                </div>

                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {div.tagline}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {div.description}
                </p>

                {/* Focus Areas Pills */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Core Capabilities & Domains:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {div.focusAreas.map((f) => (
                      <span
                        key={f}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate(`/divisions/${div.id}`)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <span>Division Deep-Dive</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenLeadModal(div.name)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Engage Division
                  </button>
                </div>
              </div>

              {/* Right Media / Highlights Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md">
                  <img
                    src={div.heroImage}
                    alt={div.name}
                    className="w-full h-56 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Division Highlights
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {div.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
