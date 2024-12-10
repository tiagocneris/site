import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showChat, setShowChat] = useState(false);
  const phoneNumber = '5511970388009';
  const message = encodeURIComponent('Olá! Gostaria de saber mais sobre o Love&Connection.');

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors z-50"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {showChat && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-xl z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold text-neutral-800">Chat</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-gray-100 rounded-2xl px-4 py-2">
              <p className="text-neutral-800">
                Olá! Como posso ajudar você hoje?
              </p>
            </div>
            
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Continuar no WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}