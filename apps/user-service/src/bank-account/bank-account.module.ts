import { Module } from '@nestjs/common';
import { BankAccountController } from './bank-account.controller';
import { BankAccountService } from './bank-account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { User } from 'apps/user-service/src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BankAccount,User])],
  controllers: [BankAccountController],
  providers: [BankAccountService],
})
export class BankAccountModule {}
