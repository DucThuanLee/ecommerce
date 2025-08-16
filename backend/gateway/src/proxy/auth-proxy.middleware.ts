// src/common/proxy/auth-proxy.middleware.ts
import { Injectable } from '@nestjs/common';
import { BaseProxyMiddleware } from './base-proxy.middleware';

@Injectable()
export class AuthProxyMiddleware extends BaseProxyMiddleware {
  constructor() {
    super({
      displayName: 'AuthProxy',
      targetEnvKey: 'AUTH_SERVICE_URL',
      changeOrigin: true,
      logLevel: 'debug',
    } as any); // cast to `any` to avoid TS error
  }
}
