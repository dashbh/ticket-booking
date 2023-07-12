import { Controller, All, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*')
  handleRequest(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const proxyHandler = this.proxyService.handleRequest(req.path);
    if (proxyHandler) {
      proxyHandler(req, res, next);
    } else {
      res.status(404).send('Route not found');
    }
  }
}
