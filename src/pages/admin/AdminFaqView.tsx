import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { FAQ } from '../../types';
import {
  HelpCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles,
  ArrowUpDown,
  Filter,
  Check,
  X,
  AlertCircle,
  RotateCcw,
  Building2,
  TrendingUp,
  Compass,
  Code,
  Clapperboard,
  Palmtree,
  MessageSquare,
} from 'lucide-react';
import { INITIAL_FAQS } from '../../data/initialData';

export const AdminFaqView: React.FC = () => {
  const { faqs, updateFAQ, createFAQ, deleteFAQ, services } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Published' | 'Draft'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewFaq, setPreviewFaq] = useState<FAQ | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Form State for Create/Edit
  const [formData, setFormData] = useState<{
    question: string;
    answer: string;
    category: string;
    relatedServiceSlug: string;
    published: boolean;
  }>({
    question: '',
    answer: '',
    category: 'Marketing',
    relatedServiceSlug: '',
    published: true,
  });

  const categories = useMemo(() => {
    const list = Array.from(new Set(faqs.map((f) => f.category))).filter(Boolean);
    return ['All', ...list];
  }, [faqs]);

  const defaultCategoriesList = [
    'Marketing',
    'Consulting',
    'Media Production',
    'Technology',
    'Branding',
    'Travel',
    'General',
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCat =
        selectedCategory === 'All' ||
        faq.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Published' && faq.published) ||
        (selectedStatus === 'Draft' && !faq.published);
      const matchesSearch =
        !searchQuery.trim() ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesStatus && matchesSearch;
    });
  }, [faqs, selectedCategory, selectedStatus, searchQuery]);

  const stats = useMemo(() => {
    const total = faqs.length;
    const published = faqs.filter((f) => f.published).length;
    const drafts = total - published;
    const marketingCount = faqs.filter((f) => f.category.toLowerCase().includes('marketing')).length;
    const consultingCount = faqs.filter((f) => f.category.toLowerCase().includes('consulting')).length;
    return { total, published, drafts, marketingCount, consultingCount };
  }, [faqs]);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleOpenCreateModal = () => {
    setEditingFaq(null);
    setFormData({
      question: '',
      answer: '',
      category: 'Marketing',
      relatedServiceSlug: '',
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      relatedServiceSlug: faq.relatedServiceSlug || '',
      published: faq.published,
    });
    setIsModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert('Please fill out both the question and answer fields.');
      return;
    }

    if (editingFaq) {
      updateFAQ({
        ...editingFaq,
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category.trim(),
        relatedServiceSlug: formData.relatedServiceSlug.trim() || undefined,
        published: formData.published,
      });
      showNotification('FAQ item updated successfully!');
    } else {
      createFAQ({
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category.trim(),
        relatedServiceSlug: formData.relatedServiceSlug.trim() || undefined,
        published: formData.published,
      });
      showNotification('New FAQ item published successfully!');
    }

    setIsModalOpen(false);
  };

  const handleTogglePublish = (faq: FAQ) => {
    updateFAQ({
      ...faq,
      published: !faq.published,
    });
    showNotification(`FAQ status updated to ${!faq.published ? 'Published' : 'Draft'}`);
  };

  const handleDelete = (id: string) => {
    deleteFAQ(id);
    setDeleteConfirmId(null);
    if (previewFaq?.id === id) setPreviewFaq(null);
    showNotification('FAQ deleted successfully.');
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to restore the official default Swanaya FAQs? Any custom added items will be replaced.'
      )
    ) {
      INITIAL_FAQS.forEach((faq) => {
        const exists = faqs.find((f) => f.id === faq.id);
        if (exists) {
          updateFAQ(faq);
        } else {
          createFAQ(faq);
        }
      });
      showNotification('Default FAQs restored successfully.');
    }
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'marketing':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'consulting':
      case 'business':
        return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'media production':
      case 'media':
        return 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'technology':
      case 'web':
        return 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'travel':
      case 'tourism':
        return 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-8" id="admin-faq-management-view">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE CMS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            FAQ & AEO Content Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Publish and manage questions and answers to streamline client onboarding and feed Answer Engine Optimization (AEO).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
            title="Restore default FAQ dataset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New FAQ</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {feedbackMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{feedbackMsg}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-slate-400 block uppercase">Total Questions</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{stats.total}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-emerald-500 block uppercase">Published Live</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.published}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-amber-500 block uppercase">Drafts</span>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{stats.drafts}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-blue-500 block uppercase">Marketing FAQs</span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{stats.marketingCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-mono text-emerald-500 block uppercase">Consulting FAQs</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.consultingCount}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions, answers, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-mono"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published Only</option>
              <option value="Draft">Drafts Only</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List Table / Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
            FAQ Registry ({filteredFaqs.length} Items)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Synced with Live Public Site
          </span>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No FAQs matched your filters
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query or category filter, or create a new question.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="p-5 sm:p-6 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border ${getCategoryBadgeColor(
                        faq.category
                      )}`}
                    >
                      {faq.category}
                    </span>

                    {faq.relatedServiceSlug && (
                      <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                        Link: {faq.relatedServiceSlug}
                      </span>
                    )}

                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        faq.published
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          faq.published ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      {faq.published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center gap-2 flex-shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => handleTogglePublish(faq)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                      faq.published
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                    title={faq.published ? 'Unpublish to draft' : 'Publish to live site'}
                  >
                    {faq.published ? 'Unpublish' : 'Publish'}
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(faq)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
                    title="Edit FAQ"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {deleteConfirmId === faq.id ? (
                    <div className="flex items-center gap-1 bg-red-50 dark:bg-red-950/60 p-1 rounded-xl border border-red-200 dark:border-red-800">
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded-lg"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(faq.id)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-6">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingFaq ? 'Edit FAQ Content' : 'Create New FAQ Item'}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Internal Content Management
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="p-6 pt-0 space-y-4">
              {/* Question Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., What is the typical production timeline for a brand commercial?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              {/* Answer Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                  Answer * (AEO Optimized)
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide a comprehensive, authoritative answer outlining processes, deliverables, SLAs, and clear expectations..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white focus:outline-none leading-relaxed"
                />
              </div>

              {/* Category & Related Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {defaultCategoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                    Link to Specific Service (Optional)
                  </label>
                  <select
                    value={formData.relatedServiceSlug}
                    onChange={(e) =>
                      setFormData({ ...formData, relatedServiceSlug: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- None (Global FAQ) --</option>
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.slug}>
                        {srv.name} ({srv.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="faq-published-toggle"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <label
                  htmlFor="faq-published-toggle"
                  className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  Publish Immediately to Website & AI Schema
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingFaq ? 'Save Changes' : 'Publish FAQ'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
