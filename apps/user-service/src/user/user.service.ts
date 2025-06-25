import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(userDto: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({  });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return user;
  }

  async update(id: number, userDto: Partial<User>): Promise<User> {
    const user = await this.userRepository.preload({
     
      ...userDto,
    });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
