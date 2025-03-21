import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApiExceptionsFilter } from './exception-filters/api-exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalFilters(new ApiExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
