import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { Plus, Edit3, Trash2 } from 'lucide-react';

const AdminSection = ({ table, title, description, columns }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [table],
    queryFn: () => api.get(table)
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(table, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
      toast.success("ENTRY REMOVED FROM REGISTRY");
    }
  });

  if (isLoading) return <div className="animate-pulse space-y-4"><div className="h-8 bg-white/5 rounded w-1/4"></div><div className="h-64 bg-white/5 rounded"></div></div>;

  return (
    <div className="space-y-8 font-mono">
      <header className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">{title} <span className="text-red-500">Registry</span></h2>
            <p className="text-muted text-xs uppercase tracking-[0.2em] mt-1 font-bold">{description}</p>
         </div>
         <button className="cyber-button flex items-center gap-2 border-red-500/50 text-red-500 hover:bg-red-500/10">
            <Plus size={18} /> Initialize New
         </button>
      </header>

      <div className="glass-panel border-white/5 overflow-hidden">
         <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/5 text-muted uppercase tracking-widest">
               <tr>
                  {columns.map(col => <th key={col.key} className="px-6 py-4 font-black">{col.label}</th>)}
                  <th className="px-6 py-4 font-black text-right">Operations</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
               {data?.map((item) => (
                 <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                    {columns.map(col => (
                      <td key={col.key} className="px-6 py-4 text-white/80 font-medium">
                        {typeof col.render === 'function' ? col.render(item[col.key], item) : item[col.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-primary/20 rounded text-primary transition-colors border border-primary/20">
                             <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if(window.confirm("CONFIRM DATA PURGE?")) deleteMutation.mutate(item.id);
                            }}
                            className="p-1.5 hover:bg-red-500/20 rounded text-red-500 transition-colors border border-red-500/20"
                          >
                             <Trash2 size={14} />
                          </button>
                       </div>
                    </td>
                 </tr>
               ))}
               {(!data || data.length === 0) && (
                 <tr>
                    <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-muted italic">No records found in current node.</td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export const AdminSkills = () => (
  <AdminSection
    table="skills"
    title="Skill Matrix"
    description="Optimize Technical Proficiency & Mastery Levels"
    columns={[
      { key: 'name', label: 'Identifier' },
      { key: 'category', label: 'Module' },
      { key: 'level', label: 'Mastery', render: (val) => `${val}%` }
    ]}
  />
);

export const AdminActivities = () => (
  <AdminSection
    table="activities"
    title="Activity"
    description="Manage Real-time Event Stream & Achievements"
    columns={[
      { key: 'timestamp', label: 'Timestamp' },
      { key: 'content', label: 'Payload' },
      { key: 'type', label: 'Tag' }
    ]}
  />
);

export const AdminProfile = () => <div className="p-20 text-center glass-panel border-white/5 font-mono">PROFILE_EDIT_INTERFACE_LOCKED</div>;

export const AdminExperience = () => (
  <AdminSection
    table="experience"
    title="XP"
    description="Architect Career Milestones & Growth Vectors"
    columns={[
      { key: 'year', label: 'Timeline' },
      { key: 'title', label: 'Designation' },
      { key: 'organization', label: 'Sector' }
    ]}
  />
);

export const AdminEducation = () => (
  <AdminSection
    table="education"
    title="Academic"
    description="Registry of Scholarly Achievements"
    columns={[
      { key: 'institution', label: 'Institute' },
      { key: 'degree', label: 'Specialization' },
      { key: 'semester', label: 'Current Phase' }
    ]}
  />
);

export const AdminCertificates = () => (
  <AdminSection
    table="certificates"
    title="Credentials"
    description="Vault of Verified Professional Certifications"
    columns={[
      { key: 'name', label: 'Certificate' },
      { key: 'provider', label: 'Issuer' },
      { key: 'issue_date', label: 'Deployment' }
    ]}
  />
);
