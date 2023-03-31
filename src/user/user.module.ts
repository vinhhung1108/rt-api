import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CaslModule } from 'src/casl/casl.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async () => {
          const schema = UserSchema;
          return schema;
        },
      },
    ]),
    CaslModule,
  ],
  providers: [UserService, CaslAbilityFactory],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
