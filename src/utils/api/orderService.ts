import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export const createOrder = async (orderData: any) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderStatus = async (orderId: string) => {
  try {
    const response = await api.get(`/orders/${orderId}/status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order status:', error);
    throw error;
  }
};