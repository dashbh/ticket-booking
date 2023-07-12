import { Injectable, Logger } from '@nestjs/common';
import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { proxyConfig } from './proxy-config';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly proxyMiddlewares: Record<string, RequestHandler> = {};

  constructor() {
    this.setupProxyMiddlewares();
  }

  private setupProxyMiddlewares(): void {
    for (const route of proxyConfig) {
      const proxyMiddleware = createProxyMiddleware(route.path, {
        target: route.target,
        changeOrigin: true,
      });
      console.log(route.path, {
        target: route.target,
        changeOrigin: true,
      });

      this.proxyMiddlewares[route.path] = proxyMiddleware;
    }
  }

  handleRequest(path: string): RequestHandler | null {
    const proxyMiddleware = this.proxyMiddlewares[path];

    if (proxyMiddleware) {
      this.logger.log(`Proxying request: ${path}`);
      return proxyMiddleware;
    }

    this.logger.error(`Route not found for request: ${path}`);
    return null;
  }
}
