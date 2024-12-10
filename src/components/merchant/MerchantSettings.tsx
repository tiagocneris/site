import React, { useState } from 'react';
import { 
  CreditCard, Bell, Shield, DollarSign, Truck, 
  Smartphone, Mail, MapPin 
} from 'lucide-react';

export default function MerchantSettings() {
  const [settings, setSettings] = useState({
    notifications: {
      orders: true,
      messages: true,
      reviews: true
    },
    payment: {
      autoAccept: false,
      instantTransfer: true
    },
    delivery: {
      ownDelivery: true,
      thirdParty: false
    }
  });

  return (
    <div className="space-y-8">
      {/* Payment Settings */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-[#36c6c6]" />
          Configurações de Pagamento
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-neutral-800">Aceitar Pagamentos Automaticamente</p>
              <p className="text-sm text-neutral-600">
                Aceitar pedidos automaticamente quando o pagamento for confirmado
              </p>
            </div>
            <button
              onClick={() => setSettings({
                ...settings,
                payment: { ...settings.payment, autoAccept: !settings.payment.autoAccept }
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.payment.autoAccept ? 'bg-[#36c6c6]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.payment.autoAccept ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Settings */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <Truck className="h-5 w-5 text-[#36c6c6]" />
          Configurações de Entrega
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-neutral-800">Entrega Própria</p>
              <p className="text-sm text-neutral-600">
                Utilizar sistema de entrega próprio
              </p>
            </div>
            <button
              onClick={() => setSettings({
                ...settings,
                delivery: { ...settings.delivery, ownDelivery: !settings.delivery.ownDelivery }
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.delivery.ownDelivery ? 'bg-[#36c6c6]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.delivery.ownDelivery ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#36c6c6]" />
          Configurações de Notificação
        </h3>
        <div className="space-y-4">
          {[
            { key: 'orders', label: 'Novos Pedidos', description: 'Receber notificações de novos pedidos' },
            { key: 'messages', label: 'Mensagens', description: 'Receber notificações de mensagens de clientes' },
            { key: 'reviews', label: 'Avaliações', description: 'Receber notificações de novas avaliações' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-neutral-800">{item.label}</p>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
              <button
                onClick={() => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    [item.key]: !settings.notifications[item.key as keyof typeof settings.notifications]
                  }
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications[item.key as keyof typeof settings.notifications]
                    ? 'bg-[#36c6c6]'
                    : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications[item.key as keyof typeof settings.notifications]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-6">
        <button className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors">
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}