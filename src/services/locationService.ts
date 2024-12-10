import axios from 'axios';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface NearbyItem {
  id: string;
  distance: number;
}

export const locationService = {
  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  },

  async getAddressFromCoords(lat: number, lng: number): Promise<string> {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      return response.data.results[0]?.formatted_address || '';
    } catch (error) {
      console.error('Error getting address:', error);
      throw error;
    }
  },

  async getNearbyItems(location: Location, radius: number): Promise<NearbyItem[]> {
    try {
      const response = await axios.get('/api/nearby', {
        params: {
          lat: location.lat,
          lng: location.lng,
          radius
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting nearby items:', error);
      throw error;
    }
  }
};