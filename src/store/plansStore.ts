import { create } from 'zustand';

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  firstMonthPrice: number;
  features: string[];
  isPopular?: boolean;
}

interface PlansState {
  selectedPlan: string | null;
  billingCycle: 'monthly' | 'yearly';
  plans: Record<string, Plan>;
  setSelectedPlan: (planId: string | null) => void;
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export const usePlansStore = create<PlansState>((set) => ({
  selectedPlan: null,
  billingCycle: 'monthly',
  plans: {
    basic: {
      id: 'basic',
      name: 'Básico',
      monthlyPrice: 29.90,
      yearlyPrice: 29.90 * 12 * 0.95,
      firstMonthPrice: 9.90,
      features: [
        'Exibição em abas de busca',
        'Perfil básico',
        'Suporte por email',
        'Taxa de 5% sobre transações'
      ]
    },
    intermediate: {
      id: 'intermediate',
      name: 'Intermediário',
      monthlyPrice: 39.90,
      yearlyPrice: 39.90 * 12 * 0.92,
      firstMonthPrice: 19.90,
      features: [
        'Produtos promocionais destacados',
        'Dashboard de análise',
        'Suporte prioritário',
        'Taxa reduzida de 3% sobre transações',
        'Relatórios mensais'
      ],
      isPopular: true
    },
    premium: {
      id: 'premium',
      name: 'Premium',
      monthlyPrice: 49.90,
      yearlyPrice: 49.90 * 12 * 0.90,
      firstMonthPrice: 29.90,
      features: [
        'Destaque em todas as páginas',
        'Funcionalidades completas',
        'Suporte 24/7',
        'Isenção de taxas sobre transações',
        'Relatórios avançados',
        'API de integração',
        'Personalização completa'
      ]
    }
  },
  setSelectedPlan: (planId) => set({ selectedPlan: planId }),
  setBillingCycle: (cycle) => set({ billingCycle: cycle })
}));