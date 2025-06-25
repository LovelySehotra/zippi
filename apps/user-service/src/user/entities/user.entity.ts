import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { BankAccount } from 'apps/user-service/src/bank-account/entities/bank-account.entity/bank-account.entity';
import { Transaction } from 'apps/user-service/src/transaction/entities/transaction.entity/transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  upiId: string;

  @Column({ nullable: true })
  pinHash: string;

  @Column({ default: false })
  kycVerified: boolean;

  @Column({ unique: true, nullable: true })
  referralCode: string;

  @Column({ nullable: true })
  referredBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => BankAccount, bank => bank.user)
  bankAccounts: BankAccount[];

  @OneToMany(() => Transaction, tx => tx.sender)
  transactions: Transaction[];
}