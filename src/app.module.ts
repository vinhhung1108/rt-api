import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiConfigService } from './api-config-service';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { validate } from './env.validation';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      // isGlobal: true,
      expandVariables: true,
      load: [configuration],
      cache: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostModule,
  ],
  // controllers: [AppController],
  providers: [AppService, ApiConfigService],
})
export class AppModule {}
