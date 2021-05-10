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
  reception?: number;
  ceremony?: number;
}

interface AccountSnake {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  role: AccountRole;
  reception?: number;
  ceremony?: number;
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
  } = accounts[0];
  return {
    id,
    email,
    role,
    reception,
    ceremony,
    firstName,
    lastName,
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
}: Account): Promise<Readonly<Account>> {
  await Accounts().insert({
    id,
    email,
    role,
    reception,
    ceremony,
    first_name,
    last_name,
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
}: Account): Promise<Readonly<Account>> {
  await Accounts()
    .update({
      email,
      role,
      reception,
      ceremony,
      first_name,
      last_name,
    })
    .where({ id });
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

  if (a2.ceremony) {
    merged.ceremony = a2.ceremony;
  }

  if (a2.reception) {
    merged.reception = a2.reception;
  }

  return merged;
}
