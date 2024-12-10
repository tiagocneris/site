import React from 'react';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';

const promotions = [
  {
    id: 1,
    title: "Super Oferta em Rações",
    description: "Até 30% de desconto em rações premium",
    image: "https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Semana do Pet",
    description: "Produtos selecionados com até 40% OFF",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Novidades em Brinquedos",
    description: "Confira nossa nova coleção",
    image: "https://images.unsplash.com/photo-1583947581924-860bda3c4083?auto=format&fit=crop&q=80"
  }
];

export default function PromotionsCarousel() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Ofertas Especiais</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-semibold mb-1">{promo.title}</h3>
                <p className="text-sm text-gray-200">{promo.description}</p>
              </div>
              <div className="absolute top-4 left-4">
                <div className="bg-accent-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-medium">Oferta</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}