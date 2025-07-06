import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { BankAccount } from 'apps/user-service/src/bank-account/entities/bank-account.entity';
import { Referral } from '../../referral/entities/referral.entity/referral.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => BankAccount, bank => bank.user)
  bankAccounts: BankAccount[];

  @OneToMany(() => Referral, referral => referral.referredUser)
  referredUsers: Referral[];

  @OneToMany(() => Referral, referral => referral.referrerUser)
  referredBy: Referral[];
}