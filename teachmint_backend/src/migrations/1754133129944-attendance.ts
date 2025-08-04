import { MigrationInterface, QueryRunner } from "typeorm";

export class Attendance1754133129944 implements MigrationInterface {
    name = 'Attendance1754133129944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "classId" integer, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "courseCode" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attendences" ("classId" integer NOT NULL, "studentId" integer NOT NULL, "subjectId" integer NOT NULL, "sessions" jsonb NOT NULL, CONSTRAINT "PK_6ddde580ab3d3f5af4e22a994f2" PRIMARY KEY ("classId", "studentId", "subjectId"))`);
        await queryRunner.query(`CREATE TABLE "teachers_subjects_subject" ("teachersId" uuid NOT NULL, "subjectId" integer NOT NULL, CONSTRAINT "PK_a1f57ab4ad89d2290d5b4f9d1c3" PRIMARY KEY ("teachersId", "subjectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b77397f8ce78e873d6ee760a90" ON "teachers_subjects_subject" ("teachersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_15e17bc28614196bf30cc9df3c" ON "teachers_subjects_subject" ("subjectId") `);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_575e5ce508ee1275f45cb7c4c32" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendences" ADD CONSTRAINT "FK_cbb08f1c2ef9da247350af38b71" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendences" ADD CONSTRAINT "FK_5084eef4947393467cbe5a37f1e" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendences" ADD CONSTRAINT "FK_47045084335d12e114b3714f6cd" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers_subjects_subject" ADD CONSTRAINT "FK_b77397f8ce78e873d6ee760a90e" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teachers_subjects_subject" ADD CONSTRAINT "FK_15e17bc28614196bf30cc9df3c8" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers_subjects_subject" DROP CONSTRAINT "FK_15e17bc28614196bf30cc9df3c8"`);
        await queryRunner.query(`ALTER TABLE "teachers_subjects_subject" DROP CONSTRAINT "FK_b77397f8ce78e873d6ee760a90e"`);
        await queryRunner.query(`ALTER TABLE "attendences" DROP CONSTRAINT "FK_47045084335d12e114b3714f6cd"`);
        await queryRunner.query(`ALTER TABLE "attendences" DROP CONSTRAINT "FK_5084eef4947393467cbe5a37f1e"`);
        await queryRunner.query(`ALTER TABLE "attendences" DROP CONSTRAINT "FK_cbb08f1c2ef9da247350af38b71"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_575e5ce508ee1275f45cb7c4c32"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15e17bc28614196bf30cc9df3c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b77397f8ce78e873d6ee760a90"`);
        await queryRunner.query(`DROP TABLE "teachers_subjects_subject"`);
        await queryRunner.query(`DROP TABLE "attendences"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
