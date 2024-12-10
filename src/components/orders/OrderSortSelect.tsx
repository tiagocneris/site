import React from 'react';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

interface OrderSortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OrderSortSelect({ value, onChange }: OrderSortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-neutral-600">Ordenar por:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50 text-neutral-600"
      >
        <option value="date-desc">Data (mais recente)</option>
        <option value="date-asc">Data (mais antiga)</option>
        <option value="total-desc">Valor (maior)</option>
        <option value="total-asc">Valor (menor)</option>
      </select>
    </div>
  );
}