import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000'
});

export const addressService = {
  async getAddressByCep(cep: string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
  }
};

export const paymentService = {
  async processPayment(paymentData: any) {
    try {
      const response = await api.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }
};

export const orderService = {
  async createOrder(orderData: any) {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getOrderStatus(orderId: string) {
    try {
      const response = await api.get(`/orders/${orderId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw error;
    }
  }
};

export const notificationService = {
  async sendOrderConfirmation(orderId: string, email: string) {
    try {
      await api.post('/notifications/order-confirmation', { orderId, email });
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      throw error;
    }
  }
};