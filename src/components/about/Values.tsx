import React from 'react';
import { Heart, Users, Lightbulb, Shield, Eye } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Amor e Respeito pelos Animais',
    description: 'Cada funcionalidade e parceria é pensada com foco no bem-estar animal.'
  },
  {
    icon: Users,
    title: 'Conexão e Comunidade',
    description: 'Acreditamos na força da união entre pessoas e organizações para cuidar dos pets.'
  },
  {
    icon: Lightbulb,
    title: 'Inovação',
    description: 'Investimos em tecnologia para oferecer experiências fáceis e acessíveis aos usuários.'
  },
  {
    icon: Shield,
    title: 'Responsabilidade Social',
    description: 'Incentivamos a adoção, o cuidado ético e a denúncia de maus-tratos, porque cada animal merece uma vida digna.'
  },
  {
    icon: Eye,
    title: 'Transparência',
    description: 'Valorizamos a confiança e a clareza em nossas relações com usuários, parceiros e colaboradores.'
  }
];

export default function Values() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Nossos Valores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#B2FFFF] rounded-full flex items-center justify-center mb-4">
              <value.icon className="h-6 w-6 text-[#36c6c6]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}