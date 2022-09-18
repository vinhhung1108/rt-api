import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://raotin:7621119@localhost:27017/rt-api'),
    AuthModule,
    UsersModule,
    PostModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
