import { useState } from 'react';
import {
  profile as staticProfile,
  projects as staticProjects,
  education as staticEducation,
  experience as staticExperience,
  skills as staticSkills,
  certifications as staticCertifications,
  siteSettings as staticSettings,
} from '@/data/portfolio';
import type { Profile, Project, Education, Experience, Skill, Certification, SiteSettings, ContactMessage } from '@/types/portfolio';

function getStored<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function useStaticOrStored<T>(key: string, fallback: T) {
  const [data] = useState<T>(() => getStored(key, fallback));
  return { data, isLoading: false, error: null };
}

export function useProfile() {
  return useStaticOrStored<Profile | null>('portfolio_profile', staticProfile);
}

export function useProjects() {
  return useStaticOrStored<Project[]>('portfolio_projects', staticProjects);
}

export function useFeaturedProjects() {
  const all = getStored<Project[]>('portfolio_projects', staticProjects);
  const featured = all.filter((p) => p.is_featured);
  return { data: featured, isLoading: false, error: null };
}

export function useProject(id: string) {
  const all = getStored<Project[]>('portfolio_projects', staticProjects);
  const project = all.find((p) => p.id === id) || null;
  return { data: project, isLoading: false, error: null };
}

export function useEducation() {
  return useStaticOrStored<Education[]>('portfolio_education', staticEducation);
}

export function useExperience() {
  return useStaticOrStored<Experience[]>('portfolio_experience', staticExperience);
}

export function useSkills() {
  return useStaticOrStored<Skill[]>('portfolio_skills', staticSkills);
}

export function useCertifications() {
  return useStaticOrStored<Certification[]>('portfolio_certifications', staticCertifications);
}

export function useSiteSettings() {
  return useStaticOrStored<SiteSettings | null>('portfolio_settings', staticSettings);
}

export function useContactMessages() {
  return useStaticOrStored<ContactMessage[]>('portfolio_messages', []);
}
