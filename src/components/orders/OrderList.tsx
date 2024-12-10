import React, { useEffect } from 'react';
import { Package } from 'lucide-react';
import { useOrderHistoryStore } from '../../store/orderHistoryStore';
import OrderCard from './OrderCard';

interface OrderListProps {
  searchTerm: string;
  statusFilter: string;
  dateRange: string;
}

export default function OrderList({ searchTerm, statusFilter, dateRange }: OrderListProps) {
  const { filteredOrders, filterOrders } = useOrderHistoryStore();

  useEffect(() => {
    filterOrders(searchTerm, statusFilter, dateRange);
  }, [searchTerm, statusFilter, dateRange, filterOrders]);

  const handleContactSeller = (sellerId: string) => {
    // Implement seller contact logic
    console.log('Contacting seller:', sellerId);
  };

  if (filteredOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
        <p className="text-gray-600">
          Tente ajustar seus filtros ou fazer uma nova busca
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onContactSeller={handleContactSeller}
        />
      ))}
    </div>
  );
}