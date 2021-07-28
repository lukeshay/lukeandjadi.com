import {
  Entity as TOEntity,
  Column,
  Index,
  Unique,
  BeforeInsert,
} from 'typeorm';
import Entity from './entity';

export enum AccountRole {
  MasterAdmin = 'MASTER_ADMIN',
  Admin = 'ADMIN',
  Basic = 'BASIC',
}

@TOEntity('users')
@Unique('unique_email', ['email'])
export class Account extends Entity {
  constructor(account: Partial<Account>) {
    super();
    Object.assign(this, account);
  }

  @Column()
  @Index()
  // @ts-expect-error
  email: string;

  @Column({ enum: ['MASTER_ADMIN', 'ADMIN', 'BASIC'] })
  // @ts-expect-error
  role: string;

  @BeforeInsert()
  beforeInsert() {
    if (!this.role) {
      this.role = AccountRole.Basic;
    }
  }
}
