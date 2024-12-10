import React, { useState } from 'react';
import { Camera, MapPin, Phone, Mail, Globe, Clock, Edit2 } from 'lucide-react';

export default function MerchantInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [merchantData, setMerchantData] = useState({
    name: 'Pet Shop Feliz',
    description: 'Oferecemos produtos de qualidade e serviços especializados para seu pet.',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    phone: '(11) 99999-9999',
    email: 'contato@petshopfeliz.com',
    website: 'www.petshopfeliz.com',
    hours: 'Segunda à Sexta: 9h às 18h | Sábado: 9h às 13h',
    logo: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
  };

  return (
    <div className="space-y-8">
      {/* Header with Logo */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src={merchantData.logo}
              alt={merchantData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-[#36c6c6] text-white rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors">
            <Camera className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-between mb-4">
            <h1 className="text-2xl font-bold text-neutral-800">{merchantData.name}</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#36c6c6] hover:text-[#B2FFFF] font-medium flex items-center gap-2"
            >
              <Edit2 className="h-5 w-5" />
              {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
            </button>
          </div>
          <p className="text-neutral-600">{merchantData.description}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-[#36c6c6]" />
            <div>
              <p className="text-sm font-medium text-neutral-600">Endereço</p>
              <input
                type="text"
                value={merchantData.address}
                onChange={(e) => setMerchantData({ ...merchantData, address: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-transparent border-0 focus:ring-0 p-0 text-neutral-800"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#36c6c6]" />
            <div>
              <p className="text-sm font-medium text-neutral-600">Telefone</p>
              <input
                type="tel"
                value={merchantData.phone}
                onChange={(e) => setMerchantData({ ...merchantData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-transparent border-0 focus:ring-0 p-0 text-neutral-800"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#36c6c6]" />
            <div>
              <p className="text-sm font-medium text-neutral-600">Email</p>
              <input
                type="email"
                value={merchantData.email}
                onChange={(e) => setMerchantData({ ...merchantData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-transparent border-0 focus:ring-0 p-0 text-neutral-800"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-[#36c6c6]" />
            <div>
              <p className="text-sm font-medium text-neutral-600">Website</p>
              <input
                type="url"
                value={merchantData.website}
                onChange={(e) => setMerchantData({ ...merchantData, website: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-transparent border-0 focus:ring-0 p-0 text-neutral-800"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-[#36c6c6]" />
            <div>
              <p className="text-sm font-medium text-neutral-600">Horário de Funcionamento</p>
              <input
                type="text"
                value={merchantData.hours}
                onChange={(e) => setMerchantData({ ...merchantData, hours: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-transparent border-0 focus:ring-0 p-0 text-neutral-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-4 pt-6">
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
  );
}