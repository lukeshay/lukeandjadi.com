import { diff } from 'deep-diff';
import { deepEqual } from 'fast-equals';
import flush from 'just-flush';
import logger from 'server/logger';

import type { CDCAttributes } from '../../types';
import { CDC } from '../entities';

const captureChange = async (
  resource: string,
  resourceId: string,
  value: any,
): Promise<void> => {
  try {
    const latest = (
      await CDC.findOne({
        where: {
          resource,
          resourceId,
        },
        order: [['createdAt', 'DESC']],
      })
    )?.get();

    const flushedValue = flush({
      ...value,
      createdAt: undefined,
      updatedAt: undefined,
    });

    const latestValue = latest?.currentValue ?? null;

    if (!deepEqual(latestValue, flushedValue)) {
      await CDC.create({
        resource,
        resourceId,
        currentValue: flushedValue,
        previousValue: latestValue,
        delta: diff(latestValue, flushedValue),
      });
    }
  } catch (e) {
    logger.error(`Error capturing change: ${(e as Error).message}`, {
      ...(e as Error),
      resource,
      resourceId,
      value,
    });
  }
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
