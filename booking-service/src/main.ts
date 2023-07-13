import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { BookingModule } from './booking.module';

async function bootstrap() {
  const app = await NestFactory.create(BookingModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
}
bootstrap();
