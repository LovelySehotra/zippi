import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserReturnDto } from 'libs/shared/dto/userService.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully', type: UserReturnDto })
  create(@Body() userDto: CreateUserDto): Promise<UserReturnDto> {
    return this.userService.create(userDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of users', type: [UserReturnDto] })
  findAll(): Promise<UserReturnDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User details', type: UserReturnDto })
  findOne(@Param('id') id: string): Promise<UserReturnDto> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'User updated', type: UserReturnDto })
  update(@Param('id') id: string, @Body() userDto: UpdateUserDto): Promise<UserReturnDto> {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted', type: UserReturnDto })
  remove(@Param('id') id: string): Promise<UserReturnDto> {
    return this.userService.remove(id);
  }
}