import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/entities/user.entity';
import { BankAccount } from './bank-account/entities/bank-account.entity';
import { Referral } from './referral/entities/referral.entity/referral.entity';


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'zippiuser',
  entities: [User,BankAccount ,Referral],

  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
