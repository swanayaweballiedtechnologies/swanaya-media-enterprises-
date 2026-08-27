import React from 'react';
import { useCms } from '../context/CmsContext';
import { JsonLd } from '../components/common/JsonLd';
import { ReadingProgressBar } from '../components/common/ReadingProgressBar';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Sparkles,
  ArrowRight,
  Share2,
  Tag,
  Bookmark,
} from 'lucide-react';

interface InsightDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const InsightDetailPage: React.FC<InsightDetailPageProps> = ({ slug, onNavigate }) => {
  const { blogPosts } = useCms();
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id);

  return (
    <div className="py-12 space-y-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="insight-detail-view">
      {/* Subtle Scrolling Reading Progress Bar */}
      <ReadingProgressBar label={post.title} showPercentage={true} />

      <JsonLd
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.featuredImage,
          datePublished: post.publishedDate,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Swanaya Media Enterprises',
          },
        }}
      />

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/insights')}
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Insights</span>
      </button>

      {/* Article Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTimeMinutes} min read</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>{post.author}</span>
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {post.excerpt}
        </p>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl bg-slate-900">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-80 sm:h-[420px] object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* AEO Direct Answer Summary Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-300 uppercase">
          <Sparkles className="w-4 h-4" />
          <span>Executive Summary & Key Takeaway (AEO)</span>
        </div>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          {post.content.split('\n\n')[0]}
        </p>
      </div>

      {/* Article Body Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-base space-y-6">
        {post.content.split('\n\n').slice(1).map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </article>

      {/* Tags Row */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono font-bold text-slate-400 mr-2 flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" />
          <span>TAGS:</span>
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Author Card */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          {post.author.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Written by {post.author}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Contributing Editor & Strategist • Swanaya Media Enterprises
          </p>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            More Perspectives from Swanaya
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/insights/${rel.slug}`)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {rel.title}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {rel.category} • {rel.readingTimeMinutes} min read
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
