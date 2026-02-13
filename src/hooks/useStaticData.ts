import { useQuery } from '@tanstack/react-query';
import {
  loadProjects,
  loadProject,
  loadProfile,
  loadSiteSettings,
  loadEducation,
  loadExperience,
  loadSkills,
  loadCertifications,
} from '@/lib/staticData';
import type { Profile, Project, Education, Experience, Skill, Certification, SiteSettings } from '@/types/portfolio';

/**
 * Static data hooks for GitHub Pages deployment
 * These hooks load data from JSON files instead of Supabase
 */

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: loadProfile,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: loadProjects,
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      const projects = await loadProjects();
      return projects.filter(p => p.is_featured).slice(0, 6);
    },
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => loadProject(id),
    enabled: !!id,
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: loadEducation,
  });
}

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: loadExperience,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: loadSkills,
  });
}

export function useCertifications() {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: loadCertifications,
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: loadSiteSettings,
  });
}
