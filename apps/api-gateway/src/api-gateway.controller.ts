import { Body, Controller, Get, Post, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  // --- User Endpoints ---
  @Post('users')
  createUser(@Body() userDto: any) {
    return this.apiGatewayService.createUser(userDto);
  }

  @Get('users')
  findAllUsers() {
    return this.apiGatewayService.findAllUsers();
  }

  @Get('users/:id')
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.apiGatewayService.findOneUser(id);
  }

  @Patch('users/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() userDto: any) {
    return this.apiGatewayService.updateUser(id, userDto);
  }

  @Delete('users/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.apiGatewayService.removeUser(id);
  }

  // --- Payment Endpoint ---
  @Post('payment')
  processPayment(@Body() data: { amount: number; userId: string }) {
    return this.apiGatewayService.processPayment(data);
  }
}
