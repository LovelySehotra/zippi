import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PaymentModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });
  await app.listen();
}
bootstrap();
