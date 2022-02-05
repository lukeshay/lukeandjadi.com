import type { ModelDefined } from 'sequelize-cockroachdb';
import { Sequelize, DataTypes } from 'sequelize-cockroachdb';
import * as pg from 'pg';
import type { PoolOptions } from 'sequelize';

import type { CDCAttributes, CDCCreationAttributes, RSVPAttributes, RSVPCreationAttributes } from '../../types';
import logger from '../logger';
import { config } from '../../config';

const sequelize = new Sequelize(config.get('database.url'), {
  dialect: 'postgres',
  dialectOptions: config.get<object>('database.options'),
  dialectModule: pg,
  logging: (sql, time): void => {
    if (config.get('environment') === 'development') {
      logger.debug(`${time ?? ''} - ${sql}`);
    }
  },
  pool: config.get<PoolOptions>('database.pool'),
  schema: config.get<string>('database.schema'),
});

const commonOpts = {
  timestamps: false,
};

const RSVP: ModelDefined<RSVPAttributes, RSVPCreationAttributes> = sequelize.define(
  'rsvps',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    guests: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 2,
    },
    maxGuests: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 2,
      field: 'max_guests',
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      field: 'user_agent',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('NOW'),
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
      field: 'updated_at',
      onUpdate: 'SET DEFAULT',
    },
  },
  commonOpts,
);

const CDC: ModelDefined<CDCAttributes, CDCCreationAttributes> = sequelize.define(
  'cdc',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'resource_id',
    },
    currentValue: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'current_value',
    },
    previousValue: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'previous_value',
    },
    delta: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('NOW'),
      field: 'created_at',
    },
  },
  commonOpts,
);

export { sequelize, RSVP, CDC };
