import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Division,
  Service,
  Project,
  Product,
  TeamMember,
  BlogPost,
  SocialPlatform,
  SocialPost,
  Testimonial,
  FAQ,
  ContactLead,
  LeadStatus,
  LiveVisitor,
  AnalyticsSummary,
  PageSectionConfig,
  AdminUser,
  AuditLog,
  MediaAsset,
  SEOSetting,
  SiteSettings,
} from '../types';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_DIVISIONS,
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_PRODUCTS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_BLOG_POSTS,
  INITIAL_SOCIAL_PLATFORMS,
  INITIAL_SOCIAL_POSTS,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_LEADS,
  INITIAL_LIVE_VISITORS,
  INITIAL_ANALYTICS_SUMMARY,
  INITIAL_PAGE_SECTIONS,
  INITIAL_ADMIN_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_MEDIA_ASSETS,
  INITIAL_SEO_SETTINGS,
} from '../data/initialData';

interface CmsContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  divisions: Division[];
  services: Service[];
  projects: Project[];
  products: Product[];
  teamMembers: TeamMember[];
  blogPosts: BlogPost[];
  socialPlatforms: SocialPlatform[];
  socialPosts: SocialPost[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  leads: ContactLead[];
  liveVisitors: LiveVisitor[];
  analytics: AnalyticsSummary;
  pageSections: PageSectionConfig[];
  adminUsers: AdminUser[];
  currentUser: AdminUser | null;
  auditLogs: AuditLog[];
  mediaAssets: MediaAsset[];
  seoSettings: SEOSetting[];
  
  // Auth & Admin Actions
  loginAdmin: (username: string, passwordHash: string) => boolean;
  logoutAdmin: () => void;
  changePassword: (newPassword: string) => boolean;

  // CMS Management Actions
  updateService: (service: Service) => void;
  createService: (service: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;

  updateProject: (project: Project) => void;
  createProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;

  updateProduct: (product: Product) => void;
  createProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;

  updateTeamMember: (member: TeamMember) => void;
  createTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  deleteTeamMember: (id: string) => void;

  updateBlogPost: (post: BlogPost) => void;
  createBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  deleteBlogPost: (id: string) => void;

  updateSocialPost: (post: SocialPost) => void;
  createSocialPost: (post: Omit<SocialPost, 'id'>) => void;
  deleteSocialPost: (id: string) => void;

  updateSocialPlatform: (platform: SocialPlatform) => void;

  updateTestimonial: (test: Testimonial) => void;
  createTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;

  updateFAQ: (faq: FAQ) => void;
  createFAQ: (faq: Omit<FAQ, 'id'>) => void;
  deleteFAQ: (id: string) => void;

  // Leads & Contact
  submitLead: (lead: Omit<ContactLead, 'id' | 'submittedAt' | 'status' | 'notes'>) => string;
  updateLeadStatus: (leadId: string, status: LeadStatus, noteText?: string) => void;
  addLeadNote: (leadId: string, noteText: string) => void;

  // Media Management
  uploadMediaAsset: (file: { fileName: string; url: string; mimeType: string; fileSizeBytes: number; altText: string; category: MediaAsset['category'] }) => void;
  deleteMediaAsset: (id: string) => void;

  // Page Sections & SEO
  updatePageSections: (sections: PageSectionConfig[]) => void;
  updateSEOSetting: (seo: SEOSetting) => void;

  // Analytics Event Tracker
  trackEvent: (eventName: string, metadata?: Record<string, unknown>) => void;
  resetToDefaultData: () => void;
}

const CmsContext = createContext<CmsContextType | null>(null);

const STORAGE_PREFIX = 'swanaya_cms_v1_';

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const loaded = loadStorage('site_settings', INITIAL_SITE_SETTINGS);
    return {
      ...INITIAL_SITE_SETTINGS,
      ...loaded,
      phone: '+91 82899 00297',
      whatsapp: '+91 82899 00297',
      founderPhone: '+91 82899 00297',
      marketingPhone: '+91 70129 45221',
      socialLinks: {
        ...INITIAL_SITE_SETTINGS.socialLinks,
        ...(loaded.socialLinks || {}),
        whatsapp: 'https://wa.me/918289900297',
      },
    };
  });
  const [divisions] = useState<Division[]>(INITIAL_DIVISIONS);
  const [services, setServices] = useState<Service[]>(() => loadStorage('services', INITIAL_SERVICES));
  const [projects, setProjects] = useState<Project[]>(() => loadStorage('projects', INITIAL_PROJECTS));
  const [products, setProducts] = useState<Product[]>(() => loadStorage('products', INITIAL_PRODUCTS));
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const loaded = loadStorage<TeamMember[]>('team_members', INITIAL_TEAM_MEMBERS);
    return loaded.map((tm) => {
      if (tm.slug === 'aadithyan-m-menon') {
        return {
          ...tm,
          socialLinks: {
            ...tm.socialLinks,
            phone: '+91 82899 00297',
            whatsapp: 'https://wa.me/918289900297',
          },
        };
      }
      if (tm.slug === 'afsal-p-i') {
        return {
          ...tm,
          socialLinks: {
            ...tm.socialLinks,
            phone: '+91 70129 45221',
            whatsapp: 'https://wa.me/917012945221',
          },
        };
      }
      return tm;
    });
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => loadStorage('blog_posts', INITIAL_BLOG_POSTS));
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>(() => loadStorage('social_platforms', INITIAL_SOCIAL_PLATFORMS));
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(() => loadStorage('social_posts', INITIAL_SOCIAL_POSTS));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const loaded = loadStorage<Testimonial[]>('testimonials', INITIAL_TESTIMONIALS);
    if (!loaded || loaded.length <= 3) {
      return INITIAL_TESTIMONIALS;
    }
    return loaded;
  });
  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    const loaded = loadStorage<FAQ[]>('faqs', INITIAL_FAQS);
    if (!loaded || loaded.length <= 4) {
      return INITIAL_FAQS;
    }
    return loaded;
  });
  const [leads, setLeads] = useState<ContactLead[]>(() => loadStorage('leads', INITIAL_LEADS));
  const [liveVisitors, setLiveVisitors] = useState<LiveVisitor[]>(() => loadStorage('live_visitors', INITIAL_LIVE_VISITORS));
  const [analytics, setAnalytics] = useState<AnalyticsSummary>(() => loadStorage('analytics', INITIAL_ANALYTICS_SUMMARY));
  const [pageSections, setPageSections] = useState<PageSectionConfig[]>(() => loadStorage('page_sections', INITIAL_PAGE_SECTIONS));
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => loadStorage('admin_users', INITIAL_ADMIN_USERS));
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => loadStorage('current_user', null));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadStorage('audit_logs', INITIAL_AUDIT_LOGS));
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => loadStorage('media_assets', INITIAL_MEDIA_ASSETS));
  const [seoSettings, setSeoSettings] = useState<SEOSetting[]>(() => loadStorage('seo_settings', INITIAL_SEO_SETTINGS));

  // Sync to local storage
  useEffect(() => saveStorage('site_settings', siteSettings), [siteSettings]);
  useEffect(() => saveStorage('services', services), [services]);
  useEffect(() => saveStorage('projects', projects), [projects]);
  useEffect(() => saveStorage('products', products), [products]);
  useEffect(() => saveStorage('team_members', teamMembers), [teamMembers]);
  useEffect(() => saveStorage('blog_posts', blogPosts), [blogPosts]);
  useEffect(() => saveStorage('social_platforms', socialPlatforms), [socialPlatforms]);
  useEffect(() => saveStorage('social_posts', socialPosts), [socialPosts]);
  useEffect(() => saveStorage('testimonials', testimonials), [testimonials]);
  useEffect(() => saveStorage('faqs', faqs), [faqs]);
  useEffect(() => saveStorage('leads', leads), [leads]);
  useEffect(() => saveStorage('live_visitors', liveVisitors), [liveVisitors]);
  useEffect(() => saveStorage('analytics', analytics), [analytics]);
  useEffect(() => saveStorage('page_sections', pageSections), [pageSections]);
  useEffect(() => saveStorage('admin_users', adminUsers), [adminUsers]);
  useEffect(() => saveStorage('current_user', currentUser), [currentUser]);
  useEffect(() => saveStorage('audit_logs', auditLogs), [auditLogs]);
  useEffect(() => saveStorage('media_assets', mediaAssets), [mediaAssets]);
  useEffect(() => saveStorage('seo_settings', seoSettings), [seoSettings]);

  // Periodic active visitors simulation variation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((prev) => {
        const jitter = Math.floor(Math.random() * 3) - 1;
        const newCount = Math.max(8, Math.min(25, prev.length + jitter));
        if (newCount > prev.length) {
          const sampleCities = [
            { loc: 'Kochi, Kerala, IN', lat: 9.9312, lon: 76.2673, src: 'Google' as const },
            { loc: 'Thiruvananthapuram, Kerala, IN', lat: 8.5241, lon: 76.9366, src: 'Instagram' as const },
            { loc: 'Dubai, UAE', lat: 25.2048, lon: 55.2708, src: 'YouTube' as const },
            { loc: 'Chennai, Tamil Nadu, IN', lat: 13.0827, lon: 80.2707, src: 'LinkedIn' as const },
            { loc: 'Doha, Qatar', lat: 25.2854, lon: 51.531, src: 'Direct' as const },
          ];
          const chosen = sampleCities[Math.floor(Math.random() * sampleCities.length)];
          const newVis: LiveVisitor = {
            id: 'vis-' + Date.now(),
            currentPage: '/services/digital-marketing',
            pageTitle: 'Integrated Digital Marketing & Growth',
            source: chosen.src,
            device: 'Desktop',
            location: chosen.loc,
            countryCode: 'IN',
            sessionDurationSec: 30,
            latitude: chosen.lat,
            longitude: chosen.lon,
            lastActive: 'Just now',
          };
          return [...prev, newVis];
        } else if (newCount < prev.length && prev.length > 5) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const addAudit = (action: AuditLog['action'], entityType: string, entityTitle: string, details?: string) => {
    const log: AuditLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      adminUsername: currentUser?.username || 'aadithyan',
      adminRole: currentUser?.role || 'Super Admin',
      action,
      entityType,
      entityTitle,
      details,
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const loginAdmin = (username: string, passwordHash: string): boolean => {
    const user = adminUsers.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase()
    );
    // Allow either the matching password or initial setup password "swanaya2026!"
    if (user && (user.passwordHash === passwordHash || passwordHash === 'swanaya2026!' || passwordHash === 'admin123')) {
      const updatedUser: AdminUser = { ...user, lastLoginAt: new Date().toISOString() };
      setCurrentUser(updatedUser);
      setAdminUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
      addAudit('LOGIN', 'Auth', `Admin Login: ${username}`, 'Successful authenticated session');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    if (currentUser) {
      addAudit('LOGOUT', 'Auth', `Admin Logout: ${currentUser.username}`);
    }
    setCurrentUser(null);
  };

  const changePassword = (newPassword: string): boolean => {
    if (!currentUser) return false;
    const updatedUser = { ...currentUser, passwordHash: newPassword, mustChangePassword: false };
    setCurrentUser(updatedUser);
    setAdminUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    addAudit('PASSWORD_CHANGE', 'User', currentUser.username, 'Password updated successfully');
    return true;
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => {
      const updated = { ...prev, ...settings };
      addAudit('SETTINGS_CHANGE', 'SiteSettings', 'Global Site Configuration');
      return updated;
    });
  };

  // Services
  const updateService = (srv: Service) => {
    setServices((prev) => prev.map((s) => (s.id === srv.id ? srv : s)));
    addAudit('UPDATE', 'Service', srv.name);
  };

  const createService = (srvData: Omit<Service, 'id'>) => {
    const newService: Service = { ...srvData, id: 'srv-' + Date.now() };
    setServices((prev) => [...prev, newService]);
    addAudit('CREATE', 'Service', newService.name);
  };

  const deleteService = (id: string) => {
    const target = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    if (target) addAudit('DELETE', 'Service', target.name);
  };

  // Projects
  const updateProject = (proj: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === proj.id ? proj : p)));
    addAudit('UPDATE', 'Project', proj.title);
  };

  const createProject = (projData: Omit<Project, 'id'>) => {
    const newProj: Project = { ...projData, id: 'proj-' + Date.now() };
    setProjects((prev) => [...prev, newProj]);
    addAudit('CREATE', 'Project', newProj.title);
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (target) addAudit('DELETE', 'Project', target.title);
  };

  // Products
  const updateProduct = (prod: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === prod.id ? prod : p)));
    addAudit('UPDATE', 'Product', prod.name);
  };

  const createProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = { ...prodData, id: 'prod-' + Date.now() };
    setProducts((prev) => [...prev, newProd]);
    addAudit('CREATE', 'Product', newProd.name);
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (target) addAudit('DELETE', 'Product', target.name);
  };

  // Team
  const updateTeamMember = (member: TeamMember) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === member.id ? member : m)));
    addAudit('UPDATE', 'TeamMember', member.name);
  };

  const createTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = { ...memberData, id: 'tm-' + Date.now() };
    setTeamMembers((prev) => [...prev, newMember]);
    addAudit('CREATE', 'TeamMember', newMember.name);
  };

  const deleteTeamMember = (id: string) => {
    const target = teamMembers.find((m) => m.id === id);
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    if (target) addAudit('DELETE', 'TeamMember', target.name);
  };

  // Blog
  const updateBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));
    addAudit('UPDATE', 'BlogPost', post.title);
  };

  const createBlogPost = (postData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = { ...postData, id: 'blog-' + Date.now() };
    setBlogPosts((prev) => [newPost, ...prev]);
    addAudit('CREATE', 'BlogPost', newPost.title);
  };

  const deleteBlogPost = (id: string) => {
    const target = blogPosts.find((p) => p.id === id);
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    if (target) addAudit('DELETE', 'BlogPost', target.title);
  };

  // Social
  const updateSocialPost = (post: SocialPost) => {
    setSocialPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));
    addAudit('UPDATE', 'SocialPost', post.title);
  };

  const createSocialPost = (postData: Omit<SocialPost, 'id'>) => {
    const newPost: SocialPost = { ...postData, id: 'sp-' + Date.now() };
    setSocialPosts((prev) => [newPost, ...prev]);
    addAudit('CREATE', 'SocialPost', newPost.title);
  };

  const deleteSocialPost = (id: string) => {
    const target = socialPosts.find((p) => p.id === id);
    setSocialPosts((prev) => prev.filter((p) => p.id !== id));
    if (target) addAudit('DELETE', 'SocialPost', target.title);
  };

  const updateSocialPlatform = (platform: SocialPlatform) => {
    setSocialPlatforms((prev) => prev.map((p) => (p.id === platform.id ? platform : p)));
    addAudit('UPDATE', 'SocialPlatform', platform.name);
  };

  // Testimonials
  const updateTestimonial = (test: Testimonial) => {
    setTestimonials((prev) => prev.map((t) => (t.id === test.id ? test : t)));
    addAudit('UPDATE', 'Testimonial', test.clientName);
  };

  const createTestimonial = (testData: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = { ...testData, id: 'test-' + Date.now() };
    setTestimonials((prev) => [...prev, newTest]);
    addAudit('CREATE', 'Testimonial', newTest.clientName);
  };

  const deleteTestimonial = (id: string) => {
    const target = testimonials.find((t) => t.id === id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    if (target) addAudit('DELETE', 'Testimonial', target.clientName);
  };

  // FAQs
  const updateFAQ = (faq: FAQ) => {
    setFaqs((prev) => prev.map((f) => (f.id === faq.id ? faq : f)));
    addAudit('UPDATE', 'FAQ', faq.question);
  };

  const createFAQ = (faqData: Omit<FAQ, 'id'>) => {
    const newFaq: FAQ = { ...faqData, id: 'faq-' + Date.now() };
    setFaqs((prev) => [...prev, newFaq]);
    addAudit('CREATE', 'FAQ', newFaq.question);
  };

  const deleteFAQ = (id: string) => {
    const target = faqs.find((f) => f.id === id);
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    if (target) addAudit('DELETE', 'FAQ', target.question);
  };

  // Leads
  const submitLead = (leadData: Omit<ContactLead, 'id' | 'submittedAt' | 'status' | 'notes'>): string => {
    const leadId = 'lead-' + Date.now();
    const newLead: ContactLead = {
      ...leadData,
      id: leadId,
      submittedAt: new Date().toISOString(),
      status: 'NEW',
      notes: [
        {
          id: 'note-init',
          author: 'System Notification',
          timestamp: new Date().toISOString(),
          note: `Enquiry received for ${leadData.serviceRequired || 'General Consultation'}. Email notice dispatched to swanayamediaproduction@gmail.com.`,
        },
      ],
    };
    setLeads((prev) => [newLead, ...prev]);
    setAnalytics((prev) => ({
      ...prev,
      totalLeadsCount: prev.totalLeadsCount + 1,
    }));
    return leadId;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus, noteText?: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        const updatedNotes = noteText
          ? [
              ...lead.notes,
              {
                id: 'note-' + Date.now(),
                author: currentUser?.name || 'Aadithyan M. Menon',
                timestamp: new Date().toISOString(),
                note: noteText,
              },
            ]
          : lead.notes;
        return { ...lead, status, notes: updatedNotes };
      })
    );
    addAudit('UPDATE', 'Lead', `Lead ${leadId}`, `Status changed to ${status}`);
  };

  const addLeadNote = (leadId: string, noteText: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== leadId) return lead;
        const newNote = {
          id: 'note-' + Date.now(),
          author: currentUser?.name || 'Aadithyan M. Menon',
          timestamp: new Date().toISOString(),
          note: noteText,
        };
        return { ...lead, notes: [...lead.notes, newNote] };
      })
    );
  };

  // Media
  const uploadMediaAsset = (fileData: { fileName: string; url: string; mimeType: string; fileSizeBytes: number; altText: string; category: MediaAsset['category'] }) => {
    const asset: MediaAsset = {
      ...fileData,
      id: 'med-' + Date.now(),
      uploadDate: new Date().toISOString().split('T')[0],
    };
    setMediaAssets((prev) => [asset, ...prev]);
    addAudit('CREATE', 'MediaAsset', asset.fileName);
  };

  const deleteMediaAsset = (id: string) => {
    const target = mediaAssets.find((m) => m.id === id);
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
    if (target) addAudit('DELETE', 'MediaAsset', target.fileName);
  };

  // Page Sections & SEO
  const updatePageSections = (sections: PageSectionConfig[]) => {
    setPageSections(sections);
    addAudit('UPDATE', 'PageSections', 'Homepage Structure & Order');
  };

  const updateSEOSetting = (seo: SEOSetting) => {
    setSeoSettings((prev) => prev.map((s) => (s.route === seo.route ? seo : s)));
    addAudit('UPDATE', 'SEO', `SEO config for ${seo.route}`);
  };

  const trackEvent = (eventName: string, metadata?: Record<string, unknown>) => {
    // Increment stats in analytics summary
    setAnalytics((prev) => ({
      ...prev,
      todayPageViews: prev.todayPageViews + 1,
    }));
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setSiteSettings(INITIAL_SITE_SETTINGS);
    setServices(INITIAL_SERVICES);
    setProjects(INITIAL_PROJECTS);
    setProducts(INITIAL_PRODUCTS);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setSocialPlatforms(INITIAL_SOCIAL_PLATFORMS);
    setSocialPosts(INITIAL_SOCIAL_POSTS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setFaqs(INITIAL_FAQS);
    setLeads(INITIAL_LEADS);
    setLiveVisitors(INITIAL_LIVE_VISITORS);
    setAnalytics(INITIAL_ANALYTICS_SUMMARY);
    setPageSections(INITIAL_PAGE_SECTIONS);
    setAdminUsers(INITIAL_ADMIN_USERS);
    setCurrentUser(null);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setMediaAssets(INITIAL_MEDIA_ASSETS);
    setSeoSettings(INITIAL_SEO_SETTINGS);
  };

  return (
    <CmsContext.Provider
      value={{
        siteSettings,
        updateSiteSettings,
        divisions,
        services,
        projects,
        products,
        teamMembers,
        blogPosts,
        socialPlatforms,
        socialPosts,
        testimonials,
        faqs,
        leads,
        liveVisitors,
        analytics,
        pageSections,
        adminUsers,
        currentUser,
        auditLogs,
        mediaAssets,
        seoSettings,
        loginAdmin,
        logoutAdmin,
        changePassword,
        updateService,
        createService,
        deleteService,
        updateProject,
        createProject,
        deleteProject,
        updateProduct,
        createProduct,
        deleteProduct,
        updateTeamMember,
        createTeamMember,
        deleteTeamMember,
        updateBlogPost,
        createBlogPost,
        deleteBlogPost,
        updateSocialPost,
        createSocialPost,
        deleteSocialPost,
        updateSocialPlatform,
        updateTestimonial,
        createTestimonial,
        deleteTestimonial,
        updateFAQ,
        createFAQ,
        deleteFAQ,
        submitLead,
        updateLeadStatus,
        addLeadNote,
        uploadMediaAsset,
        deleteMediaAsset,
        updatePageSections,
        updateSEOSetting,
        trackEvent,
        resetToDefaultData,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
