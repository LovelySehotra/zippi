import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_hello' })
  getHello(): string {
    return this.userService.getHello();
  }
}
