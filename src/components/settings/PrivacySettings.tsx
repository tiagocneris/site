import React, { useState } from 'react';
import { Eye, Lock, Share2, Database, Trash2, History, Bell } from 'lucide-react';

const privacySettings = [
  {
    id: 'profile',
    icon: Eye,
    title: 'Visibilidade do Perfil',
    description: 'Quem pode ver seu perfil e atividades',
    options: ['Todos', 'Apenas Amigos', 'Privado'],
    current: 'Todos'
  },
  {
    id: 'history',
    icon: History,
    title: 'Histórico e Recomendações',
    description: 'Salvar histórico para personalizar recomendações',
    enabled: true,
    details: [
      'Histórico de Compras',
      'Histórico de Adoções',
      'Produtos Visualizados',
      'Preferências de Busca'
    ]
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Comunicações',
    description: 'Gerenciar comunicações e notificações',
    options: ['Email', 'SMS', 'Push'],
    selected: ['Email', 'Push']
  },
  {
    id: 'data',
    icon: Database,
    title: 'Dados de Navegação',
    description: 'Coleta de dados para melhorar a experiência',
    enabled: true
  },
  {
    id: 'sharing',
    icon: Share2,
    title: 'Compartilhamento',
    description: 'Permitir compartilhamento de atividades',
    enabled: false
  }
];

export default function PrivacySettings() {
  const [settings, setSettings] = useState(privacySettings);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updateSetting = (id: string, value: any) => {
    setSettings(settings.map(setting =>
      setting.id === id
        ? { ...setting, ...(typeof value === 'boolean' ? { enabled: value } : { current: value }) }
        : setting
    ));
  };

  const toggleNotification = (id: string, option: string) => {
    setSettings(settings.map(setting =>
      setting.id === id
        ? {
            ...setting,
            selected: setting.selected.includes(option)
              ? setting.selected.filter(item => item !== option)
              : [...setting.selected, option]
          }
        : setting
    ));
  };

  return (
    <div className="space-y-8">
      {/* Privacy Settings */}
      <div className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="p-6 rounded-xl bg-gray-50">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-full bg-white">
                <setting.icon className="h-5 w-5 text-[#36c6c6]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-neutral-800">{setting.title}</h3>
                <p className="text-sm text-neutral-600">{setting.description}</p>
              </div>
            </div>

            {'options' in setting && !('selected' in setting) ? (
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
            ) : 'selected' in setting ? (
              <div className="space-y-2">
                {setting.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center justify-between p-2 rounded-lg bg-white"
                  >
                    <span className="text-neutral-600">{option}</span>
                    <button
                      onClick={() => toggleNotification(setting.id, option)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.selected.includes(option) ? 'bg-[#36c6c6]' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.selected.includes(option) ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            ) : 'details' in setting ? (
              <div className="space-y-2">
                <button
                  onClick={() => updateSetting(setting.id, !setting.enabled)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg ${
                    setting.enabled ? 'bg-[#B2FFFF] text-[#36c6c6]' : 'bg-white text-neutral-600'
                  }`}
                >
                  <span>Ativar Todos</span>
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.enabled ? 'bg-[#36c6c6]' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </button>
                <div className="mt-2 pl-4 space-y-1">
                  {setting.details.map((detail, index) => (
                    <p key={index} className="text-sm text-neutral-600">• {detail}</p>
                  ))}
                </div>
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

      {/* Account Deletion */}
      <div className="border-t border-gray-200 pt-8">
        <div className="bg-red-50 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-full bg-white">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-neutral-800">Excluir Conta</h3>
              <p className="text-sm text-neutral-600">
                Ao excluir sua conta, todos os seus dados serão permanentemente removidos
              </p>
            </div>
          </div>

          {showDeleteConfirm ? (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Esta ação não pode ser desfeita. Todos os seus dados pessoais, histórico de compras
                e informações de perfil serão permanentemente excluídos.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-white text-neutral-600 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                >
                  Confirmar Exclusão
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full border-2 border-red-600 text-red-600 px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
            >
              Excluir Minha Conta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}