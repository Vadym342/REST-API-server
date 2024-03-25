import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '@modules/user/entities/user.entity';

@Entity({
  name: 'positions',
})
export class Position {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

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

  @OneToMany(() => User, (user) => user.position)
  users?: User[];
}
