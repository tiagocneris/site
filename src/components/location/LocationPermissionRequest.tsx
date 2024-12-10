import React from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';

interface LocationPermissionRequestProps {
  onRequestPermission: () => void;
  onSkip: () => void;
  error?: string | null;
}

export default function LocationPermissionRequest({
  onRequestPermission,
  onSkip,
  error
}: LocationPermissionRequestProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-8 w-8 text-[#36c6c6]" />
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">
            Permitir Acesso à Localização
          </h2>
          
          <p className="text-neutral-600 mb-8">
            Para mostrar produtos e serviços próximos a você, precisamos acessar sua localização.
          </p>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg mb-6 text-red-600">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onRequestPermission}
              className="flex-1 bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
            >
              Permitir
            </button>
            <button
              onClick={onSkip}
              className="flex-1 border-2 border-[#36c6c6] text-[#36c6c6] px-6 py-3 rounded-full hover:bg-[#B2FFFF] transition-colors"
            >
              Agora Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}