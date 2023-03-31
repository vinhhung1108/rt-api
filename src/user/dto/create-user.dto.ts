import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  // userId: string;

  @IsString()
  readonly username: string;

  @IsString()
  password: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly roles: string[];

  @IsOptional()
  readonly isCreateAble: boolean;
}
