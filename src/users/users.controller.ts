import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserData } from 'src/decorators/user-data.decorator';
import { JwtPayloadDto } from 'src/authentication/dto/jwt-payload.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('my')
  @UseGuards(AuthGuard)
  async getMyProfile(@UserData() { user_id }: JwtPayloadDto) {
    return this.service.getProfile(+user_id);
  }
}
