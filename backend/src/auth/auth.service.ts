import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createUserDto } from 'src/crud-dtos/userDto';
import { UserService } from 'src/user/user.service';
import { RegisterRequestDto } from './auth-dto/register-request.dto';
import { User } from 'generated/prisma/client';
import { LoginRequestDto } from './auth-dto/login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.getUserByEmail(
      email.toLowerCase().trim(),
    );
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid username or password');
    }
    return user;
  }

  async login(dto: LoginRequestDto) {
    const existingUser = await this.validateUser(dto.email, dto.password);
    const payload = { email: dto.email, id: existingUser.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(userDto: RegisterRequestDto) {
    const existingUser = await this.userService.getUserByEmail(
      userDto.email.toLowerCase().trim(),
    );

    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = {
      name: userDto.name.trim(),
      email: userDto.email.toLowerCase().trim(),
      password: hashedPassword,
    };
    const createdUser = await this.userService.createUser(newUser);
    return {
      accessToken: this.jwtService.sign({
        email: createdUser.email,
        id: createdUser.id,
      }),
    };
  }
}
