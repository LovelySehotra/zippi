import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { dataSourceOptions } from '../data-source';
import { ReferralModule } from '../referral/referral.module';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configs from 'libs/shared/building-blocks/configs/configs';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        // envFilePath: [ '.env','.development.env',],
        isGlobal: true,
        //  ignoreEnvFile: true,
        load: [configs],
          cache: true,
      }
    ),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User]),
    ReferralModule,
    BankAccountModule,
    JwtModule.register({
      global: true,
      secret: "kjhgkjdfhkdh", // jwtConstants.secret
      signOptions: { expiresIn: '60s' },
    }),
    // AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
