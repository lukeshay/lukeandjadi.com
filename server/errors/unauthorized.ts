import { StatusCodes } from '@lukeshay/next-router';
import { APIError } from './api-error';

export class Unauthorized extends APIError {
  constructor(
    message: string,
    errors?: Record<string, string>,
    stack?: string | undefined,
  ) {
    super('UNAUTHORIZED', StatusCodes.UNAUTHORIZED, message, errors, stack);
  }
}
