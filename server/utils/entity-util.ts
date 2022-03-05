import { isEqual, formatISO } from 'date-fns';

import type { BaseAttributes, SerializedAttributes } from '../../types';

const serialize = <T extends BaseAttributes, U extends SerializedAttributes<T>>(attributes: T): U =>
  ({
    ...attributes,
    changed: !isEqual(attributes.createdAt ?? 0, attributes.updatedAt ?? 0),
    createdAt: formatISO(attributes.createdAt ?? 0),
    updatedAt: formatISO(attributes.updatedAt ?? 0),
  } as unknown as U);

export { serialize };
