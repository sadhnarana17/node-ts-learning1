/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class book1655108364025 implements MigrationInterface {
    name = 'book1655108364025'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "book" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "author" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "mode" character varying NOT NULL DEFAULT \'offline\', "link" character varying, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "book"');
    }

}
