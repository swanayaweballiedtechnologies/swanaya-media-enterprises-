/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { QuickLeadModal } from './components/common/QuickLeadModal';
import { WhatsAppWidget } from './components/common/WhatsAppWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DivisionsPage } from './pages/DivisionsPage';
import { DivisionDetailPage } from './pages/DivisionDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TeamPage } from './pages/TeamPage';
import { TeamDetailPage } from './pages/TeamDetailPage';
import { InsightsPage } from './pages/InsightsPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { SocialPage } from './pages/SocialPage';
import { ContactPage } from './pages/ContactPage';
import { TechnicalSeoPage } from './pages/TechnicalSeoPage';
import { LegalPage } from './pages/LegalPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';

const AppContent: React.FC = () => {
  const { isDarkMode, isAuthenticated } = useCms();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedServiceForLead, setSelectedServiceForLead] = useState<string | undefined>(undefined);

  // Sync dark mode class on root document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLeadModal = (serviceName?: string) => {
    setSelectedServiceForLead(serviceName);
    setIsLeadModalOpen(true);
  };

  // Route Dispatcher
  const renderRoute = () => {
    // Admin Routes
    if (currentPath.startsWith('/admin')) {
      if (!isAuthenticated) {
        return (
          <AdminLogin
            onSuccess={() => handleNavigate('/admin')}
            onReturnHome={() => handleNavigate('/')}
          />
        );
      }
      return (
        <AdminLayout
          onReturnHome={() => handleNavigate('/')}
          onNavigate={handleNavigate}
        />
      );
    }

    // Public Routes
    if (currentPath === '/') {
      return <HomePage onNavigate={handleNavigate} onOpenLeadModal={handleOpenLeadModal} />;
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={handleNavigate} onOpenLeadModal={handleOpenLeadModal} />;
    }
    if (currentPath === '/divisions') {
      return <DivisionsPage onNavigate={handleNavigate} onOpenLeadModal={handleOpenLeadModal} />;
    }
    if (currentPath.startsWith('/divisions/')) {
      const id = currentPath.replace('/divisions/', '');
      return (
        <DivisionDetailPage
          divisionId={id}
          onNavigate={handleNavigate}
          onOpenLeadModal={handleOpenLeadModal}
        />
      );
    }
    if (currentPath === '/services') {
      return <ServicesPage onNavigate={handleNavigate} onOpenLeadModal={handleOpenLeadModal} />;
    }
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return (
        <ServiceDetailPage
          slug={slug}
          onNavigate={handleNavigate}
          onOpenLeadModal={handleOpenLeadModal}
        />
      );
    }
    if (currentPath === '/projects') {
      return <ProjectsPage onNavigate={handleNavigate} onOpenLeadModal={handleOpenLeadModal} />;
    }
    if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '');
      return (
        <ProjectDetailPage
          slug={slug}
          onNavigate={handleNavigate}
          onOpenLeadModal={handleOpenLeadModal}
        />
      );
    }
    if (currentPath === '/products') {
      return <ProductsPage onNavigate={handleNavigate} onOpenLeadModal={handleOpenLeadModal} />;
    }
    if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '');
      return (
        <ProductDetailPage
          slug={slug}
          onNavigate={handleNavigate}
          onOpenLeadModal={handleOpenLeadModal}
        />
      );
    }
    if (currentPath === '/team') {
      return <TeamPage onNavigate={handleNavigate} onOpenLeadModal={handleOpenLeadModal} />;
    }
    if (currentPath.startsWith('/team/')) {
      const slug = currentPath.replace('/team/', '');
      return (
        <TeamDetailPage
          slug={slug}
          onNavigate={handleNavigate}
          onOpenLeadModal={handleOpenLeadModal}
        />
      );
    }
    if (currentPath === '/insights') {
      return <InsightsPage onNavigate={handleNavigate} />;
    }
    if (currentPath.startsWith('/insights/')) {
      const slug = currentPath.replace('/insights/', '');
      return <InsightDetailPage slug={slug} onNavigate={handleNavigate} />;
    }
    if (currentPath === '/social') {
      return <SocialPage onNavigate={handleNavigate} onOpenLeadModal={handleOpenLeadModal} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/technical-seo') {
      return <TechnicalSeoPage />;
    }
    if (currentPath === '/privacy') {
      return <LegalPage type="privacy" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={handleNavigate} />;
    }
    if (currentPath === '/cookies') {
      return <LegalPage type="cookies" onNavigate={handleNavigate} />;
    }

    // Default Fallback
    return <HomePage onNavigate={handleNavigate} onOpenLeadModal={handleOpenLeadModal} />;
  };

  const isAdminRoute = currentPath.startsWith('/admin') && isAuthenticated;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-blue-600 selection:text-white">
      {/* Public Navbar (Hidden when inside authenticated admin console) */}
      {!isAdminRoute && (
        <Navbar
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenLeadModal={() => handleOpenLeadModal()}
        />
      )}

      {/* Main Page View Content */}
      <main className={!isAdminRoute ? 'min-h-[70vh]' : ''}>
        {renderRoute()}
      </main>

      {/* Public Footer (Hidden when inside authenticated admin console) */}
      {!isAdminRoute && (
        <Footer
          onNavigate={handleNavigate}
          onOpenLeadModal={() => handleOpenLeadModal()}
        />
      )}

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <QuickLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        preselectedService={selectedServiceForLead}
      />

      {/* Floating Multi-Channel WhatsApp Connector */}
      {!isAdminRoute && <WhatsAppWidget />}
    </div>
  );
};

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}
