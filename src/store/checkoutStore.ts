import { create } from 'zustand';

interface ShippingData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface CheckoutState {
  step: 'shipping' | 'payment' | 'review';
  shippingData: ShippingData | null;
  paymentData: PaymentData | null;
  setStep: (step: 'shipping' | 'payment' | 'review') => void;
  setShippingData: (data: ShippingData) => void;
  setPaymentData: (data: PaymentData) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  step: 'shipping',
  shippingData: null,
  paymentData: null,
  setStep: (step) => set({ step }),
  setShippingData: (data) => set({ shippingData: data }),
  setPaymentData: (data) => set({ paymentData: data }),
  reset: () => set({ step: 'shipping', shippingData: null, paymentData: null })
}));