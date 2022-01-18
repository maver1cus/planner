import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasks1640805411029 implements MigrationInterface {
  name = 'CreateTasks1640805411029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."tasks_type_enum" AS ENUM('project', 'task', 'folder')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "dateStart" TIMESTAMP, "done" boolean NOT NULL, "type" "public"."tasks_type_enum" NOT NULL DEFAULT 'task', "parentId" integer NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TYPE "public"."tasks_type_enum"`);
  }
}
