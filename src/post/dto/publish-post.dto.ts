import { IsBoolean } from 'class-validator';

export class PublishPostDto {
  @IsBoolean()
  readonly isPublish: boolean;
}
