import { prisma } from '../lib/prisma';
import { storageService } from './storageService';

export const mediaService = {
  async createMedia(data: {
    userId: string;
    type: 'image' | 'document' | 'video';
    url: string;
    title?: string;
    description?: string;
  }) {
    return prisma.media.create({
      data
    });
  },

  async getUserMedia(userId: string) {
    return prisma.media.findMany({
      where: { userId }
    });
  },

  async deleteMedia(id: string) {
    const media = await prisma.media.findUnique({
      where: { id }
    });

    if (media) {
      await storageService.deleteFile(media.url);
      await prisma.media.delete({
        where: { id }
      });
    }
  }
};