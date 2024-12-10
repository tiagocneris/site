import React from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RelatedItemsProps {
  type: 'product' | 'service';
}

const mockProducts = [
  {
    id: '3',
    name: 'Kit Brinquedos Interativos',
    price: 79.90,
    rating: 4.6,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    name: 'Shampoo Premium',
    price: 45.90,
    rating: 4.7,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1583947581924-860bda3c4083?auto=format&fit=crop&q=80'
  },
  {
    id: '5',
    name: 'Coleira Ajustável',
    price: 59.90,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80'
  }
];

const mockServices = [
  {
    id: '6',
    name: 'Banho & Tosa',
    provider: 'Pet Shop Feliz',
    price: 80.00,
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80'
  },
  {
    id: '7',
    name: 'Adestramento',
    provider: 'Dog Training Pro',
    price: 120.00,
    rating: 4.9,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80'
  },
  {
    id: '8',
    name: 'Day Care',
    provider: 'Pet Paradise',
    price: 90.00,
    rating: 4.7,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1593871075120-982e042088d8?auto=format&fit=crop&q=80'
  }
];

export default function RelatedItems({ type }: RelatedItemsProps) {
  const items = type === 'product' ? mockProducts : mockServices;

  return (
    <section className="mt-16 border-t border-gray-200 pt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-800">
          {type === 'product' ? 'Produtos Relacionados' : 'Serviços Similares'}
        </h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-full border border-gray-200 hover:border-[#36c6c6] hover:text-[#36c6c6] transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full border border-gray-200 hover:border-[#36c6c6] hover:text-[#36c6c6] transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/details/${item.id}`}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-neutral-800 mb-1">{item.name}</h3>
              {'provider' in item && (
                <p className="text-sm text-neutral-600 mb-2">{item.provider}</p>
              )}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{item.rating}</span>
                </div>
                <span className="text-sm text-neutral-600">
                  ({item.reviews} avaliações)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-neutral-800">
                  R$ {item.price.toFixed(2)}
                </span>
                <button className="text-[#36c6c6] hover:text-[#B2FFFF] font-medium">
                  Ver Detalhes
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}