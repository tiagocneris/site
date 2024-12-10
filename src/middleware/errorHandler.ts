import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({
          error: 'Unique constraint violation',
          message: 'A record with this value already exists'
        });
      case 'P2025':
        return res.status(404).json({
          error: 'Record not found',
          message: 'The requested record does not exist'
        });
      default:
        return res.status(500).json({
          error: 'Database error',
          message: 'An unexpected database error occurred'
        });
    }
  }

  console.error(error);
  return res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
}