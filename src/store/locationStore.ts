import { create } from 'zustand';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationState {
  currentLocation: Location | null;
  searchRadius: number;
  loading: boolean;
  error: string | null;
  setLocation: (location: Location) => void;
  setSearchRadius: (radius: number) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,
  searchRadius: 5,
  loading: false,
  error: null,
  setLocation: (location) => set({ currentLocation: location }),
  setSearchRadius: (radius) => set({ searchRadius: radius }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading })
}));