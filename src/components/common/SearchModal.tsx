import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { Search, X, ArrowRight, FileText, Layers, Briefcase, Sparkles, User, HelpCircle, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { services, divisions, projects, products, blogPosts, teamMembers, faqs } = useCms();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Services' | 'Divisions' | 'Projects' | 'Products' | 'Insights' | 'Team'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveCategory('All');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle logic if outside
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Categorized search items
  const results: {
    id: string;
    title: string;
    description: string;
    category: 'Services' | 'Divisions' | 'Projects' | 'Products' | 'Insights' | 'Team' | 'Pages';
    path: string;
    icon: React.ReactNode;
  }[] = [];

  // 1. Divisions
  divisions.forEach((div) => {
    if (!q || div.name.toLowerCase().includes(q) || div.description.toLowerCase().includes(q) || div.focusAreas.some((f) => f.toLowerCase().includes(q))) {
      results.push({
        id: 'div-' + div.id,
        title: div.name,
        description: div.tagline + ' — ' + div.description,
        category: 'Divisions',
        path: `/divisions/${div.id}`,
        icon: <Layers className="w-4 h-4 text-blue-500" />,
      });
    }
  });

  // 2. Services
  services.forEach((srv) => {
    if (!q || srv.name.toLowerCase().includes(q) || srv.shortDescription.toLowerCase().includes(q) || srv.category.toLowerCase().includes(q)) {
      results.push({
        id: 'srv-' + srv.id,
        title: srv.name,
        description: `${srv.category} • ${srv.shortDescription}`,
        category: 'Services',
        path: `/services/${srv.slug}`,
        icon: <Sparkles className="w-4 h-4 text-sky-500" />,
      });
    }
  });

  // 3. Projects
  projects.forEach((proj) => {
    if (!q || proj.title.toLowerCase().includes(q) || proj.client.toLowerCase().includes(q) || proj.category.toLowerCase().includes(q)) {
      results.push({
        id: 'proj-' + proj.id,
        title: proj.title,
        description: `Client: ${proj.client} • ${proj.category}`,
        category: 'Projects',
        path: `/projects/${proj.slug}`,
        icon: <Briefcase className="w-4 h-4 text-emerald-500" />,
      });
    }
  });

  // 4. Products
  products.forEach((prod) => {
    if (!q || prod.name.toLowerCase().includes(q) || prod.tagline.toLowerCase().includes(q) || prod.shortDescription.toLowerCase().includes(q)) {
      results.push({
        id: 'prod-' + prod.id,
        title: prod.name,
        description: `${prod.category} (${prod.status}) — ${prod.tagline}`,
        category: 'Products',
        path: `/products/${prod.slug}`,
        icon: <Sparkles className="w-4 h-4 text-purple-500" />,
      });
    }
  });

  // 5. Blogs / Insights
  blogPosts.forEach((post) => {
    if (!q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.tags.some((t) => t.toLowerCase().includes(q))) {
      results.push({
        id: 'blog-' + post.id,
        title: post.title,
        description: `${post.category} • ${post.readingTimeMinutes} min read`,
        category: 'Insights',
        path: `/insights/${post.slug}`,
        icon: <FileText className="w-4 h-4 text-amber-500" />,
      });
    }
  });

  // 6. Team Members
  teamMembers.forEach((tm) => {
    if (!q || tm.name.toLowerCase().includes(q) || tm.designation.toLowerCase().includes(q) || tm.biography.toLowerCase().includes(q)) {
      results.push({
        id: 'tm-' + tm.id,
        title: tm.name,
        description: `${tm.designation} • ${tm.department}`,
        category: 'Team',
        path: `/team/${tm.slug}`,
        icon: <User className="w-4 h-4 text-indigo-500" />,
      });
    }
  });

  const filteredResults = activeCategory === 'All'
    ? results
    : results.filter((r) => r.category === activeCategory);

  const categories = ['All', 'Services', 'Divisions', 'Projects', 'Products', 'Insights', 'Team'] as const;

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn" id="global-search-modal">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search divisions, services, case studies, products, articles, team..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            id="global-search-input"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            id="close-search-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-3 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <Search className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
              <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                No matching results found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for &lsquo;Digital Marketing&rsquo;, &lsquo;Media Production&rsquo;, &lsquo;Kerala Tourism&rsquo;, or &lsquo;Swanique AI&rsquo;.
              </p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.path)}
                className="p-3.5 rounded-xl hover:bg-blue-50/80 dark:hover:bg-slate-800/60 cursor-pointer transition-colors flex items-start justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h5>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>{filteredResults.length} indexed items found</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
