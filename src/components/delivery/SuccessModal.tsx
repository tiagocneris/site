import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-[#36c6c6]" />
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">
            Cadastro Realizado com Sucesso!
          </h2>
          
          <p className="text-neutral-600 mb-8">
            Seu cadastro foi recebido e está em análise. Em breve entraremos em contato
            por email com mais informações.
          </p>

          <button
            onClick={onClose}
            className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
}