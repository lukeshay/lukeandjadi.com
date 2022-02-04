import type { ChangeEventHandler } from 'react';
import classNames from 'classnames';

const Input = ({
  label,
  id,
  name,
  autoComplete,
  onChange,
  value,
  required = false,
  disabled = false,
  type = 'input',
  loading = false,
  checked,
  max,
  min,
}: {
  label: string;
  id: string;
  name: string;
  autoComplete: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: number | string | null;
  required?: boolean;
  disabled?: boolean;
  type?: 'checkbox' | 'input' | 'number';
  loading?: boolean;
  checked?: boolean;
  max?: number;
  min?: number;
}): JSX.Element => (
  <div className="my-4 md:my-2">
    <label className="font-medium text-gray-700" htmlFor={id}>
      {label}
      {required && <span className="text-red-500">{'&nbsp;*'}</span>}
    </label>
    {!loading && (
      <input
        autoComplete={autoComplete}
        checked={checked}
        className={classNames(
          'w-full border rounded p-2 my-1 outline-none focus:ring-2 ring-accent-500',
          disabled && 'cursor-not-allowed bg-gray-300 ring-0',
        )}
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        name={name}
        onChange={onChange}
        required={required}
        type={type}
        value={value === null ? undefined : value}
      />
    )}
  </div>
);

export default Input;
