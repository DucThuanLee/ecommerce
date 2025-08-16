// src/common/proxy/base-proxy.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware, Options, RequestHandler } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

export interface BaseProxyOptions extends Options {
  /**
   * Tên hiển thị để log (ví dụ: 'AuthProxy', 'UserProxy').
   */
  displayName?: string;
  /**
   * URL target (ưu tiên) hoặc tên biến ENV để lấy target.
   */
  target?: string;
  targetEnvKey?: string;
}

@Injectable()
export abstract class BaseProxyMiddleware implements NestMiddleware {
  protected proxy: RequestHandler;
  protected readonly name: string;

  constructor(opts: BaseProxyOptions) {
    const target =
      opts.target ??
      (opts.targetEnvKey ? process.env[opts.targetEnvKey] : undefined);

    const displayName = opts.displayName ?? 'Proxy';
    this.name = displayName;

    if (!target) {
      // Nên fail fast để tránh chạy với target rỗng
      throw new Error(`[${displayName} INIT] Missing proxy target (set "target" or ENV via "targetEnvKey")`);
    }

    // Log init
    // eslint-disable-next-line no-console
    console.log(`[${displayName} INIT] Target set to:`, target);

    // Hợp nhất options mặc định + custom
    const mergedOpts: Options = {
      target,
      changeOrigin: true,
      logLevel: 'debug',
      // Hook: có thể override qua opts.onProxyReq nếu cần
      onProxyReq: (proxyReq, req, res) => {
        // eslint-disable-next-line no-console
        console.log(`[${displayName}] proxyReq:`, req.method, req.url);
        //opts.onProxyReq?.(proxyReq, req, res);
      },
      onError: (err, req, res) => {
        // eslint-disable-next-line no-console
        console.error(`[${displayName}] Proxy ERROR:`, err.message);
        (res as Response).status(500).json({ error: 'Proxy error', detail: err.message });
        //opts.onError?.(err, req, res);
      },
      ...opts,
      // Đảm bảo target không bị override bởi opts.targetEnvKey:
    } as any;

    this.proxy = createProxyMiddleware(mergedOpts);
    // bind để dùng như 1 hàm req,res,next
    this.proxy = this.proxy.bind(this);
  }

  use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line no-console
    console.log(`[${this.name}] incoming:`, req.method, req.originalUrl);

    try {
      this.proxy(req, res, (err?: any) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(`[${this.name}] Proxy error:`, err.message);
          res.status(500).json({ error: 'Proxy failed', detail: err.message });
        } else {
          // eslint-disable-next-line no-console
          console.log(`[${this.name}] Proxy success:`, req.method, req.originalUrl);
          next();
        }
      });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error(`[${this.name}] Exception thrown:`, err.message);
      res.status(500).json({ error: 'Proxy crashed', detail: err.message });
    }
  }
}
