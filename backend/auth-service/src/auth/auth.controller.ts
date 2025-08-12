import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')                // POST /auth/register
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')                   // POST /auth/login
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
