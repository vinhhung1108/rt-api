import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Province, ProvinceSchema } from './schemas/province.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Province.name,
        useFactory: async () => {
          const schema = ProvinceSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports: [ProvinceService],
})
export class ProvinceModule {}
