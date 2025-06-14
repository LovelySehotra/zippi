import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}

  getUser() {
    return this.userClient.send({ cmd: 'get_user' }, {});
  }

  getHello() {
    return this.userClient.send({ cmd: 'get_hello' }, {});
  }

  processPayment(data: { amount: number; userId: string }) {
    return this.paymentClient.send({ cmd: 'process_payment' }, data);
  }
}
