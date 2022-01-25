import type { WhereOptions } from 'sequelize';

import { Account } from '../entities';
import type { AccountAttributes } from '../../types';
import { BadRequest } from '../errors/bad-request';

const getAccount = async (
  properties: WhereOptions<AccountAttributes>,
): Promise<AccountAttributes> => {
  const account = await Account.findOne({ where: properties });

  if (!account) {
    throw new BadRequest('Account not found');
  }

  return account.get();
};

export { getAccount };
