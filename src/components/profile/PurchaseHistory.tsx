import React from 'react';
import { Package, Heart, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Transaction {
  id: string;
  type: 'purchase' | 'adoption';
  name: string;
  date: string;
  status: string;
  image: string;
  price?: number;
}

const transactions: Transaction[] = [
  {
    id: 'PED123456',
    type: 'purchase',
    name: 'Ração Premium + Brinquedos',
    date: '12/04/2024',
    status: 'Em trânsito',
    price: 189.90,
    image: 'https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&q=80'
  },
  {
    id: 'ADO789012',
    type: 'adoption',
    name: 'Luna',
    date: '10/04/2024',
    status: 'Aprovado',
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80'
  }
];

export default function PurchaseHistory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-800">Histórico</h2>
        <Link 
          to="/account/orders" 
          className="text-[#36c6c6] hover:text-[#B2FFFF] text-sm font-medium"
        >
          Ver Todos
        </Link>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={transaction.image}
                  alt={transaction.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-neutral-800 truncate">
                      {transaction.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
                      <Clock className="h-4 w-4" />
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'purchase'
                        ? 'bg-[#B2FFFF] text-[#36c6c6]'
                        : 'bg-accent-100 text-accent-600'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    {transaction.type === 'purchase' ? (
                      <>
                        <Package className="h-4 w-4 text-[#36c6c6]" />
                        <span className="text-sm font-medium text-neutral-800">
                          R$ {transaction.price?.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4 text-accent-500" />
                        <span className="text-sm text-neutral-600">Adoção</span>
                      </>
                    )}
                  </div>
                  <Link
                    to={transaction.type === 'purchase' 
                      ? `/order-tracking?id=${transaction.id}`
                      : `/adoption-status?id=${transaction.id}`
                    }
                    className="flex items-center gap-1 text-sm text-[#36c6c6] hover:text-[#B2FFFF] font-medium"
                  >
                    Ver Detalhes
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}