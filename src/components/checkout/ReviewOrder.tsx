import React from 'react';
import { CreditCard, MapPin } from 'lucide-react';

interface ReviewOrderProps {
  shippingData: any;
  paymentData: any;
  onEdit: (step: string) => void;
  onConfirm: () => void;
}

export default function ReviewOrder({
  shippingData,
  paymentData,
  onEdit,
  onConfirm
}: ReviewOrderProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-800">Revisar e Finalizar</h2>
      
      {/* Shipping Details */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">Endereço de Entrega</h3>
          <button
            onClick={() => onEdit('shipping')}
            className="text-[#36c6c6] text-sm hover:text-[#B2FFFF]"
          >
            Editar
          </button>
        </div>
        <div className="text-neutral-600">
          <p>{shippingData?.name}</p>
          <p>{shippingData?.address}</p>
          <p>{shippingData?.city}, {shippingData?.state}</p>
          <p>{shippingData?.phone}</p>
        </div>
      </div>

      {/* Payment Details */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">Método de Pagamento</h3>
          <button
            onClick={() => onEdit('payment')}
            className="text-[#36c6c6] text-sm hover:text-[#B2FFFF]"
          >
            Editar
          </button>
        </div>
        <div className="flex items-center gap-3 text-neutral-600">
          <CreditCard className="h-5 w-5" />
          <span>•••• •••• •••• {paymentData?.cardNumber.slice(-4)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={onConfirm}
        className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}