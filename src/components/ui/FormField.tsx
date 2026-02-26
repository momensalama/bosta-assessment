import type { ChangeEvent } from "react";

type SelectOption = { value: string; label: string };

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
};

type TextProps = BaseProps & { type: "text"; value: string };
type NumberProps = BaseProps & {
  type: "number";
  value: number | string;
  min?: number;
  step?: number;
};
type TextareaProps = BaseProps & {
  type: "textarea";
  value: string;
  rows?: number;
};
type SelectProps = BaseProps & {
  type: "select";
  value: string;
  options: SelectOption[];
};

type FormFieldProps = TextProps | NumberProps | TextareaProps | SelectProps;

const baseInputClass =
  "w-full rounded-lg border px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 transition";

function inputClass(hasError: boolean) {
  return `${baseInputClass} ${
    hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-gray-300 focus:ring-red-500"
  }`;
}

export default function FormField(props: Readonly<FormFieldProps>) {
  const { label, name, error, required, placeholder, disabled, onChange } =
    props;
  const id = `field-${name}`;
  const hasError = Boolean(error);

  const renderInput = () => {
    if (props.type === "textarea") {
      return (
        <textarea
          id={id}
          name={name}
          value={props.value}
          onChange={onChange}
          placeholder={placeholder}
          rows={props.rows ?? 4}
          disabled={disabled}
          className={inputClass(hasError)}
        />
      );
    }

    if (props.type === "select") {
      return (
        <select
          id={id}
          name={name}
          value={props.value}
          onChange={onChange}
          disabled={disabled}
          className={`${inputClass(hasError)} cursor-pointer disabled:opacity-60`}
        >
          <option value="">
            {disabled ? "Loading…" : (placeholder ?? "Select an option")}
          </option>
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (props.type === "number") {
      return (
        <input
          type="number"
          id={id}
          name={name}
          value={props.value}
          onChange={onChange}
          placeholder={placeholder}
          min={props.min}
          step={props.step}
          disabled={disabled}
          className={inputClass(hasError)}
        />
      );
    }

    return (
      <input
        type="text"
        id={id}
        name={name}
        value={props.value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass(hasError)}
      />
    );
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
