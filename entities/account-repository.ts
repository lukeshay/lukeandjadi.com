import { getRepository } from 'typeorm';
import { Account } from './account';

export async function selectAccountByEmail(email: string) {
  return getRepository(Account)
    .createQueryBuilder()
    .where('email = :email', { email })
    .getOne();
}

export function mergeAccounts(
  a1: Account,
  a2: any,
): Readonly<Partial<Account>> {
  const merged = { ...a1 };

  if (a2.email) {
    merged.email = a2.email;
  }

  return merged;
}

export async function updateAccount(account: Account) {
  return getRepository(Account)
    .createQueryBuilder()
    .update(Account)
    .set(account)
    .where('id = :id', { id: account.id })
    .execute();
}
