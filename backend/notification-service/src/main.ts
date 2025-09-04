import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URI ?? 'amqp://rabbitmq:5672'],
      queue: process.env.RMQ_QUEUE ?? 'notification_queue',
      queueOptions: { durable: true },
      prefetchCount: +(process.env.PREFETCH ?? 1),
      noAck: (process.env.NO_ACK ?? 'false') === 'true',
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`HTTP :${process.env.PORT ?? 3000}, RMQ "${process.env.RMQ_QUEUE}"`);
}
bootstrap();
