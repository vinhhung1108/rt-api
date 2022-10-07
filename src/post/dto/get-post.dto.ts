import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { AdditionalPostInfo } from './additional-post.dto';
import { CreatePostDto } from './create-post.dto';

export class GetPostInfo extends PartialType(
  IntersectionType(CreatePostDto, AdditionalPostInfo),
) {}
