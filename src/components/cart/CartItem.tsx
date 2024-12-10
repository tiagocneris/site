import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variant?: {
      id: number;
      size: string;
      price: number;
    };
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">{item.name}</h3>
              {item.variant && (
                <p className="text-sm text-neutral-600">Tamanho: {item.variant.size}</p>
              )}
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-neutral-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-neutral-600 hover:border-[#36c6c6] hover:text-[#36c6c6] transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-neutral-800">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-neutral-600 hover:border-[#36c6c6] hover:text-[#36c6c6] transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="font-semibold text-neutral-800">
              R$ {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}