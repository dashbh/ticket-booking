import { Controller, All, Req, Res, Next, Get } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProxyService } from './proxy.service';
import { MetricsService } from './metric.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService,
    private readonly metricsService: MetricsService
    ) { }

  @All('*')
  handleRequest(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (req.path.startsWith('/metrics')) {
      // Handle non-proxy routes here
      next();
    } else {
      const proxyHandler = this.proxyService.handleRequest(req.path);
      if (proxyHandler) {
        proxyHandler(req, res, next);
        this.metricsService.incrProxyCounter('success');
      } else {
        res.status(404).send('Route not found');
        this.metricsService.incrProxyCounter('failed');
      }
    }
  }
}
