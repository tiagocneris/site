import React, { useState } from 'react';
import { Check } from 'lucide-react';

const languages = [
  { id: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'es', name: 'Español', flag: '🇪🇸' }
];

export default function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');

  return (
    <div className="space-y-4">
      {languages.map((language) => (
        <button
          key={language.id}
          onClick={() => setSelectedLanguage(language.id)}
          className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
            selectedLanguage === language.id
              ? 'bg-[#B2FFFF] text-[#36c6c6]'
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{language.flag}</span>
            <span className="font-medium">{language.name}</span>
          </div>
          {selectedLanguage === language.id && (
            <Check className="h-5 w-5" />
          )}
        </button>
      ))}
    </div>
  );
}