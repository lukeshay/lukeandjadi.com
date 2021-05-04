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
}: {
  label: string;
  id: string;
  name: string;
  autoComplete: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'input' | 'checkbox' | 'number';
}) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold text-lg">
        {label}
        <span className="text-red-500">&nbsp;*</span>
      </label>
      <input
        id={id}
        name={name}
        autoComplete={autoComplete}
        className="w-full border rounded p-2 my-2"
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        type={type}
      />
    </div>
  );
}

Input.defaultProps = {
  required: false,
  disabled: false,
  type: 'input',
};
