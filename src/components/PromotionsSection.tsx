import React from 'react';
import { Tag, Clock } from 'lucide-react';

const promotions = [
  {
    id: 1,
    title: "Primeira Consulta Grátis",
    description: "Avaliação veterinária completa para novos clientes",
    discount: "100% OFF",
    validUntil: "30/04/2024",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Pacote Banho & Tosa",
    description: "3 banhos + 1 tosa com 30% de desconto",
    discount: "30% OFF",
    validUntil: "15/04/2024",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Kit Ração Premium",
    description: "Na compra de 2 pacotes, ganhe 1 mês de petiscos",
    discount: "BRINDE",
    validUntil: "20/04/2024",
    image: "https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&q=80"
  }
];

export default function PromotionsSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ofertas Especiais</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aproveite nossas promoções exclusivas e garanta o melhor para seu pet com preços especiais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <div className="relative h-48">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-accent-500 text-white px-4 py-2 rounded-full font-semibold">
                    {promo.discount}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{promo.title}</h3>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Válido até {promo.validUntil}</span>
                  </div>
                  <button className="bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition-colors">
                    Resgatar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-full border-2 border-primary-500 hover:bg-primary-50 transition-colors">
            <Tag className="h-5 w-5" />
            <span>Ver Todas as Ofertas</span>
          </button>
        </div>
      </div>
    </section>
  );
}