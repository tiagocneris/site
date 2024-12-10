import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">Informações de Pagamento</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-600 mb-2">
            Número do Cartão
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="w-full pl-10 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              placeholder="1234 5678 9012 3456"
              required
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-neutral-600 mb-2">
            Nome no Cartão
          </label>
          <input
            type="text"
            id="cardName"
            value={formData.cardName}
            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
            className="w-full rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            placeholder="Nome como está no cartão"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-neutral-600 mb-2">
              Data de Validade
            </label>
            <div className="relative">
              <input
                type="text"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full pl-10 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                placeholder="MM/AA"
                required
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-neutral-600 mb-2">
              CVV
            </label>
            <div className="relative">
              <input
                type="text"
                id="cvv"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="w-full pl-10 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                placeholder="123"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
      >
        Continuar
      </button>
    </form>
  );
}