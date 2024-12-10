import { prisma } from '../lib/prisma';
import type { DeliveryPartner } from '@prisma/client';

export const deliveryService = {
  async createDeliveryPartner(data: {
    userId: string;
    cpf: string;
    vehicleType: string;
    licensePlate: string;
    documents: string;
  }) {
    return prisma.deliveryPartner.create({
      data
    });
  },

  async updateDeliveryStatus(id: string, status: string) {
    return prisma.deliveryPartner.update({
      where: { id },
      data: { status }
    });
  },

  async getDeliveryPartner(userId: string) {
    return prisma.deliveryPartner.findUnique({
      where: { userId },
      include: {
        user: true
      }
    });
  }
};