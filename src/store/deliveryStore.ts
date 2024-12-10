import { create } from 'zustand';

interface DeliveryPartner {
  id: string;
  userId: string;
  cpf: string;
  vehicleType: 'moto' | 'car';
  licensePlate: string;
  documents: {
    license: string;
    vehiclePhoto: string;
  };
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

interface DeliveryState {
  partner: DeliveryPartner | null;
  isLoading: boolean;
  error: string | null;
  setPartner: (partner: DeliveryPartner | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearPartner: () => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
  partner: null,
  isLoading: false,
  error: null,
  setPartner: (partner) => set({ partner }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearPartner: () => set({ partner: null, error: null })
}));