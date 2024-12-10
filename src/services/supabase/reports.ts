import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/database';

type Report = Database['public']['Tables']['reports']['Row'];
type InsertReport = Database['public']['Tables']['reports']['Insert'];
type UpdateReport = Database['public']['Tables']['reports']['Update'];

export const reportsService = {
  async createReport(report: InsertReport) {
    const { data, error } = await supabase
      .from('reports')
      .insert(report)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getReports(filters?: {
    type?: string;
    status?: string;
    reporter_id?: string;
  }) {
    let query = supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.reporter_id) {
      query = query.eq('reporter_id', filters.reporter_id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getReportById(id: string) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateReport(id: string, updates: UpdateReport) {
    const { data, error } = await supabase
      .from('reports')
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
    const filePath = `report-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('reports')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('reports')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};