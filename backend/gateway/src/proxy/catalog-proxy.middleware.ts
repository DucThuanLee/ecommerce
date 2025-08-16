// src/common/proxy/catalog-proxy.middleware.ts
import { Injectable } from '@nestjs/common';
import { BaseProxyMiddleware } from './base-proxy.middleware';

@Injectable()
export class CatalogProxyMiddleware extends BaseProxyMiddleware {
  constructor() {
    super({
      displayName: 'CatalogProxy',
      targetEnvKey: 'CATALOG_SERVICE_URL',
      changeOrigin: true,
      logLevel: 'debug',
    } as any); // cast to `any` to avoid TS error
  }
}
