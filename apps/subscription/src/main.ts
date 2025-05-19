import { NestFactory } from '@nestjs/core';
import { SubscriptionModule } from './subscription.module';

async function bootstrap() {
  const app = await NestFactory.create(SubscriptionModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
