import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Mail, Phone, MapPin, Shield, Bell, Edit2, Clock, LogOut } from 'lucide-react';
import NotificationSettings from '../components/profile/NotificationSettings';
import SecuritySettings from '../components/profile/SecuritySettings';
import AddressBook from '../components/profile/AddressBook';
import PurchaseHistory from '../components/profile/PurchaseHistory';

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState({
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(11) 98765-4321',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/');
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-[#36c6c6] text-white rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors">
                <Camera className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-between mb-4">
                <h1 className="text-2xl font-bold text-neutral-800">{profile.name}</h1>
                {activeTab === 'personal' && (
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="text-[#36c6c6] hover:text-[#B2FFFF] font-medium flex items-center gap-2"
                  >
                    <Edit2 className="h-5 w-5" />
                    {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
                  </button>
                )}
              </div>
              <div className="space-y-2 text-neutral-600">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-5 w-5" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="h-5 w-5" />
                  <span>{profile.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-gray-200 mb-8">
            {[
              { id: 'personal', label: 'Dados Pessoais', icon: Edit2 },
              { id: 'history', label: 'Histórico', icon: Clock },
              { id: 'addresses', label: 'Endereços', icon: MapPin },
              { id: 'notifications', label: 'Notificações', icon: Bell },
              { id: 'security', label: 'Segurança', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#36c6c6] border-b-2 border-[#36c6c6]'
                    : 'text-neutral-600 hover:text-[#36c6c6]'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="input-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className="input-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="input-primary"
                  />
                </div>
                {isEditing && (
                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
                    >
                      Salvar Alterações
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'history' && <PurchaseHistory />}
            {activeTab === 'addresses' && <AddressBook />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'security' && <SecuritySettings />}
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="text-neutral-600 hover:text-[#36c6c6] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="text-neutral-600 hover:text-[#36c6c6] transition-colors"
          >
            Explorar Serviços
          </Link>
          <Link
            to="/cart"
            className="text-neutral-600 hover:text-[#36c6c6] transition-colors"
          >
            Carrinho
          </Link>
          <Link
            to="/settings"
            className="text-neutral-600 hover:text-[#36c6c6] transition-colors"
          >
            Configurações
          </Link>
        </div>
      </div>
    </div>
  );
}