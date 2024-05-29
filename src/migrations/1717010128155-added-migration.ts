import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMigration1717010128155 implements MigrationInterface {
    name = 'AddedMigration1717010128155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub1"."coastCenters" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_e59fa9938b30ad4dc0914ea24aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."jobs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."teams" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, "companyId" integer, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."companies" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."shifts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_84d692e367e4d6cdf045828768c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub1"."teams" ADD CONSTRAINT "FK_fc2a980dcd97019349b17b3921e" FOREIGN KEY ("companyId") REFERENCES "sub1"."companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub1"."teams" DROP CONSTRAINT "FK_fc2a980dcd97019349b17b3921e"`);
        await queryRunner.query(`DROP TABLE "sub1"."shifts"`);
        await queryRunner.query(`DROP TABLE "sub1"."companies"`);
        await queryRunner.query(`DROP TABLE "sub1"."teams"`);
        await queryRunner.query(`DROP TABLE "sub1"."jobs"`);
        await queryRunner.query(`DROP TABLE "sub1"."coastCenters"`);
    }

}
