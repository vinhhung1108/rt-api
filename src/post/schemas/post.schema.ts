import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema({
  timestamps: true,
  autoIndex: false,
})
export class Post {
  @Prop({ index: true, unique: true })
  postId: number;

  @Prop()
  readonly title: string;

  @Prop()
  readonly content: string;

  @Prop()
  readonly category: string;

  @Prop(
    raw({
      name: { type: String },
      houseNumberAndStreetName: { type: String },
      ward: { type: String },
      district: { type: String },
      city: { type: String },
      province: { type: String },
      country: { type: String },
    }),
  )
  readonly address: Record<string, any>;

  @Prop()
  createdBy: Types.ObjectId;

  @Prop()
  updatedBy: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
