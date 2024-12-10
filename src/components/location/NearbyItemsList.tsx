import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocationStore } from '../../store/locationStore';

interface NearbyItem {
  id: string;
  name: string;
  type: 'product' | 'service';
  image: string;
  price: number;
  rating: number;
  reviews: number;
  distance: number;
  store: {
    name: string;
    location: string;
  };
}

interface NearbyItemsListProps {
  items: NearbyItem[];
}

export default function NearbyItemsList({ items }: NearbyItemsListProps) {
  const { searchRadius } = useLocationStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-800">
          Itens Próximos a Você
        </h2>
        <span className="text-sm text-neutral-600">
          Mostrando resultados em até {searchRadius}km
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/details/${item.id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-[#36c6c6]">
                  {item.type === 'product' ? 'Produto' : 'Serviço'}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-neutral-800 mb-1">{item.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{item.rating}</span>
                </div>
                <span className="text-sm text-neutral-600">
                  ({item.reviews} avaliações)
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                <MapPin className="h-4 w-4" />
                <span>{item.store.name}</span>
                <span className="text-[#36c6c6]">{item.distance.toFixed(1)}km</span>
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
    </div>
  );
}