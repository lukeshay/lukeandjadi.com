import * as yup from 'yup';

import { BadRequestError } from '../errors/bad-request-error';

const validate = async <T1, T2, T3, T4, T5>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  schema: yup.ObjectSchema<T1, T2, T3, T4>,
  payload: T5,
): Promise<yup.InferType<typeof schema>> => {
  try {
    return await schema.validate(payload);
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new BadRequestError(
        'error validating schema',
        // eslint-disable-next-line unicorn/no-array-reduce, unicorn/prefer-object-from-entries
        error.errors.reduce(
          (previousValue, currentValue) => ({
            ...previousValue,
            [currentValue]: currentValue,
          }),
          {},
        ),
      );
    }

    throw new BadRequestError('error validating schema');
  }
};

export { validate };
