import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { District } from './district.schema';

export type ProvinceDocument = Province & Document;

@Schema()
export class Province {
  @Prop()
  name: string;

  @Prop()
  code: number;

  @Prop()
  codename: string;

  @Prop()
  division_type: string;

  @Prop()
  phone_code: string;

  @Prop([District])
  districts: District[];
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
