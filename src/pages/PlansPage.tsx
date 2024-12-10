import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PlanComparison from '../components/plans/PlanComparison';
import PlanCard from '../components/plans/PlanCard';
import PaymentModal from '../components/plans/PaymentModal';
import { usePlansStore } from '../store/plansStore';

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleConfirm = () => {
    if (selectedPlan) {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para Home</span>
            </Link>
            <img 
              src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Escolha o Melhor Plano para Você
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecione o plano ideal para expandir seus negócios e alcançar mais clientes
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-[#36c6c6] text-white'
                  : 'text-gray-600 hover:text-[#36c6c6]'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-[#36c6c6] text-white'
                  : 'text-gray-600 hover:text-[#36c6c6]'
              }`}
            >
              Anual
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <PlanCard
            id="basic"
            name="Básico"
            description="Ideal para começar"
            price={billingCycle === 'monthly' ? 29.90 : 29.90 * 12 * 0.95}
            firstMonthPrice={9.90}
            discount={billingCycle === 'yearly' ? 5 : 0}
            features={[
              'Exibição em abas de busca',
              'Perfil básico',
              'Suporte por email',
              'Taxa de 5% sobre transações'
            ]}
            isSelected={selectedPlan === 'basic'}
            onSelect={handlePlanSelect}
            billingCycle={billingCycle}
          />
          <PlanCard
            id="intermediate"
            name="Intermediário"
            description="Para negócios em crescimento"
            price={billingCycle === 'monthly' ? 39.90 : 39.90 * 12 * 0.92}
            firstMonthPrice={19.90}
            discount={billingCycle === 'yearly' ? 8 : 0}
            features={[
              'Produtos promocionais destacados',
              'Dashboard de análise',
              'Suporte prioritário',
              'Taxa reduzida de 3% sobre transações',
              'Relatórios mensais'
            ]}
            isSelected={selectedPlan === 'intermediate'}
            onSelect={handlePlanSelect}
            billingCycle={billingCycle}
            isPopular
          />
          <PlanCard
            id="premium"
            name="Premium"
            description="Recursos completos"
            price={billingCycle === 'monthly' ? 49.90 : 49.90 * 12 * 0.90}
            firstMonthPrice={29.90}
            discount={billingCycle === 'yearly' ? 10 : 0}
            features={[
              'Destaque em todas as páginas',
              'Funcionalidades completas',
              'Suporte 24/7',
              'Isenção de taxas sobre transações',
              'Relatórios avançados',
              'API de integração',
              'Personalização completa'
            ]}
            isSelected={selectedPlan === 'premium'}
            onSelect={handlePlanSelect}
            billingCycle={billingCycle}
          />
        </div>

        {/* Plan Comparison */}
        <PlanComparison />

        {/* Footer Links */}
        <div className="mt-12 text-center">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <Link to="/terms" className="hover:text-[#36c6c6] transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacy" className="hover:text-[#36c6c6] transition-colors">
              Política de Privacidade
            </Link>
            <a
              href="mailto:suporte@loveandconnection.com"
              className="hover:text-[#36c6c6] transition-colors"
            >
              Suporte
            </a>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          planId={selectedPlan}
          billingCycle={billingCycle}
          amount={
            billingCycle === 'monthly'
              ? usePlansStore.getState().plans[selectedPlan].monthlyPrice
              : usePlansStore.getState().plans[selectedPlan].yearlyPrice
          }
          planName={usePlansStore.getState().plans[selectedPlan].name}
        />
      )}
    </div>
  );
}