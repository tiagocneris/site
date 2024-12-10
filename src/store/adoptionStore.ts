import { create } from 'zustand';
import { adoptionService } from '../services/adoptionService';

interface AdoptionFair {
  id: string;
  ongId: string;
  name: string;
  date: Date;
  time: string;
  location: string;
  address: string;
  description: string;
  imageUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  ong: {
    name: string;
    phone: string;
    email: string;
  };
  animals: Array<{
    id: string;
    name: string;
    type: string;
    breed: string;
    age: string;
    description: string;
    imageUrl: string;
  }>;
}

interface AdoptionState {
  fairs: AdoptionFair[];
  selectedFair: AdoptionFair | null;
  isLoading: boolean;
  error: string | null;
  fetchFairs: (filters?: any) => Promise<void>;
  getFairById: (id: string) => Promise<void>;
  createFair: (data: Omit<AdoptionFair, 'id' | 'status' | 'ong' | 'animals'>) => Promise<void>;
  updateFair: (id: string, data: Partial<AdoptionFair>) => Promise<void>;
  deleteFair: (id: string) => Promise<void>;
}

export const useAdoptionStore = create<AdoptionState>((set, get) => ({
  fairs: [],
  selectedFair: null,
  isLoading: false,
  error: null,

  fetchFairs: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const fairs = await adoptionService.getAdoptionFairs(filters);
      set({ fairs, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to fetch adoption fairs',
        isLoading: false 
      });
    }
  },

  getFairById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const fair = await adoptionService.getAdoptionFairById(id);
      set({ selectedFair: fair, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to fetch adoption fair details',
        isLoading: false 
      });
    }
  },

  createFair: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await adoptionService.createAdoptionFair(data);
      await get().fetchFairs();
    } catch (error) {
      set({ 
        error: 'Failed to create adoption fair',
        isLoading: false 
      });
    }
  },

  updateFair: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await adoptionService.updateAdoptionFair(id, data);
      await get().fetchFairs();
    } catch (error) {
      set({ 
        error: 'Failed to update adoption fair',
        isLoading: false 
      });
    }
  },

  deleteFair: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await adoptionService.deleteAdoptionFair(id);
      await get().fetchFairs();
    } catch (error) {
      set({ 
        error: 'Failed to delete adoption fair',
        isLoading: false 
      });
    }
  }
}));