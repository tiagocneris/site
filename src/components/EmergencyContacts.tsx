import React from 'react';
import { Phone, Shield, Stethoscope } from 'lucide-react';

const emergencyContacts = [
  {
    icon: Shield,
    title: "Polícia Ambiental",
    phone: "0800-123-4567",
    description: "Para denúncias de maus-tratos e crimes ambientais"
  },
  {
    icon: Stethoscope,
    title: "Veterinário 24h",
    phone: "(11) 99999-9999",
    description: "Atendimento veterinário emergencial"
  },
  {
    icon: Phone,
    title: "Central de Resgate",
    phone: "(11) 98888-8888",
    description: "Resgate de animais em situação de risco"
  }
];

export default function EmergencyContacts() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contatos de Emergência</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Em casos de emergência, entre em contato com os números abaixo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-md transition-all duration-300"
            >
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <contact.icon className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.title}</h3>
              <a
                href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                className="text-2xl font-bold text-accent-600 mb-4 block hover:text-accent-700"
              >
                {contact.phone}
              </a>
              <p className="text-gray-600">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}