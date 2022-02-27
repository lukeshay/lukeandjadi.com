const getStackTrace = (err: object = new Error('error')): string | undefined => {
  Error.captureStackTrace(err);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
  return (err as any).stack;
};

export { getStackTrace };
