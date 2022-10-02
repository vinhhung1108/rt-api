import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiConfigService } from './api-config-service';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import configuration from './config/configuration';
import { validate } from './env.validation';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { ProvinceModule } from './province/province.module';

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
    ProvinceModule,
  ],

  // controllers: [AppController],
  providers: [
    // Register JwtAuthGuard as a global guard, put in any module
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
    ApiConfigService,
  ],
})
export class AppModule {}
