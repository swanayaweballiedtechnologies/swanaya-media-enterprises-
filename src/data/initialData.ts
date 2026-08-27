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
  LiveVisitor,
  AnalyticsSummary,
  PageSectionConfig,
  AdminUser,
  AuditLog,
  MediaAsset,
  SEOSetting,
  SiteSettings,
} from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: 'Swanaya Media Enterprises',
  tagline: 'Creating Brands. Building Experiences. Growing Businesses.',
  brandStatement: 'Media, marketing, technology and business solutions built to help organizations create stronger brands and achieve measurable growth.',
  primaryEmail: 'swanayamediaproduction@gmail.com',
  phone: '+91 82899 00297',
  whatsapp: '+91 82899 00297',
  founderPhone: '+91 82899 00297',
  marketingPhone: '+91 70129 45221',
  address: 'Swanaya Digital HQ, Infopark Kochi & Calicut Tech Hub',
  location: 'Kerala, India',
  foundedYear: '2022',
  logoUrl: '/assets/swanaya-logo.svg',
  faviconUrl: '/assets/swanaya-icon.svg',
  ogDefaultImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
  socialLinks: {
    instagram: 'https://instagram.com/swanaya_media_production',
    linkedin: 'https://linkedin.com/company/swanaya-media-enterprises',
    youtube: 'https://youtube.com/@swanayamedia',
    facebook: 'https://facebook.com/swanayamedia',
    whatsapp: 'https://wa.me/918289900297',
  },
  analyticsEnabled: true,
  maintenanceMode: false,
};

