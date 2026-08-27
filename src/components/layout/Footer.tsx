import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useCms } from '../../context/CmsContext';
import { openElaraAgent, ElaraAgentButton } from '../common/CustomerSuccessAgent';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  ArrowUpRight,
  Shield,
  FileCode2,
  Globe2,
  CheckCircle2,
  MessageSquare,
  Bot,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenLeadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLeadModal }) => {
  const { siteSettings, divisions, services } = useCms();

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-12 select-none" id="main-corporate-footer">
      {/* Top Banner: Follow Swanaya Media Enterprises Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-900/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-semibold tracking-wider uppercase border border-blue-400/30">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Ecosystem Connect</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                FOLLOW SWANAYA MEDIA ENTERPRISES
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Stay connected with our latest commercial films, performance marketing breakthroughs, technological SaaS releases, and Kerala travel expeditions.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:justify-end">
              <button
                onClick={openElaraAgent}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0075E3] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-blue-500/20"
                id="footer-elara-agent-btn"
              >
                <Bot className="w-4 h-4" />
                <span>Elara AI Agent</span>
              </button>
              <button
                onClick={() => handleNav('/social')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-white/20"
                id="footer-follow-journey-btn"
              >
                <span>Follow Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenLeadModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-900/40"
                id="footer-start-project-btn"
              >
                <span>Start Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
        {/* Column 1: Company Monogram & Positioning */}
        <div className="lg:col-span-2 space-y-4">
          <button onClick={() => handleNav('/')} className="focus:outline-none text-left">
            <BrandLogo variant="light" size="lg" />
          </button>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
            {siteSettings.brandStatement}
          </p>

          <div className="space-y-2 pt-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <a
                href={`mailto:${siteSettings.primaryEmail}`}
                className="hover:text-blue-300 transition-colors"
              >
                {siteSettings.primaryEmail}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <a
                href="https://wa.me/918289900297?text=Hello%20Swanaya%20Media%20Enterprises"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
              >
                <span>{siteSettings.phone}</span>
                <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-700/50">WhatsApp</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>{siteSettings.location}</span>
            </div>
          </div>

          {/* Social Channels Row */}
          <div className="flex items-center gap-2 pt-3">
            <a
              href="https://wa.me/918289900297?text=Hello%20Swanaya%20Media%20Enterprises"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600/30 text-slate-300 hover:text-emerald-400 border border-slate-800 transition-colors"
              title="WhatsApp Official (+91 82899 00297)"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href={siteSettings.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-pink-600/30 text-slate-300 hover:text-pink-400 border border-slate-800 transition-colors"
              title="Instagram @swanaya_media_production"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={siteSettings.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-sky-600/30 text-slate-300 hover:text-sky-400 border border-slate-800 transition-colors"
              title="LinkedIn Corporate"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={siteSettings.socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-red-600/30 text-slate-300 hover:text-red-400 border border-slate-800 transition-colors"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={siteSettings.socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600/30 text-slate-300 hover:text-blue-400 border border-slate-800 transition-colors"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Divisions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
            Divisions
          </h4>
          <ul className="space-y-2 text-xs">
            {divisions.map((div) => (
              <li key={div.id}>
                <button
                  onClick={() => handleNav(`/divisions/${div.id}`)}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  {div.shortName}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Core Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
            Services
          </h4>
          <ul className="space-y-2 text-xs">
            {services.slice(0, 6).map((srv) => (
              <li key={srv.id}>
                <button
                  onClick={() => handleNav(`/services/${srv.slug}`)}
                  className="text-slate-400 hover:text-white transition-colors text-left line-clamp-1"
                >
                  {srv.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNav('/services')}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                View All Services →
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Quick Navigation & Governance */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
            Explore & SEO
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleNav('/about')} className="text-slate-400 hover:text-white">
                About Swanaya
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('/projects')} className="text-slate-400 hover:text-white">
                Project Portfolio
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('/products')} className="text-slate-400 hover:text-white">
                Digital Products & AI
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('/team')} className="text-slate-400 hover:text-white">
                Leadership Team
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('/insights')} className="text-slate-400 hover:text-white">
                Insights & Blog
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-Footer: Copyright & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <div>
          © {new Date().getFullYear()} Swanaya Media Enterprises. All rights reserved. Registered in Kerala, India.
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNav('/legal/privacy')}
            className="hover:text-slate-300 transition-colors"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => handleNav('/legal/terms')}
            className="hover:text-slate-300 transition-colors"
          >
            Terms of Service
          </button>
          <button
            onClick={() => handleNav('/legal/cookies')}
            className="hover:text-slate-300 transition-colors"
          >
            Cookie Policy
          </button>
        </div>
      </div>
    </footer>
  );
};
