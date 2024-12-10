import React from 'react';
import { Star, Heart, Share2, ShoppingCart, Check } from 'lucide-react';
import ImageGallery from './ImageGallery';

interface ProductPreviewProps {
  product: {
    name: string;
    brand?: string;
    description: string;
    price: number;
    images: string[];
    features: string[];
    variants?: Array<{
      id: number;
      size: string;
      price: number;
    }>;
  };
}

export default function ProductPreview({ product }: ProductPreviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <ImageGallery images={product.images} name={product.name} />

      <div className="space-y-6">
        {product.brand && (
          <span className="text-sm text-neutral-600">{product.brand}</span>
        )}
        <h1 className="text-3xl font-bold text-neutral-800">{product.name}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="font-medium">Novo</span>
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-6">
          <span className="text-3xl font-bold text-neutral-800">
            R$ {product.price.toFixed(2)}
          </span>

          {product.variants && (
            <div className="mt-4 space-y-4">
              <h3 className="font-medium text-neutral-800">Variantes</h3>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className="p-3 rounded-xl text-sm font-medium bg-gray-50 text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">
            Descrição do Produto
          </h2>
          <p className="text-neutral-600">{product.description}</p>

          <div className="mt-6">
            <h3 className="font-medium text-neutral-800 mb-3">Características</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-neutral-600">
                  <Check className="h-5 w-5 text-[#36c6c6]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex gap-4">
          <button className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Adicionar ao Carrinho</span>
          </button>
          <button className="flex-1 border-2 border-[#36c6c6] text-[#36c6c6] px-6 py-3 rounded-full hover:bg-[#B2FFFF] transition-colors">
            Comprar Agora
          </button>
        </div>
      </div>
    </div>
  );
}