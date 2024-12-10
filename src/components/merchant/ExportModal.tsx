import React, { useState } from 'react';
import { X, FileText, Download } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [format, setFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('last30');
  const [status, setStatus] = useState('all');

  if (!isOpen) return null;

  const handleExport = () => {
    // Here you would implement the actual export logic
    console.log('Exporting with settings:', { format, dateRange, status });
    onClose();
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

          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-[#B2FFFF]">
                <FileText className="h-6 w-6 text-[#36c6c6]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-800">Exportar Pedidos</h2>
                <p className="text-neutral-600">Selecione as opções de exportação</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Formato
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'pdf', label: 'PDF' },
                  { value: 'excel', label: 'Excel' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormat(option.value)}
                    className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                      format === option.value
                        ? 'bg-[#36c6c6] text-white'
                        : 'bg-gray-50 text-neutral-600 hover:bg-[#B2FFFF] hover:text-[#36c6c6]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Período
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              >
                <option value="last7">Últimos 7 dias</option>
                <option value="last30">Últimos 30 dias</option>
                <option value="last90">Últimos 90 dias</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-2">
                Status dos Pedidos
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
              >
                <option value="all">Todos os Status</option>
                <option value="pending">Pendentes</option>
                <option value="processing">Em Processamento</option>
                <option value="shipped">Enviados</option>
                <option value="delivered">Entregues</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="w-full bg-[#36c6c6] text-white px-6 py-3 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              <span>Exportar Relatório</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}