export const INITIAL_DIVISIONS: Division[] = [
  {
    id: 'media-production',
    name: 'Swanaya Media Production',
    shortName: 'Media Production',
    tagline: 'Cinematic Storytelling & Visual Craftsmanship',
    description:
      'High-impact video production, corporate brand films, commercial photography, aerial cinematography, reels, and digital visual assets engineered to captivate modern audiences.',
    iconName: 'Clapperboard',
    heroImage: 'https://images.unsplash.com/photo-1579632652988-6f9ba899182d?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#2563eb',
    focusAreas: [
      'Corporate & Brand Films',
      'Commercial Video Production',
      'Social Media Reels & Shorts',
      'High-End Commercial Photography',
      'Event Media & Live Multi-Cam',
      'Post-Production & Motion Graphics',
    ],
    capabilities: [
      '4K/8K Cinema Cameras & Drone Shoots',
      'Color Grading in DaVinci Resolve Studio',
      'Custom Sound Design & Original Scores',
      'AI-Assisted Editing & Visual Effects',
      'Full Creative Direction & Scriptwriting',
    ],
    stats: [
      { label: 'Productions Delivered', value: '450+' },
      { label: 'Video Views Generated', value: '85M+' },
      { label: 'Client Satisfaction', value: '99.4%' },
    ],
    featuredProjectSlug: 'kerala-tourism-cinematic-campaign',
    order: 1,
  },
  {
    id: 'digital-marketing',
    name: 'Swanaya Digital Marketing',
    shortName: 'Digital Marketing',
    tagline: 'Data-Driven Growth & Performance Acquisition',
    description:
      'Full-funnel digital marketing, Meta & Google ads management, organic SEO, content strategy, performance marketing, and conversion optimization.',
    iconName: 'TrendingUp',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#0284c7',
    focusAreas: [
      'Meta (Instagram & FB) Advertising',
      'Google Search & YouTube Ads',
      'Technical & On-Page SEO Engine',
      'Social Media Strategy & Management',
      'Lead Generation Funnels',
      'Marketing Analytics & ROI Auditing',
    ],
    capabilities: [
      'Algorithmic Ad Optimization & Creative Testing',
      'Attribution Tracking & UTM Multi-Touch Dashboards',
      'Competitor & Audience Behavioral Intelligence',
      'High-Converting Landing Page Frameworks',
      'Omnichannel Retargeting Campaigns',
    ],
    stats: [
      { label: 'Ad Spend Managed', value: '₹4.5 Cr+' },
      { label: 'Average ROAS', value: '4.8x' },
      { label: 'Qualified Leads Delivered', value: '120K+' },
    ],
    featuredProjectSlug: 'd2c-apparel-brand-scale-up',
    order: 2,
  },
  {
    id: 'web-technologies',
    name: 'Swanaya Web Technologies',
    shortName: 'Web Technologies',
    tagline: 'Modern Web Engineering, Cloud & Custom Systems',
    description:
      'High-performance corporate websites, full-stack React & Next.js applications, headless CMS platforms, scalable e-commerce, and bespoke business automation portals.',
    iconName: 'Code',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#3b82f6',
    focusAreas: [
      'Corporate & Brand Web Portals',
      'Full-Stack Web Applications (React/TS)',
      'Headless CMS & Custom Content Engines',
      'High-Conversion E-Commerce Stores',
      'API Integrations & Cloud Infrastructure',
      'Business Workflow Automation',
    ],
    capabilities: [
      'Sub-Second TTFB & 95+ Core Web Vitals',
      'Enterprise Scalability & PostgreSQL Architecture',
      'Interactive 3D Three.js & Framer Animations',
      'Built-in AEO (Answer Engine Optimization)',
      'Zero-Trust Security & RBAC Dashboards',
    ],
    stats: [
      { label: 'Digital Platforms Built', value: '65+' },
      { label: 'Uptime Reliability', value: '99.98%' },
      { label: 'Avg Core Web Vitals', value: '98/100' },
    ],
    featuredProjectSlug: 'resort-hotel-booking-engine',
    order: 3,
  },
  {
    id: 'consultancy',
    name: 'Swanaya Consultancy',
    shortName: 'Consultancy',
    tagline: 'Strategic Advisory, Transformation & Market Leadership',
    description:
      'Strategic brand advisory, digital transformation roadmaps, startup growth mentoring, go-to-market strategies, and business process automation.',
    iconName: 'Compass',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#1d4ed8',
    focusAreas: [
      'Digital Transformation Strategy',
      'Brand Identity & Market Positioning',
      'Startup Go-To-Market & Pitch Engineering',
      'Revenue Operations & Funnel Optimization',
      'Corporate Marketing Architecture',
      'Business Technology Consultation',
    ],
    capabilities: [
      'Comprehensive Market Opportunity Mapping',
      'Unit Economics & CAC/LTV Strategy',
      'Organizational Brand Alignment Workshops',
      'Executive Strategy & Quarterly Advisory',
      'Technology Stack Selection & Due Diligence',
    ],
    stats: [
      { label: 'Enterprises Advised', value: '80+' },
      { label: 'Market Capitalization Unlocked', value: '₹150 Cr+' },
      { label: 'Client Retention Rate', value: '94%' },
    ],
    featuredProjectSlug: 'healthcare-network-digital-transformation',
    order: 4,
  },
  {
    id: 'serenity-tours',
    name: 'Swanaya Serenity Tours & Travels',
    shortName: 'Serenity Tours',
    tagline: 'TRAVEL • BREATHE • FREEDOM',
    description:
      'Curated destination management, customized luxury Kerala and South India tours, corporate retreats, honeymoon experiences, and experiential travel marketing.',
    iconName: 'Palmtree',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#059669',
    focusAreas: [
      'Kerala Premium Tours (Munnar, Alleppey, Wayanad)',
      'South India & International Customized Packages',
      'Corporate Offsites & Leadership Retreats',
      'Luxury Houseboat & Eco-Resort Stays',
      'Travel Video & Destination Production',
      'Honeymoon & Bespoke Family Holidays',
    ],
    capabilities: [
      'End-to-End Itinerary & Transport Logistics',
      'Direct Tie-ups with 5-Star Heritage Properties',
      'Dedicated On-Ground Concierge & Guides',
      'Destination Content & Influencer Campaigns',
      'Sustainable Eco-Tourism Partnerships',
    ],
    stats: [
      { label: 'Happy Travelers Hosted', value: '14,000+' },
      { label: 'Curated Destinations', value: '35+' },
      { label: '5-Star Trip Reviews', value: '4.9/5' },
    ],
    featuredProjectSlug: 'gods-own-country-luxury-expedition',
    order: 5,
  },
  {
    id: 'swanique-ai',
    name: 'Swanique AI & Digital Products',
    shortName: 'Swanique AI',
    tagline: 'Next-Generation AI Tools & Enterprise Management SaaS',
    description:
      'Swanaya’s proprietary digital software ecosystem, including Swanique AI creative intelligence, Swanaya Media V5 Production Suite, and business automation platforms.',
    iconName: 'Sparkles',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#6366f1',
    focusAreas: [
      'Swanique AI Content Engine',
      'Swanaya Media V5 Operations Suite',
      'Swanaya Creative Planner & Scheduler',
      'AI Voice & Visual Concept Workflows',
      'Automated Billing & Reach Analytics',
      'Custom SaaS Product Incubation',
    ],
    capabilities: [
      'Gemini & LLM Fine-Tuned Creative Workflows',
      'Multi-Tenant Production Billing & Attendance',
      'Automated Media Tagging & Cloud Delivery',
      'Predictive Campaign Reach Modeling',
      'API First Cloud Microservices',
    ],
    stats: [
      { label: 'AI Assets Generated', value: '250K+' },
      { label: 'Hours Saved Monthly', value: '1,200+' },
      { label: 'Proprietary Software Systems', value: '3 Platforms' },
    ],
    featuredProjectSlug: 'swanique-ai-creative-engine',
    order: 6,
  },
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    slug: 'digital-marketing',
    name: 'Integrated Digital Marketing & Growth',
    category: 'Marketing',
    divisionId: 'digital-marketing',
    shortDescription:
      'Performance-driven digital marketing campaigns across Meta, Google, and omnichannel search to scale qualified customer acquisition.',
    directAnswer:
      'Swanaya Digital Marketing delivers end-to-end performance marketing that combines audience research, creative ad testing, conversion rate optimization, and multi-channel attribution to turn digital attention into measurable revenue.',
    fullOverview:
      'We do not believe in vanity metrics. Our performance marketing methodology focuses entirely on return on ad spend (ROAS), pipeline velocity, and customer lifetime value. From hyper-targeted Meta advertising to high-intent Google Search and YouTube video campaigns, every dollar spent is tracked, audited, and optimized in real-time.',
    problemsSolved: [
      'High cost-per-lead and declining ad ROAS',
      'Inconsistent monthly lead flow and pipeline drought',
      'Lack of clear multi-touch attribution and wasted marketing budget',
      'Low conversion rates on landing pages and web properties',
    ],
    processSteps: [
      { step: 1, title: 'Discover & Audit', description: 'Deep-dive audience behavior, pixel data, and competitor positioning.' },
      { step: 2, title: 'Strategize', description: 'Formulate full-funnel media architecture (TOFU, MOFU, BOFU).' },
      { step: 3, title: 'Create & Test', description: 'Deploy high-velocity video ad variations and optimized landing pages.' },
      { step: 4, title: 'Launch', description: 'Activate precision-targeted campaigns across Meta, Google, and programmatic ads.' },
      { step: 5, title: 'Analyze', description: 'Evaluate live event streams, cohort data, and customer acquisition costs.' },
      { step: 6, title: 'Scale & Optimize', description: 'Scale winning creatives and expand budget to dominate high-performing segments.' },
    ],
    deliverables: [
      'Monthly High-Converting Ad Creatives & Motion Reels',
      'Omnichannel Campaign Architecture on Meta & Google Ads',
      'Custom High-Conversion Landing Pages',
      'Real-Time Analytics & ROAS Attribution Dashboard',
      'Bi-Weekly Strategic Growth Briefings',
    ],
    benefits: [
      '3x to 6x Average Return on Advertising Spend',
      'Guaranteed Quality Lead Verification & Filtering',
      'Lower CAC through Continuous Algorithmic Creative Testing',
      'Transparent Reporting with Direct CRM Integration',
    ],
    faqs: [
      {
        question: 'What platforms does Swanaya run marketing campaigns on?',
        answer: 'We primarily run and optimize campaigns on Meta (Instagram & Facebook), Google Ads (Search, Display, Performance Max, YouTube), LinkedIn for B2B, and specialized local directories.',
      },
      {
        question: 'How do you measure success and return on investment?',
        answer: 'We measure success through bottom-line commercial metrics: Cost Per Qualified Lead (CPL), Return on Ad Spend (ROAS), Customer Acquisition Cost (CAC), and pipeline conversion rate.',
      },
      {
        question: 'How quickly can we expect results from our digital campaigns?',
        answer: 'Performance ad campaigns usually produce initial validated leads within the first 48 to 72 hours of launch, with algorithmic optimization compounding efficiency over weeks 2 through 4.',
      },
    ],
    iconName: 'TrendingUp',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    published: true,
    order: 1,
  },
  {
    id: 'srv-2',
    slug: 'video-production',
    name: 'Cinematic Video Production & Media',
    category: 'Media',
    divisionId: 'media-production',
    shortDescription:
      'Cinema-grade corporate videos, television commercials, product films, dynamic social reels, and aerial cinematography.',
    directAnswer:
      'Swanaya Media Production creates visual narratives that elevate corporate stature and ignite audience engagement through professional cinematography, sound design, scriptwriting, and state-of-the-art post-production.',
    fullOverview:
      'Visual storytelling is the most potent medium for modern brand authority. Swanaya Media Productions pairs experienced directors, cinema-grade camera rigs, lighting masters, and sound designers to build television-quality commercial films, corporate brand documentaries, and viral short-form social reels.',
    problemsSolved: [
      'Generic, low-quality video content that fails to capture attention',
      'Lack of cohesive narrative that conveys the brand’s true value proposition',
      'Disconnected media assets that do not drive viewer action',
      'High production friction and delayed turnaround times',
    ],
    processSteps: [
      { step: 1, title: 'Concept & Script', description: 'Storyboarding, scriptwriting, and thematic creative direction.' },
      { step: 2, title: 'Pre-Production', description: 'Casting, location scouting, set design, and gear preparation.' },
      { step: 3, title: 'Cinematic Shoot', description: '4K/8K multi-camera filming, drone footage, and studio lighting.' },
      { step: 4, title: 'Post-Production', description: 'Editorial cut, color grading, motion graphics, and audio mastering.' },
      { step: 5, title: 'Reformatting', description: 'Exporting tailored aspect ratios for widescreen, mobile reels, and web.' },
      { step: 6, title: 'Distribution Guidance', description: 'Strategic advice on platform publishing and thumbnail optimization.' },
    ],
    deliverables: [
      'Master Cinema Brand Film (4K Widescreen Master)',
      'Vertical Social Reels & Shorts (9:16 Optimized Cuts)',
      'High-Resolution Commercial Still Photography Portfolio',
      'Licensed Sound Track & Custom Audio Mix',
      'B-Roll Archive for Future Content Repurposing',
    ],
    benefits: [
      'Immediate Elevation in Brand Perception & Authority',
      'Up to 10x Higher Organic Engagement on Social Channels',
      'Versatile Media Assets usable across Web, Ads, and Events for years',
      'Smooth Turnaround with Dedicated Production Management',
    ],
    faqs: [
      {
        question: 'Do you provide on-location shoots outside Kerala?',
        answer: 'Yes! While our primary production base is in Kerala, our crews frequently travel across South India and internationally for commercial shoots and corporate documentation.',
      },
      {
        question: 'Can you produce both long-form brand documentaries and short-form Instagram reels in the same shoot?',
        answer: 'Absolutely. We shoot modularly with dedicated multi-aspect rigs to capture both cinematic widescreen footage and vertical 9:16 high-impact reel content concurrently.',
      },
    ],
    iconName: 'Clapperboard',
    coverImage: 'https://images.unsplash.com/photo-1579632652988-6f9ba899182d?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    published: true,
    order: 2,
  },
  {
    id: 'srv-3',
    slug: 'web-development',
    name: 'Modern Web Engineering & React Applications',
    category: 'Technology',
    divisionId: 'web-technologies',
    shortDescription:
      'Ultra-fast business portals, headless CMS platforms, interactive 3D web applications, and robust API backends.',
    directAnswer:
      'Swanaya Web Technologies engineers bespoke web platforms built on modern React, TypeScript, Tailwind CSS, and cloud architectures, maximizing performance, SEO ranking, and lead conversions.',
    fullOverview:
      'Your website is the digital headquarters of your enterprise. We build custom web software that blends aesthetic elegance, smooth motion, and instant speed. Every line of code is structured for answer engine optimization (AEO), technical SEO indexing, mobile responsiveness, and zero-compromise security.',
    problemsSolved: [
      'Slow, bloated websites that fail Google Core Web Vitals',
      'Inflexible CMS templates that break whenever edits are made',
      'Low mobile conversion rates and poor responsive layouts',
      'Vulnerable, outdated code architectures with poor security',
    ],
    processSteps: [
      { step: 1, title: 'Architecture & UX', description: 'Information architecture, wireframing, and user journey mapping.' },
      { step: 2, title: 'Design System', description: 'Interactive Figma design with mathematical typography and spacing.' },
      { step: 3, title: 'Frontend Engineering', description: 'React, TypeScript, Tailwind CSS, and Framer Motion integration.' },
      { step: 4, title: 'CMS & Database', description: 'PostgreSQL or cloud data layer with secure role-based admin console.' },
      { step: 5, title: 'SEO & Speed Audit', description: 'Full AEO/SEO schema insertion, sitemap generation, and CDN setup.' },
      { step: 6, title: 'Deployment & Support', description: 'Continuous deployment, SSL certificates, and 24/7 uptime monitoring.' },
    ],
    deliverables: [
      'Full Source Code & Clean TypeScript Architecture',
      'Custom Admin CMS Dashboard for Non-Technical Editing',
      '100% Responsive Desktop, Tablet, and Mobile Layouts',
      'Integrated JSON-LD Schemas, XML Sitemap, and robots.txt',
      'Analytics & Conversion Event Tracking Pipeline',
    ],
    benefits: [
      '95+ Google PageSpeed & Core Web Vitals Score',
      'Seamless Self-Service Content Management via CMS',
      'Enterprise-Grade Security and Rapid Cloud Scalability',
      'Higher Search Visibility on Google & AI Answer Engines',
    ],
    faqs: [
      {
        question: 'Will our internal team be able to update content without a developer?',
        answer: 'Yes! We deliver an intuitive custom admin console where you can edit text, upload media, publish blogs, manage services, and track leads with zero coding needed.',
      },
      {
        question: 'Do you build custom web applications with backends and user authentication?',
        answer: 'Yes. We specialize in full-stack applications with PostgreSQL databases, role-based access control (RBAC), and automated business logic.',
      },
    ],
    iconName: 'Code',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    published: true,
    order: 3,
  },
  {
    id: 'srv-4',
    slug: 'branding',
    name: 'Brand Strategy & Visual Identity',
    category: 'Branding',
    divisionId: 'media-production',
    shortDescription:
      'Complete brand positioning, iconic logo systems, typography guidelines, corporate profiles, and creative campaign collateral.',
    directAnswer:
      'Swanaya Branding develops distinctive visual and communication identities that distinguish organizations from competitors and build lasting emotional connections with their target markets.',
    fullOverview:
      'A great brand is not just a logo; it is the total perception your customers hold in their minds. We craft cohesive visual languages, memorable brand marks, precise color palettes, packaging, corporate decks, and voice guidelines that position you as the definitive leader in your market.',
    problemsSolved: [
      'Fragmented, amateurish visual presence across digital and print touchpoints',
      'Inability to charge premium pricing due to commoditized brand perception',
      'Unclear brand messaging that confuses prospective customers',
      'Inconsistent marketing materials produced by disparate teams',
    ],
    processSteps: [
      { step: 1, title: 'Brand Discovery', description: 'Interviews, archetype discovery, and competitor landscape mapping.' },
      { step: 2, title: 'Core Strategy', description: 'Positioning statements, value pillars, and brand voice definition.' },
      { step: 3, title: 'Visual Identity', description: 'Logo ideation, typography pairing, and chromatic palette system.' },
      { step: 4, title: 'Collateral Design', description: 'Stationery, social templates, pitch decks, and packaging.' },
      { step: 5, title: 'Brand Guidelines', description: 'Comprehensive brand bible detailing precise usage rules.' },
      { step: 6, title: 'Asset Handoff', description: 'Vector master files, digital kits, and team onboarding.' },
    ],
    deliverables: [
      'Vector Logo Suite (Primary, Monogram, Horizontal, Vertical, Dark/Light)',
      'Official Brand Guidelines Bible (PDF & Interactive Digital Spec)',
      'Custom Typography & Color Spectrum Definitions',
      'Ready-to-Use Corporate Deck & Social Media Design Kit',
      'Brand Story & Tone-of-Voice Playbook',
    ],
    benefits: [
      'Instant Recognition Across All Digital & Physical Touchpoints',
      'Ability to Command 30–50% Higher Price Points in the Market',
      'Streamlined Future Marketing with Pre-Built Visual Assets',
      'Long-Term Cohesion and Timeless Brand Equity',
    ],
    faqs: [
      {
        question: 'What formats do you provide for the final logo and brand assets?',
        answer: 'We provide SVG, AI, EPS vector files alongside high-res PNG, WebP, and PDF assets with dark, light, monochrome, and favicon variants.',
      },
    ],
    iconName: 'Sparkles',
    coverImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    published: true,
    order: 4,
  },
  {
    id: 'srv-5',
    slug: 'business-consulting',
    name: 'Strategic Business & Growth Consulting',
    category: 'Consultancy',
    divisionId: 'consultancy',
    shortDescription:
      'Executive growth roadmaps, digital transformation strategy, startup advisory, and revenue system optimization.',
    directAnswer:
      'Swanaya Consultancy provides actionable strategic guidance that bridges the gap between ambitious business goals and high-impact digital execution, unlocking operational efficiencies and revenue acceleration.',
    fullOverview:
      'Modern markets evolve too quickly for disconnected initiatives. Our consultants work shoulder-to-shoulder with founders, executives, and marketing leaders to design robust commercial strategies, modernize outdated operations, and execute high-growth initiatives.',
    problemsSolved: [
      'Stagnant revenue growth and market saturation',
      'Inefficient operational workflows and disconnected technology stacks',
      'Unclear go-to-market plan for new product or service launches',
      'Misalignment between executive vision and marketing execution',
    ],
    processSteps: [
      { step: 1, title: 'Operational Audit', description: 'Reviewing current revenue engines, team capacity, and tech tools.' },
      { step: 2, title: 'Growth Roadmap', description: 'Defining 90-day, 6-month, and annual revenue milestones.' },
      { step: 3, title: 'System Blueprint', description: 'Specifying workflow automations, CRM pipelines, and tech upgrades.' },
      { step: 4, title: 'Execution Cadence', description: 'Guiding implementation sprints with leadership stakeholders.' },
      { step: 5, title: 'KPI Governance', description: 'Tracking progress against unit economics and conversion velocity.' },
      { step: 6, title: 'Quarterly Evolution', description: 'Refining strategy based on market feedback and competitive shifts.' },
    ],
    deliverables: [
      'Comprehensive Enterprise Growth Blueprint',
      'Digital Transformation & Technology Stack Architecture',
      'Sales Funnel & CRM Optimization Model',
      'Executive Leadership Advisory Sessions (Monthly/Quarterly)',
    ],
    benefits: [
      'Clear, Unambiguous Roadmap for Scalable Revenue Growth',
      'Elimination of Redundant Software and Manual Inefficiencies',
      'Accelerated Go-to-Market Timeframes for New Initiatives',
    ],
    faqs: [
      {
        question: 'Who is this consultancy program best suited for?',
        answer: 'Our strategic consulting is tailored for growing SMEs, ambitious startups ready for scaling, and established corporate enterprises undergoing digital modernization.',
      },
    ],
    iconName: 'Compass',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    published: true,
    order: 5,
  },
  {
    id: 'srv-6',
    slug: 'travel-tourism',
    name: 'Experiential Travel & Tourism Management',
    category: 'Travel & Tourism',
    divisionId: 'serenity-tours',
    shortDescription:
      'Bespoke Kerala holiday itineraries, luxury houseboat journeys, corporate retreats, and destination experience marketing.',
    directAnswer:
      'Swanaya Serenity Tours & Travels crafts unforgettable, bespoke travel experiences across Kerala and beyond, blending authentic local hospitality, luxury retreats, and seamless logistical execution.',
    fullOverview:
      'Embodying our philosophy of "TRAVEL • BREATHE • FREEDOM", Serenity Tours provides customized travel packages for discerning travelers, families, corporate retreats, and international explorers. From the misty tea hills of Munnar to the tranquil backwaters of Alleppey and the cliffs of Varkala, we curate every detail.',
    problemsSolved: [
      'Cookie-cutter tour packages with crowded tourist traps',
      'Logistical friction, unpredictable drivers, and poor hotel coordination',
      'Lack of customized itineraries tailored to family or corporate needs',
      'Difficulty finding authentic, sustainable, and serene Kerala experiences',
    ],
    processSteps: [
      { step: 1, title: 'Traveler Profile', description: 'Understanding your dates, preferences, group size, and travel style.' },
      { step: 2, title: 'Custom Itinerary', description: 'Curating boutique resorts, scenic routes, and cultural experiences.' },
      { step: 3, title: 'Confirmed Bookings', description: 'Locking in 5-star properties, luxury houseboats, and private vehicles.' },
      { step: 4, title: '24/7 Concierge', description: 'On-ground assistance, dedicated chauffeurs, and local coordinators.' },
      { step: 5, title: 'Memories & Media', description: 'Optional drone and video coverage of your special holiday moments.' },
    ],
    deliverables: [
      'Tailored Day-by-Day Travel Itinerary with GPS Map Guides',
      'Confirmed Luxury Resort, Villa, and Houseboat Reservations',
      'Chauffeured Air-Conditioned Private Transportation',
      'Dedicated 24/7 On-Ground Support Specialist',
    ],
    benefits: [
      'Stress-Free, 100% Customized Holiday Experience',
      'Handpicked Heritage & Eco-Luxury Accommodations',
      'Exclusive Access to Hidden Kerala Gems & Cultural Artisans',
    ],
    faqs: [
      {
        question: 'Which Kerala destinations are covered in your signature packages?',
        answer: 'Our most popular destinations include Munnar, Alleppey backwaters, Wayanad rainforests, Thekkady wildlife, Vagamon, Kovalam, Varkala cliffs, and Athirappilly waterfalls.',
      },
    ],
    iconName: 'Palmtree',
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    published: true,
    order: 6,
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'kerala-tourism-cinematic-campaign',
    title: 'God’s Own Country: Cinematic Global Film & Digital Campaign',
    client: 'Heritage Luxury Resorts & Tourism Board Partner',
    category: 'Cinematic Media & Brand Film',
    divisionId: 'media-production',
    relatedServiceSlug: 'video-production',
    shortDescription:
      'An 8K cinematic film series capturing Kerala’s misty highlands, backwaters, and heritage traditions, coupled with an international performance ad push.',
    challenge:
      'The client needed to reposition traditional Kerala backwater tourism to appeal to affluent global travelers seeking wellness, silence, and luxury eco-retreats.',
    strategy:
      'We conceptualized a sensorial, narrative-driven campaign titled "Where Silence Speaks", blending poetic narration, high-dynamic-range drone cinematography, and hyper-targeted Meta/YouTube ads.',
    creativeApproach:
      'Shot on cinema anamorphic lenses during the monsoon and golden hours to evoke atmospheric depth and tranquility.',
    execution:
      'Our team deployed a 12-person crew across 5 districts over 14 days, producing a 3-minute master film, eight 30-second localized ad variants, and 24 viral vertical reels.',
    results: [
      '4.2 Million Organic & Paid Video Views across Instagram & YouTube',
      '38% Increase in Direct High-Ticket Resort Inquiries within 60 Days',
      'Awarded Best Regional Visual Production in South Asia Tourism Summit',
    ],
    technologies: ['RED Cinema 8K', 'DaVinci Resolve', 'Drone Cinematography', 'Meta Ads Manager'],
    thumbnail: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    testimonial: {
      quote:
        'Swanaya Media transformed our brand perception. Their cinematic eye and disciplined digital marketing created the single most successful campaign in our property’s history.',
      author: 'Rajeev Nair',
      designation: 'Managing Director, Heritage Resorts Kerala',
    },
    publishedDate: '2026-06-15',
    isFeatured: true,
    published: true,
  },
  {
    id: 'proj-2',
    slug: 'd2c-apparel-brand-scale-up',
    title: 'D2C Sustainable Fashion: Scaled from ₹5L to ₹45L Monthly GMV',
    client: 'Aura Loom Sustainable Living',
    category: 'Performance Marketing & SEO',
    divisionId: 'digital-marketing',
    relatedServiceSlug: 'digital-marketing',
    shortDescription:
      'A performance marketing and conversion rate optimization overhaul that accelerated profitable revenue for a premium organic apparel brand.',
    challenge:
      'High customer acquisition costs (CAC) on Meta ads were eroding margins, and organic search traffic was virtually non-existent.',
    strategy:
      'We redesigned the entire product funnel, implemented AI-driven UGC ad testing routines, and built an on-page SEO architecture targeting high-intent long-tail keywords.',
    execution:
      'Launched 40+ creative ad iterations monthly, optimized checkout speed to sub-1.2 seconds, and set up automated retargeting loops with personalized customer segments.',
    results: [
      'Scaled Monthly GMV from ₹5 Lakhs to ₹45 Lakhs in 5 Months',
      'Achieved a Blended ROAS of 5.2x Across All Paid Channels',
      'Organic Organic Search Traffic Grew by 320%',
    ],
    technologies: ['Meta Ads API', 'Google Search Ads', 'Shopify Plus', 'Klaviyo', 'GA4 Analytics'],
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    ],
    testimonial: {
      quote:
        'Swanaya’s performance team operates like true business partners. They don’t just report clicks; they focus on real bankable revenue and sustainable profit margins.',
      author: 'Sneha Varrier',
      designation: 'Co-Founder, Aura Loom',
    },
    publishedDate: '2026-07-10',
    isFeatured: true,
    published: true,
  },
  {
    id: 'proj-3',
    slug: 'resort-hotel-booking-engine',
    title: 'Cloud Booking Platform & Interactive Digital HQ for Luxury Resort',
    client: 'Elysium Wellness Retreats',
    category: 'Full-Stack Web Engineering',
    divisionId: 'web-technologies',
    relatedServiceSlug: 'web-development',
    shortDescription:
      'A high-performance React & Next-gen web platform with 3D room visualizers, instant payment processing, and dynamic CMS management.',
    challenge:
      'The client was losing 25% commission to OTAs (Online Travel Agencies) due to an outdated, non-responsive legacy booking engine.',
    strategy:
      'We built a direct-to-consumer digital booking ecosystem with immersive 3D suite previews, multi-currency checkout, and lightning-fast mobile speeds.',
    execution:
      'Engineered with React, Tailwind CSS, secure payment gateway integrations, and an intuitive admin console for dynamic seasonal rate management.',
    results: [
      'Direct Bookings Increased by 185% in Quarter 1',
      'Reduced Commission Payouts by ₹18 Lakhs Annually',
      'Perfect 100/100 Mobile Usability and 98 Google Lighthouse Performance',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe/Razorpay', 'Three.js'],
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    ],
    testimonial: {
      quote:
        'The website Swanaya built for us is a masterpiece. It looks world-class and has transformed our direct booking revenue from day one.',
      author: 'Dr. Mathews Kurian',
      designation: 'CEO, Elysium Wellness Retreats',
    },
    publishedDate: '2026-08-01',
    isFeatured: true,
    published: true,
  },
  {
    id: 'proj-4',
    slug: 'healthcare-network-digital-transformation',
    title: 'Integrated Telehealth & Patient Acquisition Architecture',
    client: 'CarePlus Multispeciality Hospitals',
    category: 'Consultancy & Tech Automation',
    divisionId: 'consultancy',
    relatedServiceSlug: 'business-consulting',
    shortDescription:
      'A comprehensive digital transformation mapping patient acquisition, doctor scheduling automation, and local healthcare SEO visibility.',
    challenge:
      'Fragmented appointment systems and disjointed communication across 4 hospital branches resulted in patient drop-offs and low online reputation.',
    strategy:
      'We designed an integrated digital patient ecosystem with centralized lead routing, automated SMS/WhatsApp reminders, and a local SEO conquest strategy.',
    execution:
      'Conducted 6 executive transformation workshops, deployed centralized CRM lead management, and audited 150+ doctor profile landing pages.',
    results: [
      'Appointment No-Show Rate Dropped from 22% to 4.5%',
      'Google Maps Local Search Visibility Ranked #1 in 8 Core Specialities',
      'Over 28,000 New Outpatient Appointments Generated',
    ],
    technologies: ['Enterprise CRM', 'WhatsApp Business API', 'Local SEO Engine', 'Cloud Analytics'],
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    ],
    testimonial: {
      quote:
        'Swanaya Consultancy transformed our digital operations from a cost center into the hospital network’s largest growth engine.',
      author: 'Dr. Ananya Pillai',
      designation: 'Director of Medical Operations, CarePlus',
    },
    publishedDate: '2026-07-25',
    isFeatured: false,
    published: true,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'swanique-ai',
    name: 'Swanique AI',
    tagline: 'AI-Powered Creative Ideation & Multimedia Generation Engine',
    category: 'AI Platform',
    status: 'Live',
    shortDescription:
      'Proprietary AI assistant fine-tuned for marketing copywriting, storyboard ideation, video concept generation, and AEO optimization.',
    problemSolved:
      'Creative agencies and marketing teams spend dozens of hours every week researching ad angles, writing variations, and tailoring content for multi-channel distribution.',
    solution:
      'Swanique AI connects custom LLMs with Swanaya’s proprietary creative heuristics to generate high-converting ad scripts, social calendars, and SEO-optimized articles in seconds.',
    features: [
      { title: 'Brand Voice Emulation', description: 'Learns and maintains exact corporate tone and guidelines.', iconName: 'Brain' },
      { title: 'Ad Script Generator', description: 'Outputs 9:16 vertical hook scripts, CTAs, and visual notes.', iconName: 'Sparkles' },
      { title: 'AEO Direct Answer Analyzer', description: 'Scores and refines content for Google AI Overviews and answer engines.', iconName: 'Target' },
      { title: 'Multi-Language Kerala & English Engine', description: 'Understands local cultural context and regional idioms.', iconName: 'Globe' },
    ],
    technologies: ['Gemini 2.5 Flash', 'TypeScript', 'Node.js', 'Vector Embeddings', 'React'],
    screenshots: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    ],
    demoUrl: '#demo',
    isFeatured: true,
    published: true,
    ctaText: 'Request Swanique AI Access',
  },
  {
    id: 'prod-2',
    slug: 'swanaya-media-v5',
    name: 'Swanaya Media V5',
    tagline: 'All-in-One Media Production & Agency Operations Suite',
    category: 'Media Ops',
    status: 'Enterprise Ready',
    shortDescription:
      'Enterprise platform unifying billing, tax calculations, daily & bulk crew attendance, monthly planning, and media reach evaluations.',
    problemSolved:
      'Production houses suffer from fragmented spreadsheets for call sheets, crew logistics, equipment rentals, milestone invoicing, and campaign reach reporting.',
    solution:
      'A single centralized portal built to automate shoot scheduling, equipment tracking, automated GST/tax billing, and live campaign analytics in real-time.',
    features: [
      { title: 'Automated Billing & Tax Calculation', description: 'Generates compliant tax invoices with milestone tracking.', iconName: 'Receipt' },
      { title: 'Crew Attendance & Shoot Call-Sheets', description: 'Mobile crew check-in and automated production dispatch.', iconName: 'Users' },
      { title: 'Monthly Campaign Planning', description: 'Visual timeline roadmap for multi-division media delivery.', iconName: 'Calendar' },
      { title: 'Content Reach Evaluation', description: 'Aggregates multi-platform analytics into client reports.', iconName: 'BarChart3' },
    ],
    technologies: ['Next.js', 'PostgreSQL', 'Express', 'Tailwind CSS', 'Docker'],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    published: true,
    ctaText: 'Explore Enterprise License',
  },
  {
    id: 'prod-3',
    slug: 'swanaya-planner',
    name: 'Swanaya Planner',
    tagline: 'Collaborative Multi-Channel Campaign & Content Calendar',
    category: 'Productivity SaaS',
    status: 'Beta',
    shortDescription:
      'Visual timeline and editorial scheduler coordinating social media publishing, client approvals, video production milestones, and marketing sprints.',
    problemSolved:
      'Miscommunication between creative directors, video editors, and clients during multi-stage approval processes.',
    solution:
      'An intuitive drag-and-drop workspace with video frame-accurate commenting, instant client review links, and automated social publishing triggers.',
    features: [
      { title: 'Frame-Accurate Video Proofing', description: 'Clients can leave timestamped feedback directly on video drafts.', iconName: 'Video' },
      { title: 'Universal Content Calendar', description: 'Schedule reels, blogs, emails, and press releases on one board.', iconName: 'LayoutGrid' },
      { title: '1-Click Client Sign-Off', description: 'Secure public preview links with digital approval workflows.', iconName: 'CheckCircle' },
    ],
    technologies: ['React', 'WebSockets', 'Cloud Object Storage', 'Tailwind'],
    screenshots: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: false,
    published: true,
    ctaText: 'Join the Beta Waitlist',
  },
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    slug: 'aadithyan-m-menon',
    name: 'Aadithyan M. Menon',
    designation: 'Founder / Managing Director / Media & Digital Strategy',
    department: 'Leadership',
    biography:
      'Visionary founder and creative director behind Swanaya Media Enterprises. Aadithyan spearheads the organization’s strategic vision, media production standards, digital growth ecosystems, and overarching brand philosophy.',
    photograph: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com/swanaya_media_production',
      email: 'swanayamediaproduction@gmail.com',
      phone: '+91 82899 00297',
      whatsapp: 'https://wa.me/918289900297',
    },
    specialties: ['Creative Direction', 'Media Strategy', 'Brand Architecture', 'Executive Leadership'],
    displayOrder: 1,
    isFeatured: true,
    published: true,
  },
  {
    id: 'tm-2',
    slug: 'naveen-krishna',
    name: 'Naveen Krishna',
    designation: 'Chief Product Officer',
    department: 'Technology & Product',
    biography:
      'Leading product architecture and technology initiatives at Swanaya. Naveen oversees the development of Swanique AI, custom web technology suites, SaaS systems, and digital infrastructure.',
    photograph: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    specialties: ['Product Management', 'Full-Stack Architecture', 'AI Workflows', 'SaaS Scaling'],
    displayOrder: 2,
    isFeatured: true,
    published: true,
  },
  {
    id: 'tm-3',
    slug: 'thanseer',
    name: 'ThanseeR',
    designation: 'General Manager',
    department: 'Leadership',
    biography:
      'Ensuring operational excellence and cross-division synergy across all client deliverables, corporate partnerships, financial governance, and organizational growth.',
    photograph: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      email: 'thanseer@swanayamedia.com',
    },
    specialties: ['Operational Excellence', 'Corporate Governance', 'Partner Relations', 'Resource Logistics'],
    displayOrder: 3,
    isFeatured: true,
    published: true,
  },
  {
    id: 'tm-4',
    slug: 'afsal-p-i',
    name: 'Afsal P. I.',
    designation: 'Marketing Team Head / Head of Media & Marketing',
    department: 'Marketing & Strategy',
    biography:
      'Driving high-velocity marketing campaigns and cinematic visual output. Afsal orchestrates the creative production crew, performance media buyers, and brand storytelling pipelines.',
    photograph: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    socialLinks: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      phone: '+91 70129 45221',
      whatsapp: 'https://wa.me/917012945221',
    },
    specialties: ['Cinematography', 'Campaign Strategy', 'Performance Ads', 'Creative Editing'],
    displayOrder: 4,
    isFeatured: true,
    published: true,
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'what-does-digital-marketing-do',
    title: 'What Does Modern Digital Marketing Actually Do for Business Growth?',
    subtitle: 'Beyond Vanity Likes: How Integrated Media & Performance Marketing Build Real Corporate Equity',
    excerpt:
      'An in-depth analysis of how strategic audience research, cinematic video content, and algorithmic ad optimization convert digital attention into sustainable corporate revenue.',
    category: 'Digital Marketing',
    tags: ['Digital Marketing', 'Growth Strategy', 'ROAS', 'AEO'],
    authorId: 'tm-1',
    authorName: 'Aadithyan M. Menon',
    authorRole: 'Founder & Managing Director',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    publishedDate: '2026-08-20',
    readingTimeMinutes: 6,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    directAnswerAEO:
      'Digital marketing connects businesses with high-intent target audiences through multi-channel digital touchpoints — including paid search, targeted social media advertising, search engine optimization (SEO), and high-quality visual content — to systematically build brand authority and generate measurable, repeatable sales leads.',
    blocks: [
      {
        id: 'b1',
        type: 'heading',
        level: 2,
        content: 'The Fundamental Shift in Modern Digital Marketing',
      },
      {
        id: 'b2',
        type: 'paragraph',
        content:
          'For decades, traditional marketing treated the consumer as a passive recipient of broadcast television commercials and billboards. In the current algorithmic landscape, marketing has become a two-way dynamic conversation where attention is earned through genuine visual value, precise behavioral targeting, and immediate relevance.',
      },
      {
        id: 'b3',
        type: 'quote',
        content:
          '“We don’t just market businesses. We build brands that people actively seek out, trust, and advocate for.”',
        caption: 'Aadithyan M. Menon, Founder',
      },
      {
        id: 'b4',
        type: 'heading',
        level: 3,
        content: 'The 4 Pillars of a High-Performance Digital System',
      },
      {
        id: 'b5',
        type: 'list',
        content: 'Core Pillars',
        listItems: [
          'High-Intent Search Visibility: Capturing buyers at the precise moment they search for solutions.',
          'Emotion-Driven Cinema Content: Building deep brand affinity through cinematic video storytelling.',
          'Full-Funnel Ad Precision: Retargeting and converting engaged users with personalized value offers.',
          'Technical Speed & Frictionless UX: Eliminating form friction and loading bottlenecks to maximize conversions.',
        ],
      },
      {
        id: 'b6',
        type: 'statistics',
        content: 'Impact Statistics',
        statNumber: '4.8x',
        statLabel: 'Average Return on Ad Spend for Integrated Media Campaigns',
      },
      {
        id: 'b7',
        type: 'paragraph',
        content:
          'When media production and performance advertising work inside the same ecosystem rather than in silos, creative feedback loops become instantaneous. High-performing video hooks are turned into ad variants within hours, driving down customer acquisition costs while multiplying revenue.',
      },
      {
        id: 'b8',
        type: 'cta',
        content: 'Ready to scale your organization with a data-backed marketing ecosystem?',
        url: '/contact',
      },
    ],
    faqs: [
      {
        question: 'Why is integrated media production superior to generic stock ads?',
        answer:
          'Original, cinema-quality footage builds authentic human trust and captures significantly longer watch times, which social algorithms reward with lower advertising costs.',
      },
      {
        question: 'How does Swanaya guarantee measurable ROI from marketing spend?',
        answer:
          'We link ad campaigns directly to verified CRM pipelines, tracking cost-per-lead, pipeline stage movement, and closed revenue rather than ambiguous engagement counts.',
      },
    ],
    seoTitle: 'What Does Digital Marketing Do? Complete 2026 Corporate Guide | Swanaya Media',
    metaDescription:
      'Learn what modern integrated digital marketing does to build brand equity and drive customer acquisition with Swanaya Media Enterprises.',
    canonicalUrl: 'https://swanayamedia.com/insights/what-does-digital-marketing-do',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    focusKeywords: ['Digital marketing guide', 'Performance marketing Kerala', 'Brand storytelling', 'Swanaya insights'],
    status: 'published',
    isFeatured: true,
    viewsCount: 1420,
  },
  {
    id: 'blog-2',
    slug: 'the-power-of-cinematic-video-for-brands',
    title: 'The Power of Cinematic Storytelling: Why High-End Video Wins in 2026',
    subtitle: 'How Kerala Brands Are Capturing Global Audiences Through Visual Craftsmanship',
    excerpt:
      'Discover how high-dynamic-range cinematography, intentional lighting, and authentic human narratives transform brand perception and justify premium market pricing.',
    category: 'Media Production',
    tags: ['Video Production', 'Cinematography', 'Brand Authority', 'Media'],
    authorId: 'tm-4',
    authorName: 'Aspal P. I.',
    authorRole: 'Head of Media & Marketing',
    authorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    publishedDate: '2026-08-12',
    readingTimeMinutes: 5,
    featuredImage: 'https://images.unsplash.com/photo-1579632652988-6f9ba899182d?auto=format&fit=crop&w=1200&q=80',
    directAnswerAEO:
      'Cinematic video production creates an emotional resonance and subconscious perception of luxury and quality that static graphics cannot replicate, enabling businesses to command 30% to 50% higher price points in competitive markets.',
    blocks: [
      {
        id: 'b21',
        type: 'heading',
        level: 2,
        content: 'Why Standard Videos Get Ignored',
      },
      {
        id: 'b22',
        type: 'paragraph',
        content:
          'Consumers are exposed to thousands of visual messages daily. Flat lighting, generic corporate jargon, and generic background music trigger instant scroll fatigue. Cinematic production commands attention by creating a movie-like atmosphere that transports the viewer into the brand’s universe.',
      },
      {
        id: 'b23',
        type: 'highlight',
        content: '“A business may have a great product. A brand may have a great story. But without the right cinematic execution, that story never reaches its true impact.”',
      },
      {
        id: 'b24',
        type: 'heading',
        level: 3,
        content: 'From Script to 4K Master: The Swanaya Workflow',
      },
      {
        id: 'b25',
        type: 'list',
        content: 'Workflow Highlights',
        listItems: [
          'Pre-Visualization: Rigorous storyboarding that defines emotional arc before turning on a camera.',
          'Cinema Lighting & Lenses: Using specialized anamorphic glass for organic flares and creamy bokeh.',
          'Custom Sound Design: Foley, subtle atmosphere sounds, and bespoke scores that evoke goosebumps.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does a typical corporate brand film production take?',
        answer: 'From initial script conceptualization to final color-graded delivery, a cinema-grade brand film typically takes between 2 to 4 weeks.',
      },
    ],
    seoTitle: 'The Power of Cinematic Video for Brands | Swanaya Media Production',
    metaDescription: 'Explore why cinematic video production is the #1 tool for brand authority and customer engagement in 2026.',
    canonicalUrl: 'https://swanayamedia.com/insights/the-power-of-cinematic-video-for-brands',
    ogImage: 'https://images.unsplash.com/photo-1579632652988-6f9ba899182d?auto=format&fit=crop&w=1200&q=80',
    focusKeywords: ['Cinematic video production', 'Kerala commercial video', 'Brand documentary', 'Swanaya media'],
    status: 'published',
    isFeatured: false,
    viewsCount: 980,
  },
  {
    id: 'blog-3',
    slug: 'ai-and-answer-engine-optimization-aeo',
    title: 'Answer Engine Optimization (AEO): How to Rank in Google AI Overviews and LLMs',
    subtitle: 'The Technical Guide to Entity Structuring, Direct Answers, and Structured JSON-LD Data',
    excerpt:
      'Traditional keyword stuffing is obsolete. Learn how Answer Engine Optimization (AEO) positions your website as the authoritative source for AI-generated answers.',
    category: 'Web & AI',
    tags: ['AEO', 'SEO', 'AI Search', 'Web Engineering'],
    authorId: 'tm-2',
    authorName: 'Naveen Krishna',
    authorRole: 'Chief Product Officer',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    publishedDate: '2026-08-05',
    readingTimeMinutes: 7,
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    directAnswerAEO:
      'Answer Engine Optimization (AEO) is the technical practice of formatting web content with explicit direct answers, hierarchical heading entities, and JSON-LD structured schemas so that AI search engines (like Google AI Overviews, Perplexity, and Gemini) can reliably cite and extract your website as the primary answer.',
    blocks: [
      {
        id: 'b31',
        type: 'heading',
        level: 2,
        content: 'Why AEO is the Next Evolution of Technical SEO',
      },
      {
        id: 'b32',
        type: 'paragraph',
        content:
          'Search engines no longer merely return 10 blue links; they synthesize comprehensive answers directly in the search interface. If your website does not provide direct, verifiable answers backed by schema entities, your content will be bypassed by the next generation of AI crawlers.',
      },
      {
        id: 'b33',
        type: 'code',
        content:
          '{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [{\n    "@type": "Question",\n    "name": "What is AEO?",\n    "acceptedAnswer": {\n      "@type": "Answer",\n      "text": "Answer Engine Optimization structures content for AI citations."\n    }\n  }]\n}',
      },
    ],
    faqs: [
      {
        question: 'Is AEO different from traditional SEO?',
        answer: 'Yes. While SEO focuses on keyword rankings and backlinks, AEO focuses on semantically unambiguous entity answers and structured data that AI models can ingest without confusion.',
      },
    ],
    seoTitle: 'Answer Engine Optimization (AEO) Blueprint | Swanaya Web Technologies',
    metaDescription: 'Master Answer Engine Optimization (AEO) to secure prominent citations across Google AI and next-gen search engines.',
    canonicalUrl: 'https://swanayamedia.com/insights/ai-and-answer-engine-optimization-aeo',
    ogImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    focusKeywords: ['Answer Engine Optimization', 'AEO strategy', 'Google AI Overviews', 'Swanaya technology'],
    status: 'published',
    isFeatured: false,
    viewsCount: 1850,
  },
];

