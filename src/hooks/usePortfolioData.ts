import {
  profile as staticProfile,
  projects as staticProjects,
  education as staticEducation,
  experience as staticExperience,
  skills as staticSkills,
  certifications as staticCertifications,
  siteSettings as staticSettings,
} from '@/data/portfolio';
import type { Profile, Project, Education, Experience, Skill, Certification, SiteSettings } from '@/types/portfolio';

// Simple wrapper that mimics react-query shape but returns static data
function useStaticData<T>(data: T) {
  return { data, isLoading: false, error: null };
}

export function useProfile() {
  return useStaticData<Profile | null>(staticProfile);
}

export function useProjects() {
  return useStaticData<Project[]>(staticProjects);
}

export function useFeaturedProjects() {
  const featured = staticProjects.filter((p) => p.is_featured);
  return useStaticData<Project[]>(featured);
}

export function useProject(id: string) {
  const project = staticProjects.find((p) => p.id === id) || null;
  return useStaticData<Project | null>(project);
}

export function useEducation() {
  return useStaticData<Education[]>(staticEducation);
}

export function useExperience() {
  return useStaticData<Experience[]>(staticExperience);
}

export function useSkills() {
  return useStaticData<Skill[]>(staticSkills);
}

export function useCertifications() {
  return useStaticData<Certification[]>(staticCertifications);
}

export function useSiteSettings() {
  return useStaticData<SiteSettings | null>(staticSettings);
}
