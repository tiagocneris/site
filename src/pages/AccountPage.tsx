import React, { useState } from 'react';
import { 
  User, Settings, Heart, Calendar, Bell, CreditCard, 
  LogOut, ChevronRight, Edit2, Shield, PawPrint 
} from 'lucide-react';
import AccountMenu from '../components/AccountMenu';
import ProfileSection from '../components/ProfileSection';
import PetProfilesSection from '../components/PetProfilesSection';
import AppointmentsSection from '../components/AppointmentsSection';
import FavoritesSection from '../components/FavoritesSection';
import NotificationsSection from '../components/NotificationsSection';
import PaymentSection from '../components/PaymentSection';
import SecuritySection from '../components/SecuritySection';

const menuItems = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'pets', label: 'Meus Pets', icon: PawPrint },
  { id: 'appointments', label: 'Agendamentos', icon: Calendar },
  { id: 'favorites', label: 'Favoritos', icon: Heart },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'payment', label: 'Pagamento', icon: CreditCard },
  { id: 'security', label: 'Segurança', icon: Shield }
];

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'pets':
        return <PetProfilesSection />;
      case 'appointments':
        return <AppointmentsSection />;
      case 'favorites':
        return <FavoritesSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'payment':
        return <PaymentSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Minha Conta</h1>
            <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Menu */}
          <div className="lg:w-64">
            <AccountMenu 
              items={menuItems}
              activeSection={activeSection}
              onSelect={setActiveSection}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}