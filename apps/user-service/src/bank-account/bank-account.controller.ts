import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { BankAccountService } from './bank-account.service';
import { CreateBankAccountDto, UpdateBankAccountDto, BankAccountReturnDto } from 'libs/shared/dto/bankAccount.dto';

@Controller('bank-accounts')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Bank account created', type: BankAccountReturnDto })
  create(
    @Body() data: CreateBankAccountDto,
    @Query('userId') userId: string
  ): Promise<BankAccountReturnDto> {
    return this.bankAccountService.create(data, userId);    
  }

  @Get()
  @ApiOkResponse({ description: 'List of bank accounts', type: [BankAccountReturnDto] })
  findAll(): Promise<BankAccountReturnDto[]> {
    return this.bankAccountService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Bank account details', type: BankAccountReturnDto })
  findOne(@Param('id') id: string): Promise<BankAccountReturnDto> {
    return this.bankAccountService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Bank account updated', type: BankAccountReturnDto })
  update(
    @Param('id') id: string,
    @Body() data: UpdateBankAccountDto
  ): Promise<BankAccountReturnDto> {
    return this.bankAccountService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(id);
  }
}
