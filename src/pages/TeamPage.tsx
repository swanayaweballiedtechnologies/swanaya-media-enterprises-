import React from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import {
  User,
  ArrowRight,
  Sparkles,
  Linkedin,
  Instagram,
  Mail,
  Award,
} from 'lucide-react';

interface TeamPageProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const { teamMembers } = useCms();

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="team-index-page">
      <JsonLd
        type="WebSite"
        data={{
          name: 'Swanaya Leadership & Creative Directors',
          description: 'The creative visionaries, producers, growth marketers, and engineers behind Swanaya Media Enterprises.',
        }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
          <User className="w-3.5 h-3.5" />
          <span>LEADERSHIP & TALENT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          The Minds Driving Swanaya
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          An interdisciplinary team of film directors, data scientists, software architects, and tourism strategists unified under one vision.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((tm) => (
          <div
            key={tm.id}
            onClick={() => onNavigate(`/team/${tm.slug}`)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-72 overflow-hidden">
                <img
                  src={tm.photograph}
                  alt={tm.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-600 text-white font-bold uppercase">
                    {tm.department}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {tm.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {tm.designation}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {tm.biography}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {tm.expertise.slice(0, 3).map((exp) => (
                    <span
                      key={exp}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 border-t border-slate-100 dark:border-slate-800 pt-4">
              <span>View Executive Profile</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Careers / Work With Us Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Join the Swanaya Media Enterprises Family
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          We are constantly looking for talented cinematographers, media editors, performance media buyers, full-stack engineers, and tour directors.
        </p>
        <div className="pt-2">
          <a
            href="mailto:swanayamediaproduction@gmail.com?subject=Career%20Inquiry%20-%20Swanaya%20Media%20Enterprises"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Send CV & Portfolio to HR</span>
          </a>
        </div>
      </div>
    </div>
  );
};
