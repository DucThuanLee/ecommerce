import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthController } from './health.controller';
import { AuthProxyMiddleware } from './proxy/auth-proxy.middleware';
import { UserProxyMiddleware } from './proxy/user-proxy.middleware';
import { CatalogProxyMiddleware } from './proxy/catalog-proxy.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Throttler v5+ style (ttl in ms)
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60_000,  // 60 seconds window (milliseconds)
          limit: 100,   // 100 requests per window per IP
        },
      ],
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthProxyMiddleware)
      .forRoutes({ path: 'auth/(.*)', method: RequestMethod.ALL }); // important

    consumer
      .apply(UserProxyMiddleware)
      .forRoutes({ path: 'users/(.*)', method: RequestMethod.ALL }); // important

    consumer
      .apply(CatalogProxyMiddleware)
      .forRoutes({ path: 'categories/(.*)', method: RequestMethod.ALL }); // important

    consumer
      .apply(CatalogProxyMiddleware)
      .forRoutes({ path: 'products/(.*)', method: RequestMethod.ALL }); // important

  }
}
