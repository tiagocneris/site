import React from 'react';
import { Package, Clock, Truck, CheckCircle } from 'lucide-react';
import { useOrderHistoryStore } from '../../store/orderHistoryStore';

export default function OrderStats() {
  const stats = useOrderHistoryStore(state => state.getOrderStats());

  const statCards = [
    {
      id: 1,
      name: 'Total de Pedidos',
      value: stats.total.toString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'Em Processamento',
      value: stats.processing.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 3,
      name: 'Em Trânsito',
      value: stats.inTransit.toString(),
      icon: Truck,
      color: 'text-[#36c6c6]',
      bgColor: 'bg-[#B2FFFF]'
    },
    {
      id: 4,
      name: 'Entregues',
      value: stats.delivered.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <div
          key={stat.id}
          className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
              <p className="text-sm text-neutral-600">{stat.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}