import React, { useState } from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export default function CartSummary() {
  const { items, total } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const shipping = 15.90;
  const discount = 0;

  const handleApplyCoupon = () => {
    // Implement coupon logic
    console.log('Applying coupon:', couponCode);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-neutral-800 mb-4">Resumo do Pedido</h2>
      
      {/* Items Summary */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-neutral-600">
              {item.name} x{item.quantity}
            </span>
            <span className="text-neutral-800 font-medium">
              R$ {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Coupon Code */}
      <div className="mb-6">
        <label htmlFor="coupon" className="block text-sm font-medium text-neutral-600 mb-2">
          Cupom de Desconto
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            placeholder="Digite seu cupom"
          />
          <button
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-[#36c6c6] text-white rounded-lg hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
          >
            Aplicar
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="space-y-4">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>R$ {total().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Frete</span>
          <span>R$ {shipping.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Desconto</span>
            <span>- R$ {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-neutral-800">
          <span>Total</span>
          <span>R$ {(total() + shipping - discount).toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        to="/checkout"
        className="mt-6 w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors flex items-center justify-center gap-2"
      >
        <span>Finalizar Compra</span>
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}