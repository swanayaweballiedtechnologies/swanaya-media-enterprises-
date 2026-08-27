import React from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import { ReadingProgressBar } from '../components/common/ReadingProgressBar';
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  Sparkles,
  TrendingUp,
  Target,
  Quote,
  Star,
  ArrowRight,
} from 'lucide-react';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceName?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const { projects } = useCms();
  const project = projects.find((p) => p.slug === slug) || projects[0];

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="project-detail-view">
      {/* Subtle Scrolling Reading Progress Bar */}
      <ReadingProgressBar label={project.title} showPercentage={true} />

      <JsonLd
        type="Article"
        data={{
          headline: project.title,
          description: project.shortDescription,
          author: {
            '@type': 'Organization',
            name: 'Swanaya Media Enterprises',
          },
        }}
      />

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/projects')}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Case Studies</span>
      </button>

      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Client: <strong className="text-slate-800 dark:text-slate-200">{project.client}</strong> • {project.year}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Hero Thumbnail Banner */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-80 sm:h-[450px] object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Key Metrics / Results Callout Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white space-y-6 shadow-xl border border-blue-800/40">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
            EMPIRICAL RESULTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Key Measurable Outcomes & ROI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.results.map((res, i) => (
            <div
              key={res}
              className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-2"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                <TrendingUp className="w-4 h-4" />
                <span>Metric 0{i + 1}</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                {res}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Problem & Solution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>The Challenge</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            What Was Holding Growth Back?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>The Swanaya Strategy</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            The Multi-Division Execution
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Visual Gallery */}
      {project.gallery.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              VISUAL ASSETS
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Production Stills & Campaign Gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((imgUrl, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm h-64">
                <img
                  src={imgUrl}
                  alt={`${project.title} gallery shot ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Client Testimonial if present */}
      {project.testimonial && (
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-base sm:text-lg italic text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            &ldquo;{project.testimonial.quote}&rdquo;
          </p>
          <div className="pt-2 text-xs font-bold text-slate-900 dark:text-white">
            {project.testimonial.author} — <span className="text-slate-500 font-normal">{project.testimonial.role}</span>
          </div>
        </div>
      )}

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">
          Want Similar Measurable Results for Your Brand?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Let’s discuss your current challenges and engineer a custom multi-division solution.
        </p>
        <button
          onClick={() => onOpenLeadModal(project.category)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Discuss Your Campaign</span>
        </button>
      </div>
    </div>
  );
};
