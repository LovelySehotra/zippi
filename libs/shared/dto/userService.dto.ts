import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,  } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: '+919876543210', description: 'The unique phone number of the user' })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({ example: 'Lovely Sehotra', description: 'The name of the user', required: false })
    @IsString()
    name?: string;

    @ApiProperty({ example: 'lovelysehotra@gmail.com', description: 'The email of the user', required: false })
    @IsString()
    email?: string;
}

export class UpdateUserDto {
    @ApiProperty({ example: '+919876543210', description: 'The unique phone number of the user', required: false })
    @IsString()
    phoneNumber?: string;

    @ApiProperty({ example: 'Lovely Sehotra', description: 'The name of the user', required: false })
    @IsString()
    name?: string;

    @ApiProperty({ example: 'lovelysehotra@gmail.com', description: 'The email of the user', required: false })
    @IsString()
    email?: string;
}

export class UserReturnDto {
    @ApiProperty({ example: 'uuid', description: 'The unique identifier of the user' })
    id: string;

    @ApiProperty({ example: '+919876543210', description: 'The unique phone number of the user' })
    phoneNumber: string;

    @ApiProperty({ example: 'Lovely Sehotra', description: 'The name of the user', required: false })
    name?: string;

    @ApiProperty({ example: 'lovelysehotra@gmail.com', description: 'The email of the user', required: false })
    email?: string;

    @ApiProperty({ example: 'lovely@upi', description: 'The UPI ID of the user', required: false })
    upiId?: string;

    @ApiProperty({ example: 'hashed_pin', description: 'The hashed PIN of the user', required: false })
    pinHash?: string;

    @ApiProperty({ example: false, description: 'Whether the user is KYC verified', required: false })
    kycVerified?: boolean;

    @ApiProperty({ example: new Date().toISOString(), description: 'The date the user was created' })
    createdAt: Date;
}
