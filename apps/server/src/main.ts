import { join } from 'path';

import {
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { environment } from '@server/env/environment';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  const port = process.env.PORT || 3000;

  if (environment.appPrefix) app.setGlobalPrefix(environment.appPrefix);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(environment?.appName || 'LMS')
    .setVersion(environment?.appVersion || '1.0')
    .addServer(environment.appUrl)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useStaticAssets(join(__dirname, 'public'));
  app.setBaseViewsDir(join(__dirname, 'assets', 'views'));
  app.setViewEngine('hbs');

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${environment.appPrefix ? environment.appPrefix : ''}`
  );
}

bootstrap();
