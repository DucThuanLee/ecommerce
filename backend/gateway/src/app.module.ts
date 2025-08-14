import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthController } from './health.controller';
import { AuthProxyMiddleware, UserProxyMiddleware } from './proxy.middleware';

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
      .forRoutes('/auth');

    consumer
      .apply(UserProxyMiddleware)
      .forRoutes('/users');
  }
}
