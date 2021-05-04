import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum UserRole {
  MasterAdmin = 'MASTER_ADMIN',
  Admin = 'ADMIN',
  Basic = 'BASIC',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Basic,
  })
  role!: UserRole;

  @Column()
  setup = false;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
