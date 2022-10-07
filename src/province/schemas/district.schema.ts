import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ward } from './ward.schema';

@Schema({ _id: false })
export class District extends Document {
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

  @Prop()
  wards: Ward[];
}
