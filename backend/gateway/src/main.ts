import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser'; // Import body-parser

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  //app.use(bodyParser.raw({ type: '*/*' })); // ✅ Override parser
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // ✅ Tắt hoàn toàn parser của Nest
  });
  app.enableCors();
  //await app.listen(process.env.PORT ?? 8080);
  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}
bootstrap();
