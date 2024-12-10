import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const appointments = [
  {
    id: 1,
    service: 'Consulta Veterinária',
    provider: 'Pet Care Plus',
    date: '15/04/2024',
    time: '14:30',
    status: 'Confirmado',
    location: 'Rua das Flores, 123 - São Paulo, SP'
  },
  {
    id: 2,
    service: 'Banho & Tosa',
    provider: 'Pet Shop Feliz',
    date: '20/04/2024',
    time: '10:00',
    status: 'Pendente',
    location: 'Av. Paulista, 1000 - São Paulo, SP'
  }
];

export default function AppointmentsSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Agendamentos</h2>
        <button className="text-primary-600 hover:text-primary-700 font-medium">
          Novo Agendamento
        </button>
      </div>

      <div className="space-y-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{appointment.service}</h3>
                <p className="text-gray-600">{appointment.provider}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                appointment.status === 'Confirmado'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {appointment.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>{appointment.date}</span>
                <Clock className="h-5 w-5 ml-4" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{appointment.location}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors">
                Ver Detalhes
              </button>
              <button className="flex-1 border-2 border-primary-500 text-primary-600 px-4 py-2 rounded-full hover:bg-primary-50 transition-colors">
                Reagendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}