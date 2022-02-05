abstract class APIError extends Error {
  public readonly isAPIError = true;
  public readonly type: string;
  public readonly statusCode: number;
  public readonly errors?: Record<string, string>;
  public readonly stack?: string | undefined;

  protected constructor(
    type: string,
    statusCode: number,
    message: string,
    errors?: Record<string, string>,
    stack?: string | undefined,
  ) {
    super(message);

    this.stack = stack;
    this.errors = errors;
    this.statusCode = statusCode;
    this.type = type;

    this.name = 'APIError';
  }

  public toJSON(): Record<string, unknown> {
    return {
      errors: this.errors,
      message: this.message,
      name: this.name,
      stack: this.stack,
      statusCode: this.statusCode,
      type: this.type,
    };
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any */

const isError = (error: any): error is Error => error.hasOwnProperty('name') && error.hasOwnProperty('message');

const isAPIError = (error: any): error is APIError =>
  error.hasOwnProperty('statusCode') && error.hasOwnProperty('isAPIError') && error.isAPIError;

/* eslint-enable */

export { APIError, isAPIError, isError };
