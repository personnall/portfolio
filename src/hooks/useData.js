import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').single();
      if (error) throw error;
      return data;
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase.from('skills').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data, error } = await supabase.from('activities').select('*').order('activity_date', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data, error } = await supabase.from('experience').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: async () => {
      const { data, error } = await supabase.from('education').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useCertificates() {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const { data, error } = await supabase.from('certificates').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useSocialLinks() {
  return useQuery({
    queryKey: ['social_links'],
    queryFn: async () => {
      const { data, error } = await supabase.from('social_links').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}
