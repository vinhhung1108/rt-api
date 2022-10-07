import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  readonly provinceId: string;

  @IsOptional()
  @IsNumber()
  readonly districtId: number;

  @IsOptional()
  @IsNumber()
  readonly wardId: number;
}

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly category: string;

  @IsOptional()
  readonly address: CreateAddressDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly photos: string[];
}
