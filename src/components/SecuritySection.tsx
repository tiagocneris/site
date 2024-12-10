import React, { useState } from 'react';
import { Lock, Shield, AlertTriangle } from 'lucide-react';

export default function SecuritySection() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Segurança</h2>
      </div>

      <div className="space-y-8">
        {/* Password Change */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-primary-100">
              <Lock className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Alterar Senha</h3>
              <p className="text-gray-600">Atualize sua senha periodicamente para maior segurança</p>
            </div>
          </div>
          <button className="w-full bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors">
            Alterar Senha
          </button>
        </div>

        {/* Two Factor Authentication */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-secondary-100">
              <Shield className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Autenticação em Duas Etapas</h3>
              <p className="text-gray-600">Adicione uma camada extra de segurança à sua conta</p>
            </div>
          </div>
          <button className="w-full border-2 border-secondary-500 text-secondary-600 px-4 py-2 rounded-full hover:bg-secondary-50 transition-colors">
            Ativar
          </button>
        </div>

        {/* Delete Account */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Excluir Conta</h3>
              <p className="text-gray-600">Essa ação não pode ser desfeita</p>
            </div>
          </div>
          {showDeleteConfirm ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Tem certeza que deseja excluir sua conta? Todos os seus dados serão permanentemente removidos.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
                  Confirmar Exclusão
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full border-2 border-red-500 text-red-600 px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
            >
              Excluir Conta
            </button>
          )}
        </div>
      </div>
    </div>
  );
}