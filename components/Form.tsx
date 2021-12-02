import React from 'react';

export default function Form({
  children,
  title,
  subTitle,
  className,
  onSubmit,
  notSplit,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  subTitle: React.ReactNode;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  notSplit?: boolean;
}) {
  return (
    <div
      className={`${className} block ${
        !notSplit && 'md:flex justify-between'
      } w-full max-w-screen-xl`}
    >
      <div className={`w-full ${!notSplit && 'md:w-1/2'}`}>
        <h1 className="text-4xl font-bold my-6">{title}</h1>
        <p className="text-gray-700">{subTitle}</p>
      </div>
      <form
        className={`pt-4 w-full ${!notSplit && 'md:w-1/2'}`}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  );
}
