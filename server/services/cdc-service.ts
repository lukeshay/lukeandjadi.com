import { diff } from 'deep-diff';
import { deepEqual } from 'fast-equals';
import flush from 'just-flush';
import type { WhereOptions } from 'sequelize';

import logger from '../infrastructure/logger';
import type { CDCAttributes } from '../../types';
import { CDC } from '../entities';

const getCDC = async (properties: WhereOptions<CDCAttributes>): Promise<CDCAttributes | undefined> => {
  const cdc = await CDC.findOne({ where: properties });

  if (!cdc) {
    return undefined;
  }

  return cdc.get();
};

const scrubSensitiveData = <T>(value?: T): Partial<T | undefined> =>
  value
    ? (flush({
        ...value,
        createdAt: undefined,
        deletedAt: undefined,
        password: undefined,
        updatedAt: undefined,
      }) as Partial<T>)
    : undefined;

const captureChange = async <T>(resource: string, resourceId: string, value?: T): Promise<void> => {
  try {
    const cdc = await getCDC({
      resource,
      resourceId,
    });

    const latestValue = cdc?.currentValue ?? undefined;
    const flushedValue = scrubSensitiveData(value);

    if (!deepEqual(latestValue, flushedValue)) {
      await CDC.create({
        currentValue: flushedValue,
        delta: diff(latestValue, flushedValue),
        previousValue: latestValue,
        resource,
        resourceId,
      });
    }
  } catch (error) {
    logger.error(`Error capturing change: ${(error as Error).message}`, {
      ...(error as Error),
      resource,
      resourceId,
      value,
    });
  }
};

const getAllChangesByResource = async (resource: string): Promise<CDCAttributes[]> => {
  const cdcs = await CDC.findAll({
    order: [['createdAt', 'DESC']],
    where: {
      resource,
    },
  });

  return cdcs.map((cdc) => cdc.get());
};

export { captureChange, getAllChangesByResource };
