import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Order Service')
    .setDescription('Manages orders from users')
    .setVersion('1.0')
    .addBearerAuth() // Show JWT lock icon in Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true }, // Keep JWT in Swagger UI
  });

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, '0.0.0.0');
  console.log(`✅ Order Service started. Swagger available at /docs`);
}
bootstrap();
