import React, { useState } from 'react';
import { Bell, Package, Heart, Tag, Volume2 } from 'lucide-react';

const notificationTypes = [
  {
    id: 'orders',
    icon: Package,
    title: 'Pedidos',
    description: 'Atualizações sobre seus pedidos',
    enabled: true
  },
  {
    id: 'pets',
    icon: Heart,
    title: 'Pets',
    description: 'Lembretes de cuidados e vacinação',
    enabled: true
  },
  {
    id: 'promotions',
    icon: Tag,
    title: 'Promoções',
    description: 'Ofertas e descontos especiais',
    enabled: false
  },
  {
    id: 'sounds',
    icon: Volume2,
    title: 'Sons',
    description: 'Sons de notificação',
    enabled: true
  }
];

export default function NotificationPreferences() {
  const [preferences, setPreferences] = useState(notificationTypes);

  const togglePreference = (id: string) => {
    setPreferences(preferences.map(pref =>
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    ));
  };

  return (
    <div className="space-y-6">
      {preferences.map((pref) => (
        <div
          key={pref.id}
          className="flex items-start justify-between p-4 rounded-xl bg-gray-50"
        >
          <div className="flex gap-3">
            <div className="p-2 rounded-full bg-white">
              <pref.icon className="h-5 w-5 text-[#36c6c6]" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-800">{pref.title}</h3>
              <p className="text-sm text-neutral-600">{pref.description}</p>
            </div>
          </div>
          <button
            onClick={() => togglePreference(pref.id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              pref.enabled ? 'bg-[#36c6c6]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                pref.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}