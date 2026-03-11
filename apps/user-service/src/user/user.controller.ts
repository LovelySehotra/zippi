import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserReturnDto } from 'libs/shared/dto/userService.dto';
import { AuthGuard } from 'libs/shared/building-blocks/guards/auth.guard';
import { ConfigService } from '@nestjs/config';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Request } from 'express';
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully', type: UserReturnDto })
  create(@Body() userDto: CreateUserDto): Promise<UserReturnDto> {

    return this.userService.create(userDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of users', type: [UserReturnDto] })
  async findAll(): Promise<UserReturnDto[]> {
    const cachedValue = await this.cacheManager.get('key');
    console.log("Cached value:", cachedValue);
    await this.cacheManager.set('key', 'value', 1000);
    console.log(await this.cacheManager.get("key"))
    console.log("Creating user with config value:", this.configService.get<string>('serviceName'));
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: 'User details', type: UserReturnDto })
  findOne(@Param('id') id: string): Promise<UserReturnDto> {
    console.log("id", id)
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

  @Post('login')
  @ApiOkResponse({ description: 'User logged in', type: UserReturnDto })
  login(@Body() userDto: CreateUserDto): Promise<{ accessToken: string }> {
    return this.userService.login(userDto);
  }
  @Post('generate')
  async generate(@Body() data: { userId: string }) {
    await this.userService.generatePdf(data.userId)

    return {
      message: 'PDF generation started',
    }
  }
}
