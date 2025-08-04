import { MigrationInterface, QueryRunner } from "typeorm";

export class TeacherTables1754160914007 implements MigrationInterface {
    name = 'TeacherTables1754160914007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_7568c49a630907119e4a665c605" UNIQUE ("email"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "class_subject_teacher" DROP COLUMN "teacherId"`);
        await queryRunner.query(`ALTER TABLE "class_subject_teacher" ADD "teacherId" integer`);
        await queryRunner.query(`ALTER TABLE "class_subject_teacher" ADD CONSTRAINT "FK_0b6bd4a8073e03b764b8a158ab1" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class_subject_teacher" DROP CONSTRAINT "FK_0b6bd4a8073e03b764b8a158ab1"`);
        await queryRunner.query(`ALTER TABLE "class_subject_teacher" DROP COLUMN "teacherId"`);
        await queryRunner.query(`ALTER TABLE "class_subject_teacher" ADD "teacherId" uuid`);
        await queryRunner.query(`DROP TABLE "teachers"`);
    }

}
