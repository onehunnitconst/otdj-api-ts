import { DynamicModule, Logger, Module } from '@nestjs/common';
import { createClient } from 'redis';
import Constants from '../../../constants';
import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  private static logger = new Logger(RedisModule.name);

  static register(): DynamicModule {
    const client = createClient({
      url: `redis://${Constants.redisHost}:${Constants.redisPort}`,
    });

    const RedisClientProvider = {
      provide: 'REDIS_CLIENT',
      useFactory: async () =>
        client.on('error', (err) => this.logger.error(err)).connect(),
    };

    return {
      global: true,
      module: RedisModule,
      providers: [RedisClientProvider, RedisService],
      exports: [RedisService],
    };
  }
}
