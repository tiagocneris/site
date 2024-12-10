import React from 'react';
import { DollarSign, TrendingUp, ShoppingBag, Users } from 'lucide-react';

const stats = [
  {
    id: 1,
    name: 'Vendas Totais',
    value: 'R$ 12.450,00',
    change: '+12.5%',
    icon: DollarSign,
    trend: 'up'
  },
  {
    id: 2,
    name: 'Pedidos',
    value: '156',
    change: '+8.2%',
    icon: ShoppingBag,
    trend: 'up'
  },
  {
    id: 3,
    name: 'Ticket Médio',
    value: 'R$ 79,80',
    change: '+5.4%',
    icon: TrendingUp,
    trend: 'up'
  },
  {
    id: 4,
    name: 'Clientes Ativos',
    value: '89',
    change: '+15.3%',
    icon: Users,
    trend: 'up'
  }
];

export default function SalesAnalytics() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#B2FFFF]">
                <stat.icon className="h-6 w-6 text-[#36c6c6]" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">{stat.name}</p>
                <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
                <p className={`text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} em relação ao mês anterior
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6">
          Vendas nos Últimos 30 Dias
        </h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-neutral-600">Gráfico será exibido aqui</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-neutral-800 mb-6">
          Pedidos Recentes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">
                  Pedido
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">
                  Data
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">
                  Valor
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  id: 'PED123456',
                  customer: 'Maria Silva',
                  date: '15/04/2024',
                  amount: 'R$ 189,90',
                  status: 'Concluído'
                },
                {
                  id: 'PED123457',
                  customer: 'João Santos',
                  date: '14/04/2024',
                  amount: 'R$ 79,90',
                  status: 'Em andamento'
                }
              ].map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-neutral-800">
                    {order.id}
                  </td>
                  <td className="px-4 py-4 text-neutral-600">
                    {order.customer}
                  </td>
                  <td className="px-4 py-4 text-neutral-600">
                    {order.date}
                  </td>
                  <td className="px-4 py-4 text-neutral-800">
                    {order.amount}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Concluído'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}