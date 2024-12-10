import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Package, User, ShoppingCart, PawPrint, AlertTriangle, ShoppingBag, CreditCard } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  if (!isOpen) return null;

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explorar Serviços', icon: Search },
    { to: '/ongs', label: 'ONGs e Adoções', icon: PawPrint },
    { to: '/sos', label: 'SOS Pet', icon: AlertTriangle },
    { to: '/products', label: 'Produtos e Ofertas', icon: ShoppingBag },
    { to: '/plans', label: 'Planos', icon: CreditCard },
    { to: '/order-tracking', label: 'Rastrear Pedido', icon: Package },
    { to: '/profile', label: 'Minha Conta', icon: User },
    { to: '/cart', label: 'Carrinho', icon: ShoppingCart }
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-64 bg-white p-6 shadow-xl">
        <div className="flex flex-col space-y-6">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 text-neutral-600 hover:text-[#36c6c6] transition-colors text-lg ${
                location.pathname === to ? 'text-[#36c6c6]' : ''
              }`}
              onClick={onClose}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}