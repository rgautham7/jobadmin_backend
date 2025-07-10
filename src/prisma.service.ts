// prisma.service.ts (Safe for serverless)
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
