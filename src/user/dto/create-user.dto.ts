import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/enum/roles.enum';

export class CreateUserDto {
  // userId: string;

  @IsString()
  readonly username: string;

  @IsString()
  password: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly roles: Role[];

  @IsOptional()
  readonly isCreateAble: boolean;

  @IsOptional()
  readonly isActive: boolean;

  @IsOptional()
  readonly isLoggedIn: boolean;
}
