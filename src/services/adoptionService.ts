import { prisma } from '../lib/prisma';
import { mediaService } from './mediaService';

export const adoptionService = {
  async createAdoptionFair(data: {
    ongId: string;
    name: string;
    date: Date;
    time: string;
    location: string;
    address: string;
    description: string;
    imageUrl: string;
  }) {
    return prisma.adoptionFair.create({
      data: {
        ...data,
        status: 'PENDING'
      }
    });
  },

  async getAdoptionFairs(filters?: {
    status?: string;
    date?: Date;
    location?: string;
  }) {
    return prisma.adoptionFair.findMany({
      where: {
        ...filters,
        status: filters?.status || 'APPROVED'
      },
      include: {
        ong: true,
        animals: true
      },
      orderBy: {
        date: 'asc'
      }
    });
  },

  async getAdoptionFairById(id: string) {
    return prisma.adoptionFair.findUnique({
      where: { id },
      include: {
        ong: true,
        animals: true
      }
    });
  },

  async updateAdoptionFair(id: string, data: any) {
    return prisma.adoptionFair.update({
      where: { id },
      data
    });
  },

  async deleteAdoptionFair(id: string) {
    const fair = await prisma.adoptionFair.findUnique({
      where: { id },
      include: { animals: true }
    });

    if (fair?.imageUrl) {
      await mediaService.deleteMedia(fair.imageUrl);
    }

    return prisma.adoptionFair.delete({
      where: { id }
    });
  }
};