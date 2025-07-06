import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {

  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'zippiuser',
  entities: [__dirname + '/*.entity{.ts,.js}'],
  synchronize: true, // Disable in production!
};
