import { Controller, Get } from '@nestjs/common';
import { BillpayService } from './billpay.service';

@Controller()
export class BillpayController {
  constructor(private readonly billpayService: BillpayService) {}

  @Get()
  getHello(): string {
    return this.billpayService.getHello();
  }
}
