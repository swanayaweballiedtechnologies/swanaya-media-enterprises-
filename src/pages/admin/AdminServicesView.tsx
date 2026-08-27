import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Service } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle2, Sparkles, X, Save } from 'lucide-react';

export const AdminServicesView: React.FC = () => {
  const { services, createService, updateService, deleteService } = useCms();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    slug: '',
    category: 'Media',
    shortDescription: '',
    fullDescription: '',
    aeoDirectAnswer: '',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    deliverables: ['Custom Deliverable 1', 'Custom Deliverable 2'],
    benefits: ['Measurable Growth Benefit 1', 'Benefit 2'],
    processSteps: ['Discovery', 'Strategy', 'Execution', 'Delivery'],
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingService(null);
    setFormData({
      name: '',
      slug: '',
      category: 'Media',
      shortDescription: '',
      fullDescription: '',
      aeoDirectAnswer: '',
      coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      deliverables: ['Custom Deliverable 1', 'Custom Deliverable 2'],
      benefits: ['Benefit 1', 'Benefit 2'],
      processSteps: ['Discovery', 'Strategy', 'Production', 'Review'],
    });
  };

  const handleStartEdit = (service: Service) => {
    setEditingService(service);
    setIsCreating(false);
    setFormData({ ...service });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (isCreating) {
      createService({
        name: formData.name,
        slug,
        category: formData.category || 'Media',
        divisionId: formData.divisionId || 'media-production',
        shortDescription: formData.shortDescription || '',
        directAnswer: formData.directAnswer || formData.shortDescription || '',
        fullOverview: formData.fullOverview || formData.shortDescription || '',
        problemsSolved: formData.problemsSolved || ['Brand visibility', 'Scalable lead generation'],
        processSteps: (formData.processSteps as any) || [
          { step: 1, title: 'Discovery & Brief', description: 'Deep audit of business goals' },
          { step: 2, title: 'Execution & Quality', description: 'High-craft production' },
        ],
        deliverables: formData.deliverables || ['4K Master Assets', 'Campaign Analytics'],
        benefits: formData.benefits || ['Accelerated Brand Growth'],
        faqs: formData.faqs || [{ question: 'How long does onboarding take?', answer: 'Within 48 hours.' }],
        iconName: formData.iconName || 'Video',
        coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
        isFeatured: formData.isFeatured ?? true,
        published: formData.published ?? true,
        order: formData.order || 1,
      });
      setIsCreating(false);
    } else if (editingService) {
      updateService({
        ...editingService,
        ...formData,
        slug,
      } as Service);
      setEditingService(null);
    }
  };

  return (
    <div className="space-y-6" id="admin-services-cms">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Services Catalog Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish, edit, and optimize commercial service offerings with Answer Engine Optimization (AEO).
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Editing / Creation Modal or Drawer */}
      {(isCreating || editingService) && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isCreating ? 'Create New Service Offering' : `Edit Service: ${editingService?.name}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingService(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Short Tagline / Overview
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                AEO Direct Answer (For AI search engines & snippets)
              </label>
              <textarea
                rows={2}
                value={formData.aeoDirectAnswer}
                onChange={(e) => setFormData({ ...formData, aeoDirectAnswer: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Cover Image URL
              </label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingService(null);
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
                <span>Save Service</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3">Service Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Deliverables</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900 dark:text-white">{srv.name}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{srv.shortDescription}</div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold uppercase">
                      {srv.category}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 font-mono">
                    {srv.deliverables.length} Deliverables
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleStartEdit(srv)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service "${srv.name}"?`)) {
                          deleteService(srv.id);
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
