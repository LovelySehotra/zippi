import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  processPayment(data: { amount: number; userId: string }): string {
    console.log('Processing payment in PaymentService:', data);
    // In a real application, you would have logic here to interact
    // with a payment gateway like Stripe or PayPal.
    return `Payment of ${data.amount} for user ${data.userId} processed successfully.`;
  }
}
