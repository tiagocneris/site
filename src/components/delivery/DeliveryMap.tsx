import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '../../lib/supabase';

interface DeliveryMapProps {
  deliveryId: string;
  pickupLocation: {
    lat: number;
    lng: number;
  };
  deliveryLocation: {
    lat: number;
    lng: number;
  };
}

export default function DeliveryMap({
  deliveryId,
  pickupLocation,
  deliveryLocation
}: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places']
        });

        const { Map, Marker, DirectionsService, DirectionsRenderer } = await loader.importLibrary('maps');

        if (!mapRef.current) return;

        // Initialize map
        const map = new Map(mapRef.current, {
          center: pickupLocation,
          zoom: 15,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        mapInstanceRef.current = map;

        // Create delivery partner marker
        const marker = new Marker({
          map,
          position: pickupLocation,
          icon: {
            url: '/delivery-marker.png',
            scaledSize: new google.maps.Size(40, 40)
          }
        });

        markerRef.current = marker;

        // Initialize directions renderer
        const directionsRenderer = new DirectionsRenderer({
          map,
          suppressMarkers: true
        });

        directionsRendererRef.current = directionsRenderer;

        // Calculate and display route
        const directionsService = new DirectionsService();
        const result = await directionsService.route({
          origin: pickupLocation,
          destination: deliveryLocation,
          travelMode: google.maps.TravelMode.DRIVING
        });

        directionsRenderer.setDirections(result);

        // Subscribe to real-time updates
        const subscription = supabase
          .from(`deliveries:id=eq.${deliveryId}`)
          .on('UPDATE', (payload) => {
            const { tracking_history } = payload.new;
            if (tracking_history?.length > 0) {
              const lastUpdate = tracking_history[tracking_history.length - 1];
              const newPosition = new google.maps.LatLng(
                lastUpdate.location.lat,
                lastUpdate.location.lng
              );
              
              marker.setPosition(newPosition);
              map.panTo(newPosition);
            }
          })
          .subscribe();

        setLoading(false);

        return () => {
          subscription.unsubscribe();
          if (mapInstanceRef.current) {
            mapInstanceRef.current = null;
          }
          if (markerRef.current) {
            markerRef.current.setMap(null);
            markerRef.current = null;
          }
          if (directionsRendererRef.current) {
            directionsRendererRef.current.setMap(null);
            directionsRendererRef.current = null;
          }
        };
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map');
        setLoading(false);
      }
    };

    initMap();
  }, [deliveryId, pickupLocation, deliveryLocation]);

  if (loading) {
    return (
      <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#36c6c6]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="h-96 w-full rounded-xl overflow-hidden shadow-sm"
    />
  );
}