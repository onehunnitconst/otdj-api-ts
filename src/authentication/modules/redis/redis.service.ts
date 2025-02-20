import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  get client() {
    return this.redisClient;
  }
}
