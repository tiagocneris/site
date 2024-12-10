import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { 
  User, Settings, LogOut, Package, Heart, PawPrint, 
  AlertTriangle, ShoppingBag, Store, BarChart, Bell 
} from 'lucide-react';
import LoginModal from './auth/LoginModal';
import { useAuth } from './auth/AuthProvider';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const userMenuItems = [
    { to: '/profile', label: 'Meu Perfil', icon: User },
    { to: '/orders', label: 'Meus Pedidos', icon: Package },
    { to: '/favorites', label: 'Favoritos', icon: Heart },
    { to: '/settings', label: 'Configurações', icon: Settings },
    { to: '/merchant', label: 'Área do Comerciante', icon: Store, merchant: true }
  ];

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowLoginModal(true)}
          className="flex items-center gap-2 bg-[#36c6c6] text-white px-4 py-2 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
        >
          <User className="h-5 w-5" />
          <span className="font-medium">Entrar</span>
        </button>
        
        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </>
    );
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 bg-[#36c6c6] text-white px-4 py-2 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors">
        <User className="h-5 w-5" />
        <span className="font-medium">Minha Conta</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
          <div className="p-2">
            {userMenuItems.map((item) => (
              <Menu.Item key={item.to}>
                {({ active }) => (
                  <Link
                    to={item.to}
                    className={`${
                      active ? 'bg-[#B2FFFF] text-[#36c6c6]' : 'text-neutral-600'
                    } group flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="p-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={signOut}
                  className={`${
                    active ? 'bg-red-50 text-red-600' : 'text-neutral-600'
                  } w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors`}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}