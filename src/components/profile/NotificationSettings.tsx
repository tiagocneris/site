import React, { useState } from 'react';
import { Bell, Package, Heart, Tag, ShoppingBag } from 'lucide-react';

const initialSettings = [
  {
    id: 'orders',
    icon: Package,
    title: 'Atualizações de Pedidos',
    description: 'Receba notificações sobre o status dos seus pedidos',
    enabled: true
  },
  {
    id: 'pets',
    icon: Heart,
    title: 'Cuidados com Pets',
    description: 'Lembretes sobre vacinação, consultas e dicas de cuidados',
    enabled: true
  },
  {
    id: 'promotions',
    icon: Tag,
    title: 'Promoções e Ofertas',
    description: 'Fique por dentro das melhores ofertas',
    enabled: false
  },
  {
    id: 'products',
    icon: ShoppingBag,
    title: 'Produtos Recomendados',
    description: 'Receba sugestões personalizadas de produtos',
    enabled: true
  }
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-[#B2FFFF]">
          <Bell className="h-6 w-6 text-[#36c6c6]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">Preferências de Notificação</h2>
          <p className="text-neutral-600">Gerencie como você deseja receber as notificações</p>
        </div>
      </div>

      <div className="space-y-6">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-start justify-between p-4 rounded-xl bg-gray-50"
          >
            <div className="flex gap-3">
              <div className="p-2 rounded-full bg-white">
                <setting.icon className="h-5 w-5 text-[#36c6c6]" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-800">{setting.title}</h3>
                <p className="text-sm text-neutral-600">{setting.description}</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting(setting.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                setting.enabled ? 'bg-[#36c6c6]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  setting.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}