import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  // userId: string;
  @IsString()
  private username: string;

  @IsString()
  private password: string;

  @IsEmail()
  private email: string;

  @IsOptional()
  private roles: string[];
}
