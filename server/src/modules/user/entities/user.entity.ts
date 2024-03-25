import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Position } from '@modules/position/entities/position.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({
    name: 'position_id',
    type: 'int',
    nullable: false,
  })
  positionId: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 13,
    nullable: false,
  })
  phone: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'photo',
    type: 'varchar',
    nullable: false,
  })
  photo: string;

  @CreateDateColumn({
    name: 'created_date',
    type: 'timestamptz',
    nullable: false,
  })
  createdDate: Date;

  @UpdateDateColumn({
    name: 'updated_date',
    type: 'timestamptz',
    nullable: false,
  })
  updatedDate: Date | null;

  @DeleteDateColumn({
    name: 'deleted_date',
    type: 'timestamptz',
    nullable: true,
  })
  deletedDate: Date | null;

  @ManyToOne(() => Position, (position) => position.users)
  @JoinColumn({
    name: 'position_id',
  })
  position: Position;
}
