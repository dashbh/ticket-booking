import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly proxyCounter: Counter<string>;

  constructor() {
    this.proxyCounter = new Counter({
        name: 'proxy_requests',
        help: 'Number of calls to api_gateway svc',
        labelNames: ['status'],
      });
    register.registerMetric(this.proxyCounter);
  }

  incrProxyCounter(status: 'success' | 'failed') {
    this.proxyCounter.labels(status).inc();
  }
}
