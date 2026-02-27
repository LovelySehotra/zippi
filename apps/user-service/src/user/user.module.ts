import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

import { ReferralModule } from '../referral/referral.module';
import { BankAccountModule } from '../bank-account/bank-account.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configs from 'libs/shared/building-blocks/configs/configs';
import { DatabaseName, getDataSource } from '../data-source';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';


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
    CacheModule.register({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getDataSource(DatabaseName.USER_DB).options),
    TypeOrmModule.forRoot(getDataSource(DatabaseName.PAYMENT_DB).options),
    TypeOrmModule.forFeature([User]),
    ReferralModule,
    BankAccountModule,
    JwtModule.register({
      global: true,
      secret: "kjhgkjdfhkdh", // jwtConstants.secret
      signOptions: { expiresIn: '60s' },
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'report-queue',
    }),
    // AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
