import { create } from 'zustand';

interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'pending';
  billingCycle: 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
}

interface SubscriptionState {
  currentSubscription: Subscription | null;
  setSubscription: (subscription: Subscription | null) => void;
  clearSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  currentSubscription: null,
  setSubscription: (subscription) => set({ currentSubscription: subscription }),
  clearSubscription: () => set({ currentSubscription: null })
}));