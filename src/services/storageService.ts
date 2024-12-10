import axios from 'axios';
import { prisma } from '../lib/prisma';

export const storageService = {
  async uploadFile(file: File, type: 'image' | 'document' | 'video') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data.url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  async deleteFile(fileUrl: string) {
    try {
      await axios.delete(`/api/upload?url=${encodeURIComponent(fileUrl)}`);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};