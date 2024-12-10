import React from 'react';
import { Star, Heart, Share2, MapPin, Clock, Calendar, Check } from 'lucide-react';
import ImageGallery from './ImageGallery';

interface ServicePreviewProps {
  service: {
    name: string;
    description: string;
    price: number;
    images: string[];
    features: string[];
    location: string;
    duration: string;
    availability: {
      days: string[];
      hours: string[];
    };
  };
}

export default function ServicePreview({ service }: ServicePreviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <ImageGallery images={service.images} name={service.name} />

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-neutral-800">{service.name}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="font-medium">Novo</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-600">
            <MapPin className="h-5 w-5" />
            <span>{service.location}</span>
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-6">
          <span className="text-3xl font-bold text-neutral-800">
            R$ {service.price.toFixed(2)}
          </span>

          <div className="mt-4 flex items-center gap-4 text-neutral-600">
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5" />
              <span>{service.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-5 w-5" />
              <span>{service.availability.days.join(', ')}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">
            Sobre o Serviço
          </h2>
          <p className="text-neutral-600">{service.description}</p>

          <div className="mt-6">
            <h3 className="font-medium text-neutral-800 mb-3">Serviços Inclusos</h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-neutral-600">
                  <Check className="h-5 w-5 text-[#36c6c6]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6">
          <button className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors">
            Agendar Serviço
          </button>
        </div>
      </div>
    </div>
  );
}