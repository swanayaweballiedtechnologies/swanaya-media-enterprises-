import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Project } from '../../types';
import { Plus, Edit2, Trash2, X, Save, TrendingUp } from 'lucide-react';

export const AdminProjectsView: React.FC = () => {
  const { projects, createProject, updateProject, deleteProject } = useCms();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    client: '',
    year: '2026',
    category: 'Tourism & Hospitality',
    shortDescription: '',
    challenge: '',
    solution: '',
    results: ['Metric 1: +100%'],
    servicesProvided: ['Video Production', 'Marketing'],
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      client: '',
      year: '2026',
      category: 'Tourism & Hospitality',
      shortDescription: '',
      challenge: '',
      solution: '',
      results: ['Measurable outcome 1: +250% Growth'],
      servicesProvided: ['Cinematic Production', 'Performance Ads'],
      thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
    });
  };

  const handleStartEdit = (proj: Project) => {
    setEditingProject(proj);
    setIsCreating(false);
    setFormData({ ...proj });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.client) return;

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (isCreating) {
      createProject({
        title: formData.title,
        slug,
        client: formData.client,
        category: formData.category || 'Tourism & Hospitality',
        divisionId: formData.divisionId || 'media-production',
        relatedServiceSlug: formData.relatedServiceSlug || 'video-production',
        shortDescription: formData.shortDescription || '',
        challenge: formData.challenge || '',
        strategy: formData.strategy || 'Comprehensive strategic roadmap',
        execution: formData.execution || 'Multi-platform execution',
        results: formData.results || ['Successful delivery and quantifiable growth'],
        technologies: formData.technologies || ['Cinematic 4K', 'React', 'Meta Ads'],
        thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
        gallery: formData.gallery || [],
        publishedDate: formData.publishedDate || '27 August 2026',
        isFeatured: formData.isFeatured ?? true,
        published: formData.published ?? true,
      });
      setIsCreating(false);
    } else if (editingProject) {
      updateProject({
        ...editingProject,
        ...formData,
        slug,
      } as Project);
      setEditingProject(null);
    }
  };

  return (
    <div className="space-y-6" id="admin-projects-cms">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Case Studies & Portfolio CMS
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish client case studies, measurable metrics, and visual production galleries.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </button>
      </div>

      {/* Editing Form */}
      {(isCreating || editingProject) && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isCreating ? 'Create New Case Study' : `Edit Case Study: ${editingProject?.title}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingProject(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Short Summary
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Thumbnail Image URL
              </label>
              <input
                type="text"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Case Study</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3">Project Title</th>
                <th className="p-3">Client</th>
                <th className="p-3">Category</th>
                <th className="p-3">Key Result</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </td>
                  <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">
                    {proj.client} ({proj.year})
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold uppercase">
                      {proj.category}
                    </span>
                  </td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    {proj.results[0]}
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleStartEdit(proj)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
