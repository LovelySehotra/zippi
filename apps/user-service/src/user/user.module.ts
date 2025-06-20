import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { TodoController } from '../todo.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { dataSourceOptions } from '../data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController, TodoController],
  providers: [UserService],
})
export class UserModule {}
