import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, Package, Download, MessageCircle,
  FileText, Mail 
} from 'lucide-react';
import OrderList from '../components/merchant/OrderList';
import OrderFilters from '../components/merchant/OrderFilters';
import OrderStats from '../components/merchant/OrderStats';
import ExportModal from '../components/merchant/ExportModal';
import MessageModal from '../components/merchant/MessageModal';

export default function OrderManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  const handleMessageCustomer = (customerId: string) => {
    setSelectedCustomer(customerId);
    setShowMessageModal(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/merchant"
              className="flex items-center gap-2 text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para Perfil</span>
            </Link>
            <img 
              src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
              alt="Love&Connection Logo" 
              className="h-[68px] w-auto"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Actions */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-800">Gerenciamento de Pedidos</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#36c6c6] text-white hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Exportar Pedidos</span>
            </button>
            <button
              onClick={() => setShowMessageModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#36c6c6] text-[#36c6c6] hover:bg-[#B2FFFF] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Enviar Mensagem</span>
            </button>
          </div>
        </div>

        {/* Order Statistics */}
        <OrderStats />

        {/* Search and Filters */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar pedidos por número ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#36c6c6] focus:ring-2 focus:ring-[#B2FFFF] focus:ring-opacity-50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <OrderFilters selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
        </div>

        {/* Orders List */}
        <OrderList 
          searchTerm={searchTerm} 
          statusFilter={selectedStatus}
          onMessageCustomer={handleMessageCustomer}
        />

        {/* Export Modal */}
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
        />

        {/* Message Modal */}
        <MessageModal
          isOpen={showMessageModal}
          onClose={() => {
            setShowMessageModal(false);
            setSelectedCustomer(null);
          }}
          customerId={selectedCustomer}
        />

        {/* Quick Links */}
        <div className="mt-12 flex justify-center gap-8 text-neutral-600">
          <Link
            to="/"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/merchant"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Perfil do Comerciante
          </Link>
          <Link
            to="/help"
            className="hover:text-[#36c6c6] transition-colors"
          >
            Ajuda
          </Link>
        </div>
      </div>
    </div>
  );
}