import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Package } from 'lucide-react';
import { Order } from '../../store/orderHistoryStore';
import { getStatusColor, getStatusText, formatCurrency } from '../../utils/orderUtils';
import OrderActions from './OrderActions';

interface OrderCardProps {
  order: Order;
  onContactSeller: (sellerId: string) => void;
}

export default function OrderCard({ order, onContactSeller }: OrderCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Package className="h-5 w-5 text-[#36c6c6]" />
          <div>
            <p className="font-medium text-neutral-800">Pedido #{order.id}</p>
            <p className="text-sm text-neutral-600">
              {format(order.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>

      {/* Order Items */}
      <div className="p-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-neutral-800">{item.name}</h3>
              <p className="text-sm text-neutral-600">
                Quantidade: {item.quantity} • {formatCurrency(item.price)}
              </p>
              <p className="text-sm text-neutral-600">
                Vendido por: {order.seller.name}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-neutral-800">
                {formatCurrency(order.total)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Actions */}
      <OrderActions order={order} onContactSeller={onContactSeller} />
    </div>
  );
}