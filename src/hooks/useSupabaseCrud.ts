import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type TableName = 'projects' | 'skills' | 'education' | 'experience' | 'certifications' | 'contact_messages' | 'profile' | 'site_settings';

export function useSupabaseList<T>(table: TableName, orderBy = 'display_order') {
  return useQuery<T[]>({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await (supabase.from(table) as any)
        .select('*')
        .order(orderBy, { ascending: true });
      if (error) throw error;
      return data as T[];
    },
  });
}

export function useSupabaseSingle<T>(table: TableName) {
  return useQuery<T | null>({
    queryKey: [table, 'single'],
    queryFn: async () => {
      const { data, error } = await (supabase.from(table) as any)
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as T | null;
    },
  });
}

export function useSupabaseInsert<T>(table: TableName) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: Partial<T>) => {
      const { data, error } = await (supabase.from(table) as any)
        .insert(row)
        .select()
        .single();
      if (error) throw error;
      return data as T;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
    },
  });
}

export function useSupabaseUpdate<T>(table: TableName) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, changes }: { id: string; changes: Partial<T> }) => {
      const { data, error } = await (supabase.from(table) as any)
        .update(changes)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as T;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
    },
  });
}

export function useSupabaseDelete(table: TableName) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from(table) as any)
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
    },
  });
}

export function useSupabaseUpsert<T>(table: TableName) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: Partial<T>) => {
      const { data, error } = await (supabase.from(table) as any)
        .upsert(row)
        .select()
        .single();
      if (error) throw error;
      return data as T;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
    },
  });
}
