import React from 'react';
import { DollarSign, Gift, Truck } from 'lucide-react';

const donationTypes = [
  {
    icon: DollarSign,
    title: "Doação Financeira",
    description: "Ajude com qualquer valor para custear tratamentos e cuidados"
  },
  {
    icon: Gift,
    title: "Doação de Itens",
    description: "Doe ração, medicamentos, cobertores e outros itens necessários"
  },
  {
    icon: Truck,
    title: "Transporte Solidário",
    description: "Ajude no transporte de animais resgatados ou doações"
  }
];

export default function DonationSection() {
  return (
    <section className="bg-primary-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Você Pode Ajudar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Existem várias maneiras de fazer a diferença na vida dos animais. Escolha como você quer ajudar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {donationTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <type.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
              <p className="text-gray-600 mb-6">{type.description}</p>
              <button className="w-full bg-primary-500 text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors">
                Quero Ajudar
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Todas as doações são direcionadas diretamente para as ONGs cadastradas em nossa plataforma.
            Você receberá atualizações sobre como sua ajuda está fazendo a diferença.
          </p>
        </div>
      </div>
    </section>
  );
}