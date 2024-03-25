import { QueryRunner } from 'typeorm';

import { BaseMigration } from '@src/database/base-migrations';

export class AlterTableUserAddPosition1711382585939 extends BaseMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`
      ALTER TABLE users
        ADD COLUMN position_id INTEGER;
    `);

    await queryRunner.query(`
      ALTER TABLE users
        ADD CONSTRAINT fk_users_position_id FOREIGN KEY (position_id)
          REFERENCES positions(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`
      ALTER TABLE users
        DROP CONSTRAINT fk_users_position_id;
    `);

    await queryRunner.query(`
      ALTER TABLE users
        DROP COLUMN position_id;
`);
  }
}
