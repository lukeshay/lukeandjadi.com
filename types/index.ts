import { Optional } from 'sequelize-cockroachdb';

export interface CDCAttributes {
  id: string;
  resource: string;
  resourceId: string;
  currentValue: any | null;
  previousValue: any | null;
  delta: any | null;
}

export interface CDCCreationAttributes extends Optional<CDCAttributes, 'id'> {}

export interface RSVPAttributes {
  id: string;
  email?: string;
  guests: number;
  maxGuests: number;
  name: string;
}

export interface RSVPCreationAttributes
  extends Optional<RSVPAttributes, 'id' | 'email' | 'guests' | 'maxGuests'> {}
