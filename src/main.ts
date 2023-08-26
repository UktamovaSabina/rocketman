import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(resolve('uploads')))
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  const config = new DocumentBuilder()
    .setTitle('Rocketman')
    .setDescription('The Rocaketman API description')
    .setVersion('1.0')
    .addTag('Rocketman')
    .addBearerAuth( {
      description: 'Default JWT Authorization',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'defaultBearerAuth',)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
