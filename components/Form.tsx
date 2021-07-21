import React, { FormEvent } from 'react';

export default function Form({
  children,
  title,
  subTitle,
  className,
  onSubmit,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  subTitle: React.ReactNode;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event: FormEvent) => Promise<void> | void;
}) {
  return (
    <div
      className={`${className} m-4 rounded-md shadow-lg p-6 w-full max-w-xl border bg-white bg-opacity-95`}
    >
      <div>
        <h1 className="text-4xl font-bold pb-4 text-center">{title}</h1>
        <p className="text-gray-700">{subTitle}</p>
      </div>
      <form className="pt-4" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}
