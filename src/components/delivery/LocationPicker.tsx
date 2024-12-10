import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real implementation, you would initialize a map here
    // using Google Maps or another mapping service
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: 'Localização atual' // In real app, use reverse geocoding
            };
            onLocationSelect(location);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    };

    getCurrentLocation();
  }, [onLocationSelect]);

  return (
    <div className="space-y-4">
      <div
        ref={mapRef}
        className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center"
      >
        <div className="text-center text-gray-500">
          <MapPin className="h-8 w-8 mx-auto mb-2" />
          <p>Mapa será carregado aqui</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const location = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  address: 'Localização atual'
                };
                onLocationSelect(location);
              }
            );
          }
        }}
        className="w-full bg-[#36c6c6] text-white px-4 py-2 rounded-lg hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors"
      >
        Usar Minha Localização Atual
      </button>
    </div>
  );
}