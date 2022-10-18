import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop()
  name: string;

  @Prop()
  value: string;

  @Prop()
  description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