export const INITIAL_SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'soc-1',
    platform: 'Instagram',
    name: 'Instagram Official',
    username: '@swanaya_media_production',
    profileUrl: 'https://instagram.com/swanaya_media_production',
    iconName: 'Instagram',
    description: 'Behind the scenes, latest commercial reels, cinematography stills, and creative campaigns.',
    followersDisplay: '28.4K Followers',
    featured: true,
    active: true,
    order: 1,
  },
  {
    id: 'soc-2',
    platform: 'LinkedIn',
    name: 'LinkedIn Corporate',
    username: 'Swanaya Media Enterprises',
    profileUrl: 'https://linkedin.com/company/swanaya-media-enterprises',
    iconName: 'Linkedin',
    description: 'Corporate announcements, thought leadership, business strategy insights, and technology breakthroughs.',
    followersDisplay: '12.8K Connections',
    featured: true,
    active: true,
    order: 2,
  },
  {
    id: 'soc-3',
    platform: 'YouTube',
    name: 'YouTube Channel',
    username: '@swanayamedia',
    profileUrl: 'https://youtube.com/@swanayamedia',
    iconName: 'Youtube',
    description: 'Full-length 4K brand films, client case studies, documentary shorts, and podcast interviews.',
    followersDisplay: '45.2K Subscribers',
    featured: true,
    active: true,
    order: 3,
  },
  {
    id: 'soc-4',
    platform: 'Facebook',
    name: 'Facebook Page',
    username: 'Swanaya Media Enterprises',
    profileUrl: 'https://facebook.com/swanayamedia',
    iconName: 'Facebook',
    description: 'Community events, regional tourism highlights, and business updates.',
    followersDisplay: '19.5K Followers',
    featured: false,
    active: true,
    order: 4,
  },
];

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'sp-1',
    platform: 'Instagram',
    title: 'Behind the Scenes: Anamorphic Monsoon Shoot in Wayanad',
    caption:
      'Catching the misty breaks at 5:30 AM with the RED Raptor 8K. Every frame crafted with passion by Swanaya Media Production. 🎬🌧️ #Cinematography #KeralaTourism #SwanayaMedia #VisualStorytelling',
    thumbnail: 'https://images.unsplash.com/photo-1579632652988-6f9ba899182d?auto=format&fit=crop&w=600&q=80',
    postUrl: 'https://instagram.com/p/C-example1',
    contentType: 'Reel',
    category: 'MEDIA',
    publishedDate: '2026-08-25',
    campaign: 'Kerala Monsoon 2026',
    isFeatured: true,
    likesDisplay: '3.4K',
    viewsDisplay: '42K',
    active: true,
  },
  {
    id: 'sp-2',
    platform: 'LinkedIn',
    title: 'Why Creative Storytelling & Performance Ads Must Live Under One Roof',
    caption:
      'When your media production team and performance ad media buyers sit at the same table, ad fatigue drops by 60% and ROAS scales to 4.8x. Here is the framework we use at Swanaya Media Enterprises.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    postUrl: 'https://linkedin.com/posts/swanaya-media-breakthrough',
    contentType: 'Article',
    category: 'MARKETING',
    publishedDate: '2026-08-22',
    isFeatured: true,
    likesDisplay: '840',
    viewsDisplay: '14.2K',
    active: true,
  },
  {
    id: 'sp-3',
    platform: 'YouTube',
    title: 'Elysium Wellness: 4K Master Brand Film & Architectural Tour',
    caption:
      'Full cinematic showcase of the award-winning luxury eco-resort in the heart of Kerala backwaters. Produced by Swanaya Media Productions.',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    postUrl: 'https://youtube.com/watch?v=example3',
    contentType: 'Video',
    category: 'PROJECTS',
    publishedDate: '2026-08-18',
    isFeatured: true,
    likesDisplay: '1.9K',
    viewsDisplay: '68K',
    active: true,
  },
  {
    id: 'sp-4',
    platform: 'Instagram',
    title: 'Travel • Breathe • Freedom: Serenity Tours Munnar Expedition',
    caption:
      'Unwinding in the emerald tea estates of Munnar. Plan your bespoke holiday with Swanaya Serenity Tours & Travels. 🌿✈️ #SerenityTours #KeralaTravel #MunnarHills',
    thumbnail: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    postUrl: 'https://instagram.com/p/C-example4',
    contentType: 'Reel',
    category: 'EVENTS',
    publishedDate: '2026-08-15',
    isFeatured: false,
    likesDisplay: '2.1K',
    viewsDisplay: '29K',
    active: true,
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Rajeev Nair',
    company: 'Heritage Luxury Resorts Kerala',
    designation: 'Managing Director',
    quote:
      'Swanaya Media Enterprises completely transformed our brand identity and delivered a cinema-grade promotional campaign that drove a 38% increase in direct resort bookings. Their multidisciplinary team operates with unmatched precision and creative depth.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    category: 'Branding',
    metricHighlight: '+38% Direct Bookings',
    projectSlug: 'kerala-tourism-cinematic-campaign',
    isFeatured: true,
    published: true,
  },
  {
    id: 'test-2',
    clientName: 'Sneha Varrier',
    company: 'Aura Loom Sustainable Living',
    designation: 'Co-Founder & Creative Head',
    quote:
      'Scaling our brand from ₹5L to ₹45L monthly revenue seemed daunting until Swanaya stepped in. Their strategic marketing advisory, conversion ad creative pipelines, and technical SEO engine unlocked exponential growth.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    category: 'Marketing',
    metricHighlight: '9x Revenue Scale-Up',
    projectSlug: 'd2c-apparel-brand-scale-up',
    isFeatured: true,
    published: true,
  },
  {
    id: 'test-3',
    clientName: 'Harikrishnan Menon',
    company: 'Apex Horizon Retail & Distribution',
    designation: 'Chief Operating Officer',
    quote:
      'The business consultancy sprint with Swanaya was a game changer for our regional distribution network. They restructured our omnichannel sales funnel, eliminated operational bottlenecks, and gave us a crystal-clear 12-month GTM roadmap.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    category: 'Consulting',
    metricHighlight: '42% Efficiency Boost',
    isFeatured: true,
    published: true,
  },
  {
    id: 'test-4',
    clientName: 'Dr. Mathews Kurian',
    company: 'Elysium Wellness Retreats',
    designation: 'Founder & CEO',
    quote:
      'The custom web booking engine and visual brand system crafted by Swanaya Web Technologies cut our OTA commissions by ₹18 Lakhs in year one. Lightning fast, mathematically structured, and effortless for our guests.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    category: 'Technology',
    metricHighlight: '₹18L Commission Saved',
    projectSlug: 'resort-hotel-booking-engine',
    isFeatured: true,
    published: true,
  },
  {
    id: 'test-5',
    clientName: 'Farhan Al-Maktoum / Ananya Roy',
    company: 'Ziva Luxury Ayurveda (GCC & India)',
    designation: 'Director of Brand Strategy',
    quote:
      'Swanaya’s Brand Identity Manual and visual design bible gave Ziva the premium stature required to enter Middle East luxury department stores. Their typography, packaging architecture, and brand narrative are simply peerless.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    category: 'Branding',
    metricHighlight: 'GCC Market Entry Success',
    isFeatured: true,
    published: true,
  },
  {
    id: 'test-6',
    clientName: 'Kavitha S. Pillai',
    company: 'Malabar Agro Exports & Organic Foods',
    designation: 'Executive Director',
    quote:
      'Aadithyan and the Swanaya advisory team provided transformative corporate consulting. Their unit-economics audit and digital export pipeline strategy directly helped us secure our European retail distribution tie-ups.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    category: 'Consulting',
    metricHighlight: '3 Global Export Contracts',
    isFeatured: true,
    published: true,
  },
  {
    id: 'test-7',
    clientName: 'Vipin Chandran',
    company: 'Greenway Electric Mobility',
    designation: 'Head of Growth & Performance',
    quote:
      'Swanaya consistently delivers 4.2x to 5.5x ROAS on our Meta and Google advertising accounts. Their motion graphics and high-velocity ad hooks out-convert every single agency we worked with previously.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    category: 'Marketing',
    metricHighlight: '4.8x Average ROAS',
    isFeatured: false,
    published: true,
  },
  {
    id: 'test-8',
    clientName: 'Naveen George',
    company: 'Skyline Pinnacle Tech & Media',
    designation: 'Creative Director',
    quote:
      'From 8K drone cinematography to DaVinci Resolve color grading, Swanaya Media Production produces work that rivals the best Mumbai and Bangalore production houses. Fast turnaround and flawless execution.',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    category: 'Media',
    metricHighlight: 'Cinema-Grade 8K Masters',
    isFeatured: false,
    published: true,
  },
];

