import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.discount && (
            <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {product.discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Novo
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Mais Vendido
            </span>
          )}
        </div>
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-gray-400 hover:text-accent-500" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} avaliações)</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {product.discount ? (
              <>
                <span className="text-sm text-gray-500 line-through">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="text-xl font-bold text-gray-900 ml-2">
                  R$ {(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                R$ {product.price.toFixed(2)}
              </span>
            )}
          </div>
          <button className="bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}