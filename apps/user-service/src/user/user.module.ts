import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { dataSourceOptions } from '../data-source';
import { ReferralModule } from '../referral/referral.module';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User]),
    ReferralModule,
    BankAccountModule,
    JwtModule.register({
      global: true,
      secret: "kjhgkjdfhkdh", // jwtConstants.secret
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
