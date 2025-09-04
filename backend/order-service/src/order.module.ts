import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { Order, OrderSchema } from './order.schema';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { RmqModule } from '@shared/rmq/rmq.module'; // RabbitMQ module

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/order_db'), // từ .env
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // DUPLICATE secret with auth-service
      signOptions: { expiresIn: '3600s' },
    }),
    PrometheusModule.register(),
    RmqModule, // RabbitMQ module
  ],
  controllers: [OrderController],
  providers: [OrderService, JwtStrategy],
})
export class OrderModule {}
