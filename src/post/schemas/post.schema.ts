import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ _id: false })
export class Address {
  @Prop()
  provinceId: string;

  @Prop()
  districtId: number;

  @Prop()
  wardId: number;

  @Prop()
  text: string;
}

@Schema({
  timestamps: true,
  autoIndex: false,
})
export class Post {
  @Prop({ index: true, unique: true })
  postId: number;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  category: string;

  @Prop({ type: Address })
  address: Address;

  @Prop({ type: [String], required: false, default: undefined })
  photos: string[];

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isSold: boolean;

  @Prop()
  createdBy: Types.ObjectId;

  @Prop()
  updatedBy: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
