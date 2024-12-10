import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const pets = [
  {
    id: 1,
    name: 'Max',
    type: 'Cachorro',
    breed: 'Golden Retriever',
    age: '3 anos',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Gato',
    breed: 'Siamês',
    age: '2 anos',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80'
  }
];

export default function PetProfilesSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Meus Pets</h2>
        <button className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Adicionar Pet</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                  <p className="text-sm text-gray-500">{pet.type} • {pet.breed}</p>
                  <p className="text-sm text-gray-500">{pet.age}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 rounded-full hover:bg-gray-100">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button className="w-full bg-primary-50 text-primary-600 px-4 py-2 rounded-full hover:bg-primary-100 transition-colors">
                Ver Histórico
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}