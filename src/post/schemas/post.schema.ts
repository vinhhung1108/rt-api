import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  readonly title: string;

  @Prop()
  readonly content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
