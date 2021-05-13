import connection from './connection';

// eslint-disable-next-line no-shadow
export enum AccountRole {
  MasterAdmin = 'MASTER_ADMIN',
  Admin = 'ADMIN',
  Basic = 'BASIC',
}

export interface Account {
  id: number;
  email: string;
  role: AccountRole;
}

export const Accounts = () => connection.table<Account>('accounts');

export async function selectAccountByEmail(
  e: string,
): Promise<Readonly<Account>> {
  return (await Accounts().where('email', e))[0];
}

export async function insertAccount(
  account: Account,
): Promise<Readonly<Account>> {
  await Accounts().insert(account);
  return selectAccountByEmail(account.email);
}

export async function updateAccount({
  id,
  email,
  role,
}: Account): Promise<Readonly<Account>> {
  await Accounts()
    .update({
      email,
      role,
    })
    .where({ id });
  return selectAccountByEmail(email);
}

export function mergeAccounts(a1: Account, a2: any): Readonly<Account> {
  const merged = { ...a1 };

  if (a2.email) {
    merged.email = a2.email;
  }

  return merged;
}