export const INITIAL_FAQS: FAQ[] = [
  // --- Marketing Services FAQs ---
  {
    id: 'faq-mkt-1',
    question: 'How does Swanaya approach Performance Marketing vs Organic Brand Growth?',
    answer:
      'We integrate full-funnel paid campaigns (Meta Ads, Google Search/Display, YouTube, and LinkedIn Ads) with high-retention organic content pipelines. Performance ads drive immediate qualified leads and sales conversions, while our cinematic brand media builds lasting equity and reduces overall customer acquisition cost (CAC) over time.',
    category: 'Marketing',
    relatedServiceSlug: 'digital-marketing',
    published: true,
  },
  {
    id: 'faq-mkt-2',
    question: 'What is the recommended ad spend budget for digital marketing campaigns?',
    answer:
      'Ad spend varies by industry and geographical target. For localized Kerala campaigns or regional product rollouts, we typically recommend a starting media budget of ₹25,000 – ₹75,000/month. For pan-India or global GCC campaigns, ad spends typically range from ₹1,00,000 to ₹5,00,000+/month. Swanaya charges a structured management retainer or performance fee separate from the platform ad spend.',
    category: 'Marketing',
    relatedServiceSlug: 'digital-marketing',
    published: true,
  },
  {
    id: 'faq-mkt-3',
    question: 'How do you measure and report campaign ROI and attribution?',
    answer:
      'We implement server-side tracking (Meta Conversions API, Google Analytics 4, UTM tagging architectures) and deliver real-time live dashboard access to clients. Bi-weekly and monthly sprint reviews analyze Cost Per Lead (CPL), Return on Ad Spend (ROAS), Customer Lifetime Value (LTV), and conversion funnel drop-offs.',
    category: 'Marketing',
    relatedServiceSlug: 'digital-marketing',
    published: true,
  },
  {
    id: 'faq-mkt-4',
    question: 'What is included in your Social Media Management retainers?',
    answer:
      'Our monthly retainers cover end-to-end social execution: monthly content calendar planning, graphic design & motion carousels, short-form reels/TikToks scripting and editing, copywriting with SEO-optimized hashtags, community engagement & DM monitoring, and influencer collaboration management.',
    category: 'Marketing',
    relatedServiceSlug: 'social-media-management',
    published: true,
  },

  // --- Business Consulting FAQs ---
  {
    id: 'faq-con-1',
    question: 'What does a Swanaya Strategic Business & Marketing Consulting engagement look like?',
    answer:
      'Our consultancy delivers structured 6-to-12 week advisory sprints or ongoing executive retainers. We conduct deep-dive market positioning diagnostics, competitive landscape audits, unit economics analysis, go-to-market (GTM) strategy formulation, and digital transformation roadmaps for leadership teams.',
    category: 'Consulting',
    relatedServiceSlug: 'business-consulting',
    published: true,
  },
  {
    id: 'faq-con-2',
    question: 'Can you help traditional Kerala/regional enterprises transition to modern digital channels?',
    answer:
      'Yes. We specialize in modernizing legacy family businesses, retail chains, healthcare networks, and educational institutions. We audit their existing sales funnels, design digital customer journeys, build CRM automation workflows, and train internal staff on modern marketing management.',
    category: 'Consulting',
    relatedServiceSlug: 'business-consulting',
    published: true,
  },
  {
    id: 'faq-con-3',
    question: 'How are consulting deliverables and milestones structured?',
    answer:
      'Consulting engagements are divided into four clear phases: 1) Diagnostic Discovery & Data Audit, 2) Strategy & Architecture Formulation, 3) Implementation Roadmap & Pilot Rollout, and 4) KPI Measurement & Governance Handover. Every phase culminates in a documented executive deck and operational playbook.',
    category: 'Consulting',
    relatedServiceSlug: 'business-consulting',
    published: true,
  },

  // --- Media & Video Production FAQs ---
  {
    id: 'faq-med-1',
    question: 'What is the typical production timeline for a brand film or commercial video?',
    answer:
      'Standard corporate films, brand commercials, or product showcases typically take 2 to 4 weeks from initial script sign-off to final color-graded delivery. For urgent event recaps, short-form reels, or ad cutdowns, expedited 48-to-72 hour turnarounds are available upon request.',
    category: 'Media Production',
    relatedServiceSlug: 'video-production',
    published: true,
  },
  {
    id: 'faq-med-2',
    question: 'Do you handle the entire production process in-house (script, crew, equipment, post)?',
    answer:
      'Yes. Swanaya operates complete internal production capabilities including concept ideation, storyboarding, scriptwriting, casting, professional cinema camera packages (Sony Cinema Line / RED / Blackmagic), licensed aerial drone cinematography, multi-track audio mastering, and DaVinci Resolve color grading.',
    category: 'Media Production',
    relatedServiceSlug: 'video-production',
    published: true,
  },

  // --- Technology & Web FAQs ---
  {
    id: 'faq-tech-1',
    question: 'What technologies do you use for website and web application development?',
    answer:
      'We build on modern, high-performance tech stacks including React, Next.js, Vite, TypeScript, Tailwind CSS, Node.js, Python, PostgreSQL, and headless CMS frameworks. Every web platform is engineered with sub-second load times, mobile-first responsive geometry, and accessibility standards.',
    category: 'Technology',
    relatedServiceSlug: 'web-development',
    published: true,
  },
  {
    id: 'faq-tech-2',
    question: 'What is Answer Engine Optimization (AEO) and is it included in your websites?',
    answer:
      'AEO (Answer Engine Optimization) structures content, microdata, and Schema.org JSON-LD markup so modern AI engines (such as Gemini, ChatGPT, Perplexity, and Google SGE) cite your brand as the authoritative primary source. All Swanaya web engineering projects come pre-configured with comprehensive AEO and technical SEO.',
    category: 'Technology',
    relatedServiceSlug: 'web-development',
    published: true,
  },
  {
    id: 'faq-tech-3',
    question: 'Do you provide post-launch maintenance, SLAs, and security support?',
    answer:
      'Yes. We offer continuous DevOps and web management SLAs that include 99.9% uptime monitoring, weekly security audits, automated database backups, content updates, SSL renewals, and browser compatibility patches.',
    category: 'Technology',
    relatedServiceSlug: 'web-development',
    published: true,
  },

  // --- Branding FAQs ---
  {
    id: 'faq-brd-1',
    question: 'What is included in the Swanaya Brand Identity System?',
    answer:
      'Our branding packages deliver a full Brand Identity Manual: Primary & Secondary Logo Marks, Color Palette with Accessibility Codes, Typography Hierarchies, Brand Tone of Voice, Stationeries, Social Media Toolkits, Packaging Templates, and vector/raster export suites in all industry formats.',
    category: 'Branding',
    relatedServiceSlug: 'branding',
    published: true,
  },

  // --- Travel & Tourism FAQs ---
  {
    id: 'faq-trv-1',
    question: 'What is Swanaya Serenity Tours & Travels?',
    answer:
      'Serenity Tours is Swanaya’s dedicated travel and tourism division, operating under the motto "TRAVEL • BREATHE • FREEDOM". We curate bespoke Kerala luxury retreats, backwater houseboat experiences, corporate offsites, and experiential destination marketing campaigns.',
    category: 'Travel',
    relatedServiceSlug: 'travel-tourism',
    published: true,
  },

  // --- General & Enterprise Engagement FAQs ---
  {
    id: 'faq-gen-1',
    question: 'What makes Swanaya Media Enterprises different from single-discipline agencies?',
    answer:
      'Swanaya operates as an integrated multi-division ecosystem. Rather than hiring separate video producers, ad agencies, web developers, and business consultants, Swanaya combines creative storytelling, technology, performance marketing, and travel logistics under one unified roof for seamless synergy.',
    category: 'General',
    published: true,
  },
  {
    id: 'faq-gen-2',
    question: 'How do I start a new project or book a strategic discovery session?',
    answer:
      'You can submit a project brief through our "Start a Project" modal, reach out directly on WhatsApp (+91 82899 00297 / +91 70129 45221), or email us at swanayamediaproduction@gmail.com. We schedule a 30-minute discovery call within 24 hours to scope your requirements.',
    category: 'General',
    published: true,
  },
  {
    id: 'faq-gen-3',
    question: 'Do you sign Non-Disclosure Agreements (NDAs) before project discussions?',
    answer:
      'Yes, absolutely. We treat all client business metrics, proprietary software concepts, unpublished brand identities, and campaign data with strict confidentiality. Standard NDAs can be executed immediately prior to our initial strategic review.',
    category: 'General',
    published: true,
  },
];

