import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Role } from 'src/utils/enums/Role';

export class createUserDto {
  // @IsNotEmpty()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class updateUserDto {
  name?: string;

  @IsEmail()
  email?: string;

  password?: string;

  role?: string = Role.USER;
}
