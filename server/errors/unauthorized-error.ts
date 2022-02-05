import { StatusCodes } from '@lukeshay/next-router';

import { APIError } from './api-error';

export class UnauthorizedError extends APIError {
  public constructor(message: string, errors?: Record<string, string>, stack?: string | undefined) {
    super('UNAUTHORIZED', StatusCodes.UNAUTHORIZED, message, errors, stack);

    this.name = 'UnauthorizedError';
  }
}
