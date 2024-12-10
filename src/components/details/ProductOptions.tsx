import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface Variant {
  id: number;
  size: string;
  price: number;
}

interface ProductOptionsProps {
  variants: Variant[];
  selectedVariant: Variant;
  onVariantChange: (variant: Variant) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  stock: number;
}

export default function ProductOptions({
  variants,
  selectedVariant,
  onVariantChange,
  quantity,
  onQuantityChange,
  stock
}: ProductOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Tamanho
        </label>
        <div className="grid grid-cols-3 gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => onVariantChange(variant)}
              className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                selectedVariant.id === variant.id
                  ? 'bg-[#36c6c6] text-white'
                  : 'bg-gray-50 text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
              }`}
            >
              {variant.size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-600 mb-2">
          Quantidade
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
              className="p-2 rounded-full text-neutral-600 hover:text-[#36c6c6] hover:bg-gray-100"
              disabled={quantity <= 1}
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="w-12 text-center font-medium text-neutral-800">
              {quantity}
            </span>
            <button
              onClick={() => quantity < stock && onQuantityChange(quantity + 1)}
              className="p-2 rounded-full text-neutral-600 hover:text-[#36c6c6] hover:bg-gray-100"
              disabled={quantity >= stock}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <span className="text-sm text-neutral-600">
            {stock} unidades disponíveis
          </span>
        </div>
      </div>
    </div>
  );
}