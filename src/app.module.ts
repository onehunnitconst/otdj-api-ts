import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import Constants from './constants';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './authentication/modules/prisma/prisma.module';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: Constants.jwtSecret,
      signOptions: { expiresIn: '15m', algorithm: 'HS256' },
    }),
  ],
})
export class AppModule {}
