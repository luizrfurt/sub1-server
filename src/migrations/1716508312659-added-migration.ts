import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMigration1716508312659 implements MigrationInterface {
    name = 'AddedMigration1716508312659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub1"."cities" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "stateId" integer, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."states" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "uf" character varying NOT NULL, "countryId" integer, CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub1"."countries" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub1"."cities" ADD CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f" FOREIGN KEY ("stateId") REFERENCES "sub1"."states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub1"."states" ADD CONSTRAINT "FK_76ac7edf8f44e80dff569db7321" FOREIGN KEY ("countryId") REFERENCES "sub1"."countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub1"."states" DROP CONSTRAINT "FK_76ac7edf8f44e80dff569db7321"`);
        await queryRunner.query(`ALTER TABLE "sub1"."cities" DROP CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f"`);
        await queryRunner.query(`DROP TABLE "sub1"."countries"`);
        await queryRunner.query(`DROP TABLE "sub1"."states"`);
        await queryRunner.query(`DROP TABLE "sub1"."cities"`);
    }

}
