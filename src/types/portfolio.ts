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
  google_slides_url: string | null;
  pdf_url: string | null;
  video_url: string | null;
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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  image_filter: ImageFilter | null;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  video_url: string | null;
  gallery_images: string[];
  google_docs_url: string | null;
  google_sheets_url: string | null;
  google_slides_url: string | null;
  pdf_url: string | null;
  embed_code: string | null;
  created_at: string;
  updated_at: string;
}

export type ImageFilter = 'none' | 'grayscale' | 'monochrome' | 'retro' | 'warm' | 'cool' | 'high-contrast';

export interface PageCustomization {
  id: string;
  page_path: string;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  heading_font: string | null;
  body_font: string | null;
  navbar_color: string | null;
  navbar_font: string | null;
  hidden_nav_links: string[];
}

export type ProjectCategory = 'Financial Models' | 'Case Studies' | 'Code' | 'Research';
export type SkillCategory = 'Technical' | 'Soft Skills' | 'Tools' | 'Languages';
