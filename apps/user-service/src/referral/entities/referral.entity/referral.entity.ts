import { User } from 'apps/user-service/src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';

@Entity('referrals')
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.referredUsers)
  referredUser: User;

  @ManyToOne(() => User, user => user.referredBy)
  referrerUser: User;

  @Column()
  referralCode: string;

  @CreateDateColumn()
  createdAt: Date;
}
