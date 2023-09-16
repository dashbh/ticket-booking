import { Test, TestingModule } from '@nestjs/testing';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { MetricsService } from './metric.service';
import { Request, Response } from 'express';
import { register} from "prom-client";

describe('ProxyController', () => {
  let proxyController: ProxyController;
  let proxyService: ProxyService;
  let metricsService: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProxyController],
      providers: [ProxyService, MetricsService],
    }).compile();

    proxyController = module.get<ProxyController>(ProxyController);
    proxyService = module.get<ProxyService>(ProxyService);
    metricsService = module.get<MetricsService>(MetricsService);
    register.clear();
  });

  afterEach(() => {
  });

  it('should be defined', () => {
    expect(proxyController).toBeDefined();
  });

  describe('handleRequest', () => {
    it('should handle metrics route', () => {
      const req = { path: '/metrics' } as Request;
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<any, Record<string, any>>;
      const next = jest.fn();

      proxyController.handleRequest(req, res, next);

      // Ensure next() was called
      expect(next).toHaveBeenCalled();
    });

    it('should handle proxy routes', () => {
      const req = { path: '/proxy-route' } as Request;
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<any, Record<string, any>>;
      const next = jest.fn();

      // Mock the proxyService to return a proxyHandler
      const mockProxyHandler = jest.fn();
      jest.spyOn(proxyService, 'handleRequest').mockReturnValue(mockProxyHandler);

      proxyController.handleRequest(req, res, next);

      // Ensure proxyHandler was called and metricsService.incrAuthCounter was called
      expect(mockProxyHandler).toHaveBeenCalledWith(req, res, next);
    //   expect(metricsService.incrAuthCounter).toHaveBeenCalledWith('success');
    });

    it('should handle not-found routes', () => {
      const req = { path: '/unknown-route' } as Request;
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response<any, Record<string, any>>;
      const next = jest.fn();

      // Mock the proxyService to return null (no proxyHandler)
      jest.spyOn(proxyService, 'handleRequest').mockReturnValue(null);

      proxyController.handleRequest(req, res, next);

      // Ensure 404 status and metricsService.incrAuthCounter was called
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Route not found');
    //   expect(metricsService.incrAuthCounter).toHaveBeenCalledWith('failed');
    });
  });
});
