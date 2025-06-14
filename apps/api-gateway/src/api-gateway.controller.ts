import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('user/hello')
  getHello() {
    return this.apiGatewayService.getHello();
  }

  @Post('payment')
  processPayment(@Body() data: { amount: number; userId: string }) {
    return this.apiGatewayService.processPayment(data);
  }
}
