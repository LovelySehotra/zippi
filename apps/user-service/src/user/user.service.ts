// File: src/user/user.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppError } from 'libs/shared/src/app-error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async create(userDto: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    console.log("here  i am working")
    return await this.userRepository.find({
      relations: ['bankAccounts', 'referredUsers', 'referredBy']
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['bankAccounts', 'referredUsers', 'referredBy']
    });
    if (!user) {
      throw new AppError(`User with ID ${id} not found`, 404);
    }
    return user;
  }

  async update(id: string, userDto: Partial<User>): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...userDto,
    });
    if (!user) {
      throw new AppError(`User with ID ${id} not found`, 404);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
  async login(userDto: Partial<User>): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: userDto.email }
    });
    if (user?.password !== userDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { phoneNumber: user?.phoneNumber, sub: user?.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

