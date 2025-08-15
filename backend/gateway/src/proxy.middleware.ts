import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthProxyMiddleware implements NestMiddleware {
  private proxy: any;

  constructor() {
    const target = process.env.AUTH_SERVICE_URL;
    console.log('[AuthProxy INIT] Target set to:', target);

    this.proxy = createProxyMiddleware({
      target,
      changeOrigin: true,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log('[AuthProxy] proxyReq:', req.method, req.url);
      },
      onError: (err, req, res) => {
        console.error('[AuthProxy] Proxy ERROR:', err.message);
        (res as Response).status(500).json({ error: 'Proxy error', detail: err.message });
      },
    } as any); // 👈 ép kiểu toàn bộ options về `any` để tránh lỗi TS
    this.proxy = this.proxy.bind(this);
  }

  use(req: Request, res: Response, next: NextFunction) {
    console.log('[AuthProxy] incoming:', req.method, req.originalUrl);
    try {
      this.proxy(req, res, (err: any) => {
        if (err) {
          console.error('[AuthProxy] Proxy error:', err.message);
          res.status(500).json({ error: 'Proxy failed', detail: err.message });
        } else {
          console.log('[AuthProxy] Proxy success:', req.method, req.originalUrl);
          next();
        }
      });
    } catch (err: any) {
      console.error('[AuthProxy] Exception thrown:', err.message);
      res.status(500).json({ error: 'Proxy crashed', detail: err.message });
    }
  }
}

@Injectable()
export class UserProxyMiddleware implements NestMiddleware {
  private proxy: any;

  constructor() {
    console.log('[UserProxy INIT] Target set to:', process.env.USER_SERVICE_URL);
    this.proxy = createProxyMiddleware({
      target: process.env.USER_SERVICE_URL,
      changeOrigin: true,
      logLevel: 'debug',
    } as any);
    this.proxy = this.proxy.bind(this); // ✅ BIND CONTEXT
  }

  use(req: Request, res: Response, next: NextFunction) {
    console.log('[UserProxy] incoming:', req.method, req.originalUrl);
    try {
      this.proxy(req, res, (err: any) => {
        if (err) {
          console.error('[UserProxy] Proxy error:', err.message);
          res.status(500).json({ error: 'Proxy failed', detail: err.message });
        } else {
          console.log('[UserProxy] Proxy success:', req.method, req.originalUrl);
          next();
        }
      });
    } catch (err: any) {
      console.error('[UserProxy] Exception thrown:', err.message);
      res.status(500).json({ error: 'Proxy crashed', detail: err.message });
    }
  }
}
