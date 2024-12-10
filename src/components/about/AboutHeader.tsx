import React from 'react';
import { Heart } from 'lucide-react';

export default function AboutHeader() {
  return (
    <div className="text-center mb-12">
      <div className="w-16 h-16 bg-[#B2FFFF] rounded-full flex items-center justify-center mx-auto mb-6">
        <Heart className="h-8 w-8 text-[#36c6c6]" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Sobre Nós - Love&Connection Pet Center
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Conectando pessoas, serviços e organizações dedicadas ao bem-estar dos pets
      </p>
    </div>
  );
}