/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */

import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class addNewUserCol1654602866695 implements MigrationInterface {
    name = 'addNewUserCol1654602866695'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ADD "firstName" character varying NOT NULL');
      await queryRunner.query('ALTER TABLE "user" ADD "lastName" character varying NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "lastName"');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "firstName"');
    }

}
