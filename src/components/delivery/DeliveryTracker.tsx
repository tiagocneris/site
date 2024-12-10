import React, { useEffect, useState } from 'react';
import { Package, MapPin, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import DeliveryMap from './DeliveryMap';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DeliveryTrackerProps {
  deliveryId: string;
}

interface DeliveryInfo {
  id: string;
  status: string;
  pickup_location: {
    lat: number;
    lng: number;
    address: string;
  };
  delivery_location: {
    lat: number;
    lng: number;
    address: string;
  };
  estimated_delivery_time: string;
  tracking_history: Array<{
    timestamp: string;
    location: {
      lat: number;
      lng: number;
    };
    status: string;
  }>;
  delivery_partner: {
    name: string;
    vehicle_type: string;
    license_plate: string;
  };
}

export default function DeliveryTracker({ deliveryId }: DeliveryTrackerProps) {
  const [delivery, setDelivery] = useState<DeliveryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('deliveries')
          .select(`
            *,
            delivery_partner:delivery_partners(
              user:users(name),
              vehicle_type,
              license_plate
            )
          `)
          .eq('id', deliveryId)
          .single();

        if (fetchError) throw fetchError;
        setDelivery(data);
      } catch (err) {
        console.error('Error fetching delivery:', err);
        setError('Failed to load delivery information');
      } finally {
        setLoading(false);
      }
    };

    fetchDelivery();

    // Subscribe to real-time updates
    const subscription = supabase
      .from(`deliveries:id=eq.${deliveryId}`)
      .on('UPDATE', (payload) => {
        setDelivery(current => ({
          ...current!,
          ...payload.new
        }));
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [deliveryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36c6c6]" />
      </div>
    );
  }

  if (error || !delivery) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Delivery not found'}</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      ASSIGNED: 'bg-blue-100 text-blue-800',
      PICKED_UP: 'bg-purple-100 text-purple-800',
      IN_TRANSIT: 'bg-[#B2FFFF] text-[#36c6c6]',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Delivery Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-[#36c6c6]" />
            <div>
              <h2 className="text-lg font-semibold text-neutral-800">
                Status da Entrega
              </h2>
              <p className="text-neutral-600">
                Pedido #{deliveryId.slice(0, 8)}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(delivery.status)}`}>
            {delivery.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-neutral-600 mb-2">
              Entregador
            </p>
            <div className="space-y-2">
              <p className="text-neutral-800">{delivery.delivery_partner.name}</p>
              <p className="text-sm text-neutral-600">
                {delivery.delivery_partner.vehicle_type === 'moto' ? 'Motocicleta' : 'Carro'} - 
                Placa: {delivery.delivery_partner.license_plate}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-600 mb-2">
              Previsão de Entrega
            </p>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#36c6c6]" />
              <span className="text-neutral-800">
                {format(new Date(delivery.estimated_delivery_time), "HH:mm 'de' dd 'de' MMMM", {
                  locale: ptBR
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Map */}
      <DeliveryMap
        deliveryId={deliveryId}
        pickupLocation={delivery.pickup_location}
        deliveryLocation={delivery.delivery_location}
      />

      {/* Tracking History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">
          Histórico de Rastreamento
        </h3>
        <div className="space-y-6">
          {delivery.tracking_history.map((update, index) => (
            <div key={index} className="relative">
              {index !== delivery.tracking_history.length - 1 && (
                <div
                  className="absolute left-6 top-10 h-full w-0.5 bg-gray-200"
                />
              )}
              <div className="flex gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === delivery.tracking_history.length - 1
                      ? 'bg-[#36c6c6] text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-800">
                    {update.status}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {format(new Date(update.timestamp), "dd/MM/yyyy 'às' HH:mm", {
                      locale: ptBR
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}