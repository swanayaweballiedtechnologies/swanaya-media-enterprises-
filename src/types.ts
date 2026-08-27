export type DivisionId =
  | 'media-production'
  | 'digital-marketing'
  | 'web-technologies'
  | 'consultancy'
  | 'serenity-tours'
  | 'swanique-ai';

export interface Division {
  id: DivisionId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  heroImage: string;
  accentColor: string;
  focusAreas: string[];
  capabilities: string[];
  stats: { label: string; value: string }[];
  featuredProjectSlug?: string;
  order: number;
}

export type ServiceCategory =
  | 'Media'
  | 'Marketing'
  | 'Technology'
  | 'Branding'
  | 'Consultancy'
  | 'Travel & Tourism';

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  divisionId: DivisionId;
  shortDescription: string;
  directAnswer: string; // AEO direct concise answer
  fullOverview: string;
  problemsSolved: string[];
  processSteps: { step: number; title: string; description: string }[];
  deliverables: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  iconName: string;
  coverImage: string;
  isFeatured: boolean;
  published: boolean;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  divisionId: DivisionId;
  relatedServiceSlug: string;
  shortDescription: string;
  challenge: string;
  strategy: string;
  creativeApproach?: string;
  execution: string;
  results: string[];
  technologies: string[];
  thumbnail: string;
  gallery: string[];
  videoUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    designation: string;
  };
  publishedDate: string;
  isFeatured: boolean;
  published: boolean;
}

export interface ProductFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'AI Platform' | 'Media Ops' | 'Productivity SaaS' | 'Marketing Tool';
  status: 'Live' | 'Beta' | 'In Development' | 'Enterprise Ready';
  shortDescription: string;
  problemSolved: string;
  solution: string;
  features: ProductFeature[];
  technologies: string[];
  screenshots: string[];
  demoUrl?: string;
  isFeatured: boolean;
  published: boolean;
  ctaText: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  department: 'Leadership' | 'Media & Production' | 'Technology & Product' | 'Marketing & Strategy' | 'Operations & Travel';
  biography: string;
  photograph: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  specialties: string[];
  displayOrder: number;
  isFeatured: boolean;
  published: boolean;
}

export type ContentBlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'quote'
  | 'cta'
  | 'highlight'
  | 'statistics'
  | 'code'
  | 'list';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
  level?: 2 | 3 | 4; // for headings
  url?: string; // for images/links
  caption?: string; // for images/quotes
  statNumber?: string; // for statistics
  statLabel?: string; // for statistics
  listItems?: string[]; // for lists
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'Media Production' | 'Digital Marketing' | 'Web & AI' | 'Branding' | 'Travel & Kerala' | 'Business Growth';
  tags: string[];
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedDate: string;
  readingTimeMinutes: number;
  featuredImage: string;
  directAnswerAEO: string; // AEO direct question response
  blocks: ContentBlock[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage: string;
  focusKeywords: string[];
  status: 'published' | 'draft' | 'scheduled' | 'archived';
  isFeatured: boolean;
  viewsCount: number;
}

export interface SocialPlatform {
  id: string;
  platform: 'Instagram' | 'LinkedIn' | 'YouTube' | 'Facebook';
  name: string;
  username: string;
  profileUrl: string;
  iconName: string;
  description: string;
  followersDisplay: string;
  featured: boolean;
  active: boolean;
  order: number;
}

export type SocialContentType =
  | 'Post'
  | 'Reel'
  | 'Video'
  | 'Article'
  | 'Campaign'
  | 'Announcement'
  | 'Project Showcase';

export interface SocialPost {
  id: string;
  platform: 'Instagram' | 'LinkedIn' | 'YouTube' | 'Facebook';
  title: string;
  caption: string;
  thumbnail: string;
  postUrl: string;
  contentType: SocialContentType;
  category: 'COMPANY' | 'PROJECTS' | 'MEDIA' | 'MARKETING' | 'TECHNOLOGY' | 'INSIGHTS' | 'EVENTS' | 'CULTURE';
  publishedDate: string;
  campaign?: string;
  isFeatured: boolean;
  likesDisplay?: string;
  viewsDisplay?: string;
  active: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  designation: string;
  quote: string;
  rating: number;
  photo: string;
  category?: 'Consulting' | 'Branding' | 'Marketing' | 'Technology' | 'Media' | 'Travel' | string;
  metricHighlight?: string;
  projectSlug?: string;
  isFeatured: boolean;
  published: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  relatedServiceSlug?: string;
  published: boolean;
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL'
  | 'WON'
  | 'LOST';

export interface LeadNote {
  id: string;
  author: string;
  timestamp: string;
  note: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceRequired: string;
  budgetRange: string;
  message: string;
  source: string;
  campaign?: string;
  submittedAt: string;
  status: LeadStatus;
  notes: LeadNote[];
  estimatedValue?: string;
}

export interface LiveVisitor {
  id: string;
  currentPage: string;
  pageTitle: string;
  source: 'Google' | 'Instagram' | 'YouTube' | 'LinkedIn' | 'Direct' | 'Referral';
  device: 'Desktop' | 'Mobile' | 'Tablet';
  location: string;
  countryCode: string;
  sessionDurationSec: number;
  latitude: number;
  longitude: number;
  lastActive: string;
}

export interface AnalyticsSummary {
  activeVisitorsNow: number;
  todayPageViews: number;
  totalLeadsCount: number;
  conversionRatePercent: number;
  topPages: { page: string; views: number; activeNow: number }[];
  trafficSources: { name: string; percentage: number; color: string }[];
  deviceBreakdown: { device: string; percentage: number }[];
  dailyViewsHistory: { date: string; views: number; visitors: number; leads: number }[];
  funnelData: {
    stage: string;
    count: number;
    dropoffPercent: number;
  }[];
}

export interface PageSectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export type AdminRole =
  | 'Super Admin'
  | 'Content Manager'
  | 'Marketing Manager'
  | 'Team Manager'
  | 'Lead Manager';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: AdminRole;
  passwordHash: string;
  mustChangePassword?: boolean;
  avatarUrl: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminUsername: string;
  adminRole: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH' | 'LOGIN' | 'LOGOUT' | 'PASSWORD_CHANGE' | 'SETTINGS_CHANGE';
  entityType: string;
  entityTitle: string;
  details?: string;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  url: string;
  mimeType: string;
  fileSizeBytes: number;
  altText: string;
  category: 'Branding' | 'Projects' | 'Team' | 'Blog' | 'Services' | 'General';
  uploadDate: string;
  width?: number;
  height?: number;
}

export interface SEOSetting {
  route: string;
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  schemaType: 'Organization' | 'WebSite' | 'WebPage' | 'Service' | 'Article' | 'Person' | 'Product' | 'FAQPage';
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  brandStatement: string;
  primaryEmail: string;
  phone: string;
  whatsapp?: string;
  founderPhone?: string;
  marketingPhone?: string;
  address: string;
  location: string;
  foundedYear: string;
  logoUrl: string;
  faviconUrl: string;
  ogDefaultImage: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    youtube: string;
    facebook: string;
    whatsapp?: string;
  };
  analyticsEnabled: boolean;
  maintenanceMode: boolean;
}
