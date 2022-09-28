import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  private username: string;

  @IsOptional()
  @IsString()
  private password: string;

  @IsOptional()
  @IsEmail()
  private email: string;

  @IsOptional()
  private roles: string[];
}
