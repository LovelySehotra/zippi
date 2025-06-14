import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ cmd: 'process_payment' })
  processPayment(@Payload() data: { amount: number; userId: string }): string {
    return this.paymentService.processPayment(data);
  }
}
