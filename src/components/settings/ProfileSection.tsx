import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin } from 'lucide-react';
import { uploadProfilePicture, updateUserProfile } from '../../utils/api/userService';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(11) 98765-4321',
    address: 'Rua Exemplo, 123 - São Paulo, SP',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const result = await uploadProfilePicture('user123', file);
        setProfile({ ...profile, avatar: result.url });
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  const handleSave = async () => {
    try {
      await updateUserProfile('user123', profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="absolute bottom-0 right-0 p-2 bg-[#36c6c6] text-white rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors cursor-pointer">
            <Camera className="h-4 w-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">{profile.name}</h2>
          <p className="text-neutral-600">Edite suas informações pessoais</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50 disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              disabled={!isEditing}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50 disabled:bg-gray-50"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Telefone
          </label>
          <div className="relative">
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50 disabled:bg-gray-50"
            />
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2">
            Endereço
          </label>
          <div className="relative">
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              disabled={!isEditing}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50 disabled:bg-gray-50"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
            >
              Salvar Alterações
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
          >
            Editar Perfil
          </button>
        )}
      </div>
    </div>
  );
}