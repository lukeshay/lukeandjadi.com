import type { ModelDefined } from 'sequelize-cockroachdb';
import { Sequelize, DataTypes } from 'sequelize-cockroachdb';
import * as pg from 'pg';
import type { PoolOptions } from 'sequelize';

import type { CDCAttributes, CDCCreationAttributes, RSVPAttributes, RSVPCreationAttributes } from '../../types';
import logger from '../logger';
import { config } from '../../config';

const sequelize = new Sequelize(config.get('database.url'), {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: config.get<object>('database.options'),
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
    createdAt: {
      allowNull: true,
      defaultValue: Sequelize.fn('NOW'),
      field: 'created_at',
      type: DataTypes.DATE,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    guests: {
      allowNull: false,
      defaultValue: 2,
      type: DataTypes.SMALLINT,
    },
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    maxGuests: {
      allowNull: false,
      defaultValue: 2,
      field: 'max_guests',
      type: DataTypes.SMALLINT,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
      field: 'updated_at',
      onUpdate: 'SET DEFAULT',
      type: DataTypes.DATE,
    },
    userAgent: {
      allowNull: true,
      field: 'user_agent',
      type: DataTypes.STRING,
      unique: false,
    },
  },
  commonOpts,
);

const CDC: ModelDefined<CDCAttributes, CDCCreationAttributes> = sequelize.define(
  'cdc',
  {
    createdAt: {
      allowNull: true,
      defaultValue: Sequelize.fn('NOW'),
      field: 'created_at',
      type: DataTypes.DATE,
    },
    currentValue: {
      allowNull: true,
      field: 'current_value',
      type: DataTypes.JSON,
    },
    delta: {
      allowNull: true,
      type: DataTypes.JSON,
    },
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    previousValue: {
      allowNull: true,
      field: 'previous_value',
      type: DataTypes.JSON,
    },
    resource: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    resourceId: {
      allowNull: false,
      field: 'resource_id',
      type: DataTypes.UUID,
    },
  },
  commonOpts,
);

export { sequelize, RSVP, CDC };
