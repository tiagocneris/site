import React from 'react';
import { Package, Search } from 'lucide-react';

interface TrackingSearchProps {
  orderNumber: string;
  onOrderNumberChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function TrackingSearch({ orderNumber, onOrderNumberChange, onSubmit }: TrackingSearchProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Rastreie seu Pedido</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Número do Pedido
          </label>
          <div className="relative">
            <input
              type="text"
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => onOrderNumberChange(e.target.value)}
              placeholder="Ex: PED123456"
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
            <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors flex items-center justify-center gap-2"
        >
          <Search className="h-5 w-5" />
          <span>Rastrear Pedido</span>
        </button>
      </form>
    </div>
  );
}