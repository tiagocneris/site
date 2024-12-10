import React from 'react';
import { Star, MapPin } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  distance: string;
  price: string;
  services: string[];
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Image */}
      <div className="relative h-48">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
            {service.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{service.location}</span>
              <span className="mx-2">•</span>
              <span>{service.distance}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-medium">{service.rating}</span>
            <span className="text-sm text-gray-500">({service.reviews})</span>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.services.map((item, index) => (
            <span
              key={index}
              className="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{service.price}</span>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors">
            Agendar
          </button>
        </div>
      </div>
    </div>
  );
}