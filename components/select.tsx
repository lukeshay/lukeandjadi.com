import type { ChangeEventHandler } from 'react';
import classNames from 'classnames';

type Option = { key: number | string | undefined; value: number | string; disabled?: boolean };

type SelectProps = {
  label: string;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: Option[];
  required?: boolean;
  loading?: boolean;
  selected: number | string | undefined;
  id: string;
  name: string;
  autoComplete: string;
};

const Select = ({
  options,
  selected,
  loading,
  name,
  autoComplete,
  id,
  onChange,
  label,
  required = false,
  disabled = false,
}: SelectProps): JSX.Element => (
  <div className="my-4 md:my-2">
    <label className="font-medium text-gray-700" htmlFor={id}>
      {label}
      {required && <span className="text-red-500">{' *'}</span>}
    </label>
    {!loading && (
      <select
        autoComplete={autoComplete}
        className={classNames(
          'my-1 w-full rounded border p-2 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500',
          disabled && 'cursor-not-allowed bg-gray-300 ring-0',
        )}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        required={required}
        value={selected}
      >
        {options.map(({ key, value, disabled: optionDisabled }) => (
          <option disabled={optionDisabled} key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    )}
  </div>
);

export type { SelectProps, Option };
export default Select;
