/* eslint-disable camelcase */
import connection from './connection';

export enum AccountRole {
  MasterAdmin = 'MASTER_ADMIN',
  Admin = 'ADMIN',
  Basic = 'BASIC',
}

export interface Account {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  role: AccountRole;
  reception: boolean;
  ceremony: boolean;
  numberOfGuests?: number;
}

interface AccountSnake {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  role: AccountRole;
  reception: boolean;
  ceremony: boolean;
  number_of_guests?: number;
}

export const Accounts = () => connection.table<AccountSnake>('accounts');

export async function selectAccountByEmail(
  e: string,
): Promise<Readonly<Account>> {
  const accounts = await Accounts().where('email', e);
  const {
    id,
    email,
    role,
    reception,
    ceremony,
    first_name: firstName,
    last_name: lastName,
    number_of_guests: numberOfGuests,
  } = accounts[0];
  return {
    id,
    email,
    role,
    reception,
    ceremony,
    firstName,
    lastName,
    numberOfGuests,
  };
}

export async function insertAccount({
  id,
  email,
  role,
  reception,
  ceremony,
  firstName: first_name,
  lastName: last_name,
  numberOfGuests: number_of_guests,
}: Account): Promise<Readonly<Account>> {
  await Accounts().insert({
    id,
    email,
    role,
    reception,
    ceremony,
    first_name,
    last_name,
    number_of_guests,
  });
  return selectAccountByEmail(email);
}

export async function updateAccount({
  id,
  email,
  role,
  reception,
  ceremony,
  firstName: first_name,
  lastName: last_name,
  numberOfGuests: number_of_guests,
}: Account): Promise<Readonly<Account>> {
  await Accounts().update({
    id,
    email,
    role,
    reception,
    ceremony,
    first_name,
    last_name,
    number_of_guests,
  });
  return selectAccountByEmail(email);
}

export function mergeAccounts(a1: Account, a2: any): Readonly<Account> {
  const merged = { ...a1 };

  if (a2.email) {
    merged.email = a2.email;
  }

  if (a2.firstName) {
    merged.firstName = a2.firstName;
  }

  if (a2.lastName) {
    merged.lastName = a2.lastName;
  }

  if (a2.ceremony !== undefined) {
    merged.ceremony = a2.ceremony;
  }

  if (a2.reception !== undefined) {
    merged.reception = a2.reception;
  }

  if (a2.numberOfGuests) {
    merged.numberOfGuests = a2.numberOfGuests;
  }

  return merged;
}
