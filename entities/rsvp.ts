import { Column, Entity as TOEntity } from 'typeorm';
import Entity from './entity';

@TOEntity('users')
export class RSVP extends Entity {
  constructor(account: Partial<RSVP>) {
    super();
    Object.assign(this, account);
  }

  @Column()
  name!: string;

  @Column()
  email?: string;

  @Column()
  guests?: number;
}
