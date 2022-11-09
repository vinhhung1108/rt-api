import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ApiConfigService } from './api-config-service';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { CaslModule } from './casl/casl.module';
import configuration from './config/configuration';
import { validate } from './env.validation';
import { PostModule } from './post/post.module';
import { ProvinceModule } from './province/province.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
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
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ttl: config.get<number>('throttle.ttl'),
        limit: config.get<number>('throttle.limit'),
      }),
    }),
    AuthModule,
    UserModule,
    PostModule,
    ProvinceModule,
    RoleModule,
    CaslModule,
  ],

  // controllers: [AppController],
  providers: [
    // Register JwtAuthGuard as a global guard, put in any module
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    //Apply role guard global
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
    ApiConfigService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
