import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class Entity extends BaseEntity {
  @PrimaryGeneratedColumn()
  // @ts-expect-error
  id: number;

  @CreateDateColumn()
  // @ts-expect-error
  createdAt: Date;

  @UpdateDateColumn()
  // @ts-expect-error
  updatedAt: Date;
}
