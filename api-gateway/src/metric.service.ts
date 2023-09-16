import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly bookingCounter: Counter<string>;
  private readonly authCounter: Counter<string>;

  constructor() {
    this.bookingCounter = new Counter({
      name: 'booking_calls',
      help: 'Number of calls to booking svc',
      labelNames: ['status'],
    });
    register.registerMetric(this.bookingCounter);

    this.authCounter = new Counter({
        name: 'auth_calls',
        help: 'Number of calls to auth svc',
        labelNames: ['status'],
      });
    register.registerMetric(this.bookingCounter);
  }

  incrAuthCounter(status: 'success' | 'failed') {
    this.authCounter.labels(status).inc();
  }

  incrBookingCounter(status: 'success' | 'failed') {
    this.bookingCounter.labels(status).inc();
  }
}