export const INITIAL_LEADS: ContactLead[] = [
  {
    id: 'lead-1',
    name: 'Kavitha R. Pillai',
    email: 'kavitha@ayurwellnesskerala.com',
    phone: '+91 98460 77889',
    company: 'Ayur Wellness Resorts',
    serviceRequired: 'Cinematic Video Production & Media',
    budgetRange: '₹3,00,000 – ₹5,00,000',
    message:
      'We are looking for an 8K cinematic brand film and 12 vertical social reels for our upcoming wellness resort launch in Vagamon.',
    source: 'Website Contact Form',
    campaign: 'Hero CTA',
    submittedAt: '2026-08-27T06:15:00Z',
    status: 'NEW',
    notes: [
      {
        id: 'n1',
        author: 'Aadithyan M. Menon',
        timestamp: '2026-08-27T06:30:00Z',
        note: 'High priority lead. Scheduled introductory discovery call for tomorrow 11 AM.',
      },
    ],
    estimatedValue: '₹4,50,000',
  },
  {
    id: 'lead-2',
    name: 'Harish Nambiar',
    email: 'harish@nambiarfintech.io',
    phone: '+91 97451 22334',
    company: 'Nambiar FinTech Innovations',
    serviceRequired: 'Modern Web Engineering & React Applications',
    budgetRange: '₹5,00,000+',
    message:
      'We require a full-stack corporate web portal with role-based client dashboard, AEO search indexing, and automated lead capture.',
    source: 'Google Search',
    submittedAt: '2026-08-26T14:22:00Z',
    status: 'QUALIFIED',
    notes: [
      {
        id: 'n2',
        author: 'Naveen Krishna',
        timestamp: '2026-08-26T15:00:00Z',
        note: 'Sent architecture deck and scope proposal. Awaiting technical review.',
      },
    ],
    estimatedValue: '₹7,20,000',
  },
  {
    id: 'lead-3',
    name: 'Faizal Rahman',
    email: 'faizal@spicegardentours.com',
    phone: '+91 94471 99887',
    company: 'Spice Garden Group',
    serviceRequired: 'Integrated Digital Marketing & Growth',
    budgetRange: '₹1,50,000 – ₹3,00,000',
    message:
      'Seeking a 6-month monthly retainer for Meta and Google performance marketing to scale European traveler bookings.',
    source: 'Instagram Ad',
    campaign: 'Instagram Reel Campaign',
    submittedAt: '2026-08-25T09:40:00Z',
    status: 'PROPOSAL',
    notes: [
      {
        id: 'n3',
        author: 'Aspal P. I.',
        timestamp: '2026-08-25T11:00:00Z',
        note: 'Proposal shared with 3 ROAS targets. Client agreed in principle.',
      },
    ],
    estimatedValue: '₹3,00,000/mo',
  },
  {
    id: 'lead-4',
    name: 'Anjali Menon',
    email: 'anjali@thesilkroute.co',
    phone: '+91 99955 44332',
    company: 'The Silk Route Boutique',
    serviceRequired: 'Brand Strategy & Visual Identity',
    budgetRange: '₹1,00,000 – ₹2,00,000',
    message:
      'Complete brand identity redesign, packaging boxes, and social media creative guidelines.',
    source: 'Direct Referral',
    submittedAt: '2026-08-23T11:15:00Z',
    status: 'WON',
    notes: [
      {
        id: 'n4',
        author: 'ThanseeR',
        timestamp: '2026-08-23T16:00:00Z',
        note: 'Agreement executed and 50% advance received. Onboarding commenced.',
      },
    ],
    estimatedValue: '₹1,80,000',
  },
];

