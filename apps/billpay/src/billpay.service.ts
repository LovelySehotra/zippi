import { Injectable } from '@nestjs/common';

@Injectable()
export class BillpayService {
  getHello(): string {
    return 'Hello World!';
  }
}
