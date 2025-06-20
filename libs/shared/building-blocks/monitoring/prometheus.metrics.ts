import { INestApplication } from '@nestjs/common';
import { Registry, collectDefaultMetrics } from 'prom-client';
import { Controller, Get } from '@nestjs/common';

export class PrometheusMetrics {
  static registerMetricsEndpoint(app: INestApplication) {
    const registry = new Registry();
    collectDefaultMetrics({ register: registry });

    @Controller('metrics')
    class MetricsController {
      @Get()
      async getMetrics() {
        return registry.metrics();
      }
    }

    // app.useGlobalControllers([MetricsController]);
  }
}
