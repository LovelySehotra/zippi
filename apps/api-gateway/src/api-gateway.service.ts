import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
  ) {}

  // User CRUD
  createUser(userDto: any) {
    return this.userClient.send({ cmd: 'create_user' }, userDto);
  }

  findAllUsers() {
    return this.userClient.send({ cmd: 'find_all_users' }, {});
  }

  findOneUser(id: number) {
    return this.userClient.send({ cmd: 'find_one_user' }, id);
  }

  updateUser(id: number, userDto: any) {
    return this.userClient.send({ cmd: 'update_user' }, { id, userDto });
  }

  removeUser(id: number) {
    return this.userClient.send({ cmd: 'remove_user' }, id);
  }

  // Payment
  processPayment(data: { amount: number; userId: string }) {
    return this.paymentClient.send({ cmd: 'process_payment' }, data);
  }
}
