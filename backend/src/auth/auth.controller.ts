import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { Public } from './decorator/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }

  @Post('register')
  async register(@Body() registerBody: RegisterRequestDto) {
    return await this.authService.register(registerBody);
  }
}
