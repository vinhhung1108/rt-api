import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  readonly userId: string;

  @Prop()
  readonly username: string;

  @Prop()
  readonly password: string;

  @Prop()
  readonly email: string;

  @Prop()
  readonly roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
