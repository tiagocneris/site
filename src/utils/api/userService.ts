import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
});

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const updatePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  try {
    const response = await api.put(`/users/${userId}/password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const enable2FA = async (userId: string) => {
  try {
    const response = await api.post(`/users/${userId}/2fa/enable`);
    return response.data;
  } catch (error) {
    console.error('Error enabling 2FA:', error);
    throw error;
  }
};

export const uploadProfilePicture = async (userId: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append('picture', file);
    
    const response = await api.post(`/users/${userId}/picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};