// File: src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { AppError } from 'libs/shared/src/app-error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    console.log("here  i am working")
    return this.userRepository.find({
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
}
