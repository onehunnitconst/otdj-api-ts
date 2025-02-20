import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/authentication/modules/prisma/prisma.service';
import { UserProfileDto } from './dto/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return UserProfileDto.fromModel(user);
  }
}
