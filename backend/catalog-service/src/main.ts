import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Catalog Service')
    .setDescription('Product & Category Management')
    .setVersion('1.0')
    .addBearerAuth() // Enable lock icon for JWT in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true }, // Keep JWT in Swagger UI
  });

  // Listen inside container on port 3002
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, '0.0.0.0');
  console.log(`✅ Catalog Service started. Swagger at /docs`);
}
bootstrap();
