import { IsNotEmpty, IsMobilePhone } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;
}

export class UserResponseDto {
  username: string;
  fullName: string;
  phone: string;
  createdAt: Date;
}

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
