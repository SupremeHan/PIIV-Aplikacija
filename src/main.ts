import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { StorageConfig } from 'config/storage config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(StorageConfig.photo.destination,{
    prefix: StorageConfig.photo.urlPrefix,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    index: false,
  })

  app.enableCors();
  
  await app.listen(3003);
}
bootstrap();
