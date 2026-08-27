import React from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import {
  ArrowLeft,
  Linkedin,
  Instagram,
  Mail,
  Award,
  CheckCircle2,
  Send,
  Phone,
  MessageSquare,
} from 'lucide-react';

interface TeamDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceName?: string) => void;
}

export const TeamDetailPage: React.FC<TeamDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const { teamMembers } = useCms();
  const member = teamMembers.find((m) => m.slug === slug) || teamMembers[0];

  const waUrl = member.socialLinks?.whatsapp || (member.socialLinks?.phone ? `https://wa.me/${member.socialLinks.phone.replace(/[^0-9]/g, '')}` : null);
  const phoneCall = member.socialLinks?.phone ? `tel:${member.socialLinks.phone.replace(/[^0-9+]/g, '')}` : null;

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="team-detail-view">
      <JsonLd
        type="Person"
        data={{
          name: member.name,
          jobTitle: member.designation,
          worksFor: {
            '@type': 'Organization',
            name: 'Swanaya Media Enterprises',
          },
          sameAs: [member.socialLinks?.linkedin, member.socialLinks?.instagram].filter(Boolean),
        }}
      />

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/team')}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Team</span>
      </button>

      {/* Profile Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl bg-slate-900 sticky top-24">
            <img
              src={member.photograph}
              alt={member.name}
              className="w-full h-96 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-6 bg-slate-950 text-white space-y-3">
              <div>
                <h2 className="text-xl font-bold text-white">{member.name}</h2>
                <p className="text-xs text-blue-400 font-mono mt-0.5">{member.designation}</p>
                {member.socialLinks?.phone && (
                  <p className="text-xs text-emerald-400 font-mono font-bold mt-1">
                    {member.socialLinks.phone}
                  </p>
                )}
              </div>

              {/* Social & Direct Contact Channels */}
              <div className="flex items-center flex-wrap gap-2 pt-2 border-t border-slate-800">
                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/60 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold font-mono"
                    title="Direct WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {phoneCall && (
                  <a
                    href={phoneCall}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    title="Direct Call"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                {member.socialLinks?.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600/40 text-slate-300 hover:text-blue-400 border border-slate-800 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.socialLinks?.instagram && (
                  <a
                    href={member.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-pink-600/40 text-slate-300 hover:text-pink-400 border border-slate-800 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={`mailto:${member.socialLinks?.email || 'swanayamediaproduction@gmail.com'}`}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-emerald-600/40 text-slate-300 hover:text-emerald-400 border border-slate-800 transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              <span>{member.department} Division</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {member.name}
            </h1>
            <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
              {member.designation} — Swanaya Media Enterprises
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase font-mono text-xs tracking-wider">
              Executive Biography & Background
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {member.biography}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase font-mono text-xs tracking-wider">
              Core Areas of Expertise
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {member.expertise.map((exp) => (
                <div
                  key={exp}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{exp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">Consult directly with {member.name.split(' ')[0]}</h4>
              <p className="text-xs text-slate-300 mt-0.5">Engage Swanaya for strategic creative, marketing, or tech direction.</p>
            </div>
            <button
              onClick={() => onOpenLeadModal(`Executive Consultation with ${member.name}`)}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex-shrink-0 flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Book Discussion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
