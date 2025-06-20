import { Module } from '@nestjs/common';
import { BankAccountController } from './bank-account.controller';

@Module({
  controllers: [BankAccountController]
})
export class BankAccountModule {}
