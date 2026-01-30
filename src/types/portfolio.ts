export interface Profile {
  id: string;
  name: string;
  tagline: string | null;
  bio: string | null;
  photo_url: string | null;
  resume_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  short_description: string | null;
  category: string;
  thumbnail_url: string | null;
  github_url: string | null;
  google_docs_url: string | null;
  google_sheets_url: string | null;
  pdf_url: string | null;
  external_url: string | null;
  embed_code: string | null;
  is_featured: boolean;
  display_order: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  display_order: number;
  created_at: string;
}

export interface Certification {
  id: string;
  name: string;
  issuing_organization: string | null;
  issue_date: string | null;
  expiration_date: string | null;
  credential_url: string | null;
  display_order: number;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  tagline: string | null;
  primary_color: string | null;
  accent_color: string | null;
  contact_email: string | null;
  calendly_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export type ProjectCategory = 'Financial Models' | 'Case Studies' | 'Code' | 'Research';
export type SkillCategory = 'Technical' | 'Soft Skills' | 'Tools' | 'Languages';
