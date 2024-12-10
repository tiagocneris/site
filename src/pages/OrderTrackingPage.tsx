import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TrackingSearch from '../components/tracking/TrackingSearch';
import TrackingTimeline from '../components/tracking/TrackingTimeline';
import DeliveryInfo from '../components/tracking/DeliveryInfo';

interface TrackingStep {
  status: string;
  date: string;
  location: string;
  description: string;
  completed: boolean;
}

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [showTracking, setShowTracking] = useState(false);

  // Example tracking data - in a real app, this would come from an API
  const trackingSteps: TrackingStep[] = [
    {
      status: 'Pedido Confirmado',
      date: '12/04/2024 - 14:30',
      location: 'São Paulo, SP',
      description: 'Seu pedido foi recebido e está sendo processado',
      completed: true
    },
    {
      status: 'Em Separação',
      date: '13/04/2024 - 09:15',
      location: 'Centro de Distribuição',
      description: 'Produtos estão sendo separados para envio',
      completed: true
    },
    {
      status: 'Em Trânsito',
      date: '13/04/2024 - 16:45',
      location: 'Em rota de entrega',
      description: 'Seu pedido está a caminho do destino',
      completed: false
    },
    {
      status: 'Entregue',
      date: 'Previsto para 15/04/2024',
      location: 'Endereço de entrega',
      description: 'Pedido será entregue no endereço cadastrado',
      completed: false
    }
  ];

  const deliveryInfo = {
    address: {
      street: 'Rua Exemplo, 123',
      neighborhood: 'Bairro',
      city: 'Cidade',
      state: 'SP',
      zipCode: '00000-000'
    },
    shipping: {
      method: 'Entrega Expressa',
      estimatedTime: '2-3 dias úteis'
    }
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTracking(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar para Home</span>
            </Link>
            <Link to="/">
              <img 
                src="https://storage.googleapis.com/imagensapp/modelo%20novo-Photoroom%20(1).png" 
                alt="Love&Connection Logo" 
                className="h-[68px] w-auto"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TrackingSearch
          orderNumber={orderNumber}
          onOrderNumberChange={setOrderNumber}
          onSubmit={handleTrackOrder}
        />

        {showTracking && (
          <div>
            <TrackingTimeline orderNumber={orderNumber} steps={trackingSteps} />
            <DeliveryInfo address={deliveryInfo.address} shipping={deliveryInfo.shipping} />
          </div>
        )}
      </div>
    </div>
  );
}