import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { SEOSetting } from '../../types';
import { Save, Globe2, Sparkles, CheckCircle2, Search, Code2 } from 'lucide-react';

export const AdminSeoView: React.FC = () => {
  const { seoSettings = [], updateSEOSetting } = useCms();
  const safeSeoSettings = seoSettings || [];

  const [selectedRoute, setSelectedRoute] = useState<string>(safeSeoSettings[0]?.route || '/');
  const [saved, setSaved] = useState(false);

  const currentSetting = safeSeoSettings.find((s) => s.route === selectedRoute) || safeSeoSettings[0] || {
    route: '/',
    title: 'Swanaya Media Enterprises',
    description: 'Digital Headquarters',
    keywords: ['Swanaya'],
    ogTitle: 'Swanaya Media Enterprises',
    ogDescription: 'Official Site',
    ogImage: '',
    canonical: 'https://swanayamedia.com/',
    schemaType: 'Organization' as const,
  };

  const [formData, setFormData] = useState<SEOSetting>(currentSetting);

  const handleSelectRoute = (route: string) => {
    setSelectedRoute(route);
    const found = safeSeoSettings.find((s) => s.route === route);
    if (found) {
      setFormData(found);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEOSetting(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl" id="admin-seo-management-view">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            SEO, Meta Tags & AEO Controls
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Route-by-route search engine optimization, OpenGraph tags, and AI entity schemas.
          </p>
        </div>
      </div>

      {/* Route Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
        {safeSeoSettings.map((s) => (
          <button
            key={s.route}
            type="button"
            onClick={() => handleSelectRoute(s.route)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              selectedRoute === s.route
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {s.route}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {saved && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/40 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>SEO & Schema settings successfully updated for route: {formData.route}!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Route Path
            </label>
            <input
              type="text"
              readOnly
              value={formData.route}
              className="w-full px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              JSON-LD Schema Entity Type
            </label>
            <select
              value={formData.schemaType}
              onChange={(e) => setFormData({ ...formData, schemaType: e.target.value as any })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            >
              <option value="Organization">Organization</option>
              <option value="WebSite">WebSite</option>
              <option value="WebPage">WebPage</option>
              <option value="Service">Service</option>
              <option value="Article">Article</option>
              <option value="Product">Product</option>
              <option value="Person">Person</option>
              <option value="FAQPage">FAQPage</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Meta Title (Target 55–60 chars)
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Meta Description (Target 140–160 chars)
          </label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Canonical URL
            </label>
            <input
              type="url"
              value={formData.canonical}
              onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              OpenGraph Social Share Image URL
            </label>
            <input
              type="url"
              value={formData.ogImage}
              onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Target Semantic Keywords (Comma Separated)
          </label>
          <input
            type="text"
            value={(formData.keywords || []).join(', ')}
            onChange={(e) =>
              setFormData({
                ...formData,
                keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
              })
            }
            className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Configuration for {formData.route}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
