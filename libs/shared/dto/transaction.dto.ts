import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';

export enum TransactionType {
  SEND = 'SEND',
  RECEIVE = 'RECEIVE',
  RECHARGE = 'RECHARGE',
  BILL = 'BILL',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum PaymentMethod {
  UPI = 'UPI',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export class CreateTransactionDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  senderId: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsUUID()
  receiverId: string;

  @ApiProperty({ type: 'number', example: 100.50 })
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({ enum: TransactionStatus, required: false })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}

export class TransactionResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  senderId: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  receiverId: string;

  @ApiProperty({ type: 'number' })
  amount: number;

  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @ApiProperty({ enum: TransactionStatus })
  status: TransactionStatus;

  @ApiProperty({ type: 'string', required: false })
  note?: string;

  @ApiProperty({ enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;
}