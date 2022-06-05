import classNames from 'classnames';
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
        className={classNames(
            className,
            'shadow-sn my-2 flex items-center justify-center rounded bg-accent-500 px-4 py-2.5 text-center text-gray-800 duration-200 ease-in-out hover:opacity-75',
            (loading || disabled) && 'cursor-not-allowed hover:opacity-100'
        )}
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        disabled={loading || disabled}
        onClick={onClick}
        // eslint-disable-next-line react/button-has-type
        type={type}
    >
        {loading && <div className="lds-dual-ring" />}
        {children}
    </button>
);

export default Button;
