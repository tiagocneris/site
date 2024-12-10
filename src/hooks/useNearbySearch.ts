import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface NearbyItem {
  id: string;
  name: string;
  type: 'product' | 'service';
  latitude: number;
  longitude: number;
  distance: number;
}

interface UseNearbySearchProps {
  latitude: number | null;
  longitude: number | null;
  radius: number; // in kilometers
  type?: 'product' | 'service';
}

export function useNearbySearch({ latitude, longitude, radius, type }: UseNearbySearchProps) {
  const [items, setItems] = useState<NearbyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNearbyItems = async () => {
      if (!latitude || !longitude) return;

      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('items')
          .select('*')
          .rpc('nearby_items', {
            lat: latitude,
            lng: longitude,
            radius_km: radius
          });

        if (type) {
          query = query.eq('type', type);
        }

        const { data, error: queryError } = await query;

        if (queryError) throw queryError;

        setItems(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch nearby items');
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyItems();
  }, [latitude, longitude, radius, type]);

  return { items, loading, error };
}