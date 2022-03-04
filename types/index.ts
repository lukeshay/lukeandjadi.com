import type { Optional } from 'sequelize-cockroachdb';
import type { Diff } from 'deep-diff';

type BaseAttributes = {
  createdAt?: Date;
  updatedAt?: Date;
};

type CDCAttributes = BaseAttributes & {
  id: string;
  resource: string;
  resourceId: string;
  currentValue?: Record<string, unknown>;
  previousValue?: Record<string, unknown>;
  delta?: Diff<unknown, unknown>[];
};

type CDCCreationAttributes = Optional<CDCAttributes, 'id'> & {};

type RSVPAttributes = BaseAttributes & {
  id: string;
  email?: string | null;
  guests: number;
  maxGuests: number;
  name: string;
  userAgent?: string | null;
};

type RSVPCreationAttributes = Optional<RSVPAttributes, 'email' | 'guests' | 'id' | 'maxGuests'> & {};

export type { BaseAttributes, CDCAttributes, CDCCreationAttributes, RSVPAttributes, RSVPCreationAttributes };