export const INITIAL_LIVE_VISITORS: LiveVisitor[] = [
  {
    id: 'vis-1',
    currentPage: '/services/digital-marketing',
    pageTitle: 'Integrated Digital Marketing & Growth',
    source: 'Google',
    device: 'Desktop',
    location: 'Kochi, Kerala, IN',
    countryCode: 'IN',
    sessionDurationSec: 245,
    latitude: 9.9312,
    longitude: 76.2673,
    lastActive: 'Just now',
  },
  {
    id: 'vis-2',
    currentPage: '/',
    pageTitle: 'Swanaya Media Enterprises | Corporate HQ',
    source: 'Instagram',
    device: 'Mobile',
    location: 'Bengaluru, Karnataka, IN',
    countryCode: 'IN',
    sessionDurationSec: 120,
    latitude: 12.9716,
    longitude: 77.5946,
    lastActive: 'Just now',
  },
  {
    id: 'vis-3',
    currentPage: '/projects/kerala-tourism-cinematic-campaign',
    pageTitle: 'Kerala Tourism Cinematic Case Study',
    source: 'YouTube',
    device: 'Desktop',
    location: 'Dubai, UAE',
    countryCode: 'AE',
    sessionDurationSec: 360,
    latitude: 25.2048,
    longitude: 55.2708,
    lastActive: '1m ago',
  },
  {
    id: 'vis-4',
    currentPage: '/services/web-development',
    pageTitle: 'Modern Web Engineering & React Applications',
    source: 'Direct',
    device: 'Desktop',
    location: 'London, United Kingdom',
    countryCode: 'GB',
    sessionDurationSec: 410,
    latitude: 51.5074,
    longitude: -0.1278,
    lastActive: 'Just now',
  },
  {
    id: 'vis-5',
    currentPage: '/divisions/serenity-tours',
    pageTitle: 'Swanaya Serenity Tours & Travels',
    source: 'Instagram',
    device: 'Mobile',
    location: 'Mumbai, Maharashtra, IN',
    countryCode: 'IN',
    sessionDurationSec: 95,
    latitude: 19.076,
    longitude: 72.8777,
    lastActive: '2m ago',
  },
  {
    id: 'vis-6',
    currentPage: '/insights/what-does-digital-marketing-do',
    pageTitle: 'What Does Digital Marketing Do? Insights',
    source: 'Google',
    device: 'Desktop',
    location: 'Calicut, Kerala, IN',
    countryCode: 'IN',
    sessionDurationSec: 180,
    latitude: 11.2588,
    longitude: 75.7804,
    lastActive: 'Just now',
  },
  {
    id: 'vis-7',
    currentPage: '/contact',
    pageTitle: 'Contact Swanaya Media Enterprises',
    source: 'LinkedIn',
    device: 'Desktop',
    location: 'Singapore',
    countryCode: 'SG',
    sessionDurationSec: 155,
    latitude: 1.3521,
    longitude: 103.8198,
    lastActive: 'Just now',
  },
  {
    id: 'vis-8',
    currentPage: '/products/swanique-ai',
    pageTitle: 'Swanique AI Platform',
    source: 'Direct',
    device: 'Desktop',
    location: 'San Francisco, CA, US',
    countryCode: 'US',
    sessionDurationSec: 310,
    latitude: 37.7749,
    longitude: -122.4194,
    lastActive: '3m ago',
  },
];

