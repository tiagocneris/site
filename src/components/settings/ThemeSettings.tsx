import React, { useState } from 'react';
import { Moon, Sun, Monitor, Volume2, Zap, Eye, Type } from 'lucide-react';

const themes = [
  { id: 'light', name: 'Claro', icon: Sun },
  { id: 'dark', name: 'Escuro', icon: Moon },
  { id: 'system', name: 'Sistema', icon: Monitor }
];

const generalSettings = [
  {
    id: 'animations',
    icon: Zap,
    label: 'Animações',
    description: 'Ativar animações na interface',
    enabled: true
  },
  {
    id: 'reducedMotion',
    icon: Eye,
    label: 'Reduzir Movimento',
    description: 'Diminuir efeitos de movimento',
    enabled: false
  },
  {
    id: 'soundEffects',
    icon: Volume2,
    label: 'Efeitos Sonoros',
    description: 'Sons de interação',
    enabled: true
  },
  {
    id: 'largeText',
    icon: Type,
    label: 'Texto Grande',
    description: 'Aumentar tamanho do texto',
    enabled: false
  }
];

export default function ThemeSettings() {
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [settings, setSettings] = useState(generalSettings);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div>
        <h3 className="font-medium text-neutral-800 mb-4">Tema da Interface</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedTheme === theme.id
                  ? 'border-[#36c6c6] bg-[#B2FFFF] text-[#36c6c6] shadow-md'
                  : 'border-gray-200 hover:border-[#36c6c6] hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <theme.icon className="h-6 w-6" />
                <span className="font-medium">{theme.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* General Settings */}
      <div>
        <h3 className="font-medium text-neutral-800 mb-4">Outras Configurações</h3>
        <div className="space-y-4">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white">
                  <setting.icon className="h-5 w-5 text-[#36c6c6]" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">{setting.label}</p>
                  <p className="text-sm text-neutral-600">{setting.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting(setting.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  setting.enabled ? 'bg-[#36c6c6]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    setting.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <button
          className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-all duration-200 font-medium"
          onClick={() => {
            // Here you would typically save the settings to your backend
            console.log('Settings saved:', { selectedTheme, settings });
          }}
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}