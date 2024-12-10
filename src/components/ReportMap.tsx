import React from 'react';
import { MapPin } from 'lucide-react';

const reports = [
  {
    id: 1,
    type: "Animal abandonado",
    location: "Parque do Ibirapuera",
    status: "Em andamento",
    date: "Há 2 horas"
  },
  {
    id: 2,
    type: "Animal ferido",
    location: "Av. Paulista",
    status: "Resgatado",
    date: "Há 4 horas"
  },
  {
    id: 3,
    type: "Maus-tratos",
    location: "Vila Madalena",
    status: "Pendente",
    date: "Há 6 horas"
  }
];

export default function ReportMap() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mapa de Ocorrências</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualize denúncias recentes em sua região e acompanhe o status
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-96 bg-gray-100 relative">
            {/* Map placeholder - In a real application, integrate with a mapping service */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Mapa será carregado aqui</p>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ocorrências Recentes</h3>
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="bg-accent-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-accent-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{report.type}</h4>
                        <p className="text-sm text-gray-500">{report.location}</p>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        report.status === 'Resgatado'
                          ? 'bg-green-100 text-green-700'
                          : report.status === 'Em andamento'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{report.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}