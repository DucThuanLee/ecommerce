import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  //app.use(bodyParser.raw({ type: '*/*' })); // ✅ Override parser
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // ✅ Tắt hoàn toàn parser của Nest -> no line -> error
  });
  app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('API Gateway')
  .setDescription('Gateway endpoints')
  .setVersion('1.0')
  .addBearerAuth() // hiển thị lock icon cho JWT
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
  //await app.listen(process.env.PORT ?? 8080);
  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
}
bootstrap();
