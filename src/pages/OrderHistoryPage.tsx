import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import OrderHistoryFilters from '../components/orders/OrderHistoryFilters';
import OrderList from '../components/orders/OrderList';
import OrderStats from '../components/orders/OrderStats';
import OrderSortSelect from '../components/orders/OrderSortSelect';
import { useOrderHistoryStore } from '../store/orderHistoryStore';

export default function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const { sortBy, setSortBy } = useOrderHistoryStore();

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para Home</span>
            </Link>
            <img 
              src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-neutral-800">Histórico de Pedidos</h1>
            <OrderSortSelect value={sortBy} onChange={setSortBy} />
          </div>

          {/* Order Statistics */}
          <OrderStats />

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar por produto ou vendedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <OrderHistoryFilters
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>

          {/* Orders List */}
          <OrderList
            searchTerm={searchTerm}
            statusFilter={selectedStatus}
            dateRange={dateRange}
          />
        </div>
      </div>
    </div>
  );
}