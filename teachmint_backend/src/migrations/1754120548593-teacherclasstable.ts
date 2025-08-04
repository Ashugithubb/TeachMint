import { MigrationInterface, QueryRunner } from "typeorm";

export class Teacherclasstable1754120548593 implements MigrationInterface {
    name = 'Teacherclasstable1754120548593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_7568c49a630907119e4a665c605" UNIQUE ("email"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "acadmicYear" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "adminId" integer, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes_teacher_teachers" ("classesId" integer NOT NULL, "teachersId" uuid NOT NULL, CONSTRAINT "PK_39f3f5e8541360429b005cfff4c" PRIMARY KEY ("classesId", "teachersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4dbc84e8fae1c3ed957c0a2da0" ON "classes_teacher_teachers" ("classesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d709c8e07705cfb75bedfe0b56" ON "classes_teacher_teachers" ("teachersId") `);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_8b5f2d84efeded6c96047bd32fb" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes_teacher_teachers" ADD CONSTRAINT "FK_4dbc84e8fae1c3ed957c0a2da0a" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classes_teacher_teachers" ADD CONSTRAINT "FK_d709c8e07705cfb75bedfe0b56c" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    
        await queryRunner.query(`ALTER SEQUENCE classes_id_seq RESTART WITH 101;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_teacher_teachers" DROP CONSTRAINT "FK_d709c8e07705cfb75bedfe0b56c"`);
        await queryRunner.query(`ALTER TABLE "classes_teacher_teachers" DROP CONSTRAINT "FK_4dbc84e8fae1c3ed957c0a2da0a"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_8b5f2d84efeded6c96047bd32fb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d709c8e07705cfb75bedfe0b56"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4dbc84e8fae1c3ed957c0a2da0"`);
        await queryRunner.query(`DROP TABLE "classes_teacher_teachers"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
    }

}
