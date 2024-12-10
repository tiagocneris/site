import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places']
});

export async function getAddressFromCoords(lat: number, lng: number): Promise<string> {
  const { Geocoder } = await loader.importLibrary('geocoding');
  const geocoder = new Geocoder();
  
  try {
    const response = await geocoder.geocode({
      location: { lat, lng }
    });

    if (response.results[0]) {
      return response.results[0].formatted_address;
    }
    
    throw new Error('No results found');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

export async function getCoordsFromAddress(address: string): Promise<{ lat: number; lng: number }> {
  const { Geocoder } = await loader.importLibrary('geocoding');
  const geocoder = new Geocoder();
  
  try {
    const response = await geocoder.geocode({ address });
    
    if (response.results[0]) {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat: lat(), lng: lng() };
    }
    
    throw new Error('No results found');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}