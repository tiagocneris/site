import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export default function SuccessModal({ isOpen, onClose, planName }: SuccessModalProps) {
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
            Assinatura Confirmada!
          </h2>
          
          <p className="text-neutral-600 mb-8">
            Parabéns! Você agora tem acesso ao plano {planName}. Aproveite todos os benefícios disponíveis.
          </p>

          <div className="flex gap-4">
            <Link
              to="/account"
              className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
            >
              Ir para Minha Conta
            </Link>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-[#36c6c6] text-[#36c6c6] px-6 py-3 rounded-full hover:bg-[#B2FFFF] transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}