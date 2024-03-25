import { In, MigrationInterface, QueryRunner } from 'typeorm';

import { entityPositions } from '@src/constants/seed';

import { Position } from '@modules/position/entities/position.entity';

const { NODE_ENV } = process.env;

export class FillPositionTable1711402906215 implements MigrationInterface {
  private readonly data = entityPositions[NODE_ENV];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Position).insert([
      {
        id: this.data[0].id,
        name: this.data[0].name,
      },
      {
        id: this.data[1].id,
        name: this.data[1].name,
      },
      {
        id: this.data[2].id,
        name: this.data[2].name,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Position).delete({
      id: In(this.data.map((position) => position.id)),
    });
  }
}
