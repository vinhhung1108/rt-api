import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IS_PUBLIC_KEY } from 'src/custom.decorator';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class PostModule {}
