import React from 'react';
import { Filter, Calendar } from 'lucide-react';

interface OrderHistoryFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

export default function OrderHistoryFilters({
  selectedStatus,
  onStatusChange,
  dateRange,
  onDateRangeChange
}: OrderHistoryFiltersProps) {
  return (
    <div className="flex gap-4">
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50 text-neutral-600"
      >
        <option value="all">Todos os Status</option>
        <option value="pending">Pendente</option>
        <option value="processing">Em Processamento</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregue</option>
        <option value="cancelled">Cancelado</option>
      </select>

      <select
        value={dateRange}
        onChange={(e) => onDateRangeChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50 text-neutral-600"
      >
        <option value="all">Todas as Datas</option>
        <option value="last7">Últimos 7 dias</option>
        <option value="last30">Últimos 30 dias</option>
        <option value="last90">Últimos 90 dias</option>
        <option value="thisYear">Este ano</option>
      </select>
    </div>
  );
}