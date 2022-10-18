import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role, RoleSchema } from './schemas/role.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Role.name,
        useFactory: async () => {
          const schema = RoleSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
