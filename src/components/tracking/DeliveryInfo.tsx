import React from 'react';

interface DeliveryInfoProps {
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  shipping: {
    method: string;
    estimatedTime: string;
  };
}

export default function DeliveryInfo({ address, shipping }: DeliveryInfoProps) {
  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Adicionais</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700">Endereço de Entrega</p>
          <p className="text-gray-600 mt-1">
            {address.street}<br />
            {address.neighborhood} - {address.city}, {address.state}<br />
            CEP: {address.zipCode}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700">Método de Entrega</p>
          <p className="text-gray-600 mt-1">{shipping.method}</p>
          <p className="text-sm text-gray-500">Prazo estimado: {shipping.estimatedTime}</p>
        </div>
      </div>
    </div>
  );
}