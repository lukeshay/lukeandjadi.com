import { StatusCodes } from '@lukeshay/next-router';

import { APIError } from './api-error';

export class BadRequestError extends APIError {
  public constructor(message: string, errors?: Record<string, string>, stack?: string | undefined) {
    super('BAD_REQUEST', StatusCodes.BAD_REQUEST, message, errors, stack);

    this.name = 'BadRequestError';
  }
}
