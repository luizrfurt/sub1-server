import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMigration1717165655472 implements MigrationInterface {
    name = 'AddedMigration1717165655472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub1"."cities" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "stateId" integer, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."states" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "uf" character varying NOT NULL, "countryId" integer, CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."countries" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."teams" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, "companyId" integer, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."companies" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."coasts_centers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_c3e1959a922d3d4120e394ee691" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."jobs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."shifts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "name" character varying NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_84d692e367e4d6cdf045828768c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub1"."cities" ADD CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f" FOREIGN KEY ("stateId") REFERENCES "sub1"."states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub1"."states" ADD CONSTRAINT "FK_76ac7edf8f44e80dff569db7321" FOREIGN KEY ("countryId") REFERENCES "sub1"."countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub1"."teams" ADD CONSTRAINT "FK_fc2a980dcd97019349b17b3921e" FOREIGN KEY ("companyId") REFERENCES "sub1"."companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub1"."teams" DROP CONSTRAINT "FK_fc2a980dcd97019349b17b3921e"`);
        await queryRunner.query(`ALTER TABLE "sub1"."states" DROP CONSTRAINT "FK_76ac7edf8f44e80dff569db7321"`);
        await queryRunner.query(`ALTER TABLE "sub1"."cities" DROP CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f"`);
        await queryRunner.query(`DROP TABLE "sub1"."shifts"`);
        await queryRunner.query(`DROP TABLE "sub1"."jobs"`);
        await queryRunner.query(`DROP TABLE "sub1"."coasts_centers"`);
        await queryRunner.query(`DROP TABLE "sub1"."companies"`);
        await queryRunner.query(`DROP TABLE "sub1"."teams"`);
        await queryRunner.query(`DROP TABLE "sub1"."countries"`);
        await queryRunner.query(`DROP TABLE "sub1"."states"`);
        await queryRunner.query(`DROP TABLE "sub1"."cities"`);
    }

}
