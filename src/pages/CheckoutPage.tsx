import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, AlertTriangle } from 'lucide-react';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import OrderSummary from '../components/checkout/OrderSummary';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import ReviewOrder from '../components/checkout/ReviewOrder';
import { useCartStore } from '../store/cartStore';

const steps = [
  { id: 'shipping', title: 'Endereço' },
  { id: 'payment', title: 'Pagamento' },
  { id: 'review', title: 'Revisão' }
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total } = useCartStore();
  const [currentStep, setCurrentStep] = useState('shipping');
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (data: any) => {
    setPaymentData(data);
    setCurrentStep('review');
  };

  const handlePlaceOrder = () => {
    // Here you would implement the order placement logic
    navigate('/order-confirmation');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/cart"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para o Carrinho</span>
            </Link>
            <img 
              src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Checkout Steps */}
        <CheckoutSteps steps={steps} currentStep={currentStep} />

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {currentStep === 'shipping' && (
                <ShippingForm onSubmit={handleShippingSubmit} />
              )}
              {currentStep === 'payment' && (
                <PaymentForm onSubmit={handlePaymentSubmit} />
              )}
              {currentStep === 'review' && (
                <ReviewOrder
                  shippingData={shippingData}
                  paymentData={paymentData}
                  onEdit={(step) => setCurrentStep(step)}
                  onConfirm={handlePlaceOrder}
                />
              )}
            </div>

            {/* Security Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#B2FFFF]">
                  <Shield className="h-6 w-6 text-[#36c6c6]" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800">Pagamento Seguro</h4>
                  <p className="text-sm text-neutral-600">Seus dados estão protegidos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#B2FFFF]">
                  <Truck className="h-6 w-6 text-[#36c6c6]" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800">Entrega Rastreada</h4>
                  <p className="text-sm text-neutral-600">Acompanhe seu pedido</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#B2FFFF]">
                  <AlertTriangle className="h-6 w-6 text-[#36c6c6]" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800">Suporte 24/7</h4>
                  <p className="text-sm text-neutral-600">Estamos aqui para ajudar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <OrderSummary />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 flex justify-center gap-8 text-neutral-600">
          <Link
            to="/help"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Ajuda
          </Link>
          <Link
            to="/privacy"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </div>
  );
}