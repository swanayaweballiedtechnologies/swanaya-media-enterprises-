import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useCms } from '../../context/CmsContext';
import { ElaraAgentButton } from '../common/CustomerSuccessAgent';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Shield,
  ArrowRight,
  Send,
  Clapperboard,
  TrendingUp,
  Code,
  Compass,
  Palmtree,
  Cpu,
  Bot,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenLeadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenLeadModal,
}) => {
  const { divisions, currentUser } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsDropdownOpen, setDivisionsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'DIVISIONS', path: '/divisions', hasDropdown: true },
    { label: 'SERVICES', path: '/services' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'PRODUCTS', path: '/products' },
    { label: 'TEAM', path: '/team' },
    { label: 'INSIGHTS', path: '/insights' },
    { label: 'SOCIAL', path: '/social' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const getDivisionIcon = (id: string) => {
    switch (id) {
      case 'media-production':
        return <Clapperboard className="w-4 h-4 text-blue-500" />;
      case 'digital-marketing':
        return <TrendingUp className="w-4 h-4 text-sky-500" />;
      case 'web-technologies':
        return <Code className="w-4 h-4 text-indigo-500" />;
      case 'consultancy':
        return <Compass className="w-4 h-4 text-emerald-500" />;
      case 'serenity-tours':
        return <Palmtree className="w-4 h-4 text-teal-500" />;
      case 'swanique-ai':
        return <Cpu className="w-4 h-4 text-purple-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setDivisionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800/80 py-3'
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/50 py-4'
      }`}
      id="main-site-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Title */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center text-left focus:outline-none"
          id="navbar-brand-logo-btn"
        >
          <BrandLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? currentPath === '/'
                : currentPath.startsWith(link.path);

            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setDivisionsDropdownOpen(true)}
                  onMouseLeave={() => setDivisionsDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Mega Dropdown Menu */}
                  {divisionsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2.5 z-50 animate-fadeIn divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                        Swanaya Business Ecosystem
                      </div>
                      <div className="py-1 space-y-1">
                        {divisions.map((div) => (
                          <button
                            key={div.id}
                            onClick={() => handleNavClick(`/divisions/${div.id}`)}
                            className="w-full p-2 rounded-xl flex items-start gap-2.5 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors text-left group/item"
                          >
                            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-900/50 mt-0.5">
                              {getDivisionIcon(div.id)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400">
                                {div.name}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                {div.tagline}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="pt-2 px-2">
                        <button
                          onClick={() => handleNavClick('/divisions')}
                          className="w-full py-1.5 px-3 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold flex items-center justify-between"
                        >
                          <span>Explore All Divisions</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 font-extrabold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Area: Search & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Elara Customer Success Agent */}
          <ElaraAgentButton variant="header" />

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-800 transition-colors text-xs font-mono"
            title="Global Search (Ctrl+K)"
            id="navbar-search-btn"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline-block">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Primary CTA: START A PROJECT */}
          <button
            onClick={onOpenLeadModal}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
            id="navbar-start-project-cta"
          >
            <Send className="w-3.5 h-3.5" />
            <span>START A PROJECT</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
            id="mobile-menu-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-2xl">
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`py-2 px-3 rounded-lg text-xs font-bold tracking-wider text-left transition-colors ${
                  currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path))
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <ElaraAgentButton
              variant="primary"
              className="w-full justify-center py-2.5"
              label="Elara: Customer Success Agent"
            />
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>START A PROJECT</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
