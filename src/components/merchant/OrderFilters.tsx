import React from 'react';
import { Filter } from 'lucide-react';

interface OrderFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'processing', label: 'Em Processamento' },
  { value: 'shipped', label: 'Enviados' },
  { value: 'delivered', label: 'Entregues' },
  { value: 'cancelled', label: 'Cancelados' }
];

export default function OrderFilters({ selectedStatus, onStatusChange }: OrderFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-[#36c6c6] text-neutral-600 hover:text-[#36c6c6] transition-colors">
        <Filter className="h-5 w-5" />
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-inherit"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}