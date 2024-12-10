import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AdoptionFair {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  image_url: string;
  ong: {
    name: string;
    id: string;
  };
  animals_count: number;
}

interface AdoptionFairListProps {
  searchTerm: string;
  dateFilter: string;
  locationFilter: {
    latitude: number | null;
    longitude: number | null;
    radius: number;
  };
}

export default function AdoptionFairList({
  searchTerm,
  dateFilter,
  locationFilter
}: AdoptionFairListProps) {
  const [fairs, setFairs] = useState<AdoptionFair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFairs = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('adoption_fairs')
          .select(`
            *,
            ong:users(id, name),
            animals_count:animals(count)
          `)
          .eq('status', 'APPROVED')
          .order('date', { ascending: true });

        if (searchTerm) {
          query = query.or(`
            name.ilike.%${searchTerm}%,
            location.ilike.%${searchTerm}%,
            ong.name.ilike.%${searchTerm}%
          `);
        }

        if (dateFilter) {
          query = query.eq('date', dateFilter);
        }

        if (locationFilter.latitude && locationFilter.longitude) {
          query = query.rpc('nearby_fairs', {
            lat: locationFilter.latitude,
            lng: locationFilter.longitude,
            radius_km: locationFilter.radius
          });
        }

        const { data, error: queryError } = await query;

        if (queryError) throw queryError;
        setFairs(data || []);
      } catch (err) {
        setError('Failed to load adoption fairs');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFairs();
  }, [searchTerm, dateFilter, locationFilter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36c6c6]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (fairs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">Nenhuma feira de adoção encontrada.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fairs.map((fair) => (
        <div
          key={fair.id}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
        >
          <div className="relative h-48">
            <img
              src={fair.image_url || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80'}
              alt={fair.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">{fair.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-neutral-600">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(fair.date), "dd 'de' MMMM", { locale: ptBR })}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>{fair.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-neutral-600">
                <MapPin className="h-4 w-4" />
                <span>{fair.location}</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-600">
                <Users className="h-4 w-4" />
                <span>ONG {fair.ong.name}</span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
              {fair.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#36c6c6]">
                {fair.animals_count} pets para adoção
              </span>
              <button className="bg-[#36c6c6] text-white px-4 py-2 rounded-full hover:bg-[#B2FFFF] hover:text-[#36c6c6] transition-colors">
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}