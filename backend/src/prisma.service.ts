import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
      throw new Error(
        'MONGODB_URI is required to connect the backend to MongoDB',
      );
    }

    super({
      datasources: {
        db: {
          url: mongodbUri,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
