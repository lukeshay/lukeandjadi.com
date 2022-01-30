import * as yup from 'yup';
import { BadRequest } from '../errors/bad-request';

const validate = async <T1, T2, T3, T4, T5>(
  // @ts-expect-error
  schema: yup.ObjectSchema<T1, T2, T3, T4>,
  payload: T5,
): Promise<yup.InferType<typeof schema>> => {
  try {
    return await schema.validate(payload);
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new BadRequest(
        'error validating schema',
        error.errors.reduce(
          (previousValue, currentValue) => ({
            ...previousValue,
            [currentValue]: currentValue,
          }),
          {},
        ),
      );
    }

    throw new BadRequest('error validating schema');
  }
};

export { validate };
