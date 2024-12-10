import React from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const services = [
  {
    id: 1,
    name: "Pet Care Plus",
    description: "Clínica veterinária completa com profissionais especializados",
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Banho & Tosa Feliz",
    description: "Serviços de estética pet com produtos premium",
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Hotel Pet Paradise",
    description: "Hospedagem com monitoramento 24h e área de lazer",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
  }
];

export default function ServiceCarousel() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Destaques Próximos a Você</h2>
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
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white mb-1">{service.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-white font-medium">{service.rating}</span>
                    </div>
                    <span className="text-sm text-gray-200">({service.reviews} avaliações)</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 w-full bg-primary-500 text-white py-2 px-4 rounded-full hover:bg-primary-600 transition-colors">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}