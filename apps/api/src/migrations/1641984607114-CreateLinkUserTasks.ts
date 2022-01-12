import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateLinkUserTasks1641984607114 implements MigrationInterface {
    name = 'CreateLinkUserTasks1641984607114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "authorId"`);
    }

}
