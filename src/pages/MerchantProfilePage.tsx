import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Store, Package, BarChart, Settings, Bell } from 'lucide-react';
import MerchantInfo from '../components/merchant/MerchantInfo';
import ProductsList from '../components/merchant/ProductsList';
import SalesAnalytics from '../components/merchant/SalesAnalytics';
import MerchantSettings from '../components/merchant/MerchantSettings';
import NotificationCenter from '../components/merchant/NotificationCenter';

export default function MerchantProfilePage() {
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { id: 'info', label: 'Informações', icon: Store },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'analytics', label: 'Vendas', icon: BarChart },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'notifications', label: 'Notificações', icon: Bell }
  ];

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
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Sidebar */}
            <div className="p-6 border-r border-gray-200">
              <h1 className="text-2xl font-bold text-neutral-800 mb-6">Painel do Comerciante</h1>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#B2FFFF] text-[#36c6c6]'
                        : 'text-neutral-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="col-span-3 p-8">
              {activeTab === 'info' && <MerchantInfo />}
              {activeTab === 'products' && <ProductsList />}
              {activeTab === 'analytics' && <SalesAnalytics />}
              {activeTab === 'settings' && <MerchantSettings />}
              {activeTab === 'notifications' && <NotificationCenter />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}