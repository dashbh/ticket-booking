import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(UserModule, {
//     transport: Transport.TCP,
//   });
//   app.listen();
// }

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(3000);
}

bootstrap();
