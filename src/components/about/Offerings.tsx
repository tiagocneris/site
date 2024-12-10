import React from 'react';
import { PawPrint, Briefcase, Heart } from 'lucide-react';

const offerings = [
  {
    icon: PawPrint,
    title: 'Para Tutores de Pets',
    description: 'Produtos, serviços, SOS Pet e feiras de adoção disponíveis a poucos cliques.'
  },
  {
    icon: Briefcase,
    title: 'Para Profissionais e Negócios',
    description: 'Ferramentas para divulgar serviços, vender produtos e atrair clientes na sua região.'
  },
  {
    icon: Heart,
    title: 'Para ONGs',
    description: 'Espaço dedicado para arrecadar doações, organizar adoções e promover a conscientização sobre o cuidado animal.'
  }
];

export default function Offerings() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">O Que Oferecemos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offerings.map((offering, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mb-4">
              <offering.icon className="h-6 w-6 text-[#36c6c6]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{offering.title}</h3>
            <p className="text-gray-600">{offering.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}