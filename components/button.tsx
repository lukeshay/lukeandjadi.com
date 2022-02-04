import React from 'react';

const Button = ({
  disabled,
  loading,
  type = 'button',
  className = '',
  children,
  onClick,
}: {
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => (
  <button
    className={`${className} bg-accent-500 hover:opacity-75 text-gray-800 my-2 px-4 py-2.5 rounded shadow-sn flex justify-center text-center items-center ease-in-out duration-200`}
    disabled={loading ?? disabled}
    onClick={onClick}
    type={type} // eslint-disable-line react/button-has-type
  >
    {loading && <div className="lds-dual-ring" />}
    {children}
  </button>
);

export default Button;
