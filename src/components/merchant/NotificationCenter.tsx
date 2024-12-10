import React from 'react';
import { Bell, Package, MessageCircle, Star, ChevronRight } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Novo Pedido Recebido',
    message: 'Pedido #123456 aguardando confirmação',
    time: 'Há 5 minutos',
    icon: Package,
    read: false
  },
  {
    id: 2,
    type: 'message',
    title: 'Nova Mensagem',
    message: 'Maria Silva enviou uma mensagem sobre seu pedido',
    time: 'Há 30 minutos',
    icon: MessageCircle,
    read: true
  },
  {
    id: 3,
    type: 'review',
    title: 'Nova Avaliação',
    message: 'João Santos avaliou seu estabelecimento',
    time: 'Há 2 horas',
    icon: Star,
    read: true
  }
];

export default function NotificationCenter() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-800">Central de Notificações</h2>
        <button className="text-[#36c6c6] hover:text-[#B2FFFF] text-sm font-medium">
          Marcar todas como lidas
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification ) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 p-4 rounded-xl ${
              notification.read ? 'bg-gray-50' : 'bg-[#B2FFFF]/10 border border-[#36c6c6]'
            }`}
          >
            <div className={`p-2 rounded-full ${
              notification.read ? 'bg-gray-100' : 'bg-[#B2FFFF]'
            }`}>
              <notification.icon className={`h-5 w-5 ${
                notification.read ? 'text-gray-600' : 'text-[#36c6c6]'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-neutral-800">{notification.title}</h3>
                  <p className="text-neutral-600">{notification.message}</p>
                </div>
                <span className="text-sm text-neutral-500">{notification.time}</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <button className="text-[#36c6c6] hover:text-[#B2FFFF] text-sm font-medium flex items-center gap-1">
                  Ver Detalhes
                  <ChevronRight className="h-4 w-4" />
                </button>
                {!notification.read && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#36c6c6] text-white">
                    Nova
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-neutral-800 mb-4">Filtrar por Tipo</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Todos', icon: Bell },
            { label: 'Pedidos', icon: Package },
            { label: 'Mensagens', icon: MessageCircle },
            { label: 'Avaliações', icon: Star }
          ].map((filter, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-[#36c6c6] hover:text-[#36c6c6] transition-colors"
            >
              <filter.icon className="h-4 w-4" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}