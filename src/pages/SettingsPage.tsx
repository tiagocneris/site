import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Settings as SettingsIcon, Bell, Shield, 
  Globe, Moon, Smartphone, User, Truck 
} from 'lucide-react';
import ProfileSection from '../components/settings/ProfileSection';
import NotificationSection from '../components/settings/NotificationSection';
import PrivacySection from '../components/settings/PrivacySection';
import LanguageSection from '../components/settings/LanguageSection';
import SecuritySection from '../components/settings/SecuritySection';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'privacy', label: 'Privacidade', icon: Shield },
    { id: 'security', label: 'Segurança', icon: SettingsIcon },
    { id: 'language', label: 'Idioma', icon: Globe }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'notifications':
        return <NotificationSection />;
      case 'privacy':
        return <PrivacySection />;
      case 'security':
        return <SecuritySection />;
      case 'language':
        return <LanguageSection />;
      default:
        return <ProfileSection />;
    }
  };

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
            <img 
              src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Delivery Registration Card */}
        <div className="bg-[#B2FFFF] rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-white">
                <Truck className="h-6 w-6 text-[#36c6c6]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-800">Seja um Entregador Parceiro</h2>
                <p className="text-neutral-600">Faça entregas e ganhe dinheiro extra</p>
              </div>
            </div>
            <Link
              to="/delivery/register"
              className="bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#36c6c6] transition-colors"
            >
              Cadastrar como Entregador
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Sidebar */}
            <div className="p-6 border-r border-gray-200">
              <h1 className="text-2xl font-bold text-neutral-800 mb-6">Configurações</h1>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#B2FFFF] text-[#36c6c6]'
                        : 'text-neutral-600 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="col-span-3 p-8">
              {renderSection()}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex justify-center gap-8 text-neutral-600">
          <Link
            to="/help"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Ajuda
          </Link>
          <Link
            to="/privacy"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link
            to="/terms"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Termos de Uso
          </Link>
        </div>
      </div>
    </div>
  );
}