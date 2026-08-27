import React from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Users,
  Eye,
  TrendingUp,
  Mail,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface AdminDashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({ onNavigateTab }) => {
  const { analytics, leads = [], liveVisitors = [], services = [], projects = [], blogPosts = [], faqs = [], currentUser } = useCms();

  const safeLeads = leads || [];
  const safeLiveVisitors = liveVisitors || [];
  const recentLeads = safeLeads.slice(0, 5);
  const trafficSources = analytics?.trafficSources || [];
  const dailyViewsHistory = analytics?.dailyViewsHistory || [];

  return (
    <div className="space-y-8" id="admin-dashboard-overview">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-blue-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>HQ Systems Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome, {currentUser?.name || 'Aadithyan M. Menon'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-200">
            Swanaya Media Enterprises Digital Control Center • Role: <span className="font-bold text-white">{currentUser?.role || 'Super Admin'}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('leads')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Manage Leads ({safeLeads.filter((l) => l.status === 'NEW').length} New)</span>
          </button>
          <button
            onClick={() => onNavigateTab('faqs')}
            className="px-4 py-2.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ CMS ({faqs.length})</span>
          </button>
          <button
            onClick={() => onNavigateTab('analytics')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-white/20 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>3D World</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono font-bold uppercase">Live Active Nodes</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {safeLiveVisitors.length}
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Active on 3D globe right now
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono font-bold uppercase">Total Inquiries / Leads</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {analytics?.totalLeadsCount || safeLeads.length}
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            Conversion Rate: {analytics?.conversionRatePercent || 3.8}%
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono font-bold uppercase">Today Page Views</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {(analytics?.todayPageViews || 2840).toLocaleString()}
          </div>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            Avg Duration: 4m 18s
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono font-bold uppercase">Active Portfolio & Services</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {services.length + projects.length} Assets
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            {services.length} Services • {projects.length} Case Studies
          </p>
        </div>
      </div>

      {/* Traffic Trend Chart & Live Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                30-Day Digital Traffic Momentum
              </h3>
              <p className="text-xs text-slate-500">Unique visitors vs Page views</p>
            </div>
            <span className="text-xs font-mono text-emerald-500 font-bold">+28.4% MoM</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyViewsHistory}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" name="Page Views" />
                <Area type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" name="Visitors" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Sources Bar Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Traffic Orbit Attribution
          </h3>
          <div className="space-y-3 pt-2">
            {trafficSources.map((src) => (
              <div key={src.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 line-clamp-1">{src.name}</span>
                  <span className="text-slate-500">{src.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${src.percentage}%`, backgroundColor: src.color || '#2563eb' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads Queue */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Inquiries & RFP Leads
            </h3>
            <p className="text-xs text-slate-500">Live incoming client requirements</p>
          </div>
          <button
            onClick={() => onNavigateTab('leads')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All {leads.length} Leads →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3">Client / Organization</th>
                <th className="p-3">Required Service</th>
                <th className="p-3">Budget</th>
                <th className="p-3">Status</th>
                <th className="p-3">Submitted</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900 dark:text-white">{lead.name}</div>
                    <div className="text-[11px] text-slate-400">{lead.company} • {lead.phone}</div>
                  </td>
                  <td className="p-3 font-medium text-slate-700 dark:text-slate-300">
                    {lead.serviceRequired}
                  </td>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                    {lead.budgetRange}
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">
                    {new Date(lead.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onNavigateTab('leads')}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Open CRM
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
