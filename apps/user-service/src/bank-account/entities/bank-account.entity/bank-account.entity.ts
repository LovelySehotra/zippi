import { User } from 'apps/user-service/src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('bank_accounts')
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountNumber: string;

  @Column()
  ifscCode: string;

  @Column()
  bankName: string;

  @Column('decimal', { default: 0 })
  balance: number;

  @Column({ default: false })
  isPrimary: boolean;

  @ManyToOne(() => User, user => user.bankAccounts)
  user: User;
}