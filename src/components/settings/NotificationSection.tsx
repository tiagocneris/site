import React from 'react';
import { Bell, ShoppingBag, MessageCircle, Star, Volume2 } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

export default function NotificationSection() {
  const { settings, updateSettings } = useSettingsStore();

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const notificationTypes = [
    {
      id: 'email',
      title: 'Notificações por Email',
      description: 'Receba atualizações importantes no seu email',
      icon: MessageCircle,
      enabled: settings.notifications.email
    },
    {
      id: 'push',
      title: 'Notificações Push',
      description: 'Receba notificações em tempo real no seu dispositivo',
      icon: Bell,
      enabled: settings.notifications.push
    },
    {
      id: 'orderUpdates',
      title: 'Atualizações de Pedidos',
      description: 'Seja notificado sobre o status dos seus pedidos',
      icon: ShoppingBag,
      enabled: settings.notifications.orderUpdates
    },
    {
      id: 'promotions',
      title: 'Promoções e Ofertas',
      description: 'Receba ofertas especiais e descontos exclusivos',
      icon: Star,
      enabled: settings.notifications.promotions
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-[#B2FFFF]">
          <Volume2 className="h-6 w-6 text-[#36c6c6]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">Notificações</h2>
          <p className="text-neutral-600">Gerencie como você recebe as notificações</p>
        </div>
      </div>

      <div className="space-y-4">
        {notificationTypes.map((type) => (
          <div
            key={type.id}
            className="flex items-start justify-between p-4 rounded-xl bg-gray-50"
          >
            <div className="flex gap-3">
              <div className="p-2 rounded-full bg-white">
                <type.icon className="h-5 w-5 text-[#36c6c6]" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-800">{type.title}</h3>
                <p className="text-sm text-neutral-600">{type.description}</p>
              </div>
            </div>
            <button
              onClick={() => toggleNotification(type.id as keyof typeof settings.notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                type.enabled ? 'bg-[#36c6c6]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  type.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}