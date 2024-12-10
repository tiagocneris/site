import React, { useState } from 'react';
import { X, Calendar, MapPin } from 'lucide-react';

interface DonationFormProps {
  isOpen: boolean;
  onClose: () => void;
  ongName: string;
}

const foodTypes = [
  "Ração Seca - Adulto",
  "Ração Seca - Filhote",
  "Ração Úmida",
  "Ração Medicamentosa",
  "Petiscos",
  "Suplementos"
];

const deliveryOptions = [
  {
    id: 1,
    name: "ONG Amigos dos Pets",
    address: "Rua das Flores, 123 - São Paulo, SP",
    schedule: "Seg a Sex, 9h às 18h"
  },
  {
    id: 2,
    name: "Pet Shop Parceiro",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    schedule: "Todos os dias, 10h às 22h"
  },
  {
    id: 3,
    name: "Agendamento de Coleta",
    address: "Seu endereço",
    schedule: "Agendar horário"
  }
];

export default function DonationForm({ isOpen, onClose, ongName }: DonationFormProps) {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Doação Agendada!</h3>
              <p className="text-gray-600">
                Obrigado por sua contribuição. A ONG {ongName} entrará em contato para confirmar os detalhes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Doar Alimentos</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Alimento
                  </label>
                  <select
                    value={foodType}
                    onChange={(e) => setFoodType(e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Selecione o tipo</option>
                    {foodTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local de Entrega
                  </label>
                  <div className="space-y-3">
                    {deliveryOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          deliveryOption === option.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                          checked={deliveryOption === option.id}
                          onChange={() => setDeliveryOption(option.id)}
                          className="sr-only"
                        />
                        <div className="flex items-start">
                          <MapPin className={`h-5 w-5 mt-0.5 ${
                            deliveryOption === option.id ? 'text-primary-600' : 'text-gray-400'
                          }`} />
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{option.name}</p>
                            <p className="text-sm text-gray-500">{option.address}</p>
                            <p className="text-sm text-gray-500">{option.schedule}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white py-3 px-6 rounded-full hover:bg-primary-600 transition-colors"
                >
                  Confirmar Doação
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}