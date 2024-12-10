import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export const subscribeToPlan = async (planId: string, billingCycle: 'monthly' | 'yearly') => {
  try {
    const response = await api.post('/subscriptions', { planId, billingCycle });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to plan:', error);
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const response = await api.delete(`/subscriptions/${subscriptionId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

export const updateSubscription = async (subscriptionId: string, planId: string) => {
  try {
    const response = await api.put(`/subscriptions/${subscriptionId}`, { planId });
    return response.data;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};