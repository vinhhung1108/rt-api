import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CaslModule } from 'src/casl/casl.module';
import { ProvinceModule } from 'src/province/province.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ProvinceModule,
    CaslModule,
  ],
  controllers: [PostController],
  providers: [PostService, CaslAbilityFactory],
})
export class PostModule {}
