import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { MetricsService } from './metric.service';

@Module({
  imports: [
    PrometheusModule.register({
      defaultLabels: {
        app: 'api-gateway',
      },
    }),
  ],
  controllers: [ProxyController],
  providers: [ProxyService, MetricsService],
})
export class ProxyModule {}
