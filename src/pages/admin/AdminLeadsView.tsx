import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ContactLead, LeadStatus } from '../../types';
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Download,
  Trash2,
  FileText,
  Send,
  MessageSquare,
} from 'lucide-react';

export const AdminLeadsView: React.FC = () => {
  const { leads, updateLeadStatus, addLeadNote } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(leads[0] || null);
  const [noteInput, setNoteInput] = useState('');

  const statuses: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST'];

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !noteInput.trim()) return;
    addLeadNote(selectedLead.id, noteInput.trim());
    setNoteInput('');
  };

  const exportCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'SubmittedAt'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.company || ''}"`,
      `"${l.serviceRequired}"`,
      `"${l.budgetRange}"`,
      l.status,
      l.submittedAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `swanaya_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6" id="admin-leads-crm-view">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Client Inquiries & Lead Management CRM
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time pipeline of project requests, corporate consultations, and tour booking RFPs.
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-mono font-bold transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Pipeline</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, company, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors whitespace-nowrap ${
              statusFilter === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            All ({leads.length})
          </button>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {st} ({leads.filter((l) => l.status === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Leads List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Leads Table List */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3">Client</th>
                  <th className="p-3">Requirement</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400 font-mono">
                      No leads match current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-50/80 dark:bg-blue-950/50'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="p-3">
                          <div className="font-bold text-slate-900 dark:text-white">{lead.name}</div>
                          <div className="text-[11px] text-slate-400">{lead.company || 'Direct'}</div>
                        </td>
                        <td className="p-3 font-medium text-slate-700 dark:text-slate-300">
                          <div className="line-clamp-1">{lead.serviceRequired}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{lead.source}</div>
                        </td>
                        <td className="p-3 font-mono text-blue-600 dark:text-blue-400 font-bold whitespace-nowrap">
                          {lead.budgetRange}
                        </td>
                        <td className="p-3">
                          <select
                            value={lead.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateLeadStatus(lead.id, e.target.value as any);
                            }}
                            className="text-[10px] font-mono font-bold uppercase rounded px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead Inspector Drawer */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6 sticky top-24">
          {selectedLead ? (
            <>
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">
                    REF ID: {selectedLead.id}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedLead.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedLead.company || 'Private Client'}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  {selectedLead.status}
                </span>
              </div>

              {/* Direct Info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Email</span>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline line-clamp-1"
                  >
                    {selectedLead.email}
                  </a>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Phone / WhatsApp</span>
                  <div className="flex items-center justify-between gap-1">
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="font-bold text-slate-900 dark:text-white hover:underline text-xs"
                    >
                      {selectedLead.phone}
                    </a>
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedLead.name}, this is Swanaya Media Enterprises regarding your project inquiry for ${selectedLead.serviceRequired}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-mono px-1.5 flex items-center gap-1"
                      title="Open WhatsApp chat with lead"
                    >
                      <MessageSquare className="w-2.5 h-2.5" />
                      <span>WA</span>
                    </a>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Required Service</span>
                  <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
                    {selectedLead.serviceRequired}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">Budget Scale</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedLead.budgetRange}
                  </span>
                </div>
              </div>

              {/* Inquirer Message */}
              {selectedLead.message && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    Client Inscription / Brief:
                  </span>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic border border-slate-100 dark:border-slate-800">
                    &ldquo;{selectedLead.message}&rdquo;
                  </div>
                </div>
              )}

              {/* Internal Notes Timeline */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3" />
                  <span>Executive Notes & Audit Timeline:</span>
                </span>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedLead.notes.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No notes logged yet.</p>
                  ) : (
                    selectedLead.notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 text-xs text-slate-700 dark:text-slate-300 border border-blue-100 dark:border-blue-900/40"
                      >
                        <div className="text-[10px] font-mono text-slate-400">
                          {note.author} • {new Date(note.timestamp).toLocaleDateString()}
                        </div>
                        <div className="mt-0.5">{note.note}</div>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Log internal note or proposal update..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold font-mono"
                  >
                    Add
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs font-mono">
              Select a lead from the table to view full details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
