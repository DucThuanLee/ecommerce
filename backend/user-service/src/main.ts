import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// Swagger config
const config = new DocumentBuilder()
.setTitle('User Service')
.setDescription('User profile & address')
.setVersion('1.0')
.addBearerAuth() // show JWT lock icon
.build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document, {
swaggerOptions: { persistAuthorization: true },
});

// Listen inside container on 3000 (map ra ngoài qua docker-compose)
await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, '0.0.0.0');
console.log(`✅ User Service started. Swagger at /docs`);
}
bootstrap();
