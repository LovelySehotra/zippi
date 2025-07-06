import { Controller, Post, Body, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { TransactionService } from './transaction.service';
// import { CreateTransactionDto, TransactionType, TransactionStatus, PaymentMethod } from '../../../../libs/shared/dto/transaction.dto';
// import { TransactionResponseDto } from './dto/transaction-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateTransactionDto, TransactionResponseDto } from 'libs/shared/dto/transaction.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({ status: 201, type: TransactionResponseDto })
  async create(@Body() dto: CreateTransactionDto): Promise<TransactionResponseDto> {
    const transaction = await this.transactionService.createTransaction(dto);
    return this.toResponseDto(transaction);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, type: TransactionResponseDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<TransactionResponseDto> {
    const transaction = await this.transactionService.findById(id);
    if (!transaction) {
      // Throwing NotFoundException for proper REST API behavior
      throw new (await import('@nestjs/common')).NotFoundException('Transaction not found');
    }
    return this.toResponseDto(transaction);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, type: [TransactionResponseDto] })
  async findAll(): Promise<TransactionResponseDto[]> {
    const transactions = await this.transactionService.findAll();
    return transactions.map(this.toResponseDto);
  }

  // Keep microservice pattern if needed
  @MessagePattern({ cmd: 'process_payment' })
  processPayment(@Payload() data: { amount: number; userId: string }): string {
    return this.paymentService.processPayment(data);
  }

  private toResponseDto(transaction: any): TransactionResponseDto {
    if (!transaction) return null as any;
    return {
      id: transaction.id,
      senderId: transaction.senderId,
      receiverId: transaction.receiverId,
      amount: Number(transaction.amount),
      type: transaction.type,
      status: transaction.status,
      note: transaction.note,
      paymentMethod: transaction.paymentMethod,
      createdAt: transaction.createdAt,
    };
  }
}

