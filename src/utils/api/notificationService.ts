import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export const sendOrderConfirmation = async (orderId: string, email: string) => {
  try {
    await api.post('/notifications/order-confirmation', { orderId, email });
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    throw error;
  }
};