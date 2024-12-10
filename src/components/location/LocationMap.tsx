import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useLocationStore } from '../../store/locationStore';

interface LocationMapProps {
  items: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
  }>;
  onMarkerClick?: (id: string) => void;
}

export default function LocationMap({ items, onMarkerClick }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { currentLocation, searchRadius } = useLocationStore();

  useEffect(() => {
    if (!currentLocation || !mapRef.current) return;

    // Here you would initialize your map with the Google Maps API
    // For now, we'll show a placeholder
  }, [currentLocation, items]);

  if (!currentLocation) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div
        ref={mapRef}
        className="w-full h-[400px] bg-gray-100 flex items-center justify-center"
      >
        <div className="text-center text-gray-500">
          <MapPin className="h-8 w-8 mx-auto mb-2" />
          <p>Mapa será carregado aqui</p>
          <p className="text-sm">Mostrando {items.length} locais próximos</p>
        </div>
      </div>
    </div>
  );
}