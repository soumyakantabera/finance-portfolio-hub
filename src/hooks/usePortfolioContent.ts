import { useQuery } from '@tanstack/react-query';
import contentData from '@/data/content.json';
import type { PortfolioContent, SkillsByCategory, Skill } from '@/types/content';
import { calculateSkillRankings, loadMasterSkills } from '@/types/content';

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
 * Hook to load master skills database
 */
export function useMasterSkills() {
  return useQuery<Skill[]>({
    queryKey: ['master-skills'],
    queryFn: loadMasterSkills,
    staleTime: Infinity,
  });
}

/**
 * Hook to get skills with rankings based on citations
 * Automatically detects and adds skills from projects, experiences, etc.
 */
export function useSkillsWithRanking() {
  const { data: content, ...contentRest } = usePortfolioContent();
  const { data: masterSkills, ...masterRest } = useMasterSkills();
  
  const skillsByCategory = (content && masterSkills) 
    ? calculateSkillRankings(content, masterSkills) 
    : {};
  
  const isLoading = contentRest.isLoading || masterRest.isLoading;
  const isError = contentRest.isError || masterRest.isError;
  
  return {
    skillsByCategory,
    allSkills: Object.values(skillsByCategory).flat(),
    categories: Object.keys(skillsByCategory).sort(),
    isLoading,
    isError,
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
