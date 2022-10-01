import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema({
  timestamps: true,
  // autoIndex: false,
})
export class Post {
  @Prop({ unique: true })
  postId: number;

  @Prop()
  readonly title: string;

  @Prop()
  readonly content: string;

  @Prop()
  readonly category: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
