import { useQuery } from '@tanstack/react-query';
import contentData from '@/data/content.json';
import type { PortfolioContent, SkillsByCategory } from '@/types/content';
import { calculateSkillRankings } from '@/types/content';

/**
 * Hook to load portfolio content from static JSON file
 */
export function usePortfolioContent() {
  return useQuery<PortfolioContent>({
    queryKey: ['portfolio-content'],
    queryFn: () => Promise.resolve(contentData as PortfolioContent),
    staleTime: Infinity, // Content is static unless manually updated
  });
}

/**
 * Hook to get skills with rankings based on citations
 */
export function useSkillsWithRanking() {
  const { data: content, ...rest } = usePortfolioContent();
  
  const skillsByCategory = content ? calculateSkillRankings(content) : {};
  
  return {
    skillsByCategory,
    allSkills: Object.values(skillsByCategory).flat(),
    categories: Object.keys(skillsByCategory).sort(),
    ...rest,
  };
}

/**
 * Hook to get projects with skill details
 */
export function useProjectsWithSkills() {
  const { data: content, ...rest } = usePortfolioContent();
  
  return {
    projects: content?.projects || [],
    ...rest,
  };
}

/**
 * Hook to get experiences
 */
export function useExperiencesContent() {
  const { data: content, ...rest } = usePortfolioContent();
  
  return {
    experiences: content?.experiences || [],
    ...rest,
  };
}

/**
 * Hook to get education
 */
export function useEducationContent() {
  const { data: content, ...rest } = usePortfolioContent();
  
  return {
    education: content?.education || [],
    ...rest,
  };
}

/**
 * Hook to get certifications
 */
export function useCertificationsContent() {
  const { data: content, ...rest } = usePortfolioContent();
  
  return {
    certifications: content?.certifications || [],
    ...rest,
  };
}

/**
 * Hook to get about content
 */
export function useAboutContent() {
  const { data: content, ...rest } = usePortfolioContent();
  
  return {
    about: content?.about,
    ...rest,
  };
}

/**
 * Hook to get contact information
 */
export function useContactContent() {
  const { data: content, ...rest } = usePortfolioContent();
  
  return {
    contact: content?.contact,
    ...rest,
  };
}
