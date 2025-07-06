import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateBankAccountDto {
  @ApiProperty({ example: '1234567890', description: 'Bank account number' })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({ example: 'SBIN0001234', description: 'IFSC code' })
  @IsString()
  @IsNotEmpty()
  ifscCode: string;

  @ApiProperty({ example: 'State Bank of India', description: 'Bank name' })
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @ApiProperty({ example: 1000.50, description: 'Account balance', required: false })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({ example: true, description: 'Is this the primary account?', required: false })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class UpdateBankAccountDto {
  @ApiProperty({ example: '1234567890', description: 'Bank account number', required: false })
  @IsString()
  @IsOptional()
  accountNumber?: string;

  @ApiProperty({ example: 'SBIN0001234', description: 'IFSC code', required: false })
  @IsString()
  @IsOptional()
  ifscCode?: string;

  @ApiProperty({ example: 'State Bank of India', description: 'Bank name', required: false })
  @IsString()
  @IsOptional()
  bankName?: string;

  @ApiProperty({ example: 1000.50, description: 'Account balance', required: false })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({ example: true, description: 'Is this the primary account?', required: false })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class BankAccountReturnDto {
  @ApiProperty({ example: 'uuid', description: 'Bank account ID' })
  id: string;

  @ApiProperty({ example: '1234567890', description: 'Bank account number' })
  accountNumber: string;

  @ApiProperty({ example: 'SBIN0001234', description: 'IFSC code' })
  ifscCode?: string;

  @ApiProperty({ example: 'State Bank of India', description: 'Bank name' })
  bankName?: string;

  @ApiProperty({ example: 1000.50, description: 'Account balance' })
  balance?: number;

  @ApiProperty({ example: true, description: 'Is this the primary account?' })
  isPrimary?: boolean;

  @ApiProperty({ example: 'user-uuid', description: 'User ID' })
  userId?: string;
}
