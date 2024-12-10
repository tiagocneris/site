import React from 'react';
import { Target, Eye } from 'lucide-react';

export default function MissionVision() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mb-4">
          <Target className="h-6 w-6 text-[#36c6c6]" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Nossa Missão</h2>
        <p className="text-gray-600">
          Promover o cuidado responsável e o bem-estar animal, oferecendo uma plataforma acessível 
          e completa para conectar tutores, profissionais e organizações que compartilham do mesmo 
          propósito: melhorar a qualidade de vida dos pets e de suas famílias.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mb-4">
          <Eye className="h-6 w-6 text-[#36c6c6]" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Nossa Visão</h2>
        <p className="text-gray-600">
          Tornar-se a principal referência no mercado de serviços e produtos para animais de estimação, 
          liderando a transformação digital do setor com soluções inovadoras, práticas e humanizadas.
        </p>
      </div>
    </div>
  );
}