const classNames = (...args: (boolean | string | null | undefined)[]): string => args.filter(Boolean).join(' ');

export { classNames };
