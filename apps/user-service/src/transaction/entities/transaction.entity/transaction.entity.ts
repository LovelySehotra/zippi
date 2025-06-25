import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'apps/user-service/src/user/entities/user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  amount: number;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  note: string;

  @Column()
  paymentMethod: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.transactions)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;
}