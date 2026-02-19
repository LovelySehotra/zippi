import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Referral } from './referral/entities/referral.entity/referral.entity';
import { BankAccount } from './bank-account/entities/bank-account.entity';


/* -------------------------------------------------------------------------- */
/*                           DATABASE IDENTIFIERS                          */
/* -------------------------------------------------------------------------- */

export enum DatabaseName {
  USER_DB = 'USER_DB',
  PAYMENT_DB = 'PAYMENT_DB',
}

/* -------------------------------------------------------------------------- */
/*                         FACTORY TO BUILD OPTIONS                          */
/* -------------------------------------------------------------------------- */

function buildOptions(db: DatabaseName): DataSourceOptions {
  switch (db) {
    case DatabaseName.USER_DB:
      return {
        type: 'postgres',
        host: process.env.USER_DB_HOST || 'localhost',
        port: parseInt(process.env.USER_DB_PORT || '5432', 10),
        username: process.env.USER_DB_USERNAME || 'postgres',
        password: process.env.USER_DB_PASSWORD || 'password',
        database: process.env.USER_DB_NAME || 'zippiuser',

        entities: [User, Referral,BankAccount],
        migrations: [__dirname + `/migrations/user/*.{js,ts}`],

        synchronize: false,
      };

    case DatabaseName.PAYMENT_DB:
      return {
        type: 'postgres',
        host: process.env.PAYMENT_DB_HOST || 'localhost',
        port: parseInt(process.env.PAYMENT_DB_PORT || '5432', 10),
        username: process.env.PAYMENT_DB_USERNAME || 'postgres',
        password: process.env.PAYMENT_DB_PASSWORD || 'password',
        database: process.env.PAYMENT_DB_NAME || 'zippipay',

        entities: [],
        migrations: [__dirname + `/migrations/payment/*.{js,ts}`],

        synchronize: false,
      };

    default:
      throw new Error(`Unknown database: ${db}`);
  }
}

/* -------------------------------------------------------------------------- */
/*                      DATASOURCE REGISTRY                     */
/* -------------------------------------------------------------------------- */

const dataSourceRegistry = new Map<DatabaseName, DataSource>();

export function getDataSource(db: DatabaseName): DataSource {
  const existing = dataSourceRegistry.get(db);
  if (existing) return existing;

  const options = buildOptions(db);
  const dataSource = new DataSource(options);

  dataSourceRegistry.set(db, dataSource);

  return dataSource;
}

/* -------------------------------------------------------------------------- */
/*                     INITIALIZE ALL DATABASES                */
/* -------------------------------------------------------------------------- */

export async function initializeDatabases() {
  for (const db of Object.values(DatabaseName)) {
    const dataSource = getDataSource(db);

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log(`✅ Database initialized: ${db}`);
    }
  }
}
