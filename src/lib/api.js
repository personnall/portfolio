import { supabase } from './supabase';

// Helper to handle profile table which might return a single row
const IS_SINGLE = ['profiles'];

export const api = {
  async get(table) {
    let query = supabase.from(table).select('*');

    // Custom ordering logic
    if (table === 'activities') {
      query = query.order('timestamp', { ascending: false });
    } else if (['projects', 'skills', 'experience', 'education', 'certificates', 'social_links'].includes(table)) {
      query = query.order('order_index', { ascending: true });
    }

    if (IS_SINGLE.includes(table)) {
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data;
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async save(table, data) {
    const pk = table === 'settings' ? 'key' : 'id';
    const idValue = data[pk];
    const { [pk]: _, ...payload } = data;
    let result;

    if (idValue) {
      result = await supabase.from(table).update(payload).eq(pk, idValue).select();
    } else {
      result = await supabase.from(table).insert([payload]).select();
    }

    if (result.error) throw result.error;
    return result.data[0];
  },

  async delete(table, id) {
    const pk = table === 'settings' ? 'key' : 'id';
    const { error } = await supabase.from(table).delete().eq(pk, id);
    if (error) throw error;
    return true;
  },

  // Auth methods
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }
};
