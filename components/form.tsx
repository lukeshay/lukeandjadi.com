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
  <div className={classNames(className, 'block', !notSplit && 'md:flex justify-between', 'w-full max-w-xl')}>
    <div className={classNames('w-full', !notSplit && 'md:w-1/2')}>
      <h1 className="my-6 text-4xl font-bold text-center md:text-left">{title}</h1>
      <p className="text-gray-500 text-lg md:text-base leading-8">{subTitle}</p>
    </div>
    <form className={classNames('pt-4 w-full', !notSplit && 'md:w-1/2')} onSubmit={onSubmit}>
      {children}
    </form>
  </div>
);

export type { FormProps };
export default Form;
