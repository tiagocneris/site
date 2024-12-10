import React, { useState } from 'react';
import { Lock, Shield, AlertTriangle } from 'lucide-react';
import { updatePassword, enable2FA } from '../../utils/api/userService';

export default function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      await updatePassword('user123', currentPassword, newPassword);
      setShowPasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleToggle2FA = async () => {
    try {
      await enable2FA('user123');
      setTwoFactorEnabled(!twoFactorEnabled);
    } catch (error) {
      console.error('Error toggling 2FA:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Password Change */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-[#B2FFFF]">
            <Lock className="h-6 w-6 text-[#36c6c6]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-800">Alterar Senha</h3>
            <p className="text-neutral-600">Mantenha sua conta segura com uma senha forte</p>
          </div>
        </div>

        {showPasswordForm ? (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
            <input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
            <input
              type="password"
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              required
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#36c6c6] text-white px-4 py-2 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
              >
                Salvar Nova Senha
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="flex-1 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
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

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-[#B2FFFF]">
            <Shield className="h-6 w-6 text-[#36c6c6]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-800">
              Autenticação em Duas Etapas
            </h3>
            <p className="text-neutral-600">
              Adicione uma camada extra de segurança à sua conta
            </p>
          </div>
        </div>
        <button
          onClick={handleToggle2FA}
          className={`w-full px-4 py-2 rounded-full transition-colors ${
            twoFactorEnabled
              ? 'bg-gray-100 text-neutral-600 hover:bg-gray-200'
              : 'bg-[#36c6c6] text-white hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
          }`}
        >
          {twoFactorEnabled ? 'Desativar' : 'Ativar'} Autenticação em Duas Etapas
        </button>
      </div>

      {/* Delete Account */}
      <div className="bg-red-50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-white">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-800">Excluir Conta</h3>
            <p className="text-neutral-600">
              Essa ação não pode ser desfeita
            </p>
          </div>
        </div>
        <button className="w-full border-2 border-red-600 text-red-600 px-4 py-2 rounded-full hover:bg-red-50 transition-colors">
          Excluir Minha Conta
        </button>
      </div>
    </div>
  );
}