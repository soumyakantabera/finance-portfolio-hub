import type { Profile, Project, Education, Experience, Skill, Certification, SiteSettings } from '@/types/portfolio';

export const profile: Profile = {
  id: '1',
  name: 'Soumya',
  tagline: 'Finance Professional & Data Analyst',
  bio: 'Passionate about transforming complex financial data into actionable insights. Experienced in financial modeling, data analysis, and strategic planning.',
  photo_url: null,
  resume_url: null,
  linkedin_url: null,
  github_url: null,
  email: 'soumya@example.com',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'DCF Valuation Model',
    description: 'A comprehensive discounted cash flow model for tech company valuations. Built with dynamic assumptions, sensitivity tables, and scenario analysis. Includes revenue forecasting, WACC calculation, and terminal value estimation.\n\nThe model supports multiple valuation methodologies including comparable company analysis and precedent transactions.',
    short_description: 'Comprehensive DCF model with sensitivity analysis and scenario modeling.',
    category: 'Financial Models',
    thumbnail_url: null,
    github_url: null,
    google_docs_url: null,
    google_sheets_url: null,
    pdf_url: null,
    external_url: null,
    embed_code: null,
    is_featured: true,
    display_order: 1,
    tags: ['Excel', 'Valuation', 'DCF'],
    created_at: '2025-12-01T00:00:00Z',
    updated_at: '2025-12-01T00:00:00Z',
  },
  {
    id: 'proj-2',
    title: 'Market Risk Dashboard',
    description: 'Interactive dashboard tracking portfolio risk metrics including VaR, Expected Shortfall, and Greeks exposure. Built with real-time data feeds and automated reporting.\n\nFeatures include historical simulation, Monte Carlo analysis, and stress testing capabilities.',
    short_description: 'Real-time portfolio risk monitoring with VaR and stress testing.',
    category: 'Code',
    thumbnail_url: null,
    github_url: null,
    google_docs_url: null,
    google_sheets_url: null,
    pdf_url: null,
    external_url: null,
    embed_code: null,
    is_featured: true,
    display_order: 2,
    tags: ['Python', 'Risk', 'Dashboard'],
    created_at: '2025-10-15T00:00:00Z',
    updated_at: '2025-10-15T00:00:00Z',
  },
  {
    id: 'proj-3',
    title: 'ESG Investment Analysis',
    description: 'Research paper analyzing the correlation between ESG scores and financial performance across S&P 500 companies. Uses regression analysis and factor models to identify alpha-generating ESG factors.',
    short_description: 'Research on ESG scores and financial performance correlation.',
    category: 'Research',
    thumbnail_url: null,
    github_url: null,
    google_docs_url: null,
    google_sheets_url: null,
    pdf_url: null,
    external_url: null,
    embed_code: null,
    is_featured: false,
    display_order: 3,
    tags: ['ESG', 'Research', 'Statistics'],
    created_at: '2025-08-20T00:00:00Z',
    updated_at: '2025-08-20T00:00:00Z',
  },
  {
    id: 'proj-4',
    title: 'M&A Case Study: TechCorp Acquisition',
    description: 'Detailed case study of a hypothetical $2B tech acquisition. Covers strategic rationale, synergy analysis, accretion/dilution modeling, and integration planning.\n\nProblem: Evaluate whether TechCorp should acquire DataFlow Inc.\nApproach: Built comprehensive merger model with synergy assumptions.\nResult: Recommended acquisition at 15% premium with projected 8% EPS accretion by Year 2.',
    short_description: 'M&A case study with full merger model and synergy analysis.',
    category: 'Case Studies',
    thumbnail_url: null,
    github_url: null,
    google_docs_url: null,
    google_sheets_url: null,
    pdf_url: null,
    external_url: null,
    embed_code: null,
    is_featured: true,
    display_order: 4,
    tags: ['M&A', 'Case Study', 'Modeling'],
    created_at: '2025-06-10T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
];

