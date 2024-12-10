import React, { useState } from 'react';
import { Search, MapPin, Filter, Star, Stethoscope, Scissors, Heart, ShoppingBag, Package } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import CategoryCard from '../components/CategoryCard';
import PromotionsSection from '../components/PromotionsSection';

const categories = [
  {
    id: 1,
    name: "Veterinários",
    icon: Stethoscope,
    count: 48,
    color: "bg-primary-500"
  },
  {
    id: 2,
    name: "Banho & Tosa",
    icon: Scissors,
    count: 32,
    color: "bg-accent-500"
  },
  {
    id: 3,
    name: "Adestramento",
    icon: Heart,
    count: 15,
    color: "bg-secondary-500"
  },
  {
    id: 4,
    name: "Pet Care",
    icon: Package,
    count: 27,
    color: "bg-primary-500"
  },
  {
    id: 5,
    name: "Pet Shops",
    icon: ShoppingBag,
    count: 53,
    color: "bg-accent-500"
  }
];

const services = [
  {
    id: 1,
    name: "Pet Care Plus",
    category: "Veterinário",
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80",
    location: "São Paulo, SP",
    distance: "2.5 km",
    price: "A partir de R$ 80",
    services: ["Consultas", "Vacinas", "Exames"]
  },
  {
    id: 2,
    name: "Banho & Tosa Feliz",
    category: "Pet Shop",
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80",
    location: "São Paulo, SP",
    distance: "1.8 km",
    price: "A partir de R$ 60",
    services: ["Banho", "Tosa", "Hidratação"]
  },
  {
    id: 3,
    name: "Adestramento Pro",
    category: "Adestramento",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80",
    location: "São Paulo, SP",
    distance: "3.2 km",
    price: "A partir de R$ 100",
    services: ["Adestramento", "Socialização", "Comportamento"]
  }
];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Encontre os Melhores Serviços</h1>
            <p className="text-xl text-primary-100 mb-8">
              Profissionais qualificados e serviços de qualidade para seu pet
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
            />
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Serviços em Destaque</h2>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
                <MapPin className="h-5 w-5" />
                <span>Localização</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Promotions Section */}
        <PromotionsSection />
      </div>
    </div>
  );
}