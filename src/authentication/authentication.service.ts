import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './modules/prisma/prisma.service';
import * as argon2 from 'argon2';
import { RedisService } from './modules/redis/redis.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private redis: RedisService,
  ) {}

  async login(body: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        user_id: body.user_id,
      },
    });

    if (!user) {
      throw new NotFoundException('가입된 사용자가 아닙니다.');
    }

    const verified = await argon2.verify(user.password, body.password);

    if (!verified) {
      throw new NotFoundException('비밀번호가 일치하지 않습니다.');
    }

    const token = await this.jwtService.signAsync({
      user_id: user.id,
    });

    await this.redis.client.set(`token:${user.id}`, token, { EX: 15 });

    return { token };
  }

  async register(body: RegisterDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        user_id: body.user_id,
      },
    });

    if (!!user) {
      throw new BadRequestException('이미 가입된 아이디입니다.');
    }

    const hashedPassword = await argon2.hash(body.password);

    await this.prisma.$transaction([
      this.prisma.user.create({
        data: {
          user_id: body.user_id,
          password: hashedPassword,
          nickname: body.nickname,
        },
      }),
    ]);
  }
}
