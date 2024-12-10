import React from 'react';
import { useCartStore } from '../../store/cartStore';

export default function OrderSummary() {
  const { items, total } = useCartStore();
  const shipping = 15.90;
  const discount = 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-neutral-800 mb-4">Resumo do Pedido</h2>
      
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
    </div>
  );
}