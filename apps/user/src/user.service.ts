import { Injectable, NotFoundException } from '@nestjs/common';
import { User, CreateUserInput, UpdateUserInput } from './generated/graphql';

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  getAllUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  createUser(input: CreateUserInput): User {
    const newUser: User = {
      id: String(this.idCounter++),
      name: input.name,
      email: input.email,
      phone: input.phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(input: UpdateUserInput): User {
    const userIndex = this.users.findIndex(u => u.id === input.id);
    if (userIndex === -1) throw new NotFoundException('User not found');

    const existingUser = this.users[userIndex];
    const updatedUser = {
      ...existingUser,
      ...input,
      updatedAt: new Date().toISOString(),
    } as User;

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new NotFoundException('User not found');
    this.users.splice(userIndex, 1);
    return true;
  }
}
