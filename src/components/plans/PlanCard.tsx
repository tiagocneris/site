import React from 'react';
import { Check, Star } from 'lucide-react';

interface PlanCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  firstMonthPrice: number;
  discount: number;
  features: string[];
  isSelected: boolean;
  onSelect: (id: string) => void;
  billingCycle: 'monthly' | 'yearly';
  isPopular?: boolean;
}

export default function PlanCard({
  id,
  name,
  description,
  price,
  firstMonthPrice,
  discount,
  features,
  isSelected,
  onSelect,
  billingCycle,
  isPopular
}: PlanCardProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl transition-all duration-300 ${
        isSelected
          ? 'border-2 border-[#36c6c6] shadow-lg scale-105'
          : 'border border-gray-200 hover:border-[#36c6c6] hover:shadow-md'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-[#36c6c6] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>Mais Popular</span>
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              R$ {price.toFixed(2)}
            </span>
            <span className="text-gray-600">
              /{billingCycle === 'monthly' ? 'mês' : 'ano'}
            </span>
          </div>
          {billingCycle === 'monthly' && (
            <p className="text-sm text-[#36c6c6] mt-2">
              Primeiro mês: R$ {firstMonthPrice.toFixed(2)}
            </p>
          )}
          {discount > 0 && (
            <p className="text-sm text-[#36c6c6] mt-1">
              {discount}% de desconto no plano anual
            </p>
          )}
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#B2FFFF] flex items-center justify-center">
                <Check className="h-3 w-3 text-[#36c6c6]" />
              </div>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSelect(id)}
          className={`w-full py-3 px-6 rounded-full transition-colors ${
            isSelected
              ? 'bg-[#36c6c6] text-white'
              : 'border-2 border-[#36c6c6] text-[#36c6c6] hover:bg-[#B2FFFF]'
          }`}
        >
          {isSelected ? 'Plano Selecionado' : 'Escolher Plano'}
        </button>
      </div>
    </div>
  );
}