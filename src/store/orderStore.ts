import { create } from 'zustand';

interface OrderState {
  currentOrder: {
    id: string;
    status: string;
    items: any[];
    total: number;
    shipping: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
    };
    payment: {
      method: string;
      status: string;
    };
    tracking?: {
      code: string;
      url: string;
      status: string;
      estimatedDelivery: string;
    };
  } | null;
  setCurrentOrder: (order: any) => void;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  currentOrder: null,
  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearCurrentOrder: () => set({ currentOrder: null })
}));