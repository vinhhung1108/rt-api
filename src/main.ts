import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as moment from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  moment.tz.setDefault('Asia/Ho_Chi_Minh');

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

  await app.listen(port);
}
bootstrap();
