import "reflect-metadata"
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Express } from 'express';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(json({ limit: '10gb' }));
  app.use(urlencoded({ extended: true, limit: '10gb' }));

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
  );

  app.enableCors({
    origin: `http://${configService.get('HOST')}:${configService.get(
      'FRONTEND_PORT',
      )}`,
      credentials: true,
    });

    const conf = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('The zboui')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, conf);
    SwaggerModule.setup('api', app, document);

  app.use(cookieParser());

  const port = configService.get('BACKEND_PORT');
  await app.listen(port);
}
bootstrap();