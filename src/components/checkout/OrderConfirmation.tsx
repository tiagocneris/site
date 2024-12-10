import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck } from 'lucide-react';

interface OrderConfirmationProps {
  orderId: string;
  total: number;
  shippingAddress: string;
}

export default function OrderConfirmation({
  orderId,
  total,
  shippingAddress
}: OrderConfirmationProps) {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-[#36c6c6]" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-neutral-800">Pedido Confirmado!</h2>
        <p className="text-neutral-600 mt-2">
          Seu pedido #{orderId} foi recebido e está sendo processado
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-neutral-600">Total do Pedido</span>
            <span className="font-semibold text-neutral-800">
              R$ {total.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-neutral-600">Endereço de Entrega:</p>
            <p className="text-neutral-800 mt-1">{shippingAddress}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link
          to={`/order-tracking/${orderId}`}
          className="bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
        >
          Acompanhar Pedido
        </Link>
        <Link
          to="/"
          className="border-2 border-[#36c6c6] text-[#36c6c6] px-6 py-3 rounded-full hover:bg-[#B2FFFF] transition-colors"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}