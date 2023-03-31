import { IsEmail, IsString } from 'class-validator';

export class SignUpUserDto {
  // userId: string;

  @IsString()
  readonly username: string;

  @IsString()
  password: string;

  @IsEmail()
  readonly email: string;
}
