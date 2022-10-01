import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly category: string;
}
