import {
  Sequelize,
  DataTypes,
  ModelDefined,
  Optional,
} from 'sequelize-cockroachdb';

const sequelize = new Sequelize(process.env.DSN || '', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: process.env.NODE_ENV === 'development',
});

const commonOpts = {
  timestamps: false,
};

export interface AccountAttributes {
  id: number;
  email: string;
  role: 'BASIC' | 'ADMIN' | 'MASTER_ADMIN';
}
export interface AccountCreationAttributes
  extends Optional<AccountAttributes, 'id' | 'role'> {}

const Account: ModelDefined<AccountAttributes, AccountCreationAttributes> =
  sequelize.define(
    'accounts',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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

export interface RSVPAttributes {
  id: number;
  email?: string;
  guests: number;
  maxGuests: number;
  name: string;
}
export interface RSVPCreationAttributes
  extends Optional<RSVPAttributes, 'id' | 'email' | 'guests' | 'maxGuests'> {}

const RSVP: ModelDefined<RSVPAttributes, RSVPCreationAttributes> =
  sequelize.define(
    'rsvps',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
  await Account.sync({ force: false });
  await RSVP.sync({ force: false });
}

export { sequelize, Account, RSVP };
