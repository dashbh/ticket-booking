import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';
const promClient = require('prom-client');

async function bootstrap() {
  const app = await NestFactory.create(ProxyModule, { bodyParser: false });
  promClient.collectDefaultMetrics();
  await app.listen(9000);
}
bootstrap();
