import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyHeader() {
  return (
    <div className="text-center mb-12">
      <div className="w-16 h-16 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-6">
        <Shield className="h-8 w-8 text-[#36c6c6]" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Política de Privacidade da Love&Connection Pet Center
      </h1>
      <p className="text-gray-600">
        Última atualização: 10 de dezembro de 2024
      </p>
    </div>
  );
}