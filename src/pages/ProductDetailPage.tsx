import React from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  Sparkles,
  Cpu,
  Layers,
  Shield,
  Zap,
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (serviceName?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenLeadModal,
}) => {
  const { products } = useCms();
  const product = products.find((p) => p.slug === slug) || products[0];

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="product-detail-view">
      <JsonLd
        type="Product"
        data={{
          name: product.name,
          description: product.shortDescription,
          brand: {
            '@type': 'Brand',
            name: 'Swanaya Media Enterprises',
          },
        }}
      />

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/products')}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </button>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase">
              {product.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {product.name}
          </h1>

          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {product.tagline}
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {product.fullDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenLeadModal(`Product Demo / License: ${product.name}`)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Request Platform Demo / License</span>
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Enterprise Deployment
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl bg-slate-900">
            <img
              src={product.coverImage}
              alt={product.name}
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 bg-slate-950 text-xs text-slate-300 font-mono flex items-center justify-between">
              <span>{product.name}</span>
              <span className="text-blue-400">Enterprise Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features & Architecture Grid */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            PRODUCT CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key Architecture & Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.features.map((feat, i) => (
            <div
              key={feat}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                0{i + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {feat}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Automated pipeline with robust error boundaries, strict security, and zero-loss redundancy.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
