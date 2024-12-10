import React, { useState } from 'react';
import { Shield, Lock, Smartphone, AlertTriangle } from 'lucide-react';

export default function SecuritySettings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FAForm, setShow2FAForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-[#B2FFFF]">
          <Shield className="h-6 w-6 text-[#36c6c6]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-neutral-800">Configurações de Segurança</h2>
          <p className="text-neutral-600">Mantenha sua conta protegida</p>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <Lock className="h-6 w-6 text-[#36c6c6]" />
          <div>
            <h3 className="font-medium text-neutral-800">Alterar Senha</h3>
            <p className="text-sm text-neutral-600">Atualize sua senha periodicamente</p>
          </div>
        </div>
        {showPasswordForm ? (
          <form className="space-y-4 mt-4">
            <input
              type="password"
              placeholder="Senha atual"
              className="input-primary"
            />
            <input
              type="password"
              placeholder="Nova senha"
              className="input-primary"
            />
            <input
              type="password"
              placeholder="Confirme a nova senha"
              className="input-primary"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#36c6c6] text-white px-4 py-2 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
              >
                Salvar Nova Senha
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="w-full bg-[#36c6c6] text-white px-4 py-2 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
          >
            Alterar Senha
          </button>
        )}
      </div>

      {/* 2FA Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <Smartphone className="h-6 w-6 text-[#36c6c6]" />
          <div>
            <h3 className="font-medium text-neutral-800">Autenticação em Duas Etapas</h3>
            <p className="text-sm text-neutral-600">Adicione uma camada extra de segurança</p>
          </div>
        </div>
        <button
          onClick={() => setShow2FAForm(true)}
          className="w-full border-2 border-[#36c6c6] text-[#36c6c6] px-4 py-2 rounded-full hover:bg-[#B2FFFF] transition-colors"
        >
          Ativar
        </button>
      </div>

      {/* Delete Account Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <div>
            <h3 className="font-medium text-neutral-800">Excluir Conta</h3>
            <p className="text-sm text-neutral-600">Esta ação não pode ser desfeita</p>
          </div>
        </div>
        <button className="w-full border-2 border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition-colors">
          Excluir Minha Conta
        </button>
      </div>
    </div>
  );
}