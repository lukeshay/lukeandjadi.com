import { Optional } from 'sequelize-cockroachdb';

export interface BaseAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CDCAttributes extends BaseAttributes {
  id: string;
  resource: string;
  resourceId: string;
  currentValue: any | null;
  previousValue: any | null;
  delta: any | null;
}

export interface CDCCreationAttributes extends Optional<CDCAttributes, 'id'> {}

export interface RSVPAttributes extends BaseAttributes {
  id: string;
  email?: string;
  guests: number;
  maxGuests: number;
  name: string;
  userAgent?: string;
}

export interface RSVPCreationAttributes
  extends Optional<RSVPAttributes, 'id' | 'email' | 'guests' | 'maxGuests'> {}
