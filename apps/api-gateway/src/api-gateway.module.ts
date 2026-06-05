import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { ApiGatewayController } from './api-gateway.controller';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RedisModule } from './modules/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { PaymentModule } from './modules/payment/payment.module';
import { QrPaymentModule } from './modules/qr-payment/qr-payment.module';
import { BillPaymentModule } from './modules/bill-payment/bill-payment.module';
import { RechargeModule } from './modules/recharge/recharge.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { SplitBillModule } from './modules/split-bill/split-bill.module';
import { NotificationModule } from './modules/notification/notification.module';
import { RewardModule } from './modules/reward/reward.module';
import { OfferModule } from './modules/offer/offer.module';
import { FraudDetectionModule } from './modules/fraud-detection/fraud-detection.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    // Global Configurations
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // BullMQ Connection Configuration
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6380,
      },
    }),

    // Infrastructure Modules
    PrismaModule,
    RedisModule,

    // Domain Modules
    AuthModule,
    UserModule,
    BankAccountModule,
    PaymentModule,
    QrPaymentModule,
    BillPaymentModule,
    RechargeModule,
    TransactionModule,
    SubscriptionModule,
    SplitBillModule,
    NotificationModule,
    RewardModule,
    OfferModule,
    FraudDetectionModule,
    AnalyticsModule,
    AdminModule,
  ],
  controllers: [ApiGatewayController],
})
export class ApiGatewayModule {}

