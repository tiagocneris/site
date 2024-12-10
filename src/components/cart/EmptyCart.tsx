import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-4">
        <ShoppingBag className="h-10 w-10 text-[#36c6c6]" />
      </div>
      <h2 className="text-xl font-semibold text-neutral-800 mb-2">
        Seu carrinho está vazio
      </h2>
      <p className="text-neutral-600 mb-6">
        Explore nossos produtos e encontre o melhor para seu pet
      </p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
      >
        <span>Continuar Comprando</span>
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}