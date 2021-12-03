import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcrypt';

export class SeedDb1638520076497 implements MigrationInterface {
  name = 'SeedDb1638520076497'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('123', 10);

    await queryRunner.query(
      `INSERT INTO users (login, password) VALUES ('foo', '${password}')`,
    );
  }

  public async down(): Promise<void> {}
}
