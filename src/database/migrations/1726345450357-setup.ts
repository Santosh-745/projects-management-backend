import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1726345450357 implements MigrationInterface {
    name = 'Setup1726345450356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "budget" integer NOT NULL, "noOfPositions" integer NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "designation" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_8c84a3c335a852ff2d426cb0112" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "position" ("id" SERIAL NOT NULL, "budget" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "projectId" integer, "designationId" integer, "departmentId" integer, "locationId" integer, "updatedBy" integer, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_20a033c834815978b6e41c35f54" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_4dc17f5aebec68b8fee350b2fc4" FOREIGN KEY ("designationId") REFERENCES "designation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_265308a419e87c0f9eb399099da" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_900ce9d9177baef18bc52a6b25f" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_b246381b41d4602a4fb844c1409" FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_b246381b41d4602a4fb844c1409"`);
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_900ce9d9177baef18bc52a6b25f"`);
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_265308a419e87c0f9eb399099da"`);
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_4dc17f5aebec68b8fee350b2fc4"`);
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_20a033c834815978b6e41c35f54"`);
        await queryRunner.query(`DROP TABLE "position"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "designation"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
