import { isEmpty, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
