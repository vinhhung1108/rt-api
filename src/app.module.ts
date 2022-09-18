import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://raotin:7621119@localhost:27017/rt-api'),
    AuthModule,
    UserModule,
    PostModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
