import { create } from 'zustand';
import { reportsService } from '../services/supabase/reports';
import type { Database } from '../types/database';

type Report = Database['public']['Tables']['reports']['Row'];
type InsertReport = Database['public']['Tables']['reports']['Insert'];

interface ReportState {
  reports: Report[];
  selectedReport: Report | null;
  isLoading: boolean;
  error: string | null;
  createReport: (data: Omit<InsertReport, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  getReports: (filters?: { type?: string; status?: string }) => Promise<void>;
  getReportById: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  setError: (error: string | null) => void;
}

export const useReportStore = create<ReportState>((set, get) => ({
  reports: [],
  selectedReport: null,
  isLoading: false,
  error: null,

  createReport: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await reportsService.createReport(data);
      await get().getReports();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  getReports: async (filters) => {
    try {
      set({ isLoading: true, error: null });
      const reports = await reportsService.getReports(filters);
      set({ reports });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  getReportById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const report = await reportsService.getReportById(id);
      set({ selectedReport: report });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  uploadImage: async (file) => {
    try {
      set({ isLoading: true, error: null });
      const url = await reportsService.uploadImage(file);
      return url;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setError: (error) => set({ error })
}));