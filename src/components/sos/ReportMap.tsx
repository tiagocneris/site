import React from 'react';
import { MapPin } from 'lucide-react';

interface Report {
  id: string;
  type: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: string;
}

interface ReportMapProps {
  reports: Report[];
  loading: boolean;
}

export default function ReportMap({ reports, loading }: ReportMapProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Andamento';
      case 'resolved':
        return 'Resolvido';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36c6c6]" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">
          Mapa de Ocorrências
        </h2>
        
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="bg-[#B2FFFF] p-2 rounded-full">
                <MapPin className="h-5 w-5 text-[#36c6c6]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-neutral-800">
                      {report.location.address}
                    </p>
                    <p className="text-sm text-neutral-600 mt-1">
                      Lat: {report.location.lat.toFixed(6)}, Lng: {report.location.lng.toFixed(6)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {reports.length === 0 && (
            <div className="text-center py-8">
              <p className="text-neutral-600">Nenhuma ocorrência registrada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}