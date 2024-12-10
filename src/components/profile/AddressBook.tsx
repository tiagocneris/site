import React, { useState } from 'react';
import { Plus, MapPin, Edit2, Trash2 } from 'lucide-react';

const initialAddresses = [
  {
    id: 1,
    name: 'Casa',
    street: 'Rua das Flores, 123',
    neighborhood: 'Jardim Primavera',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    isDefault: true
  },
  {
    id: 2,
    name: 'Trabalho',
    street: 'Av. Paulista, 1000',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    isDefault: false
  }
];

export default function AddressBook() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-800">Meus Endereços</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-[#36c6c6] hover:text-[#B2FFFF] transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Adicionar Endereço</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#36c6c6]" />
                <h3 className="font-medium text-neutral-800">{address.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 text-neutral-400 hover:text-[#36c6c6] rounded-full hover:bg-gray-100">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="p-1 text-neutral-400 hover:text-red-600 rounded-full hover:bg-gray-100">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-neutral-600">
              <p>{address.street}</p>
              <p>{address.neighborhood}</p>
              <p>{address.city}, {address.state}</p>
              <p>CEP: {address.zipCode}</p>
            </div>
            {address.isDefault && (
              <span className="inline-block mt-4 px-3 py-1 bg-[#B2FFFF] text-[#36c6c6] text-sm rounded-full">
                Endereço Principal
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}