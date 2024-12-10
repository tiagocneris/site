import React from 'react';
import { TrendingUp, Heart, Zap, Users } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Mercado em Expansão',
    description: 'O mercado pet cresce constantemente, com projeções otimistas para os próximos anos.'
  },
  {
    icon: Heart,
    title: 'Impacto Social',
    description: 'Contribua para melhorar a vida dos animais e fortalecer a comunidade pet.'
  },
  {
    icon: Zap,
    title: 'Inovação Tecnológica',
    description: 'Plataforma moderna que une tecnologia e cuidado animal.'
  },
  {
    icon: Users,
    title: 'Modelo Sustentável',
    description: 'Receitas recorrentes e múltiplas fontes de monetização.'
  }
];

export default function InvestorBenefits() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Por Que Investir?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mb-4">
              <benefit.icon className="h-6 w-6 text-[#36c6c6]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}