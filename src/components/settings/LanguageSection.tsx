import React from 'react';
import { Globe, Check } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

const languages = [
  { id: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'es', name: 'Español', flag: '🇪🇸' }
];

export default function LanguageSection() {
  const { settings, updateSettings } = useSettingsStore();

  const handleLanguageChange = (languageId: string) => {
    updateSettings({ language: languageId });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-[#B2FFFF]">
          <Globe className="h-6 w-6 text-[#36c6c6]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">Idioma</h2>
          <p className="text-neutral-600">Escolha o idioma de sua preferência</p>
        </div>
      </div>

      <div className="space-y-4">
        {languages.map((language) => (
          <button
            key={language.id}
            onClick={() => handleLanguageChange(language.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
              settings.language === language.id
                ? 'bg-[#B2FFFF] text-[#36c6c6]'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </div>
            {settings.language === language.id && (
              <Check className="h-5 w-5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}