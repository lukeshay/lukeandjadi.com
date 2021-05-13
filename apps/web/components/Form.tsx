import React, { FormEvent } from 'react';

export default function Form({
  children,
  title,
  subTitle,
  onSubmit,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  subTitle: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (event: FormEvent) => Promise<void> | void;
}) {
  return (
    <div className="m-4 rounded-md shadow-lg p-6 w-full max-w-xl border">
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
