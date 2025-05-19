import { NestFactory } from '@nestjs/core';
import { BillpayModule } from './billpay.module';

async function bootstrap() {
  const app = await NestFactory.create(BillpayModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
