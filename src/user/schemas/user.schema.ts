import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/enum/role.enum';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  // autoIndex: false, //By default of mongoose is 'true', change to 'false' in production
  // autoCreate: false, //By default of mongoose is 'true', change to 'false in production
})
export class User {
  @Prop({ type: Number, unique: true })
  userId: number;

  @Prop({ type: String, unique: true })
  readonly username: string;

  @Prop()
  readonly password: string;

  @Prop({ unique: true })
  readonly email: string;

  @Prop({ default: ['default'] })
  readonly roles: Role[];

  @Prop()
  readonly listingPost: string[];

  @Prop()
  createdBy: Types.ObjectId;

  @Prop()
  updatedBy: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
