import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export const processPayment = async (paymentData: any) => {
  try {
    const response = await api.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};