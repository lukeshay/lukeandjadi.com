import { Optional } from 'sequelize-cockroachdb';

export interface AccountAttributes {
  id: string;
  email: string;
  role: 'BASIC' | 'ADMIN' | 'MASTER_ADMIN';
}
export interface AccountCreationAttributes
  extends Optional<AccountAttributes, 'id' | 'role'> {}

export interface RSVPAttributes {
  id: string;
  email?: string;
  guests: number;
  maxGuests: number;
  name: string;
}
export interface RSVPCreationAttributes
  extends Optional<RSVPAttributes, 'id' | 'email' | 'guests' | 'maxGuests'> {}
