import React from 'react';
import { MapPin, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Report {
  id: string;
  type: string;
  description: string;
  location: {
    address: string;
  };
  status: string;
  created_at: string;
  images: string[];
  reporter_name?: string;
}

interface ReportListProps {
  reports: Report[];
  loading: boolean;
}

export default function ReportList({ reports, loading }: ReportListProps) {
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

  const getTypeText = (type: string) => {
    switch (type) {
      case 'abuse':
        return 'Maus-tratos';
      case 'abandonment':
        return 'Animal Abandonado';
      case 'injury':
        return 'Animal Ferido';
      default:
        return 'Outros';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36c6c6]" />
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">Nenhuma denúncia encontrada.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
        >
          {report.images[0] && (
            <div className="h-48 relative">
              <img
                src={report.images[0]}
                alt={getTypeText(report.type)}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                  {getStatusText(report.status)}
                </span>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold text-neutral-800">
                {getTypeText(report.type)}
              </h3>
            </div>

            <p className="text-neutral-600 mb-4 line-clamp-2">
              {report.description}
            </p>

            <div className="flex items-center justify-between text-sm text-neutral-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{report.location.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  {format(new Date(report.created_at), "dd 'de' MMMM", {
                    locale: ptBR
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}