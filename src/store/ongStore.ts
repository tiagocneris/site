import { create } from 'zustand';

interface OngFormData {
  name: string;
  cnpj: string;
  description: string;
  responsibleName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  socialMedia: {
    instagram: string;
    facebook: string;
  };
  logo: File | null;
  termsAccepted: boolean;
}

interface OngState {
  formData: OngFormData;
  isSubmitting: boolean;
  error: string | null;
  updateFormData: (data: Partial<OngFormData>) => void;
  submitForm: (data: OngFormData) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: OngFormData = {
  name: '',
  cnpj: '',
  description: '',
  responsibleName: '',
  email: '',
  phone: '',
  address: '',
  website: '',
  socialMedia: {
    instagram: '',
    facebook: ''
  },
  logo: null,
  termsAccepted: false
};

export const useOngStore = create<OngState>((set) => ({
  formData: initialFormData,
  isSubmitting: false,
  error: null,
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data }
    })),
  submitForm: async (data) => {
    set({ isSubmitting: true, error: null });
    try {
      // Here you would typically make an API call to submit the form
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
      set({ isSubmitting: false });
    } catch (error) {
      set({
        isSubmitting: false,
        error: 'Erro ao enviar o formulário. Tente novamente.'
      });
    }
  },
  resetForm: () => set({ formData: initialFormData, error: null })
}));