import React from 'react';

interface BillingToggleProps {
  billingCycle: 'monthly' | 'yearly';
  onChange: (cycle: 'monthly' | 'yearly') => void;
}

export default function BillingToggle({ billingCycle, onChange }: BillingToggleProps) {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-gray-100 p-1 rounded-full">
        <button
          onClick={() => onChange('monthly')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            billingCycle === 'monthly'
              ? 'bg-[#36c6c6] text-white'
              : 'text-gray-600 hover:text-[#36c6c6]'
          }`}
        >
          Mensal
        </button>
        <button
          onClick={() => onChange('yearly')}
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
  );
}