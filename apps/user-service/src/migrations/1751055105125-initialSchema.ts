import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1751055105125 implements MigrationInterface {
    name = 'InitialSchema1751055105125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank_accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountNumber" character varying NOT NULL, "ifscCode" character varying NOT NULL, "bankName" character varying NOT NULL, "balance" numeric NOT NULL DEFAULT '0', "isPrimary" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_c872de764f2038224a013ff25ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "referrals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "referralCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "referredUserId" uuid, "referrerUserId" uuid, CONSTRAINT "PK_ea9980e34f738b6252817326c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phoneNumber" character varying NOT NULL, "name" character varying, "email" character varying, "upiId" character varying, "pinHash" character varying, "kycVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_f1d7f3fe96284f75ada8499409c" UNIQUE ("upiId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" ADD CONSTRAINT "FK_45ef3ca170943e2c70e8073a7c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "referrals" ADD CONSTRAINT "FK_a398d03f3cf515627a7f5360bab" FOREIGN KEY ("referredUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "referrals" ADD CONSTRAINT "FK_25ac40f9773382f1166e6db2bc6" FOREIGN KEY ("referrerUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "referrals" DROP CONSTRAINT "FK_25ac40f9773382f1166e6db2bc6"`);
        await queryRunner.query(`ALTER TABLE "referrals" DROP CONSTRAINT "FK_a398d03f3cf515627a7f5360bab"`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" DROP CONSTRAINT "FK_45ef3ca170943e2c70e8073a7c5"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "referrals"`);
        await queryRunner.query(`DROP TABLE "bank_accounts"`);
    }

}
