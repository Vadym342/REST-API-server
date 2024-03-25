import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

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
}
