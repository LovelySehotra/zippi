import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(@Payload() userDto: Partial<User>): Promise<User> {
    return this.userService.create(userDto);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_user' })
  findOne(@Payload('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_user' })
  update(@Payload() data: { id: number; userDto: Partial<User> }): Promise<User> {
    return this.userService.update(data.id, data.userDto);
  }

  @MessagePattern({ cmd: 'remove_user' })
  remove(@Payload('id') id: number): Promise<User> {
    return this.userService.remove(id);
  }
}
