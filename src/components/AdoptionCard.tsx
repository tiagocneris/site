import React from 'react';
import { Heart } from 'lucide-react';

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  image: string;
  ong: string;
  description: string;
}

interface AdoptionCardProps {
  pet: Pet;
}

export default function AdoptionCard({ pet }: AdoptionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative h-64">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-accent-500" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{pet.name}</h3>
            <p className="text-sm text-gray-500">{pet.ong}</p>
          </div>
          <span className="bg-primary-50 text-primary-600 text-sm px-3 py-1 rounded-full">
            {pet.type}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Raça</p>
            <p className="font-medium">{pet.breed}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Idade</p>
            <p className="font-medium">{pet.age}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gênero</p>
            <p className="font-medium">{pet.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Porte</p>
            <p className="font-medium">{pet.size}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-6">{pet.description}</p>

        <div className="flex gap-3">
          <button className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors">
            Quero Adotar
          </button>
          <button className="flex-1 border-2 border-primary-500 text-primary-600 px-4 py-2 rounded-full hover:bg-primary-50 transition-colors">
            Mais Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}