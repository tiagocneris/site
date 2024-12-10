import React from 'react';
import { Calendar, ShoppingBag, Users } from 'lucide-react';

const categories = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Serviços",
    description: "Agende consultas veterinárias, banho & tosa e muito mais com profissionais qualificados.",
    action: "Agendar Agora",
    bgImage: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80"
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: "Produtos",
    description: "Encontre rações premium, brinquedos, acessórios e tudo que seu pet precisa.",
    action: "Comprar",
    bgImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Comunidade",
    description: "Conecte-se com outros tutores, compartilhe experiências e faça amizades.",
    action: "Participar",
    bgImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
  }
];

export default function Highlights() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tudo que seu pet precisa em um só lugar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra um mundo de possibilidades para você e seu companheiro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
              
              <div className="relative p-8 h-96 flex flex-col justify-end text-white">
                <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="bg-primary-500 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-primary-100 mb-6">{category.description}</p>
                </div>
                
                <button className="w-full bg-white text-primary-600 py-3 px-6 rounded-full 
                  transform transition-all duration-300 
                  hover:bg-primary-50 hover:shadow-lg hover:-translate-y-1
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50">
                  {category.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}