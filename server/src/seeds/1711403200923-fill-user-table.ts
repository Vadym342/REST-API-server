import { In, MigrationInterface, QueryRunner } from 'typeorm';

import { entityUsers } from '@src/constants/seed';

import { User } from '@modules/user/entities/user.entity';

const { NODE_ENV } = process.env;

export class FillUserTable1711403200923 implements MigrationInterface {
  private readonly data = entityUsers[NODE_ENV];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).insert(this.data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).delete({
      id: In(this.data.map((user) => user.id)),
    });
  }
}
