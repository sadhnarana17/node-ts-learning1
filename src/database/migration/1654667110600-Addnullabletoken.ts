/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class Addnullabletoken1654667110600 implements MigrationInterface {
    name = 'Addnullabletoken1654667110600'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT \'user\'');
      await queryRunner.query('ALTER TABLE "user" ADD "token" character varying');
      await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "UQ_a854e557b1b14814750c7c7b0c9" UNIQUE ("token")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "UQ_a854e557b1b14814750c7c7b0c9"');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "token"');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "role"');
    }

}
