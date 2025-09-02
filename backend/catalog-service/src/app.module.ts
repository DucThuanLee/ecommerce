import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/catalog_db'), // từ .env
    ProductModule, CategoryModule, JwtModule.register({
      secret: process.env.JWT_SECRET, // DUPLICATE secret with auth-service
      signOptions: { expiresIn: '3600s' },
    }),
    PrometheusModule.register(),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule { }
