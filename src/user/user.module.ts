import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Connection } from 'mongoose';
// import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async (connection: Connection) => {
          const schema = UserSchema;
          // const AutoIncrement = AutoIncrementFactory(connection);
          // schema.plugin(AutoIncrement, { inc_field: 'userId' });
          return schema;
        },
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
