import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Zippi API Gateway')
    .setDescription('API Gateway for Zippi microservices (User, Payment, Notification, etc)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.use((req: any, res: any, next: any) => {
    if (req.originalUrl === '/' || req.originalUrl.includes('favicon.ico')) {
      return res.send('Zippi API Gateway');
    }
    return next();
  });
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
