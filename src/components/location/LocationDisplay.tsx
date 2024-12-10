import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationDisplayProps {
  address: string;
  searchRadius: number;
  onRadiusChange: (radius: number) => void;
}

export default function LocationDisplay({
  address,
  searchRadius,
  onRadiusChange
}: LocationDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="h-5 w-5 text-[#36c6c6]" />
        <div>
          <p className="font-medium text-neutral-800">Sua Localização</p>
          <p className="text-sm text-neutral-600">{address}</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-600">
          Raio de Busca: {searchRadius}km
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={searchRadius}
          onChange={(e) => onRadiusChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#36c6c6]"
        />
        <div className="flex justify-between text-sm text-neutral-600">
          <span>1km</span>
          <span>50km</span>
        </div>
      </div>
    </div>
  );
}