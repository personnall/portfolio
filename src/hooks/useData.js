import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useProfile() { return useQuery({ queryKey: ['profile'], queryFn: () => api.get('profiles'), }); }
export function useProjects() { return useQuery({ queryKey: ['projects'], queryFn: () => api.get('projects'), }); }
export function useSkills() { return useQuery({ queryKey: ['skills'], queryFn: () => api.get('skills'), }); }
export function useActivities() { return useQuery({ queryKey: ['activities'], queryFn: () => api.get('activities'), }); }
export function useExperience() { return useQuery({ queryKey: ['experience'], queryFn: () => api.get('experience'), }); }
export function useEducation() { return useQuery({ queryKey: ['education'], queryFn: () => api.get('education'), }); }
export function useCertificates() { return useQuery({ queryKey: ['certificates'], queryFn: () => api.get('certificates'), }); }
export function useSocialLinks() { return useQuery({ queryKey: ['social_links'], queryFn: () => api.get('social_links'), }); }
export function useSettings() { return useQuery({ queryKey: ['settings'], queryFn: () => api.get('settings'), }); }
