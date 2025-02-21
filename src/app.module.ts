import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import Constants from './constants';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RedisModule } from './modules/redis/redis.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    AuthenticationModule,
    UsersModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: Constants.jwtSecret,
      signOptions: { expiresIn: '15m', algorithm: 'HS256' },
    }),
    RedisModule.register(),
  ],
})
export class AppModule {}
