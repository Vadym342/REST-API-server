import { QueryRunner } from 'typeorm';

import { BaseMigration } from '@src/database/base-migrations';

export class CreateTablePosition1711382353401 extends BaseMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`
      CREATE TABLE positions (
        id               SMALLSERIAL                           NOT NULL,
        name             VARCHAR(50)                           NOT NULL,
        created_date     TIMESTAMP   DEFAULT current_timestamp NOT NULL,
        updated_date     TIMESTAMP   DEFAULT current_timestamp NOT NULL,
        deleted_date     TIMESTAMP,
        CONSTRAINT pk_positions PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`DROP TABLE positions;`);
  }
}
