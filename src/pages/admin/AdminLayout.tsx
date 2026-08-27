import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { BrandLogo } from '../../components/common/BrandLogo';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminAnalyticsView } from './AdminAnalyticsView';
import { AdminLeadsView } from './AdminLeadsView';
import { AdminServicesView } from './AdminServicesView';
import { AdminProjectsView } from './AdminProjectsView';
import { AdminBlogView } from './AdminBlogView';
import { AdminMediaView } from './AdminMediaView';
import { AdminSeoView } from './AdminSeoView';
import { AdminFaqView } from './AdminFaqView';
import { AdminTestimonialsView } from './AdminTestimonialsView';
import { AdminAuditView } from './AdminAuditView';
import {
  LayoutDashboard,
  Globe2,
  Mail,
  Clapperboard,
  Briefcase,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  Award,
  Search,
  Shield,
  LogOut,
  ArrowLeft,
  Moon,
  Sun,
  Menu,
  X,
  User,
} from 'lucide-react';

interface AdminLayoutProps {
  onReturnHome: () => void;
  onNavigate: (path: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onReturnHome, onNavigate }) => {
  const { currentUser, logoutAdmin, leads, isDarkMode, toggleDarkMode } = useCms();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const newLeadsCount = leads.filter((l) => l.status === 'NEW').length;

  const navItems = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: '3D Live Digital World', icon: Globe2 },
    { id: 'leads', label: 'Leads & Inquiries CRM', icon: Mail, badge: newLeadsCount },
    { id: 'services', label: 'Services Catalog', icon: Clapperboard },
    { id: 'faqs', label: 'FAQ & AEO Knowledge', icon: HelpCircle },
    { id: 'testimonials', label: 'Client Testimonials', icon: Award },
    { id: 'projects', label: 'Case Studies Portfolio', icon: Briefcase },
    { id: 'blog', label: 'Insights & Editorial', icon: FileText },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'seo', label: 'SEO & AEO Schema', icon: Search },
    { id: 'audit', label: 'Audit & Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row" id="swanaya-admin-shell">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <BrandLogo variant="light" size="sm" />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-mono flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">HQ Console Active</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {currentUser?.name.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden text-xs">
              <div className="font-bold text-white truncate">{currentUser?.name || 'Aadithyan M. Menon'}</div>
              <div className="text-[10px] text-blue-400 font-mono truncate">{currentUser?.role || 'Super Admin'}</div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800/60">
            <button
              onClick={onReturnHome}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 flex-1"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>

            <button
              onClick={() => {
                logoutAdmin();
                onReturnHome();
              }}
              className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 text-xs font-mono"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase font-mono tracking-wider">
              {navItems.find((n) => n.id === activeTab)?.label || 'Admin Hub'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onReturnHome}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </button>
          </div>
        </header>

        {/* Content View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && <AdminDashboardOverview onNavigateTab={setActiveTab} />}
          {activeTab === 'analytics' && <AdminAnalyticsView />}
          {activeTab === 'leads' && <AdminLeadsView />}
          {activeTab === 'services' && <AdminServicesView />}
          {activeTab === 'faqs' && <AdminFaqView />}
          {activeTab === 'testimonials' && <AdminTestimonialsView />}
          {activeTab === 'projects' && <AdminProjectsView />}
          {activeTab === 'blog' && <AdminBlogView />}
          {activeTab === 'media' && <AdminMediaView />}
          {activeTab === 'seo' && <AdminSeoView />}
          {activeTab === 'audit' && <AdminAuditView />}
        </main>
      </div>
    </div>
  );
};
