import "reflect-metadata"
import { ValidationPipe } from 'aaaaa/@nestjs/common/pipes';
import { NestFactory } from 'aaaaa/@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