export const INITIAL_ANALYTICS_SUMMARY: AnalyticsSummary = {
  activeVisitorsNow: 14,
  todayPageViews: 2840,
  totalLeadsCount: 48,
  conversionRatePercent: 3.8,
  topPages: [
    { page: '/services/digital-marketing', views: 820, activeNow: 4 },
    { page: '/', views: 740, activeNow: 3 },
    { page: '/services/video-production', views: 490, activeNow: 2 },
    { page: '/projects', views: 360, activeNow: 2 },
    { page: '/divisions/serenity-tours', views: 240, activeNow: 1 },
    { page: '/insights/what-does-digital-marketing-do', views: 190, activeNow: 2 },
  ],
  trafficSources: [
    { name: 'Google (Organic & Ads)', percentage: 38, color: '#2563eb' },
    { name: 'Instagram (@swanaya_media_production)', percentage: 28, color: '#e1306c' },
    { name: 'YouTube Channel', percentage: 16, color: '#ff0000' },
    { name: 'LinkedIn Corporate', percentage: 10, color: '#0a66c2' },
    { name: 'Direct Traffic', percentage: 5, color: '#10b981' },
    { name: 'Referral & PR', percentage: 3, color: '#8b5cf6' },
  ],
  deviceBreakdown: [
    { device: 'Mobile', percentage: 58 },
    { device: 'Desktop', percentage: 38 },
    { device: 'Tablet', percentage: 4 },
  ],
  dailyViewsHistory: [
    { date: '21 Aug', views: 1890, visitors: 1120, leads: 4 },
    { date: '22 Aug', views: 2100, visitors: 1340, leads: 6 },
    { date: '23 Aug', views: 2350, visitors: 1480, leads: 5 },
    { date: '24 Aug', views: 2600, visitors: 1620, leads: 8 },
    { date: '25 Aug', views: 2420, visitors: 1510, leads: 7 },
    { date: '26 Aug', views: 2780, visitors: 1750, leads: 9 },
    { date: '27 Aug', views: 2840, visitors: 1810, leads: 11 },
  ],
  funnelData: [
    { stage: 'Total Website Visitors', count: 1810, dropoffPercent: 0 },
    { stage: 'Engaged Sessions (>60s)', count: 1240, dropoffPercent: 31.5 },
    { stage: 'Service & Project Views', count: 820, dropoffPercent: 33.8 },
    { stage: 'CTA Clicks (Start a Project)', count: 145, dropoffPercent: 82.3 },
    { stage: 'Contact Form Submissions', count: 48, dropoffPercent: 66.8 },
    { stage: 'Qualified Sales Leads', count: 26, dropoffPercent: 45.8 },
  ],
};

