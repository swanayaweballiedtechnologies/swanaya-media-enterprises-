import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { MediaAsset } from '../../types';
import { Plus, Copy, Trash2, Check, Upload } from 'lucide-react';

export const AdminMediaView: React.FC = () => {
  const { mediaAssets, uploadMediaAsset, deleteMediaAsset } = useCms();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<MediaAsset['category']>('Projects');

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    uploadMediaAsset({
      fileName: newTitle,
      url: newUrl,
      mimeType: 'image/jpeg',
      fileSizeBytes: 1850000,
      altText: newTitle,
      category: newCategory,
    });

    setNewTitle('');
    setNewUrl('');
  };

  return (
    <div className="space-y-6" id="admin-media-library-view">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Central Media & Asset Library
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Digital asset management for 4K video masters, aerial stills, and branding graphics.
          </p>
        </div>
      </div>

      {/* Upload / Add Asset Bar */}
      <form onSubmit={handleAddMedia} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-blue-600" />
          <span>Register New Media Asset</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            required
            placeholder="Asset Title (e.g. Kerala Cinema Reel 2026)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
          />

          <input
            type="url"
            required
            placeholder="Asset Public URL (https://...)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono"
          />

          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as any)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
          >
            <option value="Projects">Projects</option>
            <option value="Branding">Branding</option>
            <option value="Services">Services</option>
            <option value="Team">Team</option>
            <option value="Blog">Blog</option>
            <option value="General">General</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold font-mono transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Asset</span>
          </button>
        </div>
      </form>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaAssets.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 bg-slate-950 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.altText}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-white font-bold">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {item.fileName}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{item.mimeType}</span>
                    <span>{(item.fileSizeBytes / 1048576).toFixed(1)} MB</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Delete media asset?')) {
                      deleteMediaAsset(item.id);
                    }
                  }}
                  className="p-1 rounded text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
