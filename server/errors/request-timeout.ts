import { StatusCodes } from '@lukeshay/next-router';
import { APIError } from './api-error';

export class RequestTimeout extends APIError {
  constructor(
    message: string,
    errors?: Record<string, string>,
    stack?: string | undefined,
  ) {
    super(
      'REQUEST_TIMEOUT',
      StatusCodes.REQUEST_TIMEOUT,
      message,
      errors,
      stack,
    );
  }
}
