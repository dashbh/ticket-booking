import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';

async function bootstrap() {
  const app = await NestFactory.create(ProxyModule, { bodyParser: false });
  await app.listen(9000);
}
bootstrap();
