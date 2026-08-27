import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import {
  FileCode2,
  CheckCircle2,
  Layers,
  Globe2,
  Copy,
  ExternalLink,
  Code,
  ShieldCheck,
} from 'lucide-react';

export const TechnicalSeoPage: React.FC = () => {
  const { siteSettings, services, divisions, projects, blogPosts, seoSettings } = useCms();
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'schema' | 'aeo'>('sitemap');
  const [copied, setCopied] = useState(false);

  const baseUrl = 'https://swanayamedia.com';

  const sitemapUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/about`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/divisions`, priority: '0.9', changefreq: 'weekly' },
    ...divisions.map((d) => ({ loc: `${baseUrl}/divisions/${d.id}`, priority: '0.8', changefreq: 'weekly' })),
    { loc: `${baseUrl}/services`, priority: '0.9', changefreq: 'weekly' },
    ...services.map((s) => ({ loc: `${baseUrl}/services/${s.slug}`, priority: '0.8', changefreq: 'weekly' })),
    { loc: `${baseUrl}/projects`, priority: '0.9', changefreq: 'weekly' },
    ...projects.map((p) => ({ loc: `${baseUrl}/projects/${p.slug}`, priority: '0.7', changefreq: 'monthly' })),
    { loc: `${baseUrl}/products`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/team`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/insights`, priority: '0.9', changefreq: 'daily' },
    ...blogPosts.map((b) => ({ loc: `${baseUrl}/insights/${b.slug}`, priority: '0.7', changefreq: 'monthly' })),
    { loc: `${baseUrl}/social`, priority: '0.7', changefreq: 'daily' },
    { loc: `${baseUrl}/contact`, priority: '0.9', changefreq: 'monthly' },
  ];

  const xmlSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsTxtContent = `# robots.txt for Swanaya Media Enterprises
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

# AI Crawlers & Answer Engines explicit indexing permissions
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: siteSettings.companyName,
    url: baseUrl,
    logo: `${baseUrl}/assets/swanaya-logo.svg`,
    description: siteSettings.brandStatement,
    email: siteSettings.primaryEmail,
    telephone: siteSettings.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kochi & Calicut',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    sameAs: Object.values(siteSettings.socialLinks),
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="technical-seo-dashboard">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold tracking-wider uppercase">
          <FileCode2 className="w-3.5 h-3.5" />
          <span>TECHNICAL SEO & AEO SCHEMAS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          SEO & Answer Engine Architecture
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
          Real-time dynamic verification for XML Sitemaps, robots.txt directives, AI Crawler permissions, and JSON-LD schema graphs.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { key: 'sitemap', label: 'XML Sitemap (Dynamic)' },
          { key: 'robots', label: 'robots.txt Directives' },
          { key: 'schema', label: 'JSON-LD Schema Graph' },
          { key: 'aeo', label: 'AEO Entity Mapping' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        {activeTab === 'sitemap' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Dynamic XML Sitemap ({sitemapUrls.length} Canonical URLs)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compliant with Google Search Console & Bing Webmaster specifications.
                </p>
              </div>
              <button
                onClick={() => handleCopy(xmlSitemapContent)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy XML'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-96 leading-relaxed border border-slate-800">
              {xmlSitemapContent}
            </pre>
          </div>
        )}

        {activeTab === 'robots' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  robots.txt Permissions
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explicitly permits GPTBot, ClaudeBot, Google-Extended, and Perplexity for AEO readiness.
                </p>
              </div>
              <button
                onClick={() => handleCopy(robotsTxtContent)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy robots.txt'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-96 leading-relaxed border border-slate-800">
              {robotsTxtContent}
            </pre>
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Organization & Entity JSON-LD Schema
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Rendered in document head across all responsive routes.
                </p>
              </div>
              <button
                onClick={() => handleCopy(JSON.stringify(organizationSchema, null, 2))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy JSON-LD'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-blue-300 font-mono text-xs overflow-x-auto max-h-96 leading-relaxed border border-slate-800">
              {JSON.stringify(organizationSchema, null, 2)}
            </pre>
          </div>
        )}

        {activeTab === 'aeo' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Answer Engine Optimization (AEO) Blueprint
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct answer pairs engineered for generative engines (ChatGPT, Google Gemini Search, Perplexity AI).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Query: What is Swanaya Media Enterprises?
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Swanaya Media Enterprises is a Kerala-based multidisciplinary corporate enterprise offering creative media production, digital marketing, web engineering, business consultancy, and luxury experiential travel solutions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Query: Who founded Swanaya Media Enterprises?
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Swanaya Media Enterprises is directed by Aadithyan M. Menon (Managing Director & Creative Head) and executive leadership in Kerala, India.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Query: What are the 6 business divisions of Swanaya?
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  The six business divisions are: (1) Swanaya Media Production, (2) Swanaya Digital Marketing, (3) Swanaya Web & Tech Solutions, (4) Swanaya Business Consultancy, (5) Swanaya Serenity Tours, and (6) Swanique AI Platforms.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Query: What is the official contact email for Swanaya?
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  The primary official contact and RFP email is swanayamediaproduction@gmail.com.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
