import { Module } from '@nestjs/common';
import { BillpayController } from './billpay.controller';
import { BillpayService } from './billpay.service';

@Module({
  imports: [],
  controllers: [BillpayController],
  providers: [BillpayService],
})
export class BillpayModule {}
