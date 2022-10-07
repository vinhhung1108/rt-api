import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Ward extends Document {
  @Prop()
  name: string;

  @Prop()
  code: number;

  @Prop()
  codename: string;

  @Prop()
  division_type: string;

  @Prop()
  short_codename: string;
}
