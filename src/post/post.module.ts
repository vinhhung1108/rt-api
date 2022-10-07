import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProvinceModule } from 'src/province/province.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ProvinceModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
