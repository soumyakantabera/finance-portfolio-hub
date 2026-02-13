import type { Profile, Project, Education, Experience, Skill, Certification, SiteSettings } from '@/types/portfolio';

/**
 * Utility to load static JSON data for GitHub Pages deployment
 * This replaces Supabase queries with static file loading
 */

const BASE_PATH = '/content';

export async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${BASE_PATH}/projects.json`);
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export async function loadProject(id: string): Promise<Project | null> {
  try {
    const projects = await loadProjects();
    return projects.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error loading project:', error);
    return null;
  }
}

export async function loadProfile(): Promise<Profile | null> {
  try {
    const response = await fetch(`${BASE_PATH}/profile.json`);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading profile:', error);
    return null;
  }
}

export async function loadSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await fetch(`${BASE_PATH}/settings.json`);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
}

export async function loadEducation(): Promise<Education[]> {
  try {
    const response = await fetch(`${BASE_PATH}/education.json`);
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading education:', error);
    return [];
  }
}

export async function loadExperience(): Promise<Experience[]> {
  try {
    const response = await fetch(`${BASE_PATH}/experience.json`);
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading experience:', error);
    return [];
  }
}

export async function loadSkills(): Promise<Skill[]> {
  try {
    const response = await fetch(`${BASE_PATH}/skills.json`);
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading skills:', error);
    return [];
  }
}

export async function loadCertifications(): Promise<Certification[]> {
  try {
    const response = await fetch(`${BASE_PATH}/certifications.json`);
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading certifications:', error);
    return [];
  }
}
