import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, CreateUserInput, UpdateUserInput } from './generated/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('getUser')
  getUser(@Args('id') id: string): User {
    return this.userService.getUser(id);
  }

  @Query('getAllUsers')
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Mutation('createUser')
  createUser(@Args('input') input: CreateUserInput): User {
    return this.userService.createUser(input);
  }

  @Mutation('updateUser')
  updateUser(@Args('input') input: UpdateUserInput): User {
    return this.userService.updateUser(input);
  }

  @Mutation('deleteUser')
  deleteUser(@Args('id') id: string): boolean {
    return this.userService.deleteUser(id);
  }
}
