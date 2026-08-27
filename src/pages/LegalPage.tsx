import React from 'react';
import { useCms } from '../context/CmsContext';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const { siteSettings } = useCms();

  const titleMap = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie & Tracking Policy',
  };

  return (
    <div className="py-12 space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="legal-policies-page">
      <div className="space-y-2 pt-6 border-b border-slate-200 dark:border-slate-800 pb-6">
        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
          LEGAL & GOVERNANCE
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {titleMap[type]}
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          Last Updated: 27 August 2026 • Swanaya Media Enterprises
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-6">
        {type === 'privacy' && (
          <>
            <p>
              At <strong>Swanaya Media Enterprises</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), registered in Kerala, India, we are committed to protecting the privacy and confidential intellectual property of our clients, partners, and visitors.
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Information We Collect</h3>
            <p>
              We collect information you provide directly through our project consultation and inquiry forms, including full name, company designation, email address, phone/WhatsApp number, and project brief parameters.
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">2. How We Use Your Data</h3>
            <p>
              Information submitted is utilized solely to prepare technical proposals, execute media production contracts, deliver software licenses, and facilitate communications with designated project managers. We never sell, lease, or monetize client data.
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Contact & Rights</h3>
            <p>
              For data access requests or policy queries, contact our governance desk at{' '}
              <a href={`mailto:${siteSettings.primaryEmail}`} className="text-blue-600 dark:text-blue-400 font-bold">
                {siteSettings.primaryEmail}
              </a>.
            </p>
          </>
        )}

        {type === 'terms' && (
          <>
            <p>
              These Terms of Service govern the engagement and use of the digital headquarters and services of <strong>Swanaya Media Enterprises</strong>.
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Intellectual Property & Commercial Deliverables</h3>
            <p>
              All final video masters, branding guidelines, and deployed web code created for commissioned clients are transferred upon complete settlement of contractual milestones as stipulated in written Service Level Agreements (SLAs).
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Governing Jurisdiction</h3>
            <p>
              All agreements are governed in accordance with the laws of India, under the exclusive jurisdiction of the courts of Kerala.
            </p>
          </>
        )}

        {type === 'cookies' && (
          <>
            <p>
              Swanaya uses minimal technical cookies and local storage tokens strictly required for session security, admin console authentication, and aggregated visitor analytics.
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">1. First-Party Analytics</h3>
            <p>
              We prioritize privacy-preserving, first-party telemetry that avoids invasive cross-site profiling.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
