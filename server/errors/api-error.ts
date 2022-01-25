export abstract class APIError extends Error {
  isAPIError = true;

  constructor(
    public name: string,
    public statusCode: number,
    public message: string,
    public errors?: Record<string, string>,
    public stack?: string | undefined,
  ) {
    super(message);
  }

  toJSON() {
    return {
      message: this.message,
      errors: this.errors,
      stack: this.stack,
      name: this.name,
      statusCode: this.statusCode,
    };
  }
}

export const isAPIError = (error: any): error is APIError =>
  error.hasOwnProperty('isAPIError') &&
  error.hasOwnProperty('statusCode') &&
  error.isAPIError === true &&
  isError(error);

export const isError = (error: any): error is Error => {
  return error.hasOwnProperty('name') && error.hasOwnProperty('message');
};
