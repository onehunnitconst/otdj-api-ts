import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.service.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.service.register(body);
  }
}
