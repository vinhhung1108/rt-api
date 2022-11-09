import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      // forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.enableCors();
  // app.use(csurf());
  await app.listen(port);
}
bootstrap();