export const INITIAL_PAGE_SECTIONS: PageSectionConfig[] = [
  { id: 'hero', name: '3D Ecosystem Hero', enabled: true, order: 1 },
  { id: 'intro', name: 'Company Introduction & Positioning', enabled: true, order: 2 },
  { id: 'divisions', name: 'Business Divisions Showcase', enabled: true, order: 3 },
  { id: 'services', name: 'Core Services Catalog', enabled: true, order: 4 },
  { id: 'projects', name: 'Featured Projects & Case Studies', enabled: true, order: 5 },
  { id: 'products', name: 'Swanique AI & Product Ecosystem', enabled: true, order: 6 },
  { id: 'difference', name: 'Why Swanaya: From Idea to Impact', enabled: true, order: 7 },
  { id: 'team', name: 'Leadership & Creative Minds', enabled: true, order: 8 },
  { id: 'testimonials', name: 'Client Testimonials & Trust', enabled: true, order: 9 },
  { id: 'insights', name: 'Latest Insights & Editorial Blog', enabled: true, order: 10 },
  { id: 'social', name: 'The Swanaya Social Content Wall', enabled: true, order: 11 },
  { id: 'cta', name: 'Start a Project Consultation Banner', enabled: true, order: 12 },
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    username: 'aadithyan',
    name: 'Aadithyan M. Menon',
    email: 'swanayamediaproduction@gmail.com',
    role: 'Super Admin',
    passwordHash: 'swanaya2026!', // securely managed in session
    mustChangePassword: false,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-08-01T00:00:00Z',
    lastLoginAt: '2026-08-27T08:00:00Z',
  },
  {
    id: 'usr-2',
    username: 'naveen',
    name: 'Naveen Krishna',
    email: 'naveen@swanayamedia.com',
    role: 'Content Manager',
    passwordHash: 'swanaya_tech2026',
    mustChangePassword: false,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-08-05T00:00:00Z',
    lastLoginAt: '2026-08-26T17:30:00Z',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-08-27T08:15:00Z',
    adminUsername: 'aadithyan',
    adminRole: 'Super Admin',
    action: 'UPDATE',
    entityType: 'Service',
    entityTitle: 'Integrated Digital Marketing & Growth',
    details: 'Updated AEO Direct Answer and Meta Ad ROAS deliverables.',
  },
  {
    id: 'log-2',
    timestamp: '2026-08-27T07:45:00Z',
    adminUsername: 'aadithyan',
    adminRole: 'Super Admin',
    action: 'PUBLISH',
    entityType: 'BlogPost',
    entityTitle: 'What Does Modern Digital Marketing Actually Do for Business Growth?',
    details: 'Published new editorial article with JSON-LD Article Schema.',
  },
  {
    id: 'log-3',
    timestamp: '2026-08-26T16:20:00Z',
    adminUsername: 'aadithyan',
    adminRole: 'Super Admin',
    action: 'UPDATE',
    entityType: 'Lead',
    entityTitle: 'Lead #lead-2 (Harish Nambiar)',
    details: 'Status changed from CONTACTED to QUALIFIED.',
  },
  {
    id: 'log-4',
    timestamp: '2026-08-26T11:00:00Z',
    adminUsername: 'aadithyan',
    adminRole: 'Super Admin',
    action: 'SETTINGS_CHANGE',
    entityType: 'SiteSettings',
    entityTitle: 'Global Site Branding',
    details: 'Verified company primary contact: swanayamediaproduction@gmail.com',
  },
];

export const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'med-1',
    fileName: 'swanaya-corporate-logo.svg',
    url: '/assets/swanaya-logo.svg',
    mimeType: 'image/svg+xml',
    fileSizeBytes: 24500,
    altText: 'Swanaya Media Enterprises Official Vector Logo',
    category: 'Branding',
    uploadDate: '2026-08-01',
    width: 800,
    height: 300,
  },
  {
    id: 'med-2',
    fileName: 'kerala-tourism-cinema-still.webp',
    url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    mimeType: 'image/webp',
    fileSizeBytes: 184000,
    altText: 'Gods Own Country Kerala Backwaters 8K Cinema Frame',
    category: 'Projects',
    uploadDate: '2026-08-10',
    width: 1920,
    height: 1080,
  },
  {
    id: 'med-3',
    fileName: 'elysium-resort-aerial.webp',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    mimeType: 'image/webp',
    fileSizeBytes: 215000,
    altText: 'Elysium Luxury Wellness Retreat Aerial View',
    category: 'Projects',
    uploadDate: '2026-08-12',
    width: 1920,
    height: 1080,
  },
];

export const INITIAL_SEO_SETTINGS: SEOSetting[] = [
  {
    route: '/',
    title: 'Swanaya Media Enterprises | Creating Brands. Building Experiences. Growing Businesses.',
    description:
      'Digital headquarters of Swanaya Media Enterprises. Integrated media production, digital marketing, web technologies, consultancy, travel, and AI products in Kerala, India.',
    keywords: ['Swanaya Media Enterprises', 'Digital Marketing Kerala', 'Media Production Kochi', 'Web Development India', 'Serenity Tours'],
    ogTitle: 'Swanaya Media Enterprises | Official Digital Headquarters',
    ogDescription: 'Creating Brands. Building Experiences. Growing Businesses.',
    ogImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    canonical: 'https://swanayamedia.com/',
    schemaType: 'Organization',
  },
  {
    route: '/about',
    title: 'About Swanaya Media Enterprises | Vision, Mission & Creative Ecosystem',
    description: 'Learn about Swanaya Media Enterprises — our multidisciplinary ecosystem connecting media, marketing, technology, and travel.',
    keywords: ['About Swanaya', 'Kerala creative agency', 'Aadithyan M. Menon', 'Integrated media agency'],
    ogTitle: 'About Swanaya Media Enterprises',
    ogDescription: 'Where Creativity Meets Technology. Where Stories Become Brands.',
    ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    canonical: 'https://swanayamedia.com/about',
    schemaType: 'WebPage',
  },
  {
    route: '/services',
    title: 'Integrated Services | Media, Marketing, Tech & Consulting | Swanaya',
    description: 'Explore full-spectrum business services: Video production, performance marketing, web engineering, brand identity, and Kerala travel experiences.',
    keywords: ['Swanaya Services', 'Video production services', 'Meta ads agency', 'React development agency'],
    ogTitle: 'Corporate Services | Swanaya Media Enterprises',
    ogDescription: 'Full-spectrum services engineered for measurable enterprise growth.',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    canonical: 'https://swanayamedia.com/services',
    schemaType: 'Service',
  },
];
