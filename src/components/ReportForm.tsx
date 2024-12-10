import React, { useState } from 'react';
import { X, Camera, MapPin, AlertTriangle } from 'lucide-react';

interface ReportFormProps {
  onClose: () => void;
}

const reportTypes = [
  "Maus-tratos",
  "Animal abandonado",
  "Animal ferido",
  "Condições insalubres",
  "Outros"
];

export default function ReportForm({ onClose }: ReportFormProps) {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Denúncia Registrada!</h3>
              <p className="text-gray-600">
                Sua denúncia foi registrada com sucesso. As autoridades competentes serão notificadas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Registrar Denúncia</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Ocorrência
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  required
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                >
                  <option value="">Selecione o tipo</option>
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  placeholder="Descreva a situação em detalhes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    placeholder="Endereço da ocorrência"
                  />
                  <button
                    type="button"
                    className="p-2 rounded-lg border border-gray-300 hover:border-accent-500 hover:text-accent-600"
                  >
                    <MapPin className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidências
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-accent-500 transition-colors">
                  <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Clique para adicionar fotos ou arraste os arquivos
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-500 text-white py-3 px-6 rounded-full hover:bg-accent-600 transition-colors"
              >
                Enviar Denúncia
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}