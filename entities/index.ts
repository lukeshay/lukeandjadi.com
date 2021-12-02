import {
  AccountAttributes,
  AccountCreationAttributes,
  RSVPAttributes,
  RSVPCreationAttributes,
} from '@/types';
import { Sequelize, DataTypes, ModelDefined } from 'sequelize-cockroachdb';
import * as pg from 'pg';

const sequelize = new Sequelize(process.env.DSN || '', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  dialectModule: pg,
  logging: true,
});

const commonOpts = {
  timestamps: false,
};

const Account: ModelDefined<AccountAttributes, AccountCreationAttributes> =
  sequelize.define(
    'accounts',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM('BASIC', 'ADMIN', 'MASTER_ADMIN'),
        allowNull: false,
        defaultValue: 'BASIC',
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

const RSVP: ModelDefined<RSVPAttributes, RSVPCreationAttributes> =
  sequelize.define(
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
        defaultValue: 10,
        field: 'max_guests',
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

export async function sync() {
  await Account.sync({ force: true });
  await RSVP.sync({ force: true });
}

export { sequelize, Account, RSVP };
