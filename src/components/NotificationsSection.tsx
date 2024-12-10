import React from 'react';
import { Bell, Calendar, Heart, AlertTriangle } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'appointment',
    title: 'Consulta Veterinária Amanhã',
    message: 'Lembrete: Você tem uma consulta agendada para Max amanhã às 14:30',
    time: 'Há 2 horas',
    icon: Calendar,
    color: 'text-primary-600 bg-primary-100'
  },
  {
    id: 2,
    type: 'favorite',
    title: 'Promoção Disponível',
    message: 'Pet Shop Feliz está com 30% de desconto em banho e tosa',
    time: 'Há 5 horas',
    icon: Heart,
    color: 'text-accent-600 bg-accent-100'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Animal Encontrado',
    message: 'Um animal foi encontrado próximo à sua localização',
    time: 'Há 1 dia',
    icon: AlertTriangle,
    color: 'text-yellow-600 bg-yellow-100'
  }
];

export default function NotificationsSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Notificações</h2>
        <button className="text-primary-600 hover:text-primary-700 font-medium">
          Marcar todas como lidas
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className={`p-3 rounded-full ${notification.color}`}>
              <notification.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                <span className="text-sm text-gray-500">{notification.time}</span>
              </div>
              <p className="text-gray-600 mt-1">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 mb-4">Preferências de Notificação</h3>
        <div className="space-y-4">
          {[
            { label: 'Lembretes de Agendamento', enabled: true },
            { label: 'Promoções e Ofertas', enabled: true },
            { label: 'Alertas de Animais Próximos', enabled: false },
            { label: 'Atualizações de ONGs', enabled: true }
          ].map((preference, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-700">{preference.label}</span>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preference.enabled ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preference.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}