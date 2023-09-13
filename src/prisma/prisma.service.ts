import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public async onModuleInit(): Promise<void> {
    return await this.$connect();
  }

  public async enableShutdownHooks(app: INestApplication): Promise<void> {
    let event_type: never
    
    return this.$on(event_type, async () => {
      await app.close();
    });
  }
}