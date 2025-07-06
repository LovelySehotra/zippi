import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Transaction } from './entities/transaction.entity';
import { dataSourceOptions } from './data-source';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Transaction]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, TransactionService],
  exports: [TransactionService],
})
export class PaymentModule {}
