import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly value: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
