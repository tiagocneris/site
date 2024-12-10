import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create default roles
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin',
        password: 'admin123', // In production, use hashed passwords
        role: 'ADMIN',
        settings: {
          create: {
            notifications: true,
            emailUpdates: true,
            language: 'pt-BR',
            theme: 'light',
            privacyEnabled: true
          }
        }
      }
    });

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();