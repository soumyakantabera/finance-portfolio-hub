import { useQuery } from '@tanstack/react-query';
import type { Project, SkillsData } from '@/types/portfolio';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';

export function useStaticProjects() {
  return useQuery({
    queryKey: ['static-projects'],
    queryFn: async () => {
      return (projectsData as Project[]).sort(
        (a, b) => a.display_order - b.display_order
      );
    },
    staleTime: Infinity,
  });
}

export function useStaticFeaturedProjects() {
  return useQuery({
    queryKey: ['static-featured-projects'],
    queryFn: async () => {
      return (projectsData as Project[])
        .filter((p) => p.is_featured)
        .sort((a, b) => a.display_order - b.display_order)
        .slice(0, 6);
    },
    staleTime: Infinity,
  });
}

export function useStaticProject(id: string) {
  return useQuery({
    queryKey: ['static-project', id],
    queryFn: async () => {
      return (projectsData as Project[]).find((p) => p.id === id) ?? null;
    },
    enabled: !!id,
    staleTime: Infinity,
  });
}

export function useStaticSkills() {
  return useQuery({
    queryKey: ['static-skills'],
    queryFn: async () => {
      return skillsData as SkillsData;
    },
    staleTime: Infinity,
  });
}
