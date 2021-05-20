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

export const selectAccountByEmail = async (
  e: string,
): Promise<Readonly<Account>> => (await Accounts().where('email', e))[0];

export const insertAccount = async (
  account: Account,
): Promise<Readonly<Account>> => {
  await Accounts().insert(account);
  return selectAccountByEmail(account.email);
};

export const updateAccount = async ({
  id,
  email,
  role,
}: Account): Promise<Readonly<Account>> => {
  await Accounts()
    .update({
      email,
      role,
    })
    .where({ id });
  return selectAccountByEmail(email);
};

export const mergeAccounts = (a1: Account, a2: any): Readonly<Account> => {
  const merged = { ...a1 };

  if (a2.email) {
    merged.email = a2.email;
  }

  return merged;
};
