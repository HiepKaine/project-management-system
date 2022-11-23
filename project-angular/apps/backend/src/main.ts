/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { environment } from 'libs/shared/backend/common/src/environments/environment';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // cấp phép tài nguyên
  app.enableCors();

  const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
  .setTitle(environment?.appName || 'Management-System')
  .setVersion(environment?.appVersion || '1.0')
  .addServer(environment.appUrl)
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${environment.appPrefix ? environment.appPrefix : ''}`
  );
}

bootstrap();
