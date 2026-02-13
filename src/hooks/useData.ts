/**
 * Unified data hooks that automatically switch between static and Supabase data
 * Based on the configuration setting
 */

import { isStatic } from '@/lib/config';
import * as staticHooks from './useStaticData';
import * as supabaseHooks from './usePortfolioData';

// Export the appropriate hooks based on configuration
export const useProfile = isStatic ? staticHooks.useProfile : supabaseHooks.useProfile;
export const useProjects = isStatic ? staticHooks.useProjects : supabaseHooks.useProjects;
export const useFeaturedProjects = isStatic ? staticHooks.useFeaturedProjects : supabaseHooks.useFeaturedProjects;
export const useProject = isStatic ? staticHooks.useProject : supabaseHooks.useProject;
export const useEducation = isStatic ? staticHooks.useEducation : supabaseHooks.useEducation;
export const useExperience = isStatic ? staticHooks.useExperience : supabaseHooks.useExperience;
export const useSkills = isStatic ? staticHooks.useSkills : supabaseHooks.useSkills;
export const useCertifications = isStatic ? staticHooks.useCertifications : supabaseHooks.useCertifications;
export const useSiteSettings = isStatic ? staticHooks.useSiteSettings : supabaseHooks.useSiteSettings;
