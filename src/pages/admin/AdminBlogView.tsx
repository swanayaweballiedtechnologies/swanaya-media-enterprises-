import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { BlogPost } from '../../types';
import { Plus, Edit2, Trash2, X, Save, FileText } from 'lucide-react';

export const AdminBlogView: React.FC = () => {
  const { blogPosts, createBlogPost, updateBlogPost, deleteBlogPost } = useCms();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Strategy & Growth',
    author: 'Aadithyan M. Menon',
    publishedDate: '27 August 2026',
    readingTimeMinutes: 5,
    featuredImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    tags: ['MediaStrategy', 'Swanaya'],
    isPublished: true,
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Strategy & Growth',
      author: 'Aadithyan M. Menon',
      publishedDate: '27 August 2026',
      readingTimeMinutes: 5,
      featuredImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
      tags: ['MediaStrategy', 'Swanaya'],
      isPublished: true,
    });
  };

  const handleStartEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
    setFormData({ ...post });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt) return;

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (isCreating) {
      createBlogPost({
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content || formData.excerpt,
        category: formData.category || 'Strategy & Growth',
        author: (formData.author as any)?.name
          ? (formData.author as any)
          : {
              name: typeof formData.author === 'string' ? formData.author : 'Aadithyan M. Menon',
              role: 'Managing Director & Founder',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            },
        publishedAt: formData.publishedAt || '27 August 2026',
        readTime: formData.readTime || '5 min read',
        coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
        tags: formData.tags || ['Swanaya', 'Media Strategy'],
        isFeatured: formData.isFeatured ?? true,
        published: formData.published ?? true,
        views: formData.views || 1420,
      });
      setIsCreating(false);
    } else if (editingPost) {
      updateBlogPost({
        ...editingPost,
        ...formData,
        slug,
      } as BlogPost);
      setEditingPost(null);
    }
  };

  return (
    <div className="space-y-6" id="admin-blog-cms">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Insights & Editorial Publishing
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish thought leadership articles with automated reading time and SEO tags.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Editing Form */}
      {(isCreating || editingPost) && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isCreating ? 'Author New Article' : `Edit Article: ${editingPost?.title}`}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingPost(null);
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
                  Article Title *
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
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Executive Excerpt (AEO Summary) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Article Content
              </label>
              <textarea
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingPost(null);
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
                <span>Publish Article</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Author</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">
                    {post.title}
                  </td>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400 font-bold">
                    {post.category}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    {post.author}
                  </td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">
                    {post.publishedDate}
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleStartEdit(post)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete post "${post.title}"?`)) {
                          deleteBlogPost(post.id);
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
