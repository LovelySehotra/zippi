import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  senderId: string;

  @Column('uuid')
  receiverId: string;

  @Column('decimal', { precision: 18, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['SEND', 'RECEIVE', 'RECHARGE', 'BILL', 'SUBSCRIPTION'],
  })
  type: 'SEND' | 'RECEIVE' | 'RECHARGE' | 'BILL' | 'SUBSCRIPTION';

  @Column({
    type: 'enum',
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'SUCCESS' | 'FAILED';

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: ['UPI', 'CARD', 'BANK_TRANSFER'],
  })
  paymentMethod: 'UPI' | 'CARD' | 'BANK_TRANSFER';

  @CreateDateColumn()
  createdAt: Date;
}

