import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { User } from 'apps/user-service/src/user/entities/user.entity';
import { AppError } from 'libs/shared/src/app-error';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<BankAccount>, userId: string): Promise<BankAccount> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new AppError('User not found', 404);
    const bankAccount = this.bankAccountRepository.create({ ...data, user });
    return this.bankAccountRepository.save(bankAccount);
  }

  findAll(): Promise<BankAccount[]> {
    return this.bankAccountRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<BankAccount> {
    const bankAccount = await this.bankAccountRepository.findOne({ where: { id }, relations: ['user'] });
    if (!bankAccount) throw new AppError('Bank account not found', 404);
    return bankAccount;
  }

  async update(id: string, data: Partial<BankAccount>): Promise<BankAccount> {
    const bankAccount = await this.bankAccountRepository.preload({ id, ...data });
    if (!bankAccount) throw new AppError('Bank account not found', 404);
    return this.bankAccountRepository.save(bankAccount);
  }

  async remove(id: string): Promise<void> {
    const result = await this.bankAccountRepository.delete(id);
    if (result.affected === 0) throw new AppError('Bank account not found', 404);
  }
}
