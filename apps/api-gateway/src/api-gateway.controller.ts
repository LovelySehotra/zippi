import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @All('users/*')
  async proxyUser(@Req() req: Request, @Res() res: Response) {
    return this.apiGatewayService.proxyRequest(req, res, 'http://localhost:3366/api');
  }

  @All('users')
  async proxyUserRoot(@Req() req: Request, @Res() res: Response) {
    return this.apiGatewayService.proxyRequest(req, res, 'http://localhost:3366/api');
  }

  @All('payment/*')
  async proxyPayment(@Req() req: Request, @Res() res: Response) {
    return this.apiGatewayService.proxyRequest(req, res, 'http://localhost:3002');
  }

  @All('payment')
  async proxyPaymentRoot(@Req() req: Request, @Res() res: Response) {
    return this.apiGatewayService.proxyRequest(req, res, 'http://localhost:3002');
  }

  @All('notification/*')
  async proxyNotification(@Req() req: Request, @Res() res: Response) {
    return this.apiGatewayService.proxyRequest(req, res, 'http://localhost:3004');
  }

  @All('notification')
  async proxyNotificationRoot(@Req() req: Request, @Res() res: Response) {
    return this.apiGatewayService.proxyRequest(req, res, 'http://localhost:3004');
  }
}

