import React from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

const paymentMethods = [
  {
    id: 1,
    type: 'credit',
    last4: '4242',
    expiry: '12/24',
    brand: 'Visa'
  },
  {
    id: 2,
    type: 'credit',
    last4: '8888',
    expiry: '08/25',
    brand: 'Mastercard'
  }
];

export default function PaymentSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Métodos de Pagamento</h2>
        <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
          <Plus className="h-5 w-5" />
          <span>Adicionar Cartão</span>
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary-100">
                <CreditCard className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {method.brand} terminado em {method.last4}
                </p>
                <p className="text-sm text-gray-500">Expira em {method.expiry}</p>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 mb-4">Histórico de Transações</h3>
        <div className="space-y-4">
          {[
            {
              id: 1,
              service: 'Consulta Veterinária',
              date: '10/04/2024',
              amount: 'R$ 150,00'
            },
            {
              id: 2,
              service: 'Doação - ONG Amigos dos Pets',
              date: '05/04/2024',
              amount: 'R$ 50,00'
            }
          ].map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-4 rounded-xl bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-900">{transaction.service}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <span className="font-medium text-gray-900">{transaction.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}