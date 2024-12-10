import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
}

export default function MessageModal({ isOpen, onClose, customerId }: MessageModalProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    // Here you would implement the actual message sending logic
    console.log('Sending message:', { customerId, subject, message });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-neutral-800">Enviar Mensagem</h2>
            <p className="text-neutral-600">
              {customerId 
                ? 'Enviar mensagem para o cliente selecionado'
                : 'Enviar mensagem em massa para clientes'}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Assunto
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                placeholder="Digite o assunto da mensagem"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Mensagem
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
                placeholder="Digite sua mensagem aqui..."
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              <span>Enviar Mensagem</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}