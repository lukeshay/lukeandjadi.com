import React from 'react';

export type FormProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  subTitle: React.ReactNode;
  className?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  notSplit?: boolean;
};

export default function Form({
  children,
  title,
  subTitle,
  className,
  onSubmit,
  notSplit,
}: FormProps) {
  return (
    <div
      className={`${className} block ${
        !notSplit && 'md:flex justify-between'
      } w-full max-w-xl`}
    >
      <div className={`w-full ${!notSplit && 'md:w-1/2'}`}>
        <h1 className="my-6 text-4xl font-bold">{title}</h1>
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
