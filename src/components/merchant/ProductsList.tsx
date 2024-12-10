import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Tag } from 'lucide-react';

const mockProducts = [
  {
    id: '1',
    name: 'Ração Premium Adulto',
    category: 'Alimentos',
    price: 189.90,
    stock: 50,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    name: 'Kit Brinquedos',
    category: 'Brinquedos',
    price: 79.90,
    stock: 30,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80'
  }
];

export default function ProductsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-800">Meus Produtos</h2>
        <button className="flex items-center gap-2 bg-[#36c6c6] text-white px-4 py-2 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors">
          <Plus className="h-5 w-5" />
          <span>Adicionar Produto</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-[#36c6c6] hover:text-[#36c6c6] transition-colors">
          <Filter className="h-5 w-5" />
          <span>Filtros</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">Produto</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">Categoria</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">Preço</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">Estoque</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium text-neutral-800">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-neutral-600">{product.category}</td>
                <td className="px-4 py-4 text-neutral-800">
                  R$ {product.price.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-neutral-600">{product.stock}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Ativo
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-neutral-400 hover:text-[#36c6c6] rounded-full hover:bg-gray-100">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-neutral-400 hover:text-red-600 rounded-full hover:bg-gray-100">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}