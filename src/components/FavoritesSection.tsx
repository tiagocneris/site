import React from 'react';
import { Heart, Star, MapPin } from 'lucide-react';

const favorites = [
  {
    id: 1,
    type: 'service',
    name: 'Pet Care Plus',
    category: 'Veterinário',
    rating: 4.8,
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    type: 'ong',
    name: 'Amigos dos Pets',
    category: 'ONG',
    rating: 4.9,
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&q=80'
  }
];

export default function FavoritesSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Favoritos</h2>
        <div className="flex gap-4">
          <button className="text-gray-600 hover:text-primary-600">Serviços</button>
          <button className="text-gray-600 hover:text-primary-600">ONGs</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={favorite.image}
                alt={favorite.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
                <Heart className="h-5 w-5 text-accent-500 fill-current" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{favorite.name}</h3>
                  <p className="text-sm text-gray-500">{favorite.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{favorite.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{favorite.location}</span>
              </div>
              <button className="w-full bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors">
                {favorite.type === 'service' ? 'Agendar' : 'Ver Detalhes'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}