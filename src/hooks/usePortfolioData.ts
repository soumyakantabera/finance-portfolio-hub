import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Profile, Project, Education, Experience, Skill, Certification, SiteSettings, ContactMessage } from '@/types/portfolio';

export function useProfile() {
  return useQuery<Profile | null>({
    queryKey: ['profile', 'single'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profile').select('*').limit(1).maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
  });
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('display_order');
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });
}

export function useFeaturedProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').eq('is_featured', true).order('display_order');
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });
}

export function useProject(id: string) {
  return useQuery<Project | null>({
    queryKey: ['projects', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data as Project | null;
    },
  });
}

export function useEducation() {
  return useQuery<Education[]>({
    queryKey: ['education'],
    queryFn: async () => {
      const { data, error } = await supabase.from('education').select('*').order('display_order');
      if (error) throw error;
      return (data ?? []) as Education[];
    },
  });
}

export function useExperience() {
  return useQuery<Experience[]>({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data, error } = await supabase.from('experience').select('*').order('display_order');
      if (error) throw error;
      return (data ?? []) as Experience[];
    },
  });
}

export function useSkills() {
  return useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase.from('skills').select('*').order('display_order');
      if (error) throw error;
      return (data ?? []) as Skill[];
    },
  });
}

export function useCertifications() {
  return useQuery<Certification[]>({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase.from('certifications').select('*').order('display_order');
      if (error) throw error;
      return (data ?? []) as Certification[];
    },
  });
}

export function useSiteSettings() {
  return useQuery<SiteSettings | null>({
    queryKey: ['site_settings', 'single'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
      if (error) throw error;
      return data as SiteSettings | null;
    },
  });
}

export function useContactMessages() {
  return useQuery<ContactMessage[]>({
    queryKey: ['contact_messages'],
    queryFn: async () => {
      const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as ContactMessage[];
    },
  });
}
