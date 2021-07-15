import { ChangeEventHandler } from 'react';

export default function Input({
  label,
  id,
  name,
  autoComplete,
  onChange,
  value,
  required,
  disabled,
  type,
  loading,
  checked,
}: {
  label: string;
  id: string;
  name: string;
  autoComplete: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string | null | number;
  required?: boolean;
  disabled?: boolean;
  type?: 'input' | 'checkbox' | 'number';
  loading?: boolean;
  checked?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold text-lg">
        {label}
        {required && <span className="text-red-500">&nbsp;*</span>}
      </label>
      {!loading && (
        <input
          id={id}
          name={name}
          autoComplete={autoComplete}
          className={`w-full border rounded p-2 my-2 outline-none focus:ring-2 ring-accent-500 ${
            disabled && 'cursor-not-allowed bg-gray-300 ring-0'
          }`}
          value={value === null ? undefined : value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          type={type}
          checked={checked}
        />
      )}
    </div>
  );
}

Input.defaultProps = {
  required: false,
  disabled: false,
  type: 'input',
  loading: false,
  value: undefined,
  checked: undefined,
};
