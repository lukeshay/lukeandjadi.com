import { diff } from 'deep-diff';

import type { CDCAttributes } from '../../types';
import { CDC } from '../entities';

const captureChange = async (
  resource: string,
  resourceId: string,
  value: any,
): Promise<void> => {
  const latest = (
    await CDC.findOne({
      where: {
        resource,
        resourceId,
      },
      order: [['createdAt', 'DESC']],
    })
  )?.get();

  const latestValue = latest?.currentValue ?? null;

  await CDC.create({
    resource,
    resourceId,
    currentValue: value,
    previousValue: latestValue,
    delta: diff(latestValue, value),
  });
};

const getAllChangesByResource = async (
  resource: string,
): Promise<CDCAttributes[]> =>
  (
    await CDC.findAll({
      where: {
        resource,
      },
      order: [['createdAt', 'DESC']],
    })
  ).map((cdc) => cdc.get());

export { captureChange, getAllChangesByResource };
