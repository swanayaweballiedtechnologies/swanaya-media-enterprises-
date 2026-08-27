import React from 'react';
import { useCms } from '../context/CmsContext';
import { HeroScene3D } from '../components/3d/HeroScene3D';
import { JsonLd } from '../components/common/JsonLd';
import { FAQSection } from '../components/common/FAQSection';
import { TestimonialsSection } from '../components/common/TestimonialsSection';
import {
  ArrowRight,
  Send,
  CheckCircle2,
  Sparkles,
  Clapperboard,
  TrendingUp,
  Code,
  Compass,
  Palmtree,
  Cpu,
  Star,
  Quote,
  Eye,
  Calendar,
  ExternalLink,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenLeadModal }) => {
  const {
    siteSettings,
    divisions,
    services,
    projects,
    products,
    teamMembers,
    blogPosts,
    socialPosts,
    testimonials,
    analytics,
  } = useCms();

  const getDivisionIcon = (id: string) => {
    switch (id) {
      case 'media-production':
        return <Clapperboard className="w-5 h-5 text-blue-500" />;
      case 'digital-marketing':
        return <TrendingUp className="w-5 h-5 text-sky-500" />;
      case 'web-technologies':
        return <Code className="w-5 h-5 text-indigo-500" />;
      case 'consultancy':
        return <Compass className="w-5 h-5 text-emerald-500" />;
      case 'serenity-tours':
        return <Palmtree className="w-5 h-5 text-teal-500" />;
      case 'swanique-ai':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-500" />;
    }
  };

  const handleNodeClick = (nodeName: string) => {
    const map: Record<string, string> = {
      MEDIA: '/divisions/media-production',
      MARKETING: '/divisions/digital-marketing',
      WEB: '/divisions/web-technologies',
      TECHNOLOGY: '/divisions/web-technologies',
      BRANDING: '/services/branding',
      CONSULTANCY: '/divisions/consultancy',
      AI: '/products/swanique-ai',
      GROWTH: '/services/digital-marketing',
      SOCIAL: '/social',
    };
    if (map[nodeName]) {
      onNavigate(map[nodeName]);
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32" id="swanaya-homepage">
      <JsonLd
        type="Organization"
        data={{
          name: siteSettings.companyName,
          url: 'https://swanayamedia.com',
          logo: 'https://swanayamedia.com/assets/swanaya-logo.svg',
          description: siteSettings.brandStatement,
          email: siteSettings.primaryEmail,
          telephone: siteSettings.phone,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kochi & Calicut',
            addressRegion: 'Kerala',
            addressCountry: 'India',
          },
          sameAs: [
            siteSettings.socialLinks.instagram,
            siteSettings.socialLinks.linkedin,
            siteSettings.socialLinks.youtube,
            siteSettings.socialLinks.facebook,
          ],
        }}
      />

      {/* SECTION 1: 3D HERO SECTION */}
      <section className="relative pt-12 pb-6 sm:py-16 overflow-hidden" id="hero-section">
        {/* Subtle Ambient Radial Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Integrated Corporate Digital HQ</span>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]" style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
                SWANAYA MEDIA ENTERPRISES
              </h1>

              <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Creating Brands. Building Experiences. Growing Businesses.
              </p>

              {/* Supporting Statement */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {siteSettings.brandStatement}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/services')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 transform hover:-translate-y-0.5"
                  id="hero-explore-services-btn"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenLeadModal()}
                  className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-500 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
                  id="hero-start-project-btn"
                >
                  <Send className="w-3.5 h-3.5 text-blue-600" />
                  <span>Start a Project</span>
                </button>
              </div>

              {/* Trust Metric Micro Bar */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800/80">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">6 Divisions</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Integrated Platform</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 font-mono">₹4.5 Cr+</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Ad Spend Managed</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">99.4%</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Ecosystem Column */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-900/10 dark:bg-slate-900/40 backdrop-blur-sm p-2 shadow-2xl relative overflow-hidden">
                <HeroScene3D onNodeClick={handleNodeClick} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPANY INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="company-intro-section">
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                01 — WHO WE ARE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                An Integrated Media, Technology & Growth Ecosystem
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Swanaya Media Enterprises is a Kerala-based multidisciplinary enterprise bringing together creative media, digital marketing, web technology, and travel solutions under one roof. We work with businesses and organizations that want to move beyond traditional single-discipline vendors and establish an authoritative, performance-driven digital presence.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('/about')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-all"
                  id="intro-discover-swanaya-btn"
                >
                  <span>Discover Swanaya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/divisions')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Explore Divisions</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Single Creative Hub</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Zero vendor fragmentation. Seamless workflow from script to code.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Data & Performance</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Algorithmic ad optimization focused on real bankable revenue.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Modern Engineering</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Sub-second web architectures, AEO-ready structure, and custom SaaS.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                  04
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Serenity Tourism</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Kerala and international experiential travel logistics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BUSINESS DIVISIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="business-divisions-section">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            BUSINESS DIVISIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Six Specialized Arms. One United Enterprise.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Swanaya operates through dedicated specialized divisions capable of functioning independently or converging into a synchronized growth engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((div, idx) => (
            <div
              key={div.id}
              onClick={() => onNavigate(`/divisions/${div.id}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 group-hover:scale-110 transition-transform">
                    {getDivisionIcon(div.id)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    DIV 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {div.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    {div.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {div.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Core Focus:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {div.focusAreas.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Explore Division</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="services-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Full-Spectrum Business & Media Solutions
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Engineered with answer engine optimization (AEO), clear deliverables, and guaranteed ROI frameworks.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onNavigate(`/services/${srv.slug}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
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

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                    {srv.shortDescription}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Includes Direct Deliverables & SLA</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>View Details & Process</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: FEATURED PROJECTS / PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-projects-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              CASE STUDIES & WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Crafting Measurable Impact Across Industries
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Explore completed case studies showing challenge, strategy, execution, and bankable results.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              onClick={() => onNavigate(`/projects/${proj.slug}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-600 text-white font-bold uppercase">
                      {proj.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 line-clamp-1">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <strong>Client:</strong> {proj.client}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {proj.shortDescription}
                  </p>

                  <div className="space-y-1.5 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                    <span className="text-[10px] font-mono uppercase text-blue-600 dark:text-blue-400 font-bold block">
                      Key Measurable Outcome:
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {proj.results[0]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: PRODUCT ECOSYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="products-ecosystem-section">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border border-blue-900/50 shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Proprietary Digital Products</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Swanique AI & Swanaya Software Systems
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We develop in-house software platforms designed to optimize creative workflows, automate media management billing, and provide fine-tuned AI tools for modern agencies and enterprises.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {products.slice(0, 2).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onNavigate(`/products/${prod.slug}`)}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white group-hover:text-blue-300">
                        {prod.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/30 text-blue-200">
                        {prod.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {prod.tagline}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('/products')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
                >
                  Explore Product Suite
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  alt="Swanique AI Platform Mockup"
                  className="w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-slate-950/90 text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>● Swanique AI Neural Engine</span>
                  <span className="text-blue-400">v2.5 Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY SWANAYA — FROM IDEA TO IMPACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="why-swanaya-section">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            OUR DIFFERENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            From Idea to Impact: The Connected Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            A business may have a great product. A brand may have a great story. But without the right strategy, that story never reaches its true potential.
          </p>
        </div>

        {/* 6-Step Connected Linear Flow */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '01', title: 'IDEA', desc: 'Core business proposition & goals' },
            { step: '02', title: 'STRATEGY', desc: 'Market research & growth roadmap' },
            { step: '03', title: 'BRANDING', desc: 'Distinctive visual & vocal identity' },
            { step: '04', title: 'CONTENT', desc: 'Cinematic video & media production' },
            { step: '05', title: 'MARKETING', desc: 'Algorithmic performance ads & SEO' },
            { step: '06', title: 'GROWTH', desc: 'Sustainable revenue & market scale' },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 relative shadow-sm hover:border-blue-500 transition-colors"
            >
              <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                STEP {item.step}
              </div>
              <div className="text-base font-black text-slate-900 dark:text-white tracking-wide">
                {item.title}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: TEAM PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="team-preview-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Driven by Passion, Guided by Strategy
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Meet the executive leadership and creative visionaries orchestrating Swanaya Media Enterprises.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/team')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>View All Team Members</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.slice(0, 4).map((tm) => (
            <div
              key={tm.id}
              onClick={() => onNavigate(`/team/${tm.slug}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={tm.photograph}
                  alt={tm.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase bg-blue-600 px-2 py-0.5 rounded font-bold">
                    {tm.department}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tm.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {tm.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: TESTIMONIALS & TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="testimonials-section">
        <TestimonialsSection
          title="Endorsed by Visionary Founders & Enterprise Leaders"
          subtitle="Discover how Swanaya’s strategic consulting, branding ecosystems, performance marketing, and web technologies drive verified commercial growth across Kerala, India, and the GCC."
          badgeText="CLIENT ENDORSEMENTS & SOCIAL PROOF"
          onOpenLeadModal={onOpenLeadModal}
        />
      </section>

      {/* SECTION 10: INSIGHTS / BLOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="insights-preview-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              INSIGHTS & THOUGHT LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Knowledge for the Modern Enterprise
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Editorial perspectives on marketing trends, cinema storytelling, AI search, and business architecture.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/insights')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate(`/insights/${post.slug}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-white">
                  {post.category}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mb-1.5">
                    <span>{post.publishedDate}</span>
                    <span>•</span>
                    <span>{post.readingTimeMinutes} min read</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: SOCIAL CONTENT WALL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="social-wall-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              CONNECT WITH SWANAYA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              The Swanaya Social Feed
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/social')}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Explore All Socials →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 text-white">
                  {post.platform} • {post.contentType}
                </div>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {post.caption}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{post.likesDisplay} Likes</span>
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11.5: FAQ & KNOWLEDGE BASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-faq-section">
        <FAQSection
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our marketing retainers, video production workflows, web engineering, and strategic business consulting."
          badgeText="ANSWERS & DIRECTORY"
          onOpenLeadModal={onOpenLeadModal}
        />
      </section>

      {/* SECTION 12: FINAL CORPORATE CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12" id="final-cta-banner">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden border border-blue-800/40">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-300 uppercase">
              LET’S CREATE WHAT COMES NEXT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Ready to Accelerate Your Brand Stature & Growth?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Whether you require a cinema-grade brand documentary, high-conversion performance marketing, or an enterprise web application, Swanaya is ready to build your vision.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenLeadModal()}
              className="px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-white/20 transform hover:-translate-y-0.5"
              id="cta-start-project-btn"
            >
              Start a Project
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-4 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Contact Digital HQ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
