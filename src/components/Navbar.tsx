import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Settings } from 'lucide-react';
import MobileMenu from './MobileMenu';
import UserMenu from './UserMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItemCount = 2;

  const navLinks = [
    { to: '/explore', label: 'Explorar Serviços' },
    { to: '/products', label: 'Produtos e Ofertas' },
    { to: '/ongs', label: 'ONGs e Adoções' },
    { to: '/sos', label: 'SOS Pet' },
    { to: '/plans', label: 'Planos' },
    { to: '/order-tracking', label: 'Rastrear Pedido' }
  ];

  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <img 
              src="https://storage.googleapis.com/imagensapp/love%20connection%20pet%20center-Photoroom.png" 
              alt="Love Connection Pet Center" 
              className="h-16 w-auto object-contain"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-neutral-600 hover:text-[#36c6c6] transition-colors ${
                  location.pathname === to ? 'text-[#36c6c6]' : ''
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link 
                to="/settings"
                className="text-neutral-600 hover:text-[#36c6c6] transition-colors"
                aria-label="Configurações"
              >
                <Settings className="h-6 w-6" />
              </Link>
              <Link 
                to="/cart" 
                className="relative text-neutral-600 hover:text-[#36c6c6] transition-colors"
                aria-label="Carrinho de Compras"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-300 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <UserMenu />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link 
              to="/settings"
              className="text-neutral-600 hover:text-[#36c6c6]"
              aria-label="Configurações"
            >
              <Settings className="h-6 w-6" />
            </Link>
            <Link 
              to="/cart" 
              className="relative text-neutral-600 hover:text-[#36c6c6]"
              aria-label="Carrinho de Compras"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-300 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button 
              className="text-neutral-600 hover:text-[#36c6c6]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar Menu' : 'Abrir Menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </nav>
  );
}