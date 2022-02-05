import { StatusCodes } from '@lukeshay/next-router';

import { APIError } from './api-error';

export class RequestTimeoutError extends APIError {
  public constructor(message: string, errors?: Record<string, string>, stack?: string | undefined) {
    super('REQUEST_TIMEOUT', StatusCodes.REQUEST_TIMEOUT, message, errors, stack);

    this.name = 'RequestTimeoutError';
  }
}
