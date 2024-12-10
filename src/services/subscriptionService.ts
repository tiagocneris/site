import { prisma } from '../lib/prisma';
import type { Subscription } from '@prisma/client';

export const subscriptionService = {
  async createSubscription(data: {
    userId: string;
    planId: string;
    endDate?: Date;
  }) {
    return prisma.subscription.create({
      data
    });
  },

  async updateSubscriptionStatus(id: string, status: Subscription['status']) {
    return prisma.subscription.update({
      where: { id },
      data: { status }
    });
  },

  async getUserSubscription(userId: string) {
    return prisma.subscription.findUnique({
      where: { userId }
    });
  }
};