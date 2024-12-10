import { prisma } from '../lib/prisma';
import type { Order, OrderItem } from '@prisma/client';

export const orderService = {
  async createOrder(data: {
    userId: string;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  }) {
    return prisma.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        items: {
          create: data.items
        }
      },
      include: {
        items: true
      }
    });
  },

  async updateOrderStatus(id: string, status: Order['status']) {
    return prisma.order.update({
      where: { id },
      data: { status }
    });
  },

  async getUserOrders(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
};