import React from 'react';
import { PieChart, Shield, LineChart, Target } from 'lucide-react';

const offerings = [
  {
    icon: PieChart,
    title: 'Participação no Projeto',
    description: 'Torne-se sócio de uma empresa inovadora no mercado pet.'
  },
  {
    icon: Shield,
    title: 'Retorno Escalável',
    description: 'Modelo de negócio com alto potencial de crescimento.'
  },
  {
    icon: LineChart,
    title: 'Acompanhamento de Resultados',
    description: 'Relatórios detalhados e transparência total.'
  },
  {
    icon: Target,
    title: 'Impacto Social',
    description: 'Contribua para transformar o setor pet no Brasil.'
  }
];

export default function InvestorOfferings() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        O Que Oferecemos aos Investidores
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offerings.map((offering, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center flex-shrink-0">
              <offering.icon className="h-6 w-6 text-[#36c6c6]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{offering.title}</h3>
              <p className="text-gray-600">{offering.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}