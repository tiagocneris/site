import React from 'react';
import { Shield, Eye, History, MapPin } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

export default function PrivacySection() {
  const { settings, updateSettings } = useSettingsStore();

  const handleVisibilityChange = (value: 'public' | 'private') => {
    updateSettings({
      privacy: {
        ...settings.privacy,
        profileVisibility: value
      }
    });
  };

  const togglePrivacySetting = (key: keyof typeof settings.privacy) => {
    if (key !== 'profileVisibility') {
      updateSettings({
        privacy: {
          ...settings.privacy,
          [key]: !settings.privacy[key]
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-[#B2FFFF]">
          <Shield className="h-6 w-6 text-[#36c6c6]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">Privacidade</h2>
          <p className="text-neutral-600">Controle suas configurações de privacidade</p>
        </div>
      </div>

      {/* Profile Visibility */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-full bg-white">
            <Eye className="h-5 w-5 text-[#36c6c6]" />
          </div>
          <div>
            <h3 className="font-medium text-neutral-800">Visibilidade do Perfil</h3>
            <p className="text-sm text-neutral-600">Quem pode ver seu perfil</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleVisibilityChange('public')}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.privacy.profileVisibility === 'public'
                ? 'bg-[#36c6c6] text-white'
                : 'bg-white text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
            }`}
          >
            Público
          </button>
          <button
            onClick={() => handleVisibilityChange('private')}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.privacy.profileVisibility === 'private'
                ? 'bg-[#36c6c6] text-white'
                : 'bg-white text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
            }`}
          >
            Privado
          </button>
        </div>
      </div>

      {/* Activity History */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="p-2 rounded-full bg-white">
              <History className="h-5 w-5 text-[#36c6c6]" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-800">Histórico de Atividades</h3>
              <p className="text-sm text-neutral-600">
                Salvar histórico para recomendações personalizadas
              </p>
            </div>
          </div>
          <button
            onClick={() => togglePrivacySetting('activityHistory')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.privacy.activityHistory ? 'bg-[#36c6c6]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.privacy.activityHistory ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Location Sharing */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="p-2 rounded-full bg-white">
              <MapPin className="h-5 w-5 text-[#36c6c6]" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-800">Compartilhamento de Localização</h3>
              <p className="text-sm text-neutral-600">
                Permitir acesso à sua localização para serviços próximos
              </p>
            </div>
          </div>
          <button
            onClick={() => togglePrivacySetting('locationSharing')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.privacy.locationSharing ? 'bg-[#36c6c6]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.privacy.locationSharing ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}