import React, { useState } from 'react';
import { Search, Filter, ShoppingBag, Star, Tag, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import PromotionsCarousel from '../components/PromotionsCarousel';
import FeaturedCategories from '../components/FeaturedCategories';

const categories = [
  { id: 1, name: 'Ração', count: 150 },
  { id: 2, name: 'Petiscos', count: 80 },
  { id: 3, name: 'Brinquedos', count: 120 },
  { id: 4, name: 'Higiene', count: 90 },
  { id: 5, name: 'Acessórios', count: 200 },
  { id: 6, name: 'Medicamentos', count: 75 }
];

const products = [
  {
    id: 1,
    name: 'Ração Premium Adulto',
    brand: 'Royal Canin',
    price: 189.90,
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&q=80',
    discount: 15,
    category: 'Ração',
    isNew: false,
    isBestSeller: true
  },
  {
    id: 2,
    name: 'Kit Brinquedos Interativos',
    brand: 'PetFun',
    price: 79.90,
    rating: 4.6,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80',
    category: 'Brinquedos',
    isNew: true,
    isBestSeller: false
  },
  {
    id: 3,
    name: 'Shampoo Hidratante',
    brand: 'PetClean',
    price: 45.90,
    rating: 4.7,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1583947581924-860bda3c4083?auto=format&fit=crop&q=80',
    category: 'Higiene',
    discount: 20,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 4,
    name: 'Coleira Ajustável Premium',
    brand: 'PetStyle',
    price: 59.90,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80',
    category: 'Acessórios',
    isNew: true,
    isBestSeller: true
  }
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section with Search */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Produtos para seu Pet</h1>
            <p className="text-xl text-primary-100 mb-8">
              As melhores marcas e produtos selecionados para o bem-estar do seu companheiro
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Promotions Carousel */}
      <PromotionsCarousel />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Price Range Filter */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preço</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  className="w-full accent-primary-500"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>R$ 0</span>
                  <span>R$ 1000</span>
                </div>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-500" />
                  <span className="ml-2 text-gray-700">Promoções</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-500" />
                  <span className="ml-2 text-gray-700">Novidades</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-primary-500" />
                  <span className="ml-2 text-gray-700">Mais Vendidos</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Produtos em Destaque</h2>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border-gray-200 text-gray-700 focus:ring-primary-500"
                >
                  <option value="featured">Em Destaque</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliados</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-12 text-center">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-full border-2 border-primary-500 hover:bg-primary-50 transition-colors">
                Carregar Mais Produtos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}