import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag, ArrowRight, AlertTriangle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import RelatedProducts from '../components/cart/RelatedProducts';

export default function CartPage() {
  const { items, clearCart, total } = useCartStore();
  const hasItems = items.length > 0;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para Home</span>
            </Link>
            {hasItems && (
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
                <span className="hidden sm:inline">Limpar Carrinho</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-neutral-800 mb-8">Carrinho de Compras</h1>

        {hasItems ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Shipping Alert */}
              <div className="mt-6 p-4 bg-[#B2FFFF]/10 rounded-xl flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-[#36c6c6] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-600">
                  O prazo de entrega será calculado no checkout com base no seu CEP.
                  Produtos de diferentes vendedores podem ter prazos distintos.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <CartSummary />
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts />
        </div>

        {/* Quick Links */}
        <div className="mt-12 flex justify-center gap-8 text-neutral-600">
          <Link
            to="/"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Produtos
          </Link>
          <Link
            to="/account"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Minha Conta
          </Link>
        </div>
      </div>
    </div>
  );
}