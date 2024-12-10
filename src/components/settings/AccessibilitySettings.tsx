import React, { useState } from 'react';
import { Type, ZoomIn, Volume2, Eye } from 'lucide-react';

const accessibilitySettings = [
  {
    id: 'fontSize',
    icon: Type,
    title: 'Tamanho da Fonte',
    description: 'Ajuste o tamanho do texto',
    options: ['Pequeno', 'Médio', 'Grande'],
    current: 'Médio'
  },
  {
    id: 'contrast',
    icon: Eye,
    title: 'Alto Contraste',
    description: 'Aumentar o contraste das cores',
    enabled: false
  },
  {
    id: 'zoom',
    icon: ZoomIn,
    title: 'Zoom Padrão',
    description: 'Nível de ampliação da interface',
    options: ['100%', '125%', '150%'],
    current: '100%'
  },
  {
    id: 'screenReader',
    icon: Volume2,
    title: 'Leitor de Tela',
    description: 'Compatibilidade com leitores de tela',
    enabled: true
  }
];

export default function AccessibilitySettings() {
  const [settings, setSettings] = useState(accessibilitySettings);

  const updateSetting = (id: string, value: any) => {
    setSettings(settings.map(setting =>
      setting.id === id
        ? { ...setting, ...(typeof value === 'boolean' ? { enabled: value } : { current: value }) }
        : setting
    ));
  };

  return (
    <div className="space-y-6">
      {settings.map((setting) => (
        <div key={setting.id} className="p-4 rounded-xl bg-gray-50">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-full bg-white">
              <setting.icon className="h-5 w-5 text-[#36c6c6]" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-neutral-800">{setting.title}</h3>
              <p className="text-sm text-neutral-600">{setting.description}</p>
            </div>
          </div>

          {'options' in setting ? (
            <div className="grid grid-cols-3 gap-2">
              {setting.options.map((option) => (
                <button
                  key={option}
                  onClick={() => updateSetting(setting.id, option)}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    setting.current === option
                      ? 'bg-[#36c6c6] text-white'
                      : 'bg-white text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => updateSetting(setting.id, !setting.enabled)}
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
          )}
        </div>
      ))}
    </div>
  );
}