import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcrypt';

export class SeedDb1638520076497 implements MigrationInterface {
  name = 'SeedDb1638520076497';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('123', 10);

    await queryRunner.query(
      `INSERT INTO users (login, password) VALUES ('foo', '${password}')`,
    );

    await queryRunner.query(
      `INSERT INTO tasks (id, title, "dateStart", done, type, "parentId", author) VALUES (DEFAULT, 'root', null, false, 'folder'::tasks_type_enum, 0, 1)`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
