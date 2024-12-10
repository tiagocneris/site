import React from 'react';
import { MapPin, Heart, Users, PawPrint } from 'lucide-react';

interface OngStats {
  animalsHelped: number;
  adoptions: number;
  volunteers: number;
}

interface Ong {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  distance: string;
  stats: OngStats;
  needs: string[];
}

interface OngCardProps {
  ong: Ong;
}

export default function OngCard({ ong }: OngCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative h-48">
        <img
          src={ong.image}
          alt={ong.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white mb-1">{ong.name}</h3>
          <div className="flex items-center text-white/80 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{ong.location}</span>
            <span className="mx-2">•</span>
            <span>{ong.distance}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4">{ong.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-primary-600 font-semibold">{ong.stats.animalsHelped}</p>
            <p className="text-sm text-gray-500">Resgatados</p>
          </div>
          <div className="text-center">
            <p className="text-accent-600 font-semibold">{ong.stats.adoptions}</p>
            <p className="text-sm text-gray-500">Adotados</p>
          </div>
          <div className="text-center">
            <p className="text-secondary-600 font-semibold">{ong.stats.volunteers}</p>
            <p className="text-sm text-gray-500">Voluntários</p>
          </div>
        </div>

        {/* Needs */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Necessidades Atuais:</p>
          <div className="flex flex-wrap gap-2">
            {ong.needs.map((need, index) => (
              <span
                key={index}
                className="bg-primary-50 text-primary-600 text-sm px-3 py-1 rounded-full"
              >
                {need}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors">
            Conhecer
          </button>
          <button className="flex-1 border-2 border-primary-500 text-primary-600 px-4 py-2 rounded-full hover:bg-primary-50 transition-colors">
            Doar
          </button>
        </div>
      </div>
    </div>
  );
}