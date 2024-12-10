import React from 'react';
import { Phone, Shield, Stethoscope } from 'lucide-react';

const emergencyContacts = [
  {
    id: 1,
    icon: Shield,
    title: "Polícia Ambiental",
    phone: "0800-123-4567",
    description: "Para denúncias de maus-tratos e crimes ambientais"
  },
  {
    id: 2,
    icon: Stethoscope,
    title: "Veterinário 24h",
    phone: "(11) 99999-9999",
    description: "Atendimento veterinário emergencial"
  },
  {
    id: 3,
    icon: Phone,
    title: "Central de Resgate",
    phone: "(11) 98888-8888",
    description: "Resgate de animais em situação de risco"
  }
];

export default function EmergencyContacts() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Contatos de Emergência</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {emergencyContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="bg-[#B2FFFF] w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <contact.icon className="h-8 w-8 text-[#36c6c6]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.title}</h3>
            <a
              href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
              className="text-2xl font-bold text-[#36c6c6] mb-4 block hover:text-[#B2FFFF]"
            >
              {contact.phone}
            </a>
            <p className="text-gray-600">{contact.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}