import React from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import {
  Sparkles,
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  ArrowRight,
  Send,
  Layers,
  Award,
  Globe2,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const { siteSettings, teamMembers } = useCms();

  const coreValues = [
    {
      title: 'Excellence in Execution',
      desc: 'We reject mediocre output. Every film frame, line of code, and ad parameter is tuned for benchmark quality.',
      icon: <Award className="w-5 h-5 text-blue-500" />,
    },
    {
      title: 'Integrated Synchronization',
      desc: 'No fragmented agency silos. Media, code, marketing, and strategy speak the same language.',
      icon: <Layers className="w-5 h-5 text-sky-500" />,
    },
    {
      title: 'Data-Backed Authenticity',
      desc: 'Creative intuition sharpened by empirical metrics and transparent conversion tracking.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    },
    {
      title: 'Strategic Empathy',
      desc: 'Understanding client business models deeply before recommending tactics or creative treatments.',
      icon: <Compass className="w-5 h-5 text-indigo-500" />,
    },
    {
      title: 'Responsible Scalability',
      desc: 'Building sustainable brand equity and software architectures that stand the test of time.',
      icon: <Target className="w-5 h-5 text-purple-500" />,
    },
    {
      title: 'Global Vision, Local Soul',
      desc: 'Rooted proudly in Kerala’s cultural vibrancy while engineering international-caliber solutions.',
      icon: <Globe2 className="w-5 h-5 text-amber-500" />,
    },
  ];

  return (
    <div className="py-12 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-page">
      <JsonLd
        type="Article"
        data={{
          headline: 'About Swanaya Media Enterprises',
          description: siteSettings.brandStatement,
          author: {
            '@type': 'Organization',
            name: siteSettings.companyName,
          },
        }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT SWANAYA</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Where Creative Media Meets Advanced Technology
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Swanaya Media Enterprises is a modern integrated corporate enterprise architecting the future of brand storytelling, performance growth, and bespoke software.
        </p>
      </div>

      {/* Origin & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            01 — OUR STORY & FOUNDATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built to Eliminate the Modern Vendor Divide
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Traditionally, a business looking to establish authority had to juggle five disjointed agencies: a production house for videos, a performance agency for ads, a software shop for web portals, a business consultant for strategy, and a travel planner for executive retreats.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Swanaya Media Enterprises was founded to unify these forces. By converging creative cinema, algorithmic growth marketing, modern engineering, and corporate travel under one cohesive operational structure, we deliver unprecedented speed, consistency, and return on investment.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => onNavigate('/divisions')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              Explore Our 6 Divisions
            </button>
            <button
              onClick={onOpenLeadModal}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Work With Us
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
              alt="Swanaya Leadership and Production Team at Work"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 bg-slate-950 text-xs text-slate-300 font-mono flex items-center justify-between">
              <span>Swanaya Media Enterprises • Kerala Headquarters</span>
              <span className="text-emerald-400">● Operational 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-blue-900/10 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Corporate Mission</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To empower enterprises, tourism boards, and creators with world-class media production, precision performance marketing, robust web technologies, and strategic consultation that drive quantifiable commercial growth and lasting brand distinction.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-indigo-900/10 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Long-Term Vision</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To become South India’s most respected and technologically advanced media and business ecosystem, recognized globally for cinematic authenticity, data mastery, and cutting-edge software products.
          </p>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            OUR GUIDING PRINCIPLES
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Core Values That Define Swanaya
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val) => (
            <div
              key={val.title}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 w-fit">
                {val.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {val.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
              EXECUTIVE LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Guided by Experienced Innovators
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/team')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider"
          >
            <span>Meet All Directors & Leads</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((tm) => (
            <div
              key={tm.id}
              onClick={() => onNavigate(`/team/${tm.slug}`)}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <img
                src={tm.photograph}
                alt={tm.name}
                className="w-full h-44 object-cover rounded-xl mb-3"
                referrerPolicy="no-referrer"
              />
              <h4 className="text-sm font-bold text-white">{tm.name}</h4>
              <p className="text-xs text-slate-400">{tm.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
