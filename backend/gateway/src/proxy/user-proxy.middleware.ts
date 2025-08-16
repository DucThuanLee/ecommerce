// src/common/proxy/user-proxy.middleware.ts
import { Injectable } from '@nestjs/common';
import { BaseProxyMiddleware } from './base-proxy.middleware';

@Injectable()
export class UserProxyMiddleware extends BaseProxyMiddleware {
  constructor() {
    super({
      displayName: 'UserProxy',
      targetEnvKey: 'USER_SERVICE_URL',
      changeOrigin: true,
      logLevel: 'debug',
    } as any); // cast to `any` to avoid TS error
  }
}
