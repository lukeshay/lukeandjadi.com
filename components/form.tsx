import React from 'react';
import classNames from 'classnames';

type FormProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  subTitle: React.ReactNode;
  className?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  notSplit?: boolean;
};

const Form = ({ children, title, subTitle, className, onSubmit, notSplit }: FormProps): JSX.Element => (
  <div className={classNames(className, 'block', !notSplit && 'justify-between md:flex', 'w-full max-w-xl')}>
    <div className={classNames('w-full', !notSplit && 'md:w-1/2')}>
      <h1 className="my-6 text-center text-4xl font-bold md:text-left">{title}</h1>
      <p className="text-lg leading-8 text-gray-500 md:text-base">{subTitle}</p>
    </div>
    <form className={classNames('w-full pt-4', !notSplit && 'md:w-1/2')} onSubmit={onSubmit}>
      {children}
    </form>
  </div>
);

export type { FormProps };
export default Form;