export const skills: Skill[] = [
  // Technical
  { id: 's1', name: 'Financial Modeling', category: 'Technical', proficiency: 95, display_order: 1, created_at: '' },
  { id: 's2', name: 'Python', category: 'Technical', proficiency: 85, display_order: 2, created_at: '' },
  { id: 's3', name: 'SQL', category: 'Technical', proficiency: 80, display_order: 3, created_at: '' },
  { id: 's4', name: 'Excel / VBA', category: 'Technical', proficiency: 92, display_order: 4, created_at: '' },
  { id: 's5', name: 'Data Visualization', category: 'Technical', proficiency: 78, display_order: 5, created_at: '' },
  // Tools
  { id: 's6', name: 'Bloomberg Terminal', category: 'Tools', proficiency: 88, display_order: 6, created_at: '' },
  { id: 's7', name: 'Tableau', category: 'Tools', proficiency: 75, display_order: 7, created_at: '' },
  { id: 's8', name: 'Power BI', category: 'Tools', proficiency: 70, display_order: 8, created_at: '' },
  { id: 's9', name: 'Capital IQ', category: 'Tools', proficiency: 82, display_order: 9, created_at: '' },
  // Soft Skills
  { id: 's10', name: 'Communication', category: 'Soft Skills', proficiency: 90, display_order: 10, created_at: '' },
  { id: 's11', name: 'Problem Solving', category: 'Soft Skills', proficiency: 88, display_order: 11, created_at: '' },
  { id: 's12', name: 'Team Leadership', category: 'Soft Skills', proficiency: 85, display_order: 12, created_at: '' },
];

export const experience: Experience[] = [
  {
    id: 'e1',
    company: 'Global Investment Bank',
    position: 'Financial Analyst',
    start_date: '2023-06-01',
    end_date: null,
    is_current: true,
    description: 'Leading financial analysis and modeling for M&A transactions. Developed valuation frameworks used across the division.',
    display_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'e2',
    company: 'Consulting Corp',
    position: 'Junior Analyst',
    start_date: '2021-09-01',
    end_date: '2023-05-01',
    is_current: false,
    description: 'Performed industry research and competitive analysis for Fortune 500 clients. Built financial models and presentation materials.',
    display_order: 2,
    created_at: '',
    updated_at: '',
  },
];

export const education: Education[] = [
  {
    id: 'ed1',
    institution: 'University of Finance',
    degree: 'Bachelor of Science',
    field_of_study: 'Finance & Economics',
    start_date: '2018-09-01',
    end_date: '2022-06-01',
    description: 'Dean\'s List. Relevant coursework in Corporate Finance, Derivatives, and Econometrics.',
    display_order: 1,
    created_at: '',
    updated_at: '',
  },
];

export const certifications: Certification[] = [
  {
    id: 'c1',
    name: 'CFA Level II Candidate',
    issuing_organization: 'CFA Institute',
    issue_date: '2024-06-01',
    expiration_date: null,
    credential_url: null,
    display_order: 1,
    created_at: '',
  },
  {
    id: 'c2',
    name: 'Financial Modeling & Valuation Analyst',
    issuing_organization: 'CFI',
    issue_date: '2023-03-01',
    expiration_date: null,
    credential_url: null,
    display_order: 2,
    created_at: '',
  },
];

export const siteSettings: SiteSettings = {
  id: '1',
  site_title: 'Finance Portfolio',
  tagline: 'Showcasing my finance journey',
  primary_color: '#1a1a2e',
  accent_color: '#4a5568',
  contact_email: 'soumya@example.com',
  calendly_url: null,
  created_at: '',
  updated_at: '',
};

// Skill references - resources/links associated with each skill
export const skillReferences: Record<string, { label: string; url: string }[]> = {
  'Financial Modeling': [
    { label: 'Wall Street Prep', url: 'https://www.wallstreetprep.com' },
    { label: 'CFI Certification', url: 'https://corporatefinanceinstitute.com' },
  ],
  'Python': [
    { label: 'Python for Finance', url: 'https://python.org' },
  ],
  'SQL': [
    { label: 'SQL Mastery', url: 'https://www.w3schools.com/sql/' },
  ],
  'Bloomberg Terminal': [
    { label: 'Bloomberg Market Concepts', url: 'https://www.bloomberg.com/bmc' },
  ],
};
