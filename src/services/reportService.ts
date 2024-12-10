import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Report = Database['public']['Tables']['reports']['Row'];
type ReportInsert = Database['public']['Tables']['reports']['Insert'];
type ReportUpdate = Database['public']['Tables']['reports']['Update'];

export const reportService = {
  async createReport(data: Omit<ReportInsert, 'id' | 'created_at' | 'updated_at'>) {
    const { data: report, error } = await supabase
      .from('reports')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return report;
  },

  async getReports(filters?: {
    type?: Report['type'];
    status?: Report['status'];
    reporter_id?: string;
  }) {
    let query = supabase.from('reports').select('*');

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.reporter_id) {
      query = query.eq('reporter_id', filters.reporter_id);
    }

    const { data: reports, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return reports;
  },

  async getReportById(id: string) {
    const { data: report, error } = await supabase
      .from('reports')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return report;
  },

  async updateReport(id: string, data: ReportUpdate) {
    const { data: report, error } = await supabase
      .from('reports')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return report;
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `reports/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('reports')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('reports')
      .getPublicUrl(filePath);

    return publicUrl;
  }
};