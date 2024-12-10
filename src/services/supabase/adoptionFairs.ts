import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/database';

type AdoptionFair = Database['public']['Tables']['adoption_fairs']['Row'];
type InsertAdoptionFair = Database['public']['Tables']['adoption_fairs']['Insert'];
type UpdateAdoptionFair = Database['public']['Tables']['adoption_fairs']['Update'];

export const adoptionFairsService = {
  async createFair(fair: InsertAdoptionFair) {
    const { data, error } = await supabase
      .from('adoption_fairs')
      .insert(fair)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getFairs(filters?: {
    status?: string;
    ong_id?: string;
  }) {
    let query = supabase
      .from('adoption_fairs')
      .select(`
        *,
        ong:users(id, name, email)
      `)
      .order('date', { ascending: true });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.ong_id) {
      query = query.eq('ong_id', filters.ong_id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getFairById(id: string) {
    const { data, error } = await supabase
      .from('adoption_fairs')
      .select(`
        *,
        ong:users(id, name, email),
        animals(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateFair(id: string, updates: UpdateAdoptionFair) {
    const { data, error } = await supabase
      .from('adoption_fairs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `fair-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('adoption-fairs')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('adoption-fairs')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